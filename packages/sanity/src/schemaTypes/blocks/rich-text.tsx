import {defineField, defineType} from 'sanity'

import {Superscript, Subscript} from 'lucide-react'

import {BlockContentIcon} from '@sanity/icons/BlockContent'

import {PageBuilderBlockPreview} from '../components/blockPreview'
import {getBlockExcerpt} from '../components/lib/getBlockExcerpt'

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
      name: 'showTitle',
      title: 'Show Title',
      description: 'Display the title on the page',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => !parent?.title,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strikethrough', value: 'strike-through'},
              {title: 'Superscript', value: 'sup', icon: Superscript},
              {title: 'Subscript', value: 'sub', icon: Subscript},
              {title: 'Code', value: 'code'},
            ],
          },
        },

        {
          type: 'image',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'alt', title: 'Alt', type: 'string'},
            {name: 'caption', title: 'Caption', type: 'string'},
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      content: 'content',
      showTitle: 'showTitle',
    },

    prepare({title, content = [], showTitle}) {
      const excerpt = content
        .flatMap(
          (block: {children?: {text?: string}[]}) =>
            block.children
              ?.map((child) => child.text)
              .filter(Boolean) ?? [],
        )
        .join(' ')

      return {
        title,
        excerpt: getBlockExcerpt(excerpt),
        details: [
          showTitle ? 'With Title' : 'Title hidden',
          `${content.length} ${content.length === 1 ? 'block' : 'blocks'}`,
        ],
      }
    },
  },

  components: {
    preview: (props) => {
      const preview = props as typeof props & {
        excerpt?: string
        details?: string[]
      }

      return (
        <PageBuilderBlockPreview
          type="Rich Text Block"
          icon={BlockContentIcon}
          title={typeof preview.title === 'string' ? preview.title : undefined}
          excerpt={preview.excerpt}
          details={preview.details}
        />
      )
    },
  },
})
