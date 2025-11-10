import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchWithAuth } from '@/utils/fetchWithAuth'
import { CreatePostInput, PostItem } from '@/types/postItem'


export const createPostThunk = createAsyncThunk<
  PostItem,
  CreatePostInput,
  { rejectValue: string }
>(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetchWithAuth(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        return rejectWithValue('Failed to create post')
      }

      const data = await response.json()

      return data.post
    } catch {
      return rejectWithValue('Failed to create post')
    }
  }
)
