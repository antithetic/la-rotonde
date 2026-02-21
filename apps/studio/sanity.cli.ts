import {defineCliConfig} from 'sanity/cli'
import {SANITY} from '@repo/constants'

export default defineCliConfig({
  api: {
    projectId: SANITY.projectId,
    dataset: SANITY.dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
