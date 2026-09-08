import { imageBlock } from './split-image'
import { richTextBlock } from './rich-text'
import { heroBlock } from './hero'
import { pageBuilderType } from './page-builder'

export const blockSchemaTypes = [
  // Blocks
  imageBlock,
  richTextBlock,
  heroBlock,

  // Page Builder
  pageBuilderType,
]
