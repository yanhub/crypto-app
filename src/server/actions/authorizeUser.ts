'use server'

import type { AuthorizeUserInput, AuthorizeUserResponse } from '@/types/auth'
import { getPayloadClient } from '@/server/payloadClient'

export async function authorizeUser(userInput: AuthorizeUserInput): Promise<AuthorizeUserResponse> {
  const payload = await getPayloadClient()

  const { username, password } = userInput

  try {
    const { user, token } = await payload.login({
      collection: 'users',
      data: { username, password },
    })

    if (!user) {
      return {
        success: false,
        message: 'User not found',
      }
    }

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    }
  } catch (error) {
    console.error('Authorization error:', error)

    const message = error instanceof Error ? error.message : 'Login failed'

    return {
      success: false,
      message,
    }
  }
}
