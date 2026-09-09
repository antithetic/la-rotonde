import {
  createImageUrlBuilder,
  type SanityImageSource,
} from '@sanity/image-url'

const builder = createImageUrlBuilder({
  projectId: 'kzqf9i5y',
  dataset: 'development',
})

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}
