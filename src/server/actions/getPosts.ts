'use server'

import type { GetPostsResponse } from '@/types/postItem'
import { getPayloadClient } from '@/server/payloadClient'
import { Category, User } from '@/payload-types'

export async function getPosts(): Promise<GetPostsResponse> {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      sort: '-createdAt',
    })

    const posts = result.docs

    return {
      success: true,
      posts: posts.map(post => ({
        id: post.id,
        slug: post.slug,
        title: post.title || '',
        content: post.content || '',
        owner: (post.owner as User)?.username || '',
        categories: (post.categories as Category[]).map(category => (category as Category).id),
        createdAt: post.createdAt,
      })),
    }
  } catch (error) {
    console.error('Get posts error:', error)

    const message = error instanceof Error ? error.message : 'Failed to fetch posts'

    return {
      success: false,
      message: message,
    }
  }
}
