<script lang="ts">
  import type { Snippet } from 'svelte'
  import { fade } from 'svelte/transition'
  import store from './canvas-store.svelte'
  import { cx } from '@/center/utils'
  import EdgeScrollFrame from './EdgeScrollFrame.svelte'
  import BlobDirectionIndicator from './BlobDirectionIndicator.svelte'

  const { children }: { children: Snippet } = $props()

  const CS = store.initContext({})

  let scrollContainer = $state<HTMLDivElement>(null!)
  let cavitationContainer = $state<HTMLDivElement>(null!)
  let originContainer = $state<HTMLDivElement>(null!)

  function handleContainerWheel(ev: WheelEvent) {
    console.log(ev)
  }

  function handleClick(ev: MouseEvent) {
    console.log(ev.button)
  }

  function handleMouseDown(ev: MouseEvent) {
    if (ev.button === 1) {
      ev.preventDefault()
      CS.cmd.toggleEdgeScrollMode()
    }
  }

  function handleMouseMove(ev: MouseEvent) {}

  function handleMouseUp(ev: MouseEvent) {}

  function handleKeyDown(ev: KeyboardEvent) {}

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
</script>

<svelte:window
  onclick={handleClick}
  onmousedown={handleMouseDown}
  onmousemove={handleMouseMove}
  onmouseup={handleMouseUp}
  onkeydown={handleKeyDown}
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
  onwheel={handleContainerWheel}
  onmousemove={handleCanvasMouseMove}
  role="presentation"
  class="relative h-full w-full bg-black overflow-auto no-scrollbar"
>
  <div
    bind:this={cavitationContainer}
    class="relative w-5000px h-5000px max-w-none max-h-none"
  >
    <div
      bind:this={originContainer}
      onwheel={(ev) => ev.stopPropagation()}
      style={`transform: scale(${CS.zoom})`}
      class={cx('absolute w-0 h-0 left-1/2 top-1/2 transition', {
        'perspective-2000px scale-1/2': false,
      })}
    >
      <!-- {@render children()} -->
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
