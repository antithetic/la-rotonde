const pageStatusConfig = {
  public: {
    label: 'Public',
    icon: FileIcon,
  },
  home: {
    label: 'Home Page',
    icon: FileText,
  },
  archived: {
    label: 'Archived',
    icon: FileX,
  },
} as const

import { defineField, defineType } from 'sanity'
import { FileX, FileIcon, FileText } from 'lucide-react'

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
      type: 'pageBuilder',
      description: (
        <>
          Build your page by adding and arranging content blocks.
          <br />
          Use the available blocks to create the structure, hierarchy, and
          content of the page.
          <br />
          <br />
          Add only the blocks needed to communicate the page clearly and
          intentionally.
        </>
      ),
    }),

    defineField({
      name: 'pageStatus',
      title: 'Page Status',
      type: 'string',
      description: (
        <>
          Controls how this page is treated and displayed across the website.
          <br />
          <br />
          <strong>Public:</strong> Makes the page available as a normal public
          page on the website. Public pages can be linked to and discovered
          through the site's navigation or other content.
          <br />
          <br />
          <strong>Home Page:</strong> Designates this document as a homepage.
          Home pages are managed separately through Site Settings and are
          filtered out of the normal public page listings. Multiple pages can be
          designated as Home Pages.
          <br />
          <br />
          <strong>Archived:</strong> Removes the page from the public website
          while keeping the document in Sanity for reference, previous versions,
          or future use.
        </>
      ),
      options: {
        list: [
          { title: 'Public', value: 'public' },
          { title: 'Home Page', value: 'home' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'public',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      pageStatus: 'pageStatus',
    },

    prepare(selection) {
      const { title, slug, pageStatus } = selection

      const status =
        pageStatusConfig[pageStatus as keyof typeof pageStatusConfig] ??
        pageStatusConfig.public

      return {
        title,
        subtitle: `${status.label} · /${slug?.current || 'no-slug'}`,
        media: status.icon,
      }
    },
  },
})
