export interface AuthorizeUserInput {
  username: string
  password: string
}

export interface AuthorizeUserResponse {
  success: boolean
  message?: string
  token?: string
  user?: {
    id: string
    username: string
  }
}
