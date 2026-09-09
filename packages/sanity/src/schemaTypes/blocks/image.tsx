import { defineField, defineType } from 'sanity'

import { ImageIcon } from '@sanity/icons/Image'

import { PageBuilderBlockPreview } from '../components/blockPreview'
import { getBlockExcerpt } from '../components/lib/getBlockExcerpt'
import { urlForImage } from '../components/lib/imageURL'

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
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const imageSplit = (context?.parent as { imageSplit?: boolean })
            ?.imageSplit

          if (imageSplit && !value) {
            return 'Orientation is required when Image Split is enabled'
          }

          return true
        }),
    }),

    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),

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
      name: 'caption',
      title: 'Image Caption',
      description: 'The text to display alongside the image',
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
  ],

  preview: {
    select: {
      title: 'title',
      image: 'image',
      caption: 'caption',
      imageSplit: 'imageSplit',
      orientation: 'orientation',
    },

    prepare({ title, image, caption = [], imageSplit, orientation }) {
      const excerpt = caption
        .flatMap(
          (block: { children?: { text?: string }[] }) =>
            block.children?.map((child) => child.text).filter(Boolean) ?? [],
        )
        .join(' ')

      const layoutLabel = imageSplit
        ? orientation === 'imageLeft'
          ? 'Split Left'
          : 'Split Right'
        : 'Full Width'

      const hasImage = Boolean(image?.asset)

      return {
        title,
        image: hasImage
          ? urlForImage(image).width(1200).height(200).fit('crop').url()
          : undefined,
        excerpt: getBlockExcerpt(excerpt),
        layoutLabel,
      }
    },
  },

  components: {
    preview: (props) => {
      const preview = props as typeof props & {
        excerpt?: string
        details?: string[]
        image?: string
        layoutLabel?: string
      }

      return (
        <PageBuilderBlockPreview
          type={`Image Block${preview.layoutLabel ? ` - ${preview.layoutLabel}` : ''}`}
          icon={ImageIcon}
          title={typeof preview.title === 'string' ? preview.title : undefined}
          excerpt={preview.excerpt}
          details={preview.details}
          image={preview.image}
          imageLayout="thumbnail"
        />
      )
    },
  },
})
