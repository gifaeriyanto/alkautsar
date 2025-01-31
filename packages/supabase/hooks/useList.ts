import { useBoolean } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { getCRUDBase } from '../CRUD-base'
import { PaginationParams } from '../CRUD-base/types'
import { Database, Tables } from '../types/database'
import { deepCompareEffect } from '../utils/deepCompareEffect'

const PAGE = 1
const PAGE_SIZE = 50

export interface PaginationOptions {
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
 * Custom hook for handling pagination logic.
 * @param {PaginationOptions} options - Parameters for pagination.
 * @returns {Object} - Pagination state and functions.
 */
export const useList = <T extends keyof Database['public']['Tables']>(
  table: T,
  options?: PaginationOptions & {
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
      // send from and to parameters to the list function
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
    // we may want to refetch data when page or pageSize changes
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

  useEffect(() => {
    /**
     * fetch data based on pagination parameters.
     */
    void refetch()
  }, [refetch])

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
