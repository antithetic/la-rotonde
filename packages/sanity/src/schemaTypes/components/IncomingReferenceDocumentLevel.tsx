import { Box, Card, Stack, Text } from '@sanity/ui'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import {
  getIdPair,
  ObjectInputProps,
  SanityDefaultPreview,
  useClient,
  useFormValue,
  useSchema,
} from 'sanity'
import { usePaneRouter } from 'sanity/structure'
import sleep from '../../utils/sleep'
import { createIncomingRefListenLifecycle } from './incomingRefListenLifecycle'

// type for the incoming reference results
type IncomingRefResult = { _type: string; _id: string; title: string }[]

const DOCUMENT_TYPES = ['page', 'faq']

// * * * MAIN COMPONENT * * *
export const IncomingRefIndicator: ComponentType<ObjectInputProps> = (
  props,
) => {
  // * Value you will need for the query
  const documentId = useFormValue(['_id']) as string
  // * Get the published ID
  const { publishedId } = getIdPair(documentId)

  // * Studio client
  const studioClient = useClient({ apiVersion: '2025-08-01' })
  const client = useMemo(
    () => studioClient.withConfig({ perspective: 'drafts' }),
    [studioClient],
  )

  // * State to store the incoming references
  const [incomingRefs, setIncomingRefs] = useState<IncomingRefResult>([])

  useEffect(() => {
    const lifecycle = createIncomingRefListenLifecycle()

    // * Query: fetch all incoming references to this document
    const query = `*[ references($id) ]{ _id, _type, title }`

    // add your own query params here if you need them
    const params = { id: publishedId, types: DOCUMENT_TYPES }

    const fetchIncomingRefList = async (listening = false) => {
      // listen but with a timeout to debounce the listener
      if (listening) {
        await sleep(1500)
      }
      if (lifecycle.isDisposed()) return

      // * Fetch the incoming references
      await client
        .fetch(query, params)
        .then((res: IncomingRefResult) => {
          if (lifecycle.isDisposed()) return
          setIncomingRefs(res)
        })
        .catch((err: Error) => {
          console.error(err.message)
        })
    }

    const listen = () =>
      client
        .listen(query, params, {
          visibility: 'query',
          tag: `incomingRefs-for-${publishedId}`,
        })
        .subscribe(() => fetchIncomingRefList(true))

    lifecycle.start(() => fetchIncomingRefList(), listen)

    return () => lifecycle.dispose()
  }, [client, publishedId])

  return (
    <Card>
      {incomingRefs && (
        <Card tone="primary" marginBottom={4} padding={4} shadow={1}>
          <Box paddingBottom={4}>
            <Text size={2} weight="semibold">
              Incoming references
            </Text>
          </Box>
          <Stack gap={3}>{renderIncomingRefs(incomingRefs)}</Stack>
        </Card>
      )}
      {/*
       * *  comment the next line if you want to use it as a standalone component somewhere else (not inside of a field or input
       */}
      {props.renderDefault(props)}
    </Card>
  )
}

// * * * REFERENCE LINK COMPONENT * * *
const ReferenceLink: ComponentType<{
  _type: string
  _id: string
  title: string
}> = (props: { _type: string; _id: string; title: string }) => {
  const { _id, _type, title } = props
  const schemaType = useSchema().get(_type)
  const Icon = schemaType?.icon

  const { ReferenceChildLink } = usePaneRouter()
  return (
    <Card
      as="li"
      style={{ cursor: 'pointer', textDecoration: 'none' }}
      shadow={1}
      radius={3}
    >
      <ReferenceChildLink
        documentId={_id}
        documentType={_type}
        parentRefPath={[]}
        //@ts-ignore
        style={{ textDecoration: 'none' }}
      >
        <SanityDefaultPreview
          title={title ?? 'Document Type: ' + schemaType?.title}
          schemaType={schemaType}
          icon={Icon}
        />
      </ReferenceChildLink>
    </Card>
  )
}

// * * * RENDER EACH INCOMING REF * * *

const renderIncomingRefs = (incomingRefs: IncomingRefResult) => {
  return incomingRefs?.map((reference) => (
    <ReferenceLink {...reference} key={reference._id} />
  ))
}
