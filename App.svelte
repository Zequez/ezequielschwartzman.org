<script lang="ts">
  import { onMount, type Component } from 'svelte'
  import { globImportToRecord } from '@/center/utils/neutral'
  import {
    lsState,
    onresizeobserver,
    onTripleShift,
  } from '@/center/utils/runes.svelte'
  import favicon from './favicon.jpeg'
  import PagesList from './components/PagesList.svelte'
  import noise from './noise.png'

  onMount(() => {})

  let container: HTMLDivElement

  const rawPages = import.meta.glob('./pages/*.(svx|svelte)', {
    eager: true,
  }) as { [key: string]: { default: Component } }

  const pages = globImportToRecord('./pages/', (v) => v.default, rawPages)

  let currentPage = $state('index')
  onMount(() => {
    const pathname = window.location.pathname
    currentPage = pathname === '/' ? 'index' : pathname.slice(1)
  })

  function switchPage(newPage: string) {
    currentPage = newPage
    window.history.pushState(null, '', `/${newPage === 'index' ? '' : newPage}`)
    recalculatePagesListHeight()
  }

  let Page = $derived(pages[currentPage] || pages['404'])

  let vGridEnabled = lsState('v-grid-enabled', { v: false })

  onTripleShift(window, () => {
    vGridEnabled.v = !vGridEnabled.v
  })

  let pagesListHeight = $state(0)

  $effect(() => {
    Page
    recalculatePagesListHeight()
  })

  function recalculatePagesListHeight() {
    const contentHeight = container.clientHeight
    const bodyHeight = document.body.clientHeight

    if (contentHeight < bodyHeight) {
      pagesListHeight = bodyHeight - contentHeight + 48
    } else {
      pagesListHeight = 48
    }
  }
</script>

<svelte:head>
  <title>Ezequiel A. Schwartzman</title>
  <link rel="icon" type="image/jpg" href={favicon} />
</svelte:head>

<svelte:window onresize={recalculatePagesListHeight} />

<div class="flex flex-col h-screen">
  <div
    class="bg-gray-100 text-gray-950 dark:(bg-gray-950! text-gray-100!)"
    bind:this={container}
    use:onresizeobserver={recalculatePagesListHeight}
  >
    <Page />
  </div>

  <div
    class="relative flex-grow bg-gray-950 text-white shadow-[0_-1px_0_0] shadow-black dark:shadow-white/80"
    style="{`background-image: url(${noise});`}}"
  >
    <!-- <div class="h6 w-full bg-white/50 dark:bg-black/50"></div> -->
    <PagesList {pages} {currentPage} onPick={(page) => switchPage(page)} />

    {#if vGridEnabled.v}
      <div
        class="absolute inset-0 pointer-events-none z-0 mix-blend-normal"
        aria-hidden="true"
        style="--rhythm:1.5rem; --line-thickness:1px; background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0 calc(var(--line-thickness)), transparent calc(var(--line-thickness)) var(--rhythm));"
      ></div>
    {/if}
  </div>
</div>

{#if vGridEnabled.v}
  <div
    class="absolute inset-0 pointer-events-none z-0 mix-blend-normal"
    aria-hidden="true"
    style="--rhythm:1.5rem; --line-thickness:1px; background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0 calc(var(--line-thickness)), transparent calc(var(--line-thickness)) var(--rhythm));"
  ></div>
{/if}
