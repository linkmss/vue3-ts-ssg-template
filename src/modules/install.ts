import type { ViteSSGContext } from 'vite-ssg'
import type { Installable } from '@/types'

// Helpers
function installRoutesLazy(ctx: ViteSSGContext) {
  Object.values(import.meta.glob('./*/*.routes.ts', { import: 'route', eager: true })).forEach((route) => {
    const result = Array.isArray(route) ? route : [route]

    result.forEach(child => ctx.router.addRoute('root', child))
  })
}
function installModules(ctx: ViteSSGContext) {
  const installFunctions: Installable[] = Object.values(import.meta.glob('./*/index.ts', { import: 'install', eager: true }))

  installFunctions.forEach(install => install(ctx))
}

/**
 * There are three types of modules
 * 1. Instant install - modules with vue router middlewares. Must be installed using default import ... from @modules/nameOfModule
 * 2. Install routes using lazy importing
 * 3. Install lazy and inject own modal
 */
export const install: Installable = (ctx) => {
  // Instant install modules with vue router middlewares

  // Install modules
  installModules(ctx)

  // Lazy importing routes
  installRoutesLazy(ctx)
}
