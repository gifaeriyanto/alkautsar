/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardBody,
  HStack,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  FilterOperator,
  PaginationParams,
} from '@client/supabase/CRUD-base/types'
import React, { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { deepCompareEffect } from '@client/supabase/utils/deepCompareEffect'
import { BiSort } from 'react-icons/bi'
import { FormGeneratorProps } from '..'
import { Filter, FilterValues } from './filter'
import { GeneralDatabaseTable } from '.'

export type SearchFilter<T extends GeneralDatabaseTable> = Record<
  string,
  {
    operator: FilterOperator<T>
    value: string
  }
>

export interface SearchProps<T extends GeneralDatabaseTable> {
  formFilterPreset?: FormGeneratorProps['data']
  ilikeFilterKeys?: string[]
  filters: SearchFilter<T>
  onFilter?: (filters: SearchFilter<T>) => void
  searchKey?: string
  sort?: PaginationParams<T>['sort']
  onSort?: (sort: PaginationParams<T>['sort']) => void
}

export const Search = <T extends GeneralDatabaseTable>({
  formFilterPreset,
  ilikeFilterKeys,
  filters,
  onFilter,
  searchKey = 'name',
  sort,
  onSort,
}: SearchProps<T>) => {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 300)

  useEffect(() => {
    onSort?.(sort)
  }, [onSort, sort])

  useEffect(() => {
    onFilter?.({
      ...filters,
      [searchKey]: {
        // to ignore operator type
        operator: 'ilike' as any,
        value: `%${debouncedSearch}%`,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, deepCompareEffect(filters), onFilter, searchKey])

  const handleFilter = (values: FilterValues) => {
    onFilter?.({
      ...values,
      [searchKey]: {
        // to ignore operator type
        operator: 'ilike' as any,
        value: `%${debouncedSearch}%`,
      },
    })
  }

  const sortList = useMemo(() => {
    return [
      { column: 'created_at', ascending: false, label: 'Terbaru' },
      { column: 'created_at', ascending: true, label: 'Terlama' },
      { column: searchKey, ascending: true, label: 'Name A-Z' },
      { column: searchKey, ascending: false, label: 'Name Z-A' },
    ].map((item) => {
      const isActive =
        item.column === sort?.column && item.ascending === sort.ascending
      return (
        <MenuItem
          key={item.label}
          onClick={() => {
            onSort?.({
              column: item.column,
              ascending: item.ascending,
            })
          }}
          bgColor={isActive ? 'orange.500' : undefined}
          color={isActive ? 'white' : undefined}
        >
          {item.label}
        </MenuItem>
      )
    })
  }, [onSort, searchKey, sort?.ascending, sort?.column])

  return (
    <Card>
      <CardBody>
        <HStack>
          <Input
            placeholder="Cari..."
            onChange={(e) => {
              setSearch(e.currentTarget.value)
            }}
          />
          {formFilterPreset ? (
            <Filter
              formFilterPreset={formFilterPreset}
              ilikeFilterKeys={ilikeFilterKeys}
              onSubmit={handleFilter}
            />
          ) : null}

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Sort"
              icon={<BiSort />}
              variant="outline"
              colorScheme="gray"
            />
            <MenuList>{sortList}</MenuList>
          </Menu>
        </HStack>
      </CardBody>
    </Card>
  )
}
