// components/SlugPreviewInput.tsx
import { useEffect, useState } from 'react'
import { Stack, Text, Card } from '@sanity/ui'
import { useClient, useFormValue, SlugInputProps } from 'sanity'

const SITE_URL = 'https://larotonde.cafe' // swap or pull from env as needed

export function SlugPreviewInput(props: SlugInputProps) {
  const { renderDefault } = props
  const client = useClient({ apiVersion: '2026-09-01' })

  const slugValue = useFormValue(['slug', 'current']) as string | undefined
  const parentRef = useFormValue(['parent', '_ref']) as string | undefined

  const [parentSlug, setParentSlug] = useState<string | null>(null)

  useEffect(() => {
    if (!parentRef) {
      setParentSlug(null)
      return
    }

    client
      .fetch<string | null>(`*[_id == $id][0].slug.current`, { id: parentRef })
      .then(setParentSlug)
      .catch(() => setParentSlug(null))
  }, [parentRef, client])

  const path = slugValue
    ? parentSlug
      ? `/${parentSlug}/${slugValue}`
      : `/${slugValue}`
    : null

  return (
    <Stack gap={3}>
      {renderDefault(props)}

      {path && (
        <Card padding={3} radius={2} tone="primary" border>
          <Text size={1} muted>
            Page will be accessible at{' '}
            <code>{`"${path}"`}</code>
            <br />
            <span style={{ opacity: 0.7 }}>
              {`${SITE_URL}${path}`} &nbsp;

              <a
                href={`${SITE_URL}${path}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: 'inherit', opacity: 0.7 }}
              >
                [link]
              </a>

            </span>
          </Text>
        </Card>
      )}
    </Stack>
  )
}
