import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWithAuth } from '@/utils/fetchWithAuth'

interface Category {
  id: string
  title: string
  slug: string
  content?: string
}

export const getCategoriesThunk = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  'categories/getCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/categories`, {
        method: 'GET',
      })

      if (!response.ok) {
        return rejectWithValue('Failed to fetch categories')
      }

      const data = await response.json()

      return data.categories || []
    } catch {
      return rejectWithValue('Failed to load categories')
    }
  }
)
