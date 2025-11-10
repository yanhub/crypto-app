import { NextRequest, NextResponse } from 'next/server'
import { createPost } from '@/server/actions/createPost'
import { getPosts } from '@/server/actions/getPosts'
import { CreatePostInput } from '@/types/postItem'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'


export async function GET() {
  try {
    const result = await getPosts()

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/posts error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch posts'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: CreatePostInput = await request.json()
    const userId = request.headers.get('x-user-id') || null

    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const result = await createPost(data, userId)

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error creating post:', error)

    return NextResponse.json(
      { success: false, message: 'Failed to create post' },
      { status: 500 },
    )
  }
}
