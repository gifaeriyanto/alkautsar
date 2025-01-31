import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { getClient } from '../client'

const client = getClient()

export const useUser = () => {
  const [data, setData] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const { data: subscribe } = client.auth.onAuthStateChange(
      (_event, session) => {
        setData(session?.user)
        setIsLoading(false)
      }
    )

    return () => {
      subscribe.subscription.unsubscribe()
    }
  }, [])

  return { isLoading, data }
}
