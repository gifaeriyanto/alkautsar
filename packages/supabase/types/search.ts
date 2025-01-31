import type { PostgrestError } from '@supabase/supabase-js'

type TableName = string
type Columns = string[]
/**
 * - This interface provide ability to search across tables.
 * - For each table you need to provide `table_name` + `searching columns` and `a transform function`
 * `transformFn` - Because data retrieving from tables are different so we need
 * this function to transform that into a standard format `T` which can be used in `rendererFunction`
 */
export type MultiTablesSearch<T> = Map<
  TableName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { cols: Columns; transformFn?: (data: any) => T }
>

export interface StandardData {
  id: number
  tableName: string
}

export interface AggregateResponseData<T> {
  error: PostgrestError | null | undefined
  data: T[] | null
}
