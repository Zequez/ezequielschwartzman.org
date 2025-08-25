<script lang="ts" module>
  type FrameOutput = {
    id?: string
    title?: string
    x: number
    y: number
    w: number
    h: number
  }

  export type Context = {
    focus: string
    birdsEye: boolean
    editMode: boolean
    registerFrame: (frame: FrameOutput) => void
  }

  import { Canvas } from './canvas'
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import favicon from './favicon.png'

  import './markdown.css'

  import api from './lib/api.svelte'
  import noise from './noise.png'
  import MdxFrames from './eframes/MdxFrames.svelte'
  import rootStore from './lib/root-store.svelte'
  import { cx } from '@/center/utils'
  import type { Tunnels } from './eframes/frames-store.svelte'

  let RS = rootStore.initContext({})

  const API = api()

  setContext('api', API)

  type SecondTunnel = {
    n?: string
    e?: string
    s?: string
    w?: string
  }

  let nextTunneling: SecondTunnel | null = null
  let shiftCount = 0
  let shiftTimeout: any = null
  function handleWindowKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Shift') {
      shiftCount++
      if (shiftCount >= 3) {
        RS.cmd.toggleEditMode()
        shiftCount = 0
        clearTimeout(shiftTimeout)
      } else {
        clearTimeout(shiftTimeout)
        shiftTimeout = setTimeout(() => {
          shiftCount = 0
        }, 1000)
      }
    }

    if (ev.key.startsWith('Arrow')) {
      ev.preventDefault()
      const focusedFrameId = canvasRef.context.focus
      if (focusedFrameId) {
        const frame = framesRef.context.frames.find(
          (f) => f.id === focusedFrameId,
        )
        if (frame) {
          const tunnels = frame.fm.tunnels
          const direction = keyToTunnelDirection(ev.key)
          if (direction) {
            if (!nextTunneling) {
              const filteredTunnels = filterTunnelsByDirection(
                tunnels,
                direction,
              )
              const possibilities = Object.values(filteredTunnels)
              if (possibilities.length === 1) {
                canvasRef.focusOn(possibilities[0])
                nextTunneling = null
                RS.cmd.temptTunnel(null)
              } else if (possibilities.length > 1) {
                nextTunneling = filteredTunnels
                RS.cmd.temptTunnel(direction)
              }
            } else {
              if (nextTunneling[direction]) {
                canvasRef.focusOn(nextTunneling[direction])
              }
              nextTunneling = null
              RS.cmd.temptTunnel(null)
            }
          }
        }
      }
    }
  }

  function filterTunnelsByDirection(tunnels: Tunnels, direction: string) {
    return Object.fromEntries(
      Object.entries(tunnels)
        .filter(([k, v]) => k[0] === direction || k[1] === direction)
        .map(([k, v]) => [k.replace(direction, ''), v]),
    )
  }

  function tunnel1(tunnels: Tunnels, direction: string) {}

  // function selectTunnel(tunnels: Tunnels, direction: string) {
  //   if (direction.length === 2) {

  //   }
  // }

  function keyToTunnelDirection(key: string) {
    switch (key) {
      case 'ArrowLeft':
        return 'w'
      case 'ArrowRight':
        return 'e'
      case 'ArrowUp':
        return 'n'
      case 'ArrowDown':
        return 's'
    }
  }

  let canvasRef: Canvas
  let framesRef: MdxFrames

  function fullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<svelte:head>
  <title>Ezequiel A. Schwartzman</title>
  <meta name="viewport" content="width=device-width, initial-scale=0.5" />
  <!-- Favicon -->
  <link rel="icon" type="image/png" href={favicon} />
</svelte:head>

<!-- bg-[hsl(100deg_100%_100%)] -->
{#if canvasRef}
  <button
    class="fixed z-999 bottom-0 left-1/2 -translate-x-1/2 bg-black/90 text-white px2 py1 rounded-t-md uppercase text-xs font-bold"
    onclick={(ev) => fullscreen()}
  >
    {canvasRef.context.focus}
  </button>
{/if}
<div
  class="absolute top-4 right-4 bg-gray-100 shadow-[inset_0_0_3px_#fff] b b-black/10 shadow-sm rounded-lg flex space-x-1 z-999 p1 text-white font-mono text-shadow-[0_1px_0_#000f]"
>
  <button
    class={cx('w10 h10 rounded-lg bg-black b-4 b-yellow font-bold', {
      'bg-yellow text-black': RS.tunnelingOverlay,
    })}
    onclick={() => RS.cmd.toggleTunnelingOverlay()}
  >
    TO
  </button>
  <button class="w10 h10 rounded-lg bg-yellow">FO</button>
  <button class="w10 h10 rounded-lg bg-blue">ED</button>
  <button class="w10 h10 rounded-lg bg-green">SC</button>
  <button class="w10 h10 rounded-lg bg-slate">FC</button>
</div>
<Canvas background={noise} bind:this={canvasRef}>
  <MdxFrames bind:this={framesRef} />
</Canvas>
