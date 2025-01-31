import type { AggregateResponseData, MultiTablesSearch } from './types/search'
import { getClient } from './client'

const RECORD_LIMIT = 10

export const getSearchService = <T>(
  tableParams: MultiTablesSearch<T>,
  langConfig = 'english'
) => {
  const supabase = getClient()

  // the function prefix with _xxx stand for private/internal function
  // which we don't export at the end of services
  const _getPreQueries = () => {
    return Array.from(tableParams.keys()).map((tableName) => ({
      tableName,
      getPreQuery: () =>
        supabase.from(tableName).select().limit(RECORD_LIMIT).order('id'),
    }))
  }

  const _aggregateData = (
    res: AggregateResponseData<T>[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transformFn?: (data: any) => T
  ) => {
    const error = res.find((re) => re.error)?.error
    let data: T[] = []

    res.forEach((re) => {
      if (re.data) {
        const newData = transformFn
          ? re.data.map((_data) => transformFn(_data))
          : re.data
        data = data.concat(newData)
      }
    })
    return {
      error,
      data: Array.from(new Set(data)),
    }
  }

  /**
   * - Using for searching with multiple columns.
   * - We have no nice way that helps search multiple columns without
   * running it in a loop
   */
  const textSearchMulti = async (query: string) => {
    const queries = _getPreQueries()

    const queryPromises = queries.map(async (q) => {
      // Table name always be available because it's passed by us
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const tbConfig = tableParams.get(q.tableName)!

      const promises = tbConfig.cols.map((col) =>
        q.getPreQuery().textSearch(col, query, {
          config: langConfig,
          type: 'websearch',
        })
      )

      const results = await Promise.all(promises)
      return _aggregateData(results, tbConfig.transformFn)
    })

    const results = await Promise.all(queryPromises)
    return _aggregateData(results)
  }

  /**
   * Using for searching with un-complete text
   * partial search
   */
  const likeSearch = async (query: string) => {
    const queries = _getPreQueries()

    const queryPromises = queries.map(async (q) => {
      // Table name always be available because it's passed by us
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const tbConfig = tableParams.get(q.tableName)!

      const promises = tbConfig.cols.map((col) =>
        q.getPreQuery().ilike(col, `%${query}%`)
      )

      const results = await Promise.all(promises)
      return _aggregateData(results, tbConfig.transformFn)
    })

    const results = await Promise.all(queryPromises)
    return _aggregateData(results)
  }

  return { likeSearch, textSearchMulti }
}
