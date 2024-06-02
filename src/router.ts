import type { RouteRecordRaw } from 'vue-router'

import { routes as AutoRoutes } from 'vue-router/auto/routes'
import type { RouterOptions } from 'vite-ssg'

export function removeStartSlashForRoute(route: RouteRecordRaw) {
  return {
    ...route,
    path: route.path.startsWith('/') ? route.path.slice(1) : route.path,
  }
}

export const routes = [
  {
    path: '',
    name: 'root',
    props: true,
    children: AutoRoutes.map(removeStartSlashForRoute),
  },
]

export const routerOptions: RouterOptions = {
  routes,
  base: import.meta.env.BASE_URL,

}
