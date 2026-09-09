import type {ComponentType, ReactNode} from 'react'
import {Card, Flex, Stack, Text} from '@sanity/ui'

interface PageBuilderBlockPreviewProps {
  icon?: ComponentType
  type: string
  title?: ReactNode
  excerpt?: string
  details?: string[]
}

export function PageBuilderBlockPreview({
  icon: Icon,
  type,
  title,
  excerpt,
  details = [],
}: PageBuilderBlockPreviewProps) {
  const titleText = typeof title === 'string' ? title : undefined

  return (
    <Card padding={3}>
      <Stack gap={3}>
        <Flex align="center" gap={2}>
          {Icon ? <Icon /> : null}
          <Text size={1} weight="semibold">
            {type}
          </Text>
        </Flex>
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
          <Flex gap={2} wrap="wrap">
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
