import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { SITE } from '@repo/constants'
import { SANITY } from '@repo/constants'

export default defineConfig({
  name: 'la-rotonde',
  title: SITE.name,

  projectId: SANITY.projectId,
  dataset: SANITY.dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
