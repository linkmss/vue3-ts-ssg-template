import type { ViteSSGContext } from 'vite-ssg'

export type Installable = (ctx: ViteSSGContext) => void

export interface InstallableModule {
  install: Installable
}
