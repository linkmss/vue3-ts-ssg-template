import { install as InstallAuth } from './auth'
import type { Installable } from '@/types'

export const install: Installable = (ctx) => {
  // const installModule = (module: InstallableModule) => module.install(ctx)

  // install modules
  InstallAuth(ctx)
}
