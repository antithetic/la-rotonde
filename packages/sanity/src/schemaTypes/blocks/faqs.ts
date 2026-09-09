import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'

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
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
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

    prepare({ title, heading, faqs }) {
      const count = faqs?.length ?? 0

      return {
        title: title || 'FAQs',
        subtitle: heading
          ? `${heading} · ${count} ${count === 1 ? 'question' : 'questions'}`
          : `${count} ${count === 1 ? 'question' : 'questions'}`,
      }
    },
  },
})
