import { StructureResolver } from 'sanity/structure'
import { FileX, FileCheck, FileIcon } from 'lucide-react'

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
                    .filter('_type == "page" && archived != true'),
                ),

              S.listItem()
                .icon(FileX)
                .title('Archived Pages')
                .child(
                  S.documentList()
                    .title('Archived Pages')
                    .filter('_type == "page" && archived == true'),
                ),
            ]),
        ),

      S.divider(),

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
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !['page', 'siteSettings', 'media.folder', 'media.tag'].includes(
            item.getId()!,
          ),
      ),
    ])
