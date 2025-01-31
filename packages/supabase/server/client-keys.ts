import invariant from 'tiny-invariant'

interface SupabaseClientKeys {
  url: string
  anonKey: string
}

const getSupabaseClientKeys = (): SupabaseClientKeys => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  invariant(url, `Supabase URL not provided`)

  invariant(anonKey, `Supabase Anon Key not provided`)

  return {
    url,
    anonKey,
  }
}

export default getSupabaseClientKeys
