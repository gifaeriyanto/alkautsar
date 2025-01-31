import { updateUserMetaData } from '@client/supabase/admin'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function PUT(req: NextRequest) {
  const { id, metaData } = await req.json()

  const res = await updateUserMetaData({ id, metaData })
  return NextResponse.json(res)
}
