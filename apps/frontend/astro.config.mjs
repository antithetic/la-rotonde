// @ts-check
import {defineConfig} from 'astro/config'
import {unoConfig} from '@repo/unocss'

import vercel from '@astrojs/vercel'
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://larotonde.cafe',
  output: 'server',
  adapter: vercel(),

  integrations: [UnoCSS(unoConfig)],
})
