import { documentSchemaTypes } from './documents'
import { objectSchemaTypes } from './objects'
import { blockSchemaTypes } from './blocks'

export const schemaTypes = [
  ...documentSchemaTypes,
  ...objectSchemaTypes,
  ...blockSchemaTypes,
]
