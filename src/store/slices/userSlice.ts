import { createSlice } from '@reduxjs/toolkit'
import { authorizeUserThunk } from '@/store/thunks/authorizeUserThunk'
import { logoutUser, setUser, setToken } from '@/store/actions/userActions'
import { logoutAll } from '@/store/actions/globalActions'
import type { Users } from '@/types/users'

interface UserState {
  data: {
    user: Users | null
    token: string | null
  }
  loading: boolean
  error: string | null
}

const STORAGE_USER_KEY = 'user'
const STORAGE_TOKEN_KEY = 'token'

const storedUser = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_USER_KEY) : null
const storedToken = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_TOKEN_KEY) : null

const initialState: UserState = {
  data: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
  },
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // authorizeUserThunk
      .addCase(authorizeUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authorizeUserThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data.user = action.payload.user || null
        state.data.token = action.payload.token || null

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(action.payload.user))
          localStorage.setItem(STORAGE_TOKEN_KEY, action.payload.token || '')
        }
      })
      .addCase(authorizeUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Authorization failed'
      })

      // logoutUser
      .addCase(logoutUser, (state) => {
        state.data.user = null
        state.data.token = null
        state.error = null
        state.loading = false

        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_USER_KEY)
          localStorage.removeItem(STORAGE_TOKEN_KEY)
        }
      })

      // logoutAll
      .addCase(logoutAll, (state) => {
        state.data.user = null
        state.data.token = null
        state.error = null
        state.loading = false

        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_USER_KEY)
          localStorage.removeItem(STORAGE_TOKEN_KEY)
        }
      })

      // setUser
      .addCase(setUser, (state, action) => {
        state.data.user = action.payload

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(action.payload))
        }
      })

      // setToken
      .addCase(setToken, (state, action) => {
        state.data.token = action.payload

        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_TOKEN_KEY, action.payload)
        }
      })
  },
})

export default userSlice.reducer
