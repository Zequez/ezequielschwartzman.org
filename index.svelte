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
  import MdxFrames from './MdxFrames.svelte'
  import rootStore from './lib/root-store.svelte'

  let RS = rootStore.initContext({})

  const API = api()

  setContext('api', API)

  let shiftCount = 0
  function handleWindowKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Shift') {
      shiftCount++
      if (shiftCount === 3) {
        RS.cmd.toggleEditMode()
      }
      setTimeout(() => {
        shiftCount = 0
      }, 1000)
    }
  }

  let canvasRef: Canvas
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
  >
    {canvasRef.context.focus}
  </button>
{/if}
<Canvas background={noise} bind:this={canvasRef}>
  <MdxFrames />
</Canvas>
