import type { PostgrestError } from '@supabase/supabase-js'
import { getClient } from '../client'
import { Database, Tables } from '../types/database'
import { Filter, FilterOperator, PaginationParams, SelectQuery } from './types'

/**
 * This service provide us a default error handler
 * @param table table name
 * @returns set of services
 */
export const getCRUDBase = <T extends keyof Database['public']['Tables']>(
  table: T
) => {
  const supabase = getClient()

  const _getPreQuery = () => supabase.from(table)

  const queryBuilder = (
    query: SelectQuery<T>,
    filters: Filter<T, FilterOperator<T>>[] = []
  ) => {
    filters.forEach(([operator, ...params]) => {
      // FIXME
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      query[operator](...params)
    })
  }

  const list = async (
    pg: PaginationParams<T>
  ): Promise<{
    data: Tables<T>[] | null
    count: number | null
    error: PostgrestError | null
  }> => {
    const {
      from = 0,
      to = from + 1,
      sort = { column: 'id' },
      filters = [],
      includeDeleted,
      select = '*',
    } = pg
    const { column, ...rest } = sort
    const query = _getPreQuery().select(select as '*', { count: 'exact' })
    if (!includeDeleted) {
      void query.is('deleted_at', null)
    }
    queryBuilder(query, filters)

    const res = await query
      .range(from, to)
      .order(column, { ...rest })
      .throwOnError()

    return {
      ...res,
      data: res.data as Tables<T>[] | null,
    }
  }

  const getOneById = async (
    id: number | string,
    options?: { select?: string }
  ) => {
    const res = await _getPreQuery()
      .select(options?.select || '*')
      .eq('id', id)
      .single()
      .throwOnError()
    return res
  }

  const createData = async (data: Tables<T>) => {
    const res = await _getPreQuery()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(data as any)
      .select()
      .throwOnError()
    return res
  }

  const upsertData = async (data: Partial<Tables<T>>) => {
    const res = await _getPreQuery()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .upsert(data as any)
      .select()
      .throwOnError()
    return res
  }

  const deleteById = async (id: string) => {
    const res = await _getPreQuery().delete().eq('id', id).throwOnError()
    return res
  }

  const softDeleteById = async (id: string) => {
    const res = await _getPreQuery()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update({ deleted_at: new Date().toISOString() } as any)
      .eq('id', id)
      .throwOnError()
    return res
  }

  const updateById = async (id: number | string, data: Partial<Tables<T>>) => {
    const res = await _getPreQuery()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(data as any)
      .eq('id', id)
      .select()
      .throwOnError()
    return res
  }

  return {
    list,
    getOneById,
    createData,
    deleteById,
    softDeleteById,
    updateById,
    upsertData,
  }
}
