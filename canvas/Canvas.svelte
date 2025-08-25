<script lang="ts">
  import { onMount, type Snippet } from 'svelte'
  import { fade } from 'svelte/transition'
  import store from './canvas-store.svelte'
  import { cx } from '@/center/utils'
  import EdgeScrollFrame from './EdgeScrollFrame.svelte'
  import BlobDirectionIndicator from './BlobDirectionIndicator.svelte'

  const { children, background }: { children: Snippet; background: string } =
    $props()

  const CS = store.initContext({})

  export const context = CS

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  let scrollContainer = $state<HTMLDivElement>(null!)
  let cavitationContainer = $state<HTMLDivElement>(null!)
  let originContainer = $state<HTMLDivElement>(null!)

  let cavitationSize = $state({ w: 0, h: 0 })
  function recalculateCavitationSize() {
    const rects = Array.from(originContainer.children).map((c) => {
      const h = c as HTMLElement
      return {
        left: h.offsetLeft,
        top: h.offsetTop,
        right: h.offsetLeft + h.offsetWidth,
        bottom: h.offsetTop + h.offsetHeight,
      }
    })

    const leftMost = Math.min(...rects.map((r) => r.left))
    const rightMost = Math.max(...rects.map((r) => r.right))
    const topMost = Math.min(...rects.map((r) => r.top))
    const bottomMost = Math.max(...rects.map((r) => r.bottom))

    const w = rightMost - leftMost + window.innerWidth
    const h = bottomMost - topMost + window.innerHeight + 100 // Not sure why 100

    cavitationSize = {
      w: Math.max(w, window.innerWidth),
      h: Math.max(h, window.innerHeight),
    }
  }
  onMount(() => {
    recalculateCavitationSize()
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        CS.cmd.focus(id)
        setTimeout(() => {
          scrollIntoView(id, true)
          loader = false
        }, 0)
      }
    }
  })

  function handleHashChange(ev: Event, id: string) {
    console.log('HASH CHANGE!')
    ev.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      // CS.cmd.focus(id)
      // scrollIntoView(id)
    }
  }

  function scrollIntoView(id: string, instant = false) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({
        behavior: instant ? 'instant' : 'smooth',
        block: 'start',
        inline: 'center',
      })
    }
  }

  let wheelTimestamp = 0
  let lastShiftCommand = 0
  const ZOOM_ANIMATION_DURATION = 0
  function handleContainerWheel(ev: WheelEvent) {
    if (!CS.edgeScrollMode && !ev.ctrlKey) return
    ev.preventDefault()

    const lastShiftZoomDelta = ev.timeStamp - lastShiftCommand
    const timestampDelta = ev.timeStamp - wheelTimestamp
    if (
      lastShiftZoomDelta > ZOOM_ANIMATION_DURATION &&
      timestampDelta > 5 &&
      Math.abs(ev.deltaY) > 1
    ) {
      wheelTimestamp = ev.timeStamp
      const zoomDelta = ev.deltaY > 0 ? 1 : -1

      if (CS.cmd.shiftZoom(zoomDelta, ev.clientX, ev.clientY)) {
        lastShiftCommand = ev.timeStamp
      }
    }
  }

  function handleClick(ev: MouseEvent) {
    if (ev.target instanceof HTMLAnchorElement) {
      const url = new URL(ev.target.href)
      if (url.hash) {
        ev.preventDefault()
        ev.stopPropagation()
        if (justPanned > 5) return
        focusOn(ev.target.hash.slice(1))
      }
    }
  }

  export function focusOn(id: string) {
    if (document.getElementById(id)) {
      CS.cmd.focus(id)
      history.pushState(null, '', `#${id}`)
      scrollIntoView(id)
    }
  }

  // let pan = $state<{ x: number; y: number }>({ x: 0, y: 0 })
  let pan = $state(false)
  function handleMouseDown(ev: MouseEvent) {
    if (ev.button === 1) {
      if (!(ev.target instanceof HTMLAnchorElement)) {
        ev.preventDefault()
        CS.cmd.toggleEdgeScrollMode()
      }
    } else if (ev.button === 0 && !isTouchDevice) {
      pan = true
    }
  }

  let justPanned = $state(0)
  function handleMouseMove(ev: MouseEvent) {
    if (pan) {
      justPanned += Math.abs(ev.movementX) + Math.abs(ev.movementY)
      scrollContainer.scrollLeft -= ev.movementX
      scrollContainer.scrollTop -= ev.movementY
    }
  }

  function handleMouseUp(ev: MouseEvent) {
    if (ev.button === 0 && pan) {
      pan = false
      setTimeout(() => {
        justPanned = 0
      }, 100)
    }
  }

  function handleKeyDown(ev: KeyboardEvent) {
    if (ev.key.startsWith('Arrow')) {
      // if (CS.focus) {
      //   const frame =
      //   if (ev.key === 'ArrowLeft') {
      //   }
      // }
    }
  }

  let lastMoveEv: 'canvas' | 'edge' = 'canvas'
  function handleEdgeScrollFrameDetect(direction: number) {
    if (lastMoveEv === 'canvas') {
      lastMoveEv = 'edge'
    }
    CS.cmd.informEdgeScroll(direction)
  }

  function handleCanvasMouseMove(ev: MouseEvent) {
    if (lastMoveEv === 'edge') {
      lastMoveEv = 'canvas'
      CS.cmd.informEdgeScroll(null)
    }
  }

  $effect(() => {
    if (pan) {
      document.body.classList.add('cursor-grabbing', 'select-none')
    } else {
      document.body.classList.remove('cursor-grabbing', 'select-none')
    }
  })

  let loader = $state(true)
</script>

<svelte:window
  onhashchange={(ev) => handleHashChange(ev, window.location.hash.slice(1))}
  onclick={handleClick}
  ondblclick={recalculateCavitationSize}
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onkeydown={handleKeyDown}
  ondragstart={(ev) => ev.preventDefault()}
/>

{#if CS.edgeScrollMode}
  <EdgeScrollFrame
    thickness={50}
    hue={100}
    ondetect={handleEdgeScrollFrameDetect}
  />
  {#if CS.edgeScrollDirection !== null}
    <BlobDirectionIndicator
      hue={100}
      class="absolute top-1/2 left-1/2 -translate-1/2 z-200 w50 h50 pointer-events-none text-green-400"
      direction={CS.edgeScrollDirection}
    />
  {/if}
{/if}

<div
  bind:this={scrollContainer}
  id="scroll"
  onwheel={handleContainerWheel}
  onmousemove={handleCanvasMouseMove}
  role="presentation"
  class="relative h-full w-full bg-black overflow-auto no-scrollbar"
>
  <div
    class="absolute left-0 top-0"
    style={`background-image: url(${background}); background-size: ${320 * CS.zoom}px ${200 * CS.zoom}px; width: ${cavitationSize.w}px; height: ${cavitationSize.h}px;`}
  ></div>

  {#if loader}
    <div
      class="fixed inset-0 z-9999 bg-black pointer-events-none"
      out:fade
    ></div>
  {/if}
  <div
    bind:this={cavitationContainer}
    class="relative max-w-none max-h-none"
    style={`
      width: ${cavitationSize.w}px;
      height: ${cavitationSize.h}px;
      transform: scale(${CS.zoom});
      `}
  >
    <div
      bind:this={originContainer}
      class={cx('absolute w-0 h-0 left-1/2 top-1/2', {})}
    >
      {@render children()}
    </div>
  </div>
</div>

<style global>
  .no-scrollbar {
    scrollbar-width: 0;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
