import type { MutateFunction } from '@tanstack/vue-query'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import { sendLogout } from '@/modules/auth/auth.service'
import type { ServiceResponse } from '@/api/api.types'
import type { LogoutDtoResponse } from '@/modules/auth/auth.dto'
import { mutateUser } from '@/modules/user'
import { deleteToken } from '@/modules/auth/auth.helpers'

interface UseLogoutMutation {
  mutateAsync: MutateFunction<ServiceResponse<LogoutDtoResponse>, Error, void, unknown>
  isPending: Ref<boolean>
  data: Ref<ServiceResponse<LogoutDtoResponse> | undefined>
}

export function useLogoutMutation(): UseLogoutMutation {
  const queryClient = useQueryClient()

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: sendLogout,
    onSuccess(dataLocal) {
      mutateUser({
        queryClient,
        updater: () => dataLocal?.response.user,
      })
      deleteToken()
    },
  })

  return {
    mutateAsync,
    data,
    isPending,
  }
}
