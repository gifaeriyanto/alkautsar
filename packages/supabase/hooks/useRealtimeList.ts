import { useBoolean } from '@chakra-ui/react'
import {
  REALTIME_LISTEN_TYPES,
  REALTIME_SUBSCRIBE_STATES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
} from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import { getClient } from '../client'
import { getCRUDBase } from '../CRUD-base'
import { PaginationParams } from '../CRUD-base/types'
import { Database, Tables } from '../types/database'
import { deepCompareEffect } from '../utils/deepCompareEffect'

const PAGE = 1
const PAGE_SIZE = 50

const client = getClient()

export interface RealtimePaginationOptions {
  page?: number
  pageSize?: number
  sort?: {
    column: string
    ascending?: boolean | undefined
    nullsFirst?: boolean | undefined
    foreignTable?: undefined
  }
  disabled?: boolean
}

/**
 * Custom hook for handling paginated list with real-time updates via Supabase subscriptions.
 * Combines the functionality of useList with real-time subscriptions.
 * @param {T} table - The table name to subscribe to.
 * @param {RealtimePaginationOptions & { select?: string, filters?: PaginationParams<T>['filters'] }} options - Parameters for pagination and filtering.
 * @returns {Object} - List data, pagination state, and functions with real-time updates.
 */
export const useRealtimeList = <T extends keyof Database['public']['Tables']>(
  table: T,
  options?: RealtimePaginationOptions & {
    select?: string
    filters?: PaginationParams<T>['filters']
  }
) => {
  const {
    page = PAGE,
    pageSize = PAGE_SIZE,
    sort,
    select = '*',
    filters,
    disabled,
  } = options || {}

  const [data, setData] = useState<Tables<T>[]>([])
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, { on, off }] = useBoolean(false)
  const [totalData, setTotalData] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(page)

  /**
   * Function to set the current page.
   * @param {number} newPage - The new page value.
   */
  const setPage = useCallback((newPage: number) => {
    setCurrentPage(Math.max(1, newPage))
  }, [])

  const refetch = useCallback(async () => {
    if (disabled) {
      return
    }

    try {
      on()

      // Calculate start and end indices for the current page
      const from = (currentPage - 1) * pageSize
      const to = currentPage * pageSize - 1

      // Fetch data from the CRUD-Base service
      const {
        data: newData,
        count,
        error,
      } = await getCRUDBase(table).list({
        from,
        to,
        sort: {
          ...sort,
          column: sort?.column || 'id',
        },
        select,
        filters,
      })

      if (error) {
        setError(new Error(error.message))
      }

      count && setTotalData(count)

      if (count === 0) {
        setTotalData(0)
        setTotalPages(0)
        setData([])
        return
      }

      // Math max to avoid page count 0
      const pageCount = Math.ceil((count || 0) / pageSize)

      // handle if the current page is greater than the total pages
      // this means the last index is out of range
      if (currentPage > pageCount && newData?.length === 0) {
        // retry with the last page
        setPage(pageCount)
        return
      }

      setData(newData ?? [])
      setTotalPages(pageCount)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }

      setError(new Error('Unknown error during fetching data'))
    } finally {
      off()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    disabled,
    on,
    currentPage,
    pageSize,
    table,
    select,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompareEffect(sort),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deepCompareEffect(filters),
    setPage,
    off,
  ])

  // Handle real-time updates
  useEffect(() => {
    if (disabled) {
      return
    }

    const channel = client
      .channel(`realtime-list-${table}`)
      .on<Tables<T>>(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        { table, event: '*', schema: 'public' },
        (payload) => {
          switch (payload.eventType) {
            case REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT:
              // For inserts, we need to refetch to maintain pagination accuracy
              void refetch()
              break
            case REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE:
              // For updates, try to update the item in place if it exists in current page
              setData((prevData) => {
                const existingIndex = prevData.findIndex(
                  (item) => item.id === payload.new.id
                )
                if (existingIndex >= 0) {
                  const newData = [...prevData]
                  newData[existingIndex] = payload.new
                  return newData
                }
                // If item not in current page, refetch to ensure consistency
                void refetch()
                return prevData
              })
              break
            case REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.DELETE:
              // For deletes, remove from current data and refetch to maintain pagination
              setData((prevData) => {
                const filteredData = prevData.filter(
                  (item) => item.id !== payload.old.id
                )
                // If an item was removed from current page, refetch to fill the gap
                if (filteredData.length !== prevData.length) {
                  void refetch()
                }
                return filteredData
              })
              break
            default:
              break
          }
        }
      )
      .subscribe((status, error) => {
        if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          // Initial fetch when subscription is established
          void refetch()
        }
        if (error) {
          setError(error)
        }
      })

    return () => {
      void channel.unsubscribe()
    }
  }, [disabled, table, refetch])

  return {
    data,
    error,
    isLoading,
    totalData,
    totalPages,
    currentPage,
    setPage,
    refetch,
  }
}
