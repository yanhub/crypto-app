'use client'

import { useDispatch } from 'react-redux'
import { logoutAll } from '@/store/actions/globalActions'
import type { AppDispatch } from '@/store'

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = () => {
    dispatch(logoutAll())
  }

  return (
    <button
      onClick={handleLogout}
      className="fixed top-6 right-6 bg-black text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 transition"
    >
      Logout
    </button>
  )
}
