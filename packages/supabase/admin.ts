/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js'

// This is needed because using for query admin privilege
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Access auth admin api
const adminAuthClient = supabase.auth.admin

export const createAdmin = async ({ email, password, ...metaData }: any) => {
  return adminAuthClient.createUser({
    email,
    password,
    user_metadata: metaData,
  })
}

export const updateUserMetaData = async ({ id, metaData }: any) => {
  return adminAuthClient.updateUserById(id, {
    user_metadata: metaData,
  })
}
