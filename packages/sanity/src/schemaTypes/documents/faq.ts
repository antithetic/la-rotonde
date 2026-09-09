import { defineField, defineType } from 'sanity'
import { CircleQuestionMark } from 'lucide-react'
import { IncomingRefIndicator } from '../components/IncomingReferenceDocumentLevel'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  description:
    'A frequently asked question. Keep the answer concise and easy to understand.',
  type: 'document',
  icon: CircleQuestionMark,
  components: {
    input: IncomingRefIndicator,
  },

  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question visitors are likely to ask.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'array',
      description: 'Keep the answer concise and easy to understand.',
      of: [
        {
          type: 'block',

          styles: [
            {
              title: 'Normal',
              value: 'normal',
            },
          ],

          lists: [
            {
              title: 'Bullet',
              value: 'bullet',
            },
            {
              title: 'Numbered',
              value: 'number',
            },
          ],

          marks: {
            decorators: [
              {
                title: 'Bold',
                value: 'strong',
              },
              {
                title: 'Italic',
                value: 'em',
              },
              {
                title: 'Underline',
                value: 'underline',
              },
              {
                title: 'Strikethrough',
                value: 'strike-through',
              },
            ],

            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                  }),
                ],
              },
            ],
          },
        },
      ],

      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'question',
      answer: 'answer',
    },

    prepare({ title, answer }) {
      const plainText = answer
        ?.filter((block: any) => block._type === 'block')
        .map((block: any) =>
          block.children
            ?.map((child: { text?: string }) => child.text)
            .join(''),
        )
        .join(' ')

      return {
        title: title || 'Untitled FAQ',
        subtitle: plainText
          ? plainText.length > 120
            ? `${plainText.slice(0, 120)}…`
            : plainText
          : 'No answer',
      }
    },
  },
})
