'use client'

import { useDispatch, useSelector } from 'react-redux'
import { authorizeUserThunk } from '@/store/thunks/authorizeUserThunk'
import { selectAuthFormState } from '@/store/selectors/authFormSelectors'
import { selectUserState } from '@/store/selectors/userSelectors'
import { setUsername, setPassword, clearAuthForm } from '@/store/slices/authFormSlice'
import type { AppDispatch } from '@/store'

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector(selectAuthFormState)
  const { username, password } = data
  const { data: { user } } = useSelector(selectUserState)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(authorizeUserThunk({ username, password }))
    dispatch(clearAuthForm())
  }

  if (user) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">Login to your account</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your username and password to log in.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => dispatch(setUsername(e.target.value))}
              placeholder="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="********"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
