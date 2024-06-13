import { VueQueryPlugin } from '@tanstack/vue-query'
import type { Installable } from '@/types'

export const install: Installable = ({ app }) => {
  app.use(VueQueryPlugin)
}

export interface MutateDataFunction<T> {
  queryClient: any
  updater: (data: T | undefined) => T | undefined
}

export interface InvalidateFunction {
  queryClient: any
}
