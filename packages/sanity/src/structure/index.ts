import { StructureResolver } from 'sanity/structure'

import {
  FileX,
  FileCheck,
  FileText,
  FileIcon,
  CircleQuestionMark,
} from 'lucide-react'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      // Pages
      S.listItem()
        .icon(FileIcon)
        .title('Pages')
        .child(async () => {
          const client = context.getClient({ apiVersion: '2026-09-01' })
          const pages = await client.fetch(
            `*[_type == "page"] | order(_updatedAt desc){ _id }`,
          )

          const pageItems = pages.map((page: { _id: string }) =>
            S.documentListItem().id(page._id).schemaType('page'),
          )

          return S.list()
            .title('Pages')
            .items([
              S.listItem()
                .icon(FileCheck)
                .title('Live Pages')
                .child(
                  S.documentList()
                    .title('Live Pages')
                    .filter('_type == "page" && pageStatus == "public"')
                    .defaultOrdering([
                      { field: 'slug.current', direction: 'asc' },
                    ]),
                ),

              S.listItem()
                .icon(FileText)
                .title('Home Pages')
                .child(
                  S.documentList()
                    .title('Home Pages')
                    .filter('_type == "page" && pageStatus == "home"')
                    .defaultOrdering([
                      { field: 'slug.current', direction: 'asc' },
                    ]),
                ),

              S.listItem()
                .icon(FileX)
                .title('Archived Pages')
                .child(
                  S.documentList()
                    .title('Archived Pages')
                    .filter('_type == "page" && pageStatus == "archived"')
                    .defaultOrdering([
                      { field: 'slug.current', direction: 'asc' },
                    ]),
                ),

              S.divider(),

              ...pageItems,
            ])
        }),
      S.divider(),

      // FAQs
      S.documentTypeListItem('faq').title('FAQs').icon(CircleQuestionMark),

      // Site Settings
      S.listItem()
        .id('siteSettings')
        .schemaType('siteSettings')
        .title('Site Settings')
        .child(
          S.editor()
            .id('siteSettings')
            .schemaType('siteSettings')
            .documentId('siteSettings'),
        ),
    ])
