import { defineField, defineType } from 'sanity'
import { Superscript, Subscript } from 'lucide-react'
import { BlockContentIcon } from '@sanity/icons/BlockContent'

export const richTextBlock = defineType({
  name: 'richTextBlock',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The title of the rich text block',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
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
              { title: 'Superscript', value: 'sup', icon: Superscript },
              { title: 'Subscript', value: 'sub', icon: Subscript },
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      return {
        title: `${title} - ${content.map((block: any) => block.children[0].text).join(' ')}`,
        subtitle: 'Rich Text Block',
      }
    },
  },
})
