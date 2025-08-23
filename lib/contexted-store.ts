import { getContext, setContext } from 'svelte'

export default function createContextedStore<TConfig, KStoreContext>(
  contextName: string,
  init: (config: TConfig) => KStoreContext,
) {
  function initStoreContext(config: TConfig) {
    const store = init(config)
    setContext(contextName, store)
    return store
  }

  function getStoreContext() {
    return getContext(contextName) as KStoreContext
  }

  return {
    initContext: initStoreContext,
    getContext: getStoreContext,
  }
}
