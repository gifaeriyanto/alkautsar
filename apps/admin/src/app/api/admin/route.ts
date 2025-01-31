import { createAdmin } from '@client/supabase/admin'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password, email, ...user_metadata } = await req.json()

  const res = await createAdmin({
    email,
    password,
    ...user_metadata,
  })
  return NextResponse.json(res)
}
