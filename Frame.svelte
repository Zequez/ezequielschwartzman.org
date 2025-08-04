<script lang="ts">
  import { cx } from '@/center/utils'
  import { getContext } from 'svelte'
  import { type Context } from './index.svelte'
  const { id, w, x, y, children } = $props<{
    id: string
    w: number
    x: number
    y: number
    children: any
    onclick?: () => void
  }>()

  const C = getContext('main') as Context

  let moving = $state<{ x: number; y: number; didMove: boolean } | null>(null)
  let justMoved = $state<{ x: number; y: number } | null>(null)

  function handleMouseDown(ev: MouseEvent) {
    if (ev.button === 0) {
      console.log('Moving!', id)
      ev.stopPropagation()
      ev.preventDefault()
      moving = { x, y, didMove: false }
    }
  }

  function handleMouseMove(ev: MouseEvent) {
    if (moving) {
      moving = {
        x: moving.x + ev.movementX,
        y: moving.y + ev.movementY,
        didMove: true,
      }
    }
  }

  let cancelNextClick = $state(false)
  function handleMouseUp(ev: MouseEvent) {
    if (moving) {
      if (moving.didMove) {
        cancelNextClick = true
        C.setFrameXY(id, moving.x, moving.y)
        justMoved = moving
      }
      moving = null
    }
  }

  function handleClick(ev: MouseEvent) {
    if (cancelNextClick) {
      cancelNextClick = false
      ev.stopPropagation()
      ev.preventDefault()
    }
  }

  let xy = $derived(moving || justMoved || { x, y })
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
  {id}
  style={`width: ${w}rem; padding: 1rem; left: ${xy.x}px; top: ${xy.y}px; `}
  onmousedown={handleMouseDown}
  onclick={handleClick}
  role="presentation"
  class={cx(
    `block text-left absolute z-20 max-w-none bg-white/90 max-w-full -translate-x-1/2 -translate-y-1/2
    w-100 rounded-md hover:bg-gray-200 shadow-[0_1.5px_0px_2px_#888]`,
  )}
>
  {#if C.focus !== id}
    <a
      class="z-20 block absolute left-0 top-0 size-full bg-white/50 opacity-50 rounded-md bg-[url('/noise20.png')]"
      aria-label="Focus frame"
      href={`#${id}`}
    ></a>
  {/if}
  <div class={cx('relative z-10', { '': C.focus !== id })}>
    {@render children()}
  </div>

  <!-- <slot name="tl" />
  <slot name="tt" />
  <slot name="tr" />
  <slot name="rt" />
  <slot name="rr" />
  <slot name="rb" />
  <slot name="br" />
  <slot name="bb" />
  <slot name="bl" />
  <slot name="lb" />
  <slot name="ll" />
  <slot name="lt" /> -->
</div>
