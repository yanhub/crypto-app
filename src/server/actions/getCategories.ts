'use server'

import { getPayloadClient } from '@/server/payloadClient'
import { GetCategoriesResponse } from '@/types/categories'

export async function getCategories(): Promise<GetCategoriesResponse> {
  try {
    const payload = await getPayloadClient()

    const data = await payload.find({
      collection: 'categories',
      depth: 1,
      sort: '-createdAt',
    })

    const categories = data.docs

    return {
      success: true,
      categories: categories.map(({ id, title, slug }) => ({ id, title, slug })),
    }
  } catch (error) {
    console.error('Get categories error:', error)

    const message = error instanceof Error ? error.message : 'Failed to fetch categories'

    return {
      success: false,
      message: message,
    }
  }
}
