import { NextResponse } from 'next/server'
import { getCategories } from '@/server/actions/getCategories'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'


export async function GET() {
  try {
    const result = await getCategories()

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('GET /api/categories error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch categories'
    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
