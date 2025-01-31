import {
  REALTIME_LISTEN_TYPES,
  REALTIME_SUBSCRIBE_STATES,
  REALTIME_POSTGRES_CHANGES_LISTEN_EVENT,
} from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { getClient } from '../client'
import { Database, Tables } from '../types/database'
import useCRUD from './useCRUD'

const client = getClient()

export const useSubscribe = <T extends keyof Database['public']['Tables']>(
  table: T,
  id?: string | number
) => {
  const [data, setData] = useState<Tables<T> | null>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { getOneById } = useCRUD<T>(table)

  useEffect(() => {
    if (!id) {
      return
    }

    const subscribedHandler = async () => {
      const { data } = await getOneById(id)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setData(data as any)
      setIsLoading(false)
    }

    const channel = client
      .channel(`${table}/${id}`)
      .on<Tables<T>>(
        REALTIME_LISTEN_TYPES.POSTGRES_CHANGES,
        { table, event: '*', schema: '*', filter: `id=eq.${id}` },
        (payload) => {
          switch (payload.eventType) {
            case REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.INSERT:
            case REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.UPDATE:
              setData(payload.new)
              break
            case REALTIME_POSTGRES_CHANGES_LISTEN_EVENT.DELETE:
              setData(undefined)
              break
            default:
              break
          }
        }
      )
      .subscribe((status, error) => {
        if (status === REALTIME_SUBSCRIBE_STATES.SUBSCRIBED) {
          void subscribedHandler()
        }
        if (error) {
          setError(error)
          setIsLoading(false)
        }
      })

    return () => {
      void channel.unsubscribe()
    }
  }, [getOneById, id, table])

  return { isLoading, error, data }
}
