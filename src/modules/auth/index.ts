import { defineAsyncComponent } from 'vue'
import type { Installable } from '@/types'
import { injectModal } from '@/composables/useModal'

// components
export { default as AuthModal } from './modals/Auth.vue'

// types
export type { AuthModalPayload } from './auth.types'

export const install: Installable = ({ isClient }) => {
  if (!isClient)
    return

  injectModal('auth', defineAsyncComponent(() => import('@/modules/auth/modals/Auth.vue')))
}
