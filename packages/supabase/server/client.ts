import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { cache } from 'react'
import { Database } from '../types/database'
import getSupabaseClientKeys from './client-keys'

const getCookiesStrategy = () => {
  const cookieStore = cookies()

  return {
    get: (name: string) => {
      return cookieStore.get(name)?.value
    },
  }
}

export const getClient = cache(
  (
    params = {
      admin: false,
    }
  ) => {
    const keys = getSupabaseClientKeys()

    if (params.admin) {
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

      if (!serviceRoleKey) {
        throw new Error('Supabase Service Role Key not provided')
      }

      return createServerClient<Database>(keys.url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        cookies: {},
      })
    }

    return createServerClient(keys.url, keys.anonKey, {
      cookies: getCookiesStrategy(),
    })
  }
)
