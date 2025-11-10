'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'

export async function authorizeUser(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    const payload = await getPayload({ config })

    const result = await payload.login({
      collection: 'users',
      data: { username, password },
    })

    if (result?.user) {
      return {
        success: true,
        name: result.user.name || result.user.username,
      }
    }

    return { success: false, error: 'Wrong data' }
  } catch (err: any) {
    console.error('Login error:', err)
    return { success: false, error: err.message }
  }
}