import type { ComponentType, ReactNode, SVGProps } from 'react'

import { Card, Flex, Stack, Text } from '@sanity/ui'

interface PageBuilderBlockPreviewProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  type: string
  title?: ReactNode
  excerpt?: string
  details?: string[]
  image?: string
  imageLayout?: 'banner' | 'thumbnail'
}

export function PageBuilderBlockPreview({
  icon: Icon,
  type,
  title,
  excerpt,
  details = [],
  image,
  imageLayout = 'banner',
}: PageBuilderBlockPreviewProps) {
  const titleText = typeof title === 'string' ? title : undefined
  const imageUrl = typeof image === 'string' ? image : undefined

  const content = (
    <Stack gap={3}>
      {titleText ? (
        <Text size={2} weight="medium">
          {titleText}
        </Text>
      ) : null}

      {excerpt ? (
        <Text size={1} muted
        style={{
            marginBottom: '1rem',
          }}>
          {excerpt}
        </Text>
      ) : null}
    </Stack>
  )

  return (
    <Card padding={3}>
      <Stack gap={4}>
        <Flex align="center" gap={2}>
          {Icon ? <Icon /> : null}

          <Text size={1} weight="semibold">
            {type}
          </Text>
        </Flex>

        {imageUrl && imageLayout === 'banner' ? (
          <Card
            radius={1}
            style={{
              width: '100%',
              aspectRatio: '6 / 1',
              overflow: 'hidden',
            }}
          >
            <img
              src={imageUrl}
              alt=""
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Card>
        ) : null}

        {imageLayout === 'thumbnail' && imageUrl ? (
          <Flex align="center" gap={4}>
            <Stack flex={1}>{content}</Stack>

            <Card
              radius={1}
              style={{
                width: 80,
                height: 80,
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={imageUrl}
                alt=""
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Card>
          </Flex>
        ) : null}

        {imageLayout === 'banner' || !imageUrl ? content : null}

        {details.length > 0 ? (
          <Flex gap={4}  wrap="wrap"
          >
            {details.map((detail) => (
              <Text key={detail} size={1} muted>
                {detail}
              </Text>
            ))}
          </Flex>
        ) : null}
      </Stack>
    </Card>
  )
}
