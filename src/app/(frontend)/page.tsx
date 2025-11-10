'use client'

import { useSelector } from 'react-redux'
import type { RootState } from 'src/store'
import UserArea from '@/components/mainPage/UserArea/UserArea'
import LoginForm from '@/components/mainPage/LoginForm/LoginForm'

export default function Page() {
  const user = useSelector((state: RootState) => state.user.data.user)

  return (
    <main className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6">
      <div className="w-full max-w-5xl">
        {user ? <UserArea /> : <LoginForm />}
      </div>
    </main>
  )
}
