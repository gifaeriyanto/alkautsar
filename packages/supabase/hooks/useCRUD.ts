import { useMemo } from 'react'
import { getCRUDBase } from '@client/supabase/CRUD-base'
import { Database } from '@client/supabase/types/database'

const useCRUD = <T extends keyof Database['public']['Tables']>(table: T) => {
  const methods = useMemo(() => getCRUDBase<T>(table), [table])
  return methods
}

export default useCRUD
