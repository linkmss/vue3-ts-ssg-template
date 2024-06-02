import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import generateSitemap from 'vite-ssg-sitemap'
import VueRouter from 'unplugin-vue-router/vite'
import SvgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    Vue({
      include: [/\.vue$/],
    }),

    SvgLoader({
      svgo: false,
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue'],
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },

  // https://github.com/antfu/vite-ssg
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false,
    },
    onFinished() {
      generateSitemap()
    },

    includedRoutes() {
      return ['/']
    },
  },

  ssr: {
    // TODO: workaround until they support native ESM
    noExternal: ['workbox-window'],
  },

})
