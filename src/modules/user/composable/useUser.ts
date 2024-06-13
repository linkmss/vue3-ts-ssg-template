import type { Ref } from 'vue'
import { computed } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { getUser } from '@/modules/user/user.service'
import type { InvalidateFunction, MutateDataFunction } from '@/plugins/vueQuery'
import { getTokenExist } from '@/modules/auth/auth.helpers'
import type { User } from '@/modules/user/user.types'

interface UseUser {
  data: Ref<User | undefined | null>
  isFetching: Ref<boolean>
  isLogged: Ref<boolean>
  isIdentificationEnd: Ref<boolean>
}

const queryKey = ['user-query-key']

export function useUser(): UseUser {
  const { data, isFetching, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      if (getTokenExist()) {
        const serviceResponse = await getUser()

        return serviceResponse.response
      }
      else {
        return null
      }
    },
  })

  const isIdentificationEnd = computed<boolean>(() => !isLoading.value)
  const isLogged = computed<boolean>(() => !!data.value)

  return {
    data,
    isFetching,
    isIdentificationEnd,
    isLogged,
  }
}

export function useInvalidateUser() {
  const queryClient = useQueryClient()

  return invalidateUser.bind({ queryClient })
}

export function invalidateUser({ queryClient }: InvalidateFunction) {
  return queryClient.invalidateQueries({
    queryKey,
    exact: false,
  })
}

// If we need use it inside setup function
export function useMutateUser({ updater }: Omit<MutateDataFunction<User | null>, 'queryClient'>) {
  const queryClient = useQueryClient()

  return mutateUser.bind(null, {
    queryClient,
    updater,
  })
}

// If we need use it outside setup function
export function mutateUser({ queryClient, updater }: MutateDataFunction<User | null>) {
  return queryClient.setQueriesData({
    queryKey,
    exact: false,
  }, updater)
}
