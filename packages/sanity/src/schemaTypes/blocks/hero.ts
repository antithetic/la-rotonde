import { defineField, defineType } from 'sanity'
import { BlockElementIcon } from '@sanity/icons/BlockElement'

export const heroBlock = defineType({
  name: 'heroBlock',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: 'Hero Section',
        media,
      }
    },
  },
})
