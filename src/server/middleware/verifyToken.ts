import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { env } from '@/config/env'

interface DecodedToken extends JwtPayload {
  id: string
  username: string
}

const AUTH_HEADER = 'authorization'
const TOKEN_PREFIX = 'Bearer '

export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get(AUTH_HEADER)

  if (!authHeader || !authHeader.startsWith(TOKEN_PREFIX)) {
    return {
      error: NextResponse.json(
        { success: false, message: 'Missing or invalid authorization header' },
        { status: 401 }
      ),
      user: null,
    }
  }

  const token = authHeader.slice(TOKEN_PREFIX.length).trim()

  try {
    const decoded = jwt.verify(token, env.secret) as DecodedToken

    if (!decoded?.id || !decoded?.username) {
      return {
        error: NextResponse.json(
          { success: false, message: 'Invalid token payload' },
          { status: 401 }
        ),
        user: null,
      }
    }

    return {
      error: null,
      user: {
        id: decoded.id,
        username: decoded.username,
      },
    }
  } catch {
    return {
      error: NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      ),
      user: null,
    }
  }
}
