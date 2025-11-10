'use client'

import { useSelector } from 'react-redux'
import { selectUserState } from '@/store/selectors/userSelectors'
import UserGreeting from '@/components/mainPage/UserArea/UserGreeting/UserGreeting'
import PostForm from '@/components/mainPage/UserArea/PostForm/PostForm'
import PostList from '@/components/mainPage/UserArea/PostList/PostList'

export default function UserArea() {
  const { data: { user } } = useSelector(selectUserState)

  if (!user) {
    return null
  }

  return (
    <div className="w-full flex flex-col items-center gap-6 px-6">
      <UserGreeting username={user.username} />
      <PostForm />
      <PostList />
    </div>
  )
}
