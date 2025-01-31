import { PostgrestFilterBuilder } from '@supabase/postgrest-js'
import { GetResult } from '@supabase/postgrest-js/src/select-query-parser'
import { Database } from '../types/database'

export type SelectQuery<
  T extends keyof Database['public']['Tables'],
  RelationName = unknown,
  Relationships = unknown,
> = PostgrestFilterBuilder<
  Database['public'],
  Database['public']['Tables'][T]['Row'],
  GetResult<
    Database['public'],
    Database['public']['Tables'][T]['Row'],
    RelationName,
    Relationships,
    '*'
  >[],
  RelationName,
  Relationships
>

export type FilterOperator<T extends keyof Database['public']['Tables']> =
  keyof Pick<
    SelectQuery<T>,
    'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'like' | 'ilike' | 'is' | 'in'
  >

export type FilterParams<
  T extends keyof Database['public']['Tables'],
  U extends FilterOperator<T>,
> = Parameters<SelectQuery<T>[U]>

export type Filter<
  T extends keyof Database['public']['Tables'],
  U extends FilterOperator<T>,
> = [U, ...FilterParams<T, U>]

export interface PaginationParams<
  T extends keyof Database['public']['Tables'],
> {
  from?: number
  to?: number
  sort?: {
    column: string
    ascending?: boolean | undefined
    nullsFirst?: boolean | undefined
    foreignTable?: undefined
  }
  filters?: Filter<T, FilterOperator<T>>[]
  includeDeleted?: boolean
  select?: string
}
