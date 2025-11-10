'use client'

import { useDispatch } from 'react-redux'
import { logoutAll } from '@/store/actions/globalActions'
import type { AppDispatch } from '@/store'

interface UserGreetingProps {
  username: string
}

export default function UserGreeting({ username }: UserGreetingProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logoutAll())
  }

  return (
    <div className="relative w-full max-w-lg flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Hello, {username}!</h2>

      <button
        onClick={handleLogout}
        className="absolute right-0 bg-gray-200 text-gray-800 px-4 py-1.5 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
      >
        Logout
      </button>
    </div>
  )
}
