import { defineField, defineType } from 'sanity'
import { FileIcon } from 'lucide-react'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    // Page Content
    // TODO: Update to Page Builder
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
    }),
  ],
})
