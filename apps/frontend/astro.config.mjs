// @ts-check
import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'
import UnoCSS from 'unocss/astro'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  site: 'https://larotonde.cafe',
  output: 'server',
  adapter: vercel(),

  integrations: [UnoCSS(), react()],
})
