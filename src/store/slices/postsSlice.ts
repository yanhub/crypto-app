import { createSlice } from '@reduxjs/toolkit'
import { getPostsThunk } from '@/store/thunks/getPostsThunk'
import { createPostThunk } from '@/store/thunks/createPostThunk'
import { logoutAll } from '@/store/actions/globalActions'
import { PostItem } from '@/types/postItem'

interface PostsState {
  data: PostItem[]
  loading: boolean
  error: string | null
}

const initialState: PostsState = {
  data: [],
  loading: false,
  error: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.data = []
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload || []
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to load posts'
      })
      .addCase(createPostThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.data.unshift(action.payload)
        }
      })
      .addCase(logoutAll, (state) => {
        state.data = []
        state.error = null
        state.loading = false
      })
  },
})

export const { clearPosts } = postsSlice.actions

export default postsSlice.reducer
