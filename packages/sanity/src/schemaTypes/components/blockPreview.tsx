import type {ComponentType, ReactNode, SVGProps} from 'react'
import {Card, Flex, Stack, Text} from '@sanity/ui'

interface PageBuilderBlockPreviewProps {
  icon?: ComponentType<SVGProps<SVGSVGElement>>
  type: string
  title?: ReactNode
  excerpt?: string
  details?: string[]
  image?: string
}

export function PageBuilderBlockPreview({
  icon: Icon,
  type,
  title,
  excerpt,
  details = [],
  image,
}: PageBuilderBlockPreviewProps) {
  const titleText = typeof title === 'string' ? title : undefined

  return (
    <Card padding={3}>
      <Stack gap={4}>
        <Flex align="center" gap={2}>
          {Icon ? <Icon /> : null}

          <Text size={1} weight="semibold">
            {type}
          </Text>
        </Flex>

        {image ? (
          <Card
            radius={2}
            style={{
              width: '100%',
              aspectRatio: '6 / 1',
              overflow: 'hidden',
            }}
          >
            <img
              src={image}
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

        {titleText ? (
          <Text size={2} weight="medium">
            {titleText}
          </Text>
        ) : null}

        {excerpt ? (
          <Text size={1} muted>
            {excerpt}
          </Text>
        ) : null}

        {details.length > 0 ? (
          <Flex gap={4} wrap="wrap">
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
