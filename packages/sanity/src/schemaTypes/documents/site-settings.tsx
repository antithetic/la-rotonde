import { Cog } from 'lucide-react'
import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Cog,
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      description: 'The title of the website.',
      initialValue: 'La Rotonde',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      description: 'The tagline to display on the homepage.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homePage',
      type: 'reference',
      options: {
    filter: 'pageStatus == $pageStatus',
    filterParams: {
      pageStatus: 'home',
    },
  },
      description: (
        <>
          Select the page to be displayed on the website landing page.
          <br />
          <strong>Note:</strong> The selected page must be published and have a valid
          slug and be designated as a home page.
        </>
      ),
      to: [{ type: 'page' }],
       validation: (Rule) =>
    Rule.required().custom(async (value, context) => {
      if (!value?._ref) return true

      const page = await context
        .getClient({ apiVersion: '2025-01-01' })
        .fetch(`*[_id == $id][0]{ pageStatus }`, {
          id: value._ref,
        })

      if (page?.pageStatus !== 'home') {
        return 'The selected page must have a Page Status of Home Page.'
      }

      return true
    }),

    }),
    defineField({
      name: 'copyrightText',
      type: 'string',
      description: (
        <>
          The text to display in the footer copyright section.
          <br />
          <strong>Note:</strong> The year will be automatically inserted.
          <br />
          e.g La Rotonde. All rights reserved.
        </>
      ),

      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
