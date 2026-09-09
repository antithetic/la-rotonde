import { defineField, defineType } from 'sanity'
import { FileX, FileIcon, FileText } from 'lucide-react'
import { SlugPreviewInput } from '../components/SlugPreviewInput'

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
      validation: (Rule) => Rule.required(),
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
      components: {
        input: SlugPreviewInput,
      },
    }),
    defineField({
      name: 'parent',
      title: 'Parent Page',
      type: 'reference',
      description: (
        <>
          Choose another page to place this page underneath it in the website
          structure.
          <br />
          <br />
          <strong>For example,</strong> if you choose “About,” this page will be
          part of the About section and its address will be{' '}
          <code>/about/this-page</code>.
          <br />
          <br />
          Leave empty if this page does not belong under another page. It will
          then be a top-level page
          <br />
          <br />
          <strong>Note:</strong> Once a page is archived, it cannot be nested
          under other pages.
        </>
      ),
      to: [{ type: 'page' }],
      options: {
        filter: ({ document }) => {
          const id = document?._id?.replace(/^drafts\./, '')
          return {
            filter:
              '!defined(parent) && !(pageStatus in ["home", "archived"]) && !(_id in [$id, $draftId])',
            params: { id, draftId: id ? `drafts.${id}` : '' },
          }
        },
        disableNew: true,
      },
      hidden: ({ document }) => document?.pageStatus === 'archived',
    }),

    // Page Content
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'pageBuilder',
      description: (
        <>
          Build your page by adding and arranging content blocks.
          <br />
          <br />
          Use the available blocks to create the structure, hierarchy, and
          content needed to communicate the page clearly and intentionally.
        </>
      ),
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (value === 'home') return true

          const pageId = context.document?._id?.replace(/^drafts\./, '')
          if (!pageId) return true

          let isSelectedHomePage = false
          try {
            isSelectedHomePage = await context
              .getClient({ apiVersion: '2026-09-01' })
              .withConfig({ perspective: 'raw', useCdn: false })
              .fetch(
                `count(*[_id in ["siteSettings", "drafts.siteSettings"] && homePage._ref in [$pageId, $draftPageId]]) > 0`,
                { pageId, draftPageId: `drafts.${pageId}` },
              )
          } catch {
            return 'Could not verify whether this page is the site home page. Check your connection and try again.'
          }

          if (isSelectedHomePage) {
            return 'This page is selected as the site home page in Site Settings. Choose a different home page there before setting this page to Public or Archived.'
          }

          return true
        }),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      parentSlug: 'parent.slug.current',
      pageStatus: 'pageStatus',
    },

    prepare(selection) {
      const { title, slug, parentSlug, pageStatus } = selection

      const status =
        pageStatusConfig[pageStatus as keyof typeof pageStatusConfig] ??
        pageStatusConfig.public

      const pagePath = slug?.current || 'no-slug'
      const parentPath = parentSlug // already just the string, or undefined

      const path = parentPath ? `/${parentPath}/${pagePath}` : `/${pagePath}`

      return {
        title: title || 'Untitled',
        subtitle: `${status.label} · ${path}`,
        media: status.icon,
      }
    },
  },
})
