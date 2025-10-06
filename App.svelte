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

  // PAGES NAVIGATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const props: { preRenderingPathname?: string } = $props()

  const rawPages = import.meta.glob('./pages/*.(svx|svelte)', {
    eager: true,
  }) as { [key: string]: { default: Component } }

  const pages = globImportToRecord('./pages/', (v) => v.default, rawPages)

  function syntheticNavigateTo(navPath: string) {
    currentPath = navPath
    window.history.pushState(null, '', navPath)
    document.documentElement.scrollTop = 0
    recalculatePagesListHeight()
  }

  let currentPath = $state(
    props.preRenderingPathname
      ? props.preRenderingPathname
      : window.location.pathname,
  )
  const currentPageName = $derived.by(() => {
    const page = navPathToPageName[currentPath]
    if (page) return page
    else return '404'
  })
  const CurrentPageComponent = $derived(pages[currentPageName])

  function generateNavigationPaths(): { [key: string]: string } {
    let paths: { [key: string]: string } = {}
    for (let pageName in pages) {
      if (pageName === '404') continue
      if (pageName === 'index') {
        paths['/'] = pageName
      } else {
        paths[`/${pageName}`] = pageName
      }
    }
    return paths
  }

  const navPathToPageName = $derived(generateNavigationPaths())
  const navPathToPage = $derived.by(() => {
    const o: { [key: string]: Component } = {}
    for (let path in navPathToPageName) {
      o[path] = pages[navPathToPageName[path]]
    }
    return o
  })
  const pageNameToNavPath = $derived.by(() => {
    const o: { [key: string]: string } = {}
    for (let path in navPathToPageName) {
      o[navPathToPageName[path]] = path
    }
    return o
  })

  function intersectLinkClicks(ev: MouseEvent) {
    console.log('Handling click', ev)
    if (ev.target instanceof HTMLAnchorElement) {
      const url = new URL(ev.target.href)
      if (url.host === window.location.host) {
        syntheticNavigateTo(url.pathname)
        ev.preventDefault()
        ev.stopPropagation()
      }
    }
  }

  // VERTICAL RYHTHM GRID TOGGLING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let vGridEnabled = lsState('v-grid-enabled', { v: false })

  if (typeof window !== 'undefined') {
    onTripleShift(window, () => {
      vGridEnabled.v = !vGridEnabled.v
    })
  }

  // PAGES LIST HEIGHT CALCULATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let pagesListHeight = $state(0)

  // $effect(() => {
  //   if (import.meta.env.SSR) return
  //   CurrentPageComponent
  //   recalculatePagesListHeight()
  // })

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

<svelte:window
  onclick={intersectLinkClicks}
  onresize={recalculatePagesListHeight}
/>

<div class="flex flex-col h-screen">
  <div
    class="bg-gray-100 text-gray-950 dark:(bg-gray-950! text-gray-100!)"
    bind:this={container}
    use:onresizeobserver={recalculatePagesListHeight}
  >
    <CurrentPageComponent />
  </div>

  <div
    class="relative flex-grow bg-gray-950 text-white shadow-[0_-1px_0_0] shadow-black dark:shadow-white/80"
    style="{`background-image: url(${noise});`}}"
  >
    {#if typeof window !== 'undefined'}
      <!-- <div class="h6 w-full bg-white/50 dark:bg-black/50"></div> -->
      <PagesList {pages} currentPage={currentPageName} {pageNameToNavPath} />
    {/if}

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
