import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCategoriesThunk } from '@/store/thunks/getCategoriesThunk'
import { logoutAll } from '@/store/actions/globalActions'
import { CategoryItem } from '@/types/categories'

interface CategoriesState {
  data: CategoryItem[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryItem[]>) => {
      state.data = action.payload
    },
    clearCategories: (state) => {
      state.data = []
      state.loading = false
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to load categories'
      })
      .addCase(logoutAll, (state) => {
        state.data = []
        state.error = null
        state.loading = false
      })
  },
})

export const { clearCategories, setCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
