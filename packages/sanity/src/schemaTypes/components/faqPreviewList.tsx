import { useEffect, useState } from 'react'
import type { KeyboardEvent, MouseEvent, SyntheticEvent } from 'react'

import { Card, Stack, Text } from '@sanity/ui'
import { useClient } from 'sanity'
import { useIntentLink } from 'sanity/router'
import { usePaneRouter } from 'sanity/structure'

type FaqReference = {
  _key?: string
  _ref?: string
}

type FaqDoc = {
  _id: string
  question?: string
}

type FaqPreviewItem = {
  id: string
  key: string
  question: string
}

function publishedId(id: string) {
  return id.replace(/^drafts\./, '')
}

function resolveQuestions(
  refs: FaqReference[],
  docs: FaqDoc[],
): FaqPreviewItem[] {
  const questions = new Map<string, { draft?: string; published?: string }>()

  for (const doc of docs) {
    const id = publishedId(doc._id)
    const current = questions.get(id) ?? {}
    const question = doc.question?.trim() || 'Untitled FAQ'

    if (doc._id.startsWith('drafts.')) {
      current.draft = question
    } else {
      current.published = question
    }

    questions.set(id, current)
  }

  return refs
    .filter((ref) => ref._ref)
    .map((ref) => {
      const id = ref._ref as string
      const match = questions.get(id)

      return {
        id,
        key: ref._key || id,
        question: match?.draft ?? match?.published ?? 'Untitled FAQ',
      }
    })
}

function FaqQuestionCard({ id, question }: { id: string; question: string }) {
  const paneRouter = usePaneRouter()
  const { onClick: openIntent } = useIntentLink({
    intent: 'edit',
    params: { id, type: 'faq' },
  })

  const stopItemClick = (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const openFaq = (event: MouseEvent<HTMLDivElement>) => {
    stopItemClick(event)

    try {
      paneRouter.handleEditReference({
        id,
        type: 'faq',
        parentRefPath: [],
        template: { id: 'faq' },
      })
    } catch {
      openIntent(event)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    openFaq(event as unknown as MouseEvent<HTMLDivElement>)
  }

  return (
    <Card
      padding={3}
      radius={1}
      border
      title={question}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
      onPointerDownCapture={stopItemClick}
      onMouseDownCapture={stopItemClick}
      onClickCapture={openFaq}
      onKeyDown={handleKeyDown}
    >
      <Text size={1} weight="medium" style={{ overflowWrap: 'anywhere' }}>
        {question}
      </Text>
    </Card>
  )
}

export function FaqPreviewList({ faqs = [] }: { faqs?: FaqReference[] }) {
  const client = useClient({ apiVersion: '2026-09-01' })
  const [items, setItems] = useState<FaqPreviewItem[]>([])
  const allRefs = faqs.filter((faq) => Boolean(faq._ref))
  const refs = allRefs.slice(0, 3)
  const hasMore = allRefs.length > 3
  const serializedRefs = JSON.stringify(
    refs.map((faq) => ({ _key: faq._key, _ref: faq._ref })),
  )

  useEffect(() => {
    if (!serializedRefs || serializedRefs === '[]') {
      return
    }

    const currentRefs: FaqReference[] = JSON.parse(serializedRefs)
    const ids = currentRefs.flatMap((faq) => {
      const id = faq._ref as string
      return [id, `drafts.${id}`]
    })
    const query = `*[_id in $ids]{_id, question}`
    const params = { ids }

    let cancelled = false

    const load = async () => {
      const docs = await client.fetch<FaqDoc[]>(query, params)

      if (!cancelled) {
        setItems(resolveQuestions(currentRefs, docs))
      }
    }

    load()

    const subscription = client.listen(query, params).subscribe(() => {
      load()
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [client, serializedRefs])

  if (!refs.length) {
    return null
  }

  const cards = refs.map((faq) => {
    const id = faq._ref as string
    const fetched = items.find((item) => item.id === id)

    return (
      fetched ?? {
        id,
        key: faq._key || id,
        question: 'Loading…',
      }
    )
  })

  return (
    <Stack
      gap={2}
      style={{
        width: '42%',
        minWidth: 160,
        maxWidth: 280,
        flexShrink: 0,
      }}
    >
      {cards.map((item) => (
        <FaqQuestionCard key={item.key} id={item.id} question={item.question} />
      ))}

      {hasMore ? (
        <Card padding={3} radius={1} border tone="primary">
          <Text size={1} weight="medium" align="center">
            View All FAQs
          </Text>
        </Card>
      ) : null}
    </Stack>
  )
}
