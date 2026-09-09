import { faqsBlock } from './faqs'
import { heroBlock } from './hero'
import { imageBlock } from './split-image'

import { richTextBlock } from './rich-text'

import { pageBuilderType } from './page-builder'

export const blockSchemaTypes = [
  // Blocks
  faqsBlock,
  imageBlock,
  heroBlock,
  richTextBlock,

  // Page Builder
  pageBuilderType,
]
