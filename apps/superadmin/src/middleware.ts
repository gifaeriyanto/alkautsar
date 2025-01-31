import { getClient } from '@client/supabase/middleware'
import { createClient, type Session } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AccountRole } from '@client/supabase/types'

// List of pages that doesn't need authenticated
const PUBLIC_PAGES = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/email-confirmation',
]

const isSuperAdmin = async (session: Session | null) => {
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

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session?.user.id)
    .single()

  return data?.role === AccountRole.SuperAdmin
}

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const supabase = getClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isPublicPage = PUBLIC_PAGES.includes(req.nextUrl.pathname)
  const redirectUrl = req.nextUrl.clone()
  const isUserSuperAdmin = await isSuperAdmin(session)

  // Auth condition not met, redirect to login page.
  if (!session && !isPublicPage) {
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Authenticated but trying to access auth page, redirect to home page
  if (session && isPublicPage && isUserSuperAdmin) {
    redirectUrl.pathname = '/'
    return NextResponse.redirect(redirectUrl)
  }

  // Authentication successful, forward request to protected route.
  if (session && !isUserSuperAdmin && !isPublicPage) {
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|images).*)',
  ],
}
