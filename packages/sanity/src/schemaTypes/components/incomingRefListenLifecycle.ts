export type IncomingRefSubscription = { unsubscribe: () => void }

export function createIncomingRefListenLifecycle() {
  let disposed = false
  let subscription: IncomingRefSubscription | undefined

  return {
    isDisposed: () => disposed,
    start(
      fetchIncomingRefList: () => Promise<unknown>,
      listen: () => IncomingRefSubscription,
    ) {
      void fetchIncomingRefList().then(() => {
        if (disposed) return
        subscription = listen()
      })
    },
    dispose() {
      disposed = true
      subscription?.unsubscribe()
    },
  }
}
