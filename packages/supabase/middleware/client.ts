import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '../types/database'

export const getClient = (context: { req: NextRequest; res: NextResponse }) => {
  return createMiddlewareClient<Database>(context)
}
