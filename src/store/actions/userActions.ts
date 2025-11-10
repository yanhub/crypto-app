import { createAction } from '@reduxjs/toolkit'
import { Users } from '@/types/users'

export const setUser = createAction<Users>('user/setUser')
export const setToken = createAction<string>('user/setToken')
export const logoutUser = createAction('user/logout')
