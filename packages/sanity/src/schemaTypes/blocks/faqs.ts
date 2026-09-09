import { defineField, defineType } from 'sanity'
import { CircleQuestionMark } from 'lucide-react'

export const faqsType = defineType({
  name: 'faqs',
  title: 'FAQs',
  type: 'object',
  icon: CircleQuestionMark,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
    }),
  ],
})
