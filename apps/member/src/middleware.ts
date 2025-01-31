import { getClient } from '@client/supabase/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// List of pages that doesn't need authenticated
const PUBLIC_PAGES = [
  '/login',
  '/forgot-password',
  '/reset-password',
  '/email-confirmation',
]

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const supabase = getClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const isPublicPage =
    PUBLIC_PAGES.includes(req.nextUrl.pathname) ||
    req.nextUrl.pathname.startsWith('/r/') ||
    req.nextUrl.pathname.startsWith('/e/')
  const isThanksRegisterPage =
    req.nextUrl.pathname.startsWith('/e/') &&
    req.nextUrl.pathname.endsWith('/thanks')
  const redirectUrl = req.nextUrl.clone()

  // Allow all access this page
  if (isThanksRegisterPage) {
    return res
  }

  // Auth condition not met, redirect to login page.
  if (!session && !isPublicPage) {
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }

  // Authenticated but trying to access auth page, redirect to home page
  if (session && isPublicPage) {
    redirectUrl.pathname = '/'
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
