import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

import { media } from 'sanity-plugin-media'

const title = process.env.SANITY_STUDIO_TITLE ?? 'La Rotonde'
const projectId = 'kzqf9i5y'
const dataset = 'production'

const sharedPlugins = [structureTool(), media(), visionTool()]

export const sanityConfig = defineConfig({
  // The name of the studio,
  // this is used to identify the studio in the Sanity dashboard.
  name: 'default',
  // The title of the studio,
  // this is used to display the title of the studio in the Sanity dashboard.
  title,

  // The project ID of the studio,
  // this is used to identify the project in the Sanity dashboard.
  projectId,

  // The dataset of the studio,
  // this is used to identify the dataset in the Sanity dashboard.
  dataset,

  // The API version of the studio,
  // this is used to identify the API version in the Sanity dashboard.
  apiVersion: '2026-09-01',

  // The plugins to use in the studio.
  plugins: sharedPlugins,

  // The schema to use in the studio.
  schema: {
    types: schemaTypes,
  },
})
