import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/server/payloadClient'

export async function proxy(req: NextRequest) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.next()
  }

  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth(req)

    if (user) {
      const newHeaders = new Headers(req.headers)
      newHeaders.set('x-user-id', user.id)
      newHeaders.set('x-username', user.username)

      return NextResponse.next({
        request: { headers: newHeaders },
      })
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Invalid token:', error)

    return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
  }
}
