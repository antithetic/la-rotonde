import { documentSchemaTypes } from './documents'
import { objectSchemaTypes } from './objects'
import { singletonSchemaTypes } from './singletons'
import { blockSchemaTypes } from './blocks'

export const schemaTypes = [
  ...documentSchemaTypes,
  ...objectSchemaTypes,
  ...singletonSchemaTypes,
  ...blockSchemaTypes,
]
