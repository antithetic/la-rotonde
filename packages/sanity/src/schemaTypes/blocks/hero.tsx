import { defineField, defineType } from 'sanity'

import { BlockElementIcon } from '@sanity/icons/BlockElement'

import { PageBuilderBlockPreview } from '../components/blockPreview'
import { getBlockExcerpt } from '../components/lib/getBlockExcerpt'
import { urlForImage } from '../components/lib/imageURL'

export const heroBlock = defineType({
  name: 'heroBlock',
  type: 'object',
  icon: BlockElementIcon,

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required().error('Image is required'),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          description: 'Description of the image for accessibility',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      image: 'image',
      content: 'content',
    },

    prepare({ title, image, content = [] }) {
      const excerpt = content
        .flatMap(
          (block: { children?: { text?: string }[] }) =>
            block.children?.map((child) => child.text).filter(Boolean) ?? [],
        )
        .join(' ')

      const hasImage = Boolean(image?.asset)

      return {
        title,
        image: hasImage
          ? urlForImage(image).width(1200).height(200).fit('crop').url()
          : undefined,
        excerpt: getBlockExcerpt(excerpt),
        details: [hasImage ? '' : 'No Image Added'],
      }
    },
  },

  components: {
    preview: (props) => {
      const preview = props as typeof props & {
        excerpt?: string
        details?: string[]
        image?: string
      }

      return (
        <PageBuilderBlockPreview
          type="Hero Block"
          icon={BlockElementIcon}
          title={typeof preview.title === 'string' ? preview.title : undefined}
          excerpt={preview.excerpt}
          details={preview.details}
          image={preview.image}
          imageLayout="banner"
        />
      )
    },
  },
})
