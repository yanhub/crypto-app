export interface CategoryItem {
  id: string
  title: string
  slug: string
}

export interface GetCategoriesResponse {
  success: boolean
  categories?: CategoryItem[]
  message?: string
}
