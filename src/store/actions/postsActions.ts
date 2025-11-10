import { createAction } from '@reduxjs/toolkit'
import { CreatePostInput } from '@/types/postItem'

export const setPosts = createAction<CreatePostInput[]>('posts/setPosts')

export const addPost = createAction<CreatePostInput>('posts/addPost')

export const clearPosts = createAction('posts/clearPosts')
