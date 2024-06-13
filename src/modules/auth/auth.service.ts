import type { AuthDtoRequest, AuthDtoResponse, LogoutDtoResponse } from '@/modules/auth/auth.dto'
import type { ServiceResponse } from '@/api/api.types'
import { promisifyResponse } from '@/api/api.mock'
import { userMock } from '@/modules/user/user.mock'

/**
 * Here must be fetch functions
 */
export async function sendSignIn(data: AuthDtoRequest): Promise<ServiceResponse<AuthDtoResponse>> {
  console.debug(`Sending sign in request`, { data })

  return promisifyResponse({ user: userMock })
}
export async function sendSignUp(data: AuthDtoRequest): Promise<ServiceResponse<AuthDtoResponse>> {
  console.debug(`Sending sign up request`, { data })

  return promisifyResponse({ user: userMock })
}

export async function sendLogout(): Promise<ServiceResponse<LogoutDtoResponse>> {
  console.debug(`Sending logout request`)

  return promisifyResponse({ user: null })
}
