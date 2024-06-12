import type { ServiceResponse } from '@/api/api.types'

export function mockResponse<R>(response: R): ServiceResponse<R> {
  return {
    status: true,
    response,
  }
}

export function promisifyResponse<R>(data: R): Promise<ServiceResponse<R>> {
  return new Promise(resolve => setTimeout(() => resolve(mockResponse(data)), 500))
}
