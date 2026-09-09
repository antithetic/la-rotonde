import { defineArrayMember, defineField, defineType } from 'sanity'
import type { Path } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'

import { PageBuilderBlockPreview } from '../components/blockPreview'
import {
  FaqBlockPathProvider,
  FaqPreviewList,
  useFaqBlockPath,
} from '../components/faqPreviewList'
import { getBlockExcerpt } from '../components/lib/getBlockExcerpt'

type FaqReference = {
  _key?: string
  _ref?: string
  parentRefPath?: Path
}

export const faqsBlock = defineType({
  name: 'faqsBlock',
  title: 'FAQs',
  description:
    'Display a curated collection of frequently asked questions on the page.',
  type: 'object',
  icon: HelpCircleIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description:
        'An internal title used to identify the purpose of this FAQ collection.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heading',
      title: 'Heading',
      description: 'Heading displayed above the FAQs on the page.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'faqs',
      title: 'FAQs',
      description: 'Select the FAQs you want to display in this block.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'faq' }],
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).unique().error('FAQ references must be unique.'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      heading: 'heading',
      faqs: 'faqs',
    },

    prepare({
      title,
      heading,
      faqs = [],
    }: {
      title?: string
      heading?: string
      faqs?: FaqReference[]
    }) {
      const count = faqs?.filter((faq) => faq._ref)?.length ?? 0

      return {
        title,
        excerpt: getBlockExcerpt(heading),
        faqRefsJson: JSON.stringify(
          faqs
            .filter((faq) => faq._ref)
            .map((faq) => ({ _key: faq._key, _ref: faq._ref })),
        ),
        details: [`${count} ${count === 1 ? 'question' : 'questions'}`],
      }
    },
  },

  components: {
    item: (props) => (
      <FaqBlockPathProvider path={props.path} onOpen={props.onOpen}>
        {props.renderDefault(props)}
      </FaqBlockPathProvider>
    ),
    preview: (props) => {
      const preview = props as typeof props & {
        excerpt?: string
        details?: string[]
        faqRefsJson?: string
      }
      const blockPath = useFaqBlockPath()
      const faqs: FaqReference[] = (() => {
        try {
          return preview.faqRefsJson
            ? (JSON.parse(preview.faqRefsJson) as FaqReference[])
            : []
        } catch {
          return []
        }
      })().map((faq) => ({
        ...faq,
        parentRefPath:
          blockPath && faq._key
            ? [...blockPath, 'faqs', { _key: faq._key }]
            : undefined,
      }))

      return (
        <PageBuilderBlockPreview
          type="FAQs Block"
          icon={HelpCircleIcon}
          title={typeof preview.title === 'string' ? preview.title : undefined}
          excerpt={preview.excerpt}
          details={preview.details}
          aside={faqs.length ? <FaqPreviewList faqs={faqs} /> : undefined}
        />
      )
    },
  },
})
