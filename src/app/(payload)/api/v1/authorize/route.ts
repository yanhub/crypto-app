import { NextRequest, NextResponse } from 'next/server'
import { authorizeUser } from '@/server/actions/authorizeUser'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await authorizeUser(body)

  return NextResponse.json(result)
}
