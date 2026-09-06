import { defineField } from 'sanity'

export const blockContent = defineField({
  name: 'blockContent',
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
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'alt', title: 'Alt', type: 'string' },
        { name: 'caption', title: 'Caption', type: 'string' },
      ],
    },
  ],
})
