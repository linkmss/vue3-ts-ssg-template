import type { MutateFunction } from '@tanstack/vue-query'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import type { AuthModalPayload } from '@/modules/auth'
import { sendSignIn, sendSignUp } from '@/modules/auth/auth.service'
import type { ServiceResponse } from '@/api/api.types'
import type { AuthDtoRequest, AuthDtoResponse } from '@/modules/auth/auth.dto'
import { mutateUser } from '@/modules/user'
import { setToken } from '@/modules/auth/auth.helpers'

interface UseAuthMutation {
  mutateAsync: MutateFunction<ServiceResponse<AuthDtoResponse>, Error, AuthDtoRequest, unknown>
  isError: Ref<boolean>
  isPending: Ref<boolean>
  data: Ref<ServiceResponse<AuthDtoResponse> | undefined>
}

interface UseAuthMutationArgs {
  type: Ref<AuthModalPayload['type']>
}

export function useAuthMutation({ type }: UseAuthMutationArgs): UseAuthMutation {
  const queryClient = useQueryClient()

  const { mutateAsync, isError, isPending, data } = useMutation({
    mutationFn: type.value === 'signIn' ? sendSignIn : sendSignUp,
    onSuccess(data) {
      setToken('some token')
      mutateUser({
        queryClient,
        updater: () => data.response.user,
      })
    },
  })

  return {
    mutateAsync,
    isError,
    isPending,
    data,
  }
}
