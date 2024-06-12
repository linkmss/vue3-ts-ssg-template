import { defineAsyncComponent } from 'vue'
import type { Installable } from '@/types'
import { injectModal } from '@/composables/useModal'

// components
export { default as AuthModal } from './modals/Auth.vue'

// NOTE - u can pick specific types for export like components
export * from './auth.types'

export const install: Installable = ({ isClient }) => {
  if (!isClient)
    return

  injectModal('auth', defineAsyncComponent(() => import('@/modules/auth/modals/Auth.vue')))
}
