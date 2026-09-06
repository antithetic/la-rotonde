import { defineField, defineType } from 'sanity'
import { FileX, FileIcon } from 'lucide-react'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
      hidden: ({ document }) => !document?.title,
    }),

    // Page Content
    // TODO: Update to Page Builder
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'archived',
      title: 'Archived',
      type: 'boolean',
      description: (
        <>
          Remove this page from the public website.
          <br />
          Handy for page versions.
        </>
      ),
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      archived: 'archived',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `/${selection.slug?.current || 'no-slug'}`,
        media: selection.archived ? FileX : FileIcon,
      }
    },
  },
})
