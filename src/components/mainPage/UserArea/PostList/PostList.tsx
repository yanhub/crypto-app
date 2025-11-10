'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsThunk } from '@/store/thunks/getPostsThunk'
import { selectPostsState } from '@/store/selectors/postsSelectors'
import type { AppDispatch } from '@/store'

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: posts, loading, error } = useSelector(selectPostsState)

  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch])

  if (loading) {
    return <p className="text-gray-500">Loading posts...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  if (!posts?.length) {
    return <p className="text-gray-600">No posts yet.</p>
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      {posts.map((post) => {
        const date = post.createdAt
          ? new Date(post.createdAt).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })
          : null

        return (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{post.content}</p>
            </div>

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span>👤 {post.owner}</span>
              {date && <span>{date}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
