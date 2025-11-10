import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import postsReducer from './slices/postsSlice'
import authFormReducer from './slices/authFormSlice'
import postFormReducer from './slices/postFormSlice'
import categoriesReducer from './slices/categoriesSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    authForm: authFormReducer,
    postForm: postFormReducer,
    categories: categoriesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
