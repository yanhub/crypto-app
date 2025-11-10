'use client'

import { useState, useTransition } from 'react'
import { authorizeUser } from '@/server/actions/authorizeUser'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [greeting, setGreeting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await authorizeUser(formData)
      if (result.success) {
        setError(null)
        setGreeting(`Здравствуйте, ${result.name}! 👋`)
      } else {
        setGreeting(null)
        setError(result.error || 'Login errror')
      }
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-100">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? 'Проверка...' : 'Войти'}
          </button>
        </form>

        {greeting && <p className="mt-6 text-center text-lg font-medium text-gray-800">{greeting}</p>}
        {error && <p className="mt-6 text-center text-sm text-red-600">{error}</p>}
      </div>
    </main>
  )
}
