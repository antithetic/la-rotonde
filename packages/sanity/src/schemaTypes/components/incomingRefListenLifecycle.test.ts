import assert from 'node:assert/strict'
import { test } from 'node:test'

import { createIncomingRefListenLifecycle } from './incomingRefListenLifecycle.ts'

test('does not create a listener after unmount while fetchIncomingRefList is pending', async () => {
  const lifecycle = createIncomingRefListenLifecycle()
  let listenCalls = 0
  let resolveFetch!: (value?: unknown) => void

  const fetchIncomingRefList = () =>
    new Promise((resolve) => {
      resolveFetch = resolve
    })

  lifecycle.start(fetchIncomingRefList, () => {
    listenCalls += 1
    return { unsubscribe() {} }
  })

  lifecycle.dispose()
  resolveFetch()
  await Promise.resolve()

  assert.equal(listenCalls, 0)
})
