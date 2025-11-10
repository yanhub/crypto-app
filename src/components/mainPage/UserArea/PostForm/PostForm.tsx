'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostFormState } from '@/store/selectors/postFormSelectors'
import { selectCategoriesState } from '@/store/selectors/categoriesSelectors'
import { setTitle, setContent, setCategoryId, clearPostForm } from '@/store/slices/postFormSlice'
import { createPostThunk } from '@/store/thunks/createPostThunk'
import { getPostsThunk } from '@/store/thunks/getPostsThunk'
import { getCategoriesThunk } from '@/store/thunks/getCategoriesThunk'
import type { AppDispatch } from '@/store'

export default function PostForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { data, loading, error } = useSelector(selectPostFormState)
  const { title, content, categoryId } = data
  const { data: categories } = useSelector(selectCategoriesState)

  useEffect(() => {
    dispatch(getCategoriesThunk())
  }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await dispatch(createPostThunk({ title, content, categoryId }))

    if (createPostThunk.fulfilled.match(result)) {
      dispatch(clearPostForm())
      dispatch(getPostsThunk())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg">
      <h3 className="text-lg font-semibold text-gray-800">Create a Post</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        placeholder="Post title"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
      />

      <textarea
        value={content}
        onChange={(e) => dispatch(setContent(e.target.value))}
        placeholder="Post content"
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none"
      />

      <select
        value={categoryId}
        onChange={(e) => dispatch(setCategoryId(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none bg-white"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  )
}
