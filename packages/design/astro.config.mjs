// @ts-check
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import sharedConfig from '@repo/unocss'

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(sharedConfig)],
})
