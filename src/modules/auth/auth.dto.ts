import type { User } from '@/modules/user/user.types'

export interface AuthDtoRequest {
  email: string
  password: string
}

export interface AuthDtoResponse {
  user: User
}

export interface LogoutDtoResponse {
  user: null
}
