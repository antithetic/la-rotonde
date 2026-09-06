import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const splitImageBlock = defineType({
  name: 'splitImageBlock',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          { value: 'imageLeft', title: 'Image Left' },
          { value: 'imageRight', title: 'Image Right' },
        ],
      },
    }),
    defineField({
      name: 'title',
      type: 'string',
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
        subtitle: 'Text and Image',
        media,
      }
    },
  },
})
