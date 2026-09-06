import { defineType, defineArrayMember } from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  type: 'array',
  of: [
    defineArrayMember({ type: 'richTextBlock' }),
    defineArrayMember({ type: 'imageBlock' }),
    defineArrayMember({ type: 'heroBlock' }),
  ],
})
