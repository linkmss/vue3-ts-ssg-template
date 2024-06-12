import { VueQueryPlugin } from '@tanstack/vue-query'
import type { Installable } from '@/types'

export const install: Installable = ({ app }) => {
  app.use(VueQueryPlugin)
}
