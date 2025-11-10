import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authorizeUserThunk } from '@/store/thunks/authorizeUserThunk'
import { logoutAll } from '@/store/actions/globalActions'

interface AuthFormData {
  username: string
  password: string
}

interface AuthFormState {
  data: AuthFormData
  loading: boolean
  error: string | null
}

const initialState: AuthFormState = {
  data: {
    username: '',
    password: '',
  },
  loading: false,
  error: null,
}

const authFormSlice = createSlice({
  name: 'authForm',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.data.username = action.payload
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.data.password = action.payload
    },

    clearAuthForm: (state) => {
      state.data = { username: '', password: '' }
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authorizeUserThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(authorizeUserThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(authorizeUserThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Authorization failed'
      })
      .addCase(logoutAll, (state) => {
        state.data = { username: '', password: '' }
        state.error = null
        state.loading = false
      })
  },
})

export const { setUsername, setPassword, clearAuthForm } = authFormSlice.actions

export default authFormSlice.reducer
