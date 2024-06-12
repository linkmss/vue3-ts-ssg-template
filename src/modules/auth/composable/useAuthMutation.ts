import type { MutateFunction } from '@tanstack/vue-query'
import { useMutation } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import type { AuthModalPayload } from '@/modules/auth'
import { sendSignIn, sendSignUp } from '@/modules/auth/auth.service'
import type { ServiceResponse } from '@/api/api.types'
import type { AuthDtoRequest, AuthDtoResponse } from '@/modules/auth/auth.dto'

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
  const { mutateAsync, isError, isPending, data } = useMutation({
    mutationFn: type.value === 'signIn' ? sendSignIn : sendSignUp,
    /**
     * onSettled or onSuccess
     * 1, Check for errors
     * 2. Mutate user query with user data
     * 3.
     */
  })

  return {
    mutateAsync,
    isError,
    isPending,
    data,
  }
}
