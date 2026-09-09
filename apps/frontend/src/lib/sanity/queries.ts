import { defineQuery } from 'groq'

export const SITE_SETTINGS_QUERY = defineQuery(
  `*[_type == "siteSettings"][0]{ siteTitle, tagline, copyrightText }`,
)

export const HOME_PAGE_QUERY = defineQuery(`
  *[_id == "siteSettings"][0].homePage->{
    _id,
    _type,
    title,
    slug,
    seo,

    content[]{
      ...,

      _type == "heroBlock" => {
        _type,
        _key,
        title,
        image {
          ...,
          alt
        },
        content
      },

     _type == "imageBlock" => {
  _type,
  _key,
  title,
  imageSplit,
  orientation,
  image {
    ...,
    alt
  },
  caption,
  captionAlignment,
  captionPosition
},

      _type == "richTextBlock" => {
        _type,
        _key,
        title,
        content
      },

      _type == "faqs" => {
        _type,
        _key,
        faqs[]->{
          _id,
          _type,
          question,
          answer
        }
      }
    }
  }
`)
