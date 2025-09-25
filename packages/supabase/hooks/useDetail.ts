import { useCallback, useEffect, useState, useMemo } from 'react'
import { getCRUDBase } from '..'
import { Database, Tables } from '../types/database'

export const useDetail = <
  T extends keyof (Database['public']['Tables']  ),
>(
  table: T,
  id: string,
  options?: { select?: string }
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Tables<T>>()
  const [error, setError] = useState<Error | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { getOneById } = useMemo(() => getCRUDBase(table as any), [table])

  const fetcher = useCallback(async () => {
    if (!id) {
      return
    }
    return getOneById(id, { select: options?.select })
      .then((res) => {
        if (res.data) {
          setData(res.data as Tables<T>)
        }
      })
      .catch((err) => {
        setError(new Error(err.message))
      })
  }, [getOneById, id, options?.select])

  useEffect(() => {
    setIsLoading(true)
    void fetcher().finally(() => {
      setIsLoading(false)
    })
  }, [fetcher])

  return { data, refetch: fetcher, isLoading, error }
}
