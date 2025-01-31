import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SignUpWithPasswordCredentials } from '@supabase/supabase-js'

const supabase = createClientComponentClient()

export const signUp = (payload: SignUpWithPasswordCredentials) => {
  return supabase.auth.signUp(payload)
}

export const signIn = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password })
}

export const signOut = async (shouldReload = true) => {
  await supabase.auth.signOut()
  if (shouldReload) {
    window.location.reload()
  }
}

export const forgotPassword = (email: string) => {
  return supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })
}

export const resetPassword = (password: string) => {
  return supabase.auth.updateUser(
    { password },
    {
      emailRedirectTo: `${window.location.origin}`,
    }
  )
}

export const getUserData = () => {
  return supabase.auth.getUser()
}

export const getUserRoles = async () => {
  const res = await getUserData()
  if (!res.data.user) {
    return []
  }
  const { id } = res.data.user
  const { data } = await supabase
    .from('organizations_members')
    .select('role_id, roles (id, name)')
    .eq('user_id', id)
  // TODO: improve type
  return (
    data?.map(
      (item) => (item.roles as unknown as { id: string; name: string }).name
    ) || []
  )
}
