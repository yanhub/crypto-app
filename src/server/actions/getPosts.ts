'use server'

import { getPayload } from 'payload'
import { cookies } from 'next/headers'

export const createPost = async (formData: FormData) => {
  const payload = await getPayload({ configPath: 'src/payload.config.ts' })
  const token = cookies().get('payload-token')?.value

  const { user } = await payload.auth({ collection: 'users', token })
  if (!user) throw new Error('Not authenticated')

  const title = String(formData.get('title') ?? '')
  const slug = String(formData.get('slug') ?? '')
  const content = String(formData.get('content') ?? '')

  return payload.create({
    collection: 'posts',
    data: { title, slug, content, owner: user.id },
  })
}
