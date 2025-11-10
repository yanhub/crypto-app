export async function fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const headers = new Headers(init?.headers)
  if (token) {
    console.log('token', token)
    headers.set('Authorization', `Bearer ${token}`)
  }

  const config = {
    ...init,
    headers,
  }

  console.log('config', config)

  return fetch(input, config)
}
