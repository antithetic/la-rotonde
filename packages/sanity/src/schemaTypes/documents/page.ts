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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
        {
          type: 'image',
          fields: [
            { name: 'alt', title: 'Alt', type: 'string' },
            { name: 'caption', title: 'Caption', type: 'string' },
          ],
        },
      ],
    }),
  ],
})
