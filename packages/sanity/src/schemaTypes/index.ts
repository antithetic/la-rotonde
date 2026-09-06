import { documentSchemaTypes } from './documents'
import { objectSchemaTypes } from './objects'
import { singletonSchemaTypes } from './singletons'

export const schemaTypes = [
  ...documentSchemaTypes,
  ...objectSchemaTypes,
  ...singletonSchemaTypes,
]
