'use server'

import { getPayloadClient } from '@/server/payloadClient'
import { slugify } from '@/utils/slugify'
import { CreatePostInput, CreatePostResponse } from '@/types/postItem'
import { Category, User } from '@/payload-types'

export async function createPost(postData: CreatePostInput, userId: string): Promise<CreatePostResponse> {
  try {
    const { title, content, categoryId } = postData

    const payload = await getPayloadClient()
    const newPost = await payload.create({
      collection: 'posts',
      data: {
        title,
        slug: slugify(title),
        content,
        categories: categoryId ? [categoryId] : [],
        owner: userId,
      },
    })

    return {
      success: true,
      post: {
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title || '',
        content: newPost.content || '',
        owner: (newPost.owner as User)?.username || '',
        categories: (newPost.categories as Category[]).map(category => (category as Category).id),
        createdAt: newPost.createdAt,
      }
    }
  } catch (error) {
    console.error('Create post error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create post'

    return { success: false, message }
  }
}
