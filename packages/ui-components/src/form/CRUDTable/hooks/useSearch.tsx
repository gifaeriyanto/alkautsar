import { PaginationParams } from '@client/supabase/CRUD-base/types'
import { deepCompareEffect } from '@client/supabase/utils/deepCompareEffect'
import React, { useState, useMemo } from 'react'
import { SearchFilter, Search, GeneralDatabaseTable } from '..'
import { FormGeneratorProps } from '../..'

export interface UseSearchParams {
  searchNameKey?: string
  defaultSortKey?: string
  formFilterPreset?: FormGeneratorProps['data']
  ilikeFilterKeys?: string[]
}

export const useSearch = <T extends GeneralDatabaseTable>(
  options?: UseSearchParams
) => {
  const { searchNameKey, formFilterPreset, ilikeFilterKeys, defaultSortKey } =
    options || {}
  const [filter, setFilter] = useState<SearchFilter<T>>({})
  const [sort, setSort] = useState<PaginationParams<T>['sort']>({
    column: defaultSortKey || 'created_at',
    ascending: false,
  })

  const renderSearch = useMemo(() => {
    return (
      <Search
        filters={filter}
        onFilter={setFilter}
        sort={sort}
        onSort={setSort}
        searchKey={searchNameKey}
        formFilterPreset={formFilterPreset}
        ilikeFilterKeys={ilikeFilterKeys}
      />
    )
  }, [filter, formFilterPreset, ilikeFilterKeys, searchNameKey, sort])

  const mappedFilter: PaginationParams<T>['filters'] = useMemo(() => {
    return Object.entries(filter).map(([key, item]) => [
      item.operator,
      key,
      item.value,
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepCompareEffect(filter)])

  return {
    renderSearch,
    filter: mappedFilter,
    sort,
  }
}
