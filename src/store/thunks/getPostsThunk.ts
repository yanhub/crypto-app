import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWithAuth } from '@/utils/fetchWithAuth'
import { PostItem } from '@/types/postItem'

export const getPostsThunk = createAsyncThunk<
  PostItem[],
  void,
  { rejectValue: string }
>(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/posts`, {
        method: 'GET',
      })

      if (!response.ok) {
        return rejectWithValue('Failed to fetch posts')
      }

      const data = await response.json()

      return data.posts || []
    } catch {
      return rejectWithValue('Failed to load posts')
    }
  }
)
