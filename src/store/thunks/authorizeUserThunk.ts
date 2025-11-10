import { createAsyncThunk } from '@reduxjs/toolkit'
import type { AuthorizeUserInput, AuthorizeUserResponse } from '@/types/auth'

export const authorizeUserThunk = createAsyncThunk<
  AuthorizeUserResponse,
  AuthorizeUserInput,
  { rejectValue: string }
>(
  'user/authorizeUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/authorize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        return rejectWithValue('Invalid username or password')
      }

      const data: AuthorizeUserResponse = await response.json()

      if (!data.user || !data.token) {
        return rejectWithValue('Invalid response from server')
      }

      return data
    } catch {
      return rejectWithValue('Authorization failed. Please try again.')
    }
  }
)
