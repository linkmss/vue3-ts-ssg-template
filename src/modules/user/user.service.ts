import type { ServiceResponse } from '@/api/api.types'
import { promisifyResponse } from '@/api/api.mock'
import { userMock } from '@/modules/user/user.mock'
import type { User } from '@/modules/user/user.types'

export function getUser(): Promise<ServiceResponse<User>> {
  return promisifyResponse(userMock)
}
