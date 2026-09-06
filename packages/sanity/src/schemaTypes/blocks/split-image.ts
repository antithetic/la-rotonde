import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

export const imageBlock = defineType({
  name: 'imageBlock',
  type: 'object',
  icon: ImageIcon,
  title: 'Image Block',
  description: 'A block that displays an image with a caption',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'imageSplit',
      title: 'Image Split',
      description: 'Whether to split the image into two columns',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          { value: 'imageLeft', title: 'Image Left' },
          { value: 'imageRight', title: 'Image Right' },
        ],
      },
      hidden: ({ parent }) => !parent?.imageSplit,
    }),

    defineField({
      name: 'caption',
      title: 'Image Caption',
      description: 'The text to display alongsidethe image',
      type: 'blockContent',
    }),
    defineField({
      name: 'captionAlignment',
      title: 'Caption Alignment',
      description: 'Horizontal alignment of the caption',
      type: 'string',
      options: {
        list: [
          { value: 'left', title: 'Left' },
          { value: 'right', title: 'Right' },
          { value: 'center', title: 'Center' },
        ],
      },
      initialValue: 'center',
    }),
    defineField({
      name: 'captionPosition',
      title: 'Caption Position',
      description: 'Vertical position of the caption',
      type: 'string',
      options: {
        list: [
          { value: 'top', title: 'Top' },
          { value: 'middle', title: 'Middle' },
          { value: 'bottom', title: 'Bottom' },
        ],
      },
      initialValue: 'bottom',
      hidden: ({ parent }) => !parent?.imageSplit,
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
      split: 'imageSplit',
      orientation: 'orientation',
    },
    prepare({ title, media, split, orientation }) {
      return {
        title,
        subtitle: split
          ? `Split Image and Text - ${orientation === 'imageLeft' ? 'Left' : 'Right'}`
          : 'Image and Text',
        media,
      }
    },
  },
})
