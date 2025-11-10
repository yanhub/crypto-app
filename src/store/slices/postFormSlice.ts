import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createPostThunk } from '@/store/thunks/createPostThunk'
import { logoutAll } from '@/store/actions/globalActions'

interface PostFormData {
  title: string
  content: string
  categoryId: string
}

interface PostFormState {
  data: PostFormData
  loading: boolean
  error: string | null
}

const initialState: PostFormState = {
  data: {
    title: '',
    content: '',
    categoryId: '',
  },
  loading: false,
  error: null,
}

const postFormSlice = createSlice({
  name: 'postForm',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.data.title = action.payload
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.data.content = action.payload
    },
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.data.categoryId = action.payload
    },
    clearPostForm: (state) => {
      state.data = { title: '', content: '', categoryId: '' }
      state.error = null
      state.loading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPostThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createPostThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createPostThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to create post'
      })
      .addCase(logoutAll, (state) => {
        state.data = { title: '', content: '', categoryId: '' }
        state.error = null
        state.loading = false
      })
  },
})

export const { setTitle, setContent, setCategoryId, clearPostForm } = postFormSlice.actions

export default postFormSlice.reducer
