<script lang="ts" module>
  export type Context = {
    focus: string
  }
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import Frame from './Frame.svelte'
  import fearImg from './fear.jpg'
  let hash = window.location.hash

  let focus = $state('origin')
  let zoom = $state(1)
  let container = $state<HTMLDivElement>(null!)

  function focusOn(id: string) {
    focus = id
    history.pushState(null, '', `#${id}`)
    scrollTo(id)
  }

  function handleHashChange(ev: Event, id: string) {
    ev.preventDefault()
    focus = id
    scrollTo(id)
  }

  function scrollTo(id: string) {
    document
      .getElementById(id)!
      .scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

  function captureLinksClick(ev: MouseEvent) {
    if (ev.target instanceof HTMLAnchorElement) {
      console.log(ev.target.href)
      const url = new URL(ev.target.href)
      if (url.hash) {
        ev.preventDefault()
        ev.stopPropagation()
        focusOn(ev.target.hash.slice(1))
      }
    }
  }

  let currentPan = $state<{ x: number; y: number; startedAt: number } | null>(
    null,
  )

  function handleWindowMousedown(ev: MouseEvent) {
    if (ev.target === container) {
      currentPan = {
        x: ev.clientX,
        y: ev.clientY,
        startedAt: Date.now(),
      }
    }
  }

  function handleWindowMousemove(ev: MouseEvent) {
    if (currentPan) {
      const dx = ev.movementX
      const dy = ev.movementY
      container.scrollLeft += dx
      container.scrollTop += dy
    }
  }
  function handleWindowMouseup(ev: MouseEvent) {
    if (currentPan) {
      currentPan = null
    }
  }

  const C: Context = {
    get focus() {
      return focus
    },
  }

  setContext('main', C)
</script>
