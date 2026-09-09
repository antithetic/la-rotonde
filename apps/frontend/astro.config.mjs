// @ts-check
import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel'
import UnoCSS from 'unocss/astro'

import react from '@astrojs/react'
import sanity from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://larotonde.cafe',
  output: 'server',
  adapter: vercel(),

  integrations: [
    UnoCSS(),
    react(),
    sanity({
      projectId: 'kzqf9i5y',
      dataset: 'development',
      useCdn: false,
      apiVersion: '2026-09-01',
    }),
  ],
})
