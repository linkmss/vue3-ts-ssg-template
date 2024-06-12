import type { AuthDtoRequest, AuthDtoResponse } from '@/modules/auth/auth.dto'
import type { ServiceResponse } from '@/api/api.types'
import { promisifyResponse } from '@/api/api.mock'

/**
 * Here must be fetch functions
 */
export async function sendSignIn(data: AuthDtoRequest): Promise<ServiceResponse<AuthDtoResponse>> {
  // @eslint-ignore
  console.debug(`Sending sign in request`, { data })

  return promisifyResponse('wowowo')
}
export async function sendSignUp(data: AuthDtoRequest): Promise<ServiceResponse<AuthDtoResponse>> {
  // @eslint-ignore
  console.debug(`Sending sign up request`, { data })

  return promisifyResponse('wowowow')
}
