/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */
import { NextResponse } from 'next/server'
import Imagekit from 'imagekit'
import { v4 } from 'uuid'

const ik = new Imagekit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL as string,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
})

export const revalidate = 0

export function GET() {
  const res = ik.getAuthenticationParameters(v4())
  return NextResponse.json(res)
}
