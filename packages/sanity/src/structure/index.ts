import { StructureResolver } from 'sanity/structure'
import {
  FileX,
  FileCheck,
  FileText,
  FileIcon,
  CircleQuestionMark,
} from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Pages
      S.listItem()
        .icon(FileIcon)
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .icon(FileCheck)
                .title('Live Pages')
                .child(
                  S.documentList()
                    .title('Live Pages')
                    .filter('_type == "page" && pageStatus == "public"'),
                ),

              S.listItem()
                .icon(FileText)
                .title('Home Pages')
                .child(
                  S.documentList()
                    .title('Home Pages')
                    .filter('_type == "page" && pageStatus == "home"'),
                ),

              S.listItem()
                .icon(FileX)
                .title('Archived Pages')
                .child(
                  S.documentList()
                    .title('Archived Pages')
                    .filter('_type == "page" && pageStatus == "archived"'),
                ),
            ]),
        ),

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
