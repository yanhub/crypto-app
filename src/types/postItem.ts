export interface CreatePostInput {
  title: string
  content: string
  categoryId: string
}

export interface PostItem {
  id: string
  slug: string
  title: string
  content: string
  owner: string
  categories: string[]
  createdAt: string
}

export interface CreatePostResponse {
  success: boolean
  post?: PostItem
  message?: string
}

export interface GetPostsResponse {
  success: boolean
  posts?: PostItem[]
  message?: string
}
