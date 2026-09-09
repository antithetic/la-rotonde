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
      description:(
        <>
          Select the page to be displayed on the homepage.
          <br />
          <strong>Note:</strong> The page must be published and have a valid slug.
          <br />
          This will be the landing page for the website.
        </>
      ),
      to: [{ type: 'page' }],
      validation: (Rule) => Rule.required(),
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
