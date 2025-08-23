<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { cx } from '@/center/utils'
  import { type Context } from './index.svelte'
  import framesStore from './lib/frames-store.svelte'
  import rootStore from './lib/root-store.svelte'
  import canvasStore from './canvas/canvas-store.svelte'
  import IconMove from '~icons/fa6-solid/arrows-up-down-left-right'

  const { id, title, x, y, z, children, draft, bg, hidden } = $props<{
    id?: string
    title?: string
    z: number
    x: number
    y: number
    bg?: boolean
    children: any
    draft?: boolean
    hidden?: boolean
    onclick?: () => void
  }>()

  const RS = rootStore.getContext()
  const FC = framesStore.getContext()
  const CS = canvasStore.getContext()

  let moving = $state<{
    x: number
    y: number
    didMove: boolean
    z: number
  } | null>(null)
  let justMoved = $state<{ x: number; y: number; z: number } | null>(null)

  function handleMouseDown(ev: MouseEvent) {
    if (ev.button === 0) {
      ev.stopPropagation()
      ev.preventDefault()
      moving = { x, y, z: FC.topZ() + 1, didMove: false }
    }
  }

  function handleMouseMove(ev: MouseEvent) {
    if (moving) {
      moving = {
        x: moving.x + ev.movementX,
        y: moving.y + ev.movementY,
        z: moving.z,
        didMove: true,
      }
    }
  }

  let cancelNextClick = $state(false)
  function handleMouseUp(ev: MouseEvent) {
    if (moving) {
      if (moving.didMove) {
        cancelNextClick = true
        // C.setFrameXY(id, moving.x, moving.y)
        FC.updateFrameFrontmatter(id, {
          x: moving.x,
          y: moving.y,
          z: moving.z,
        })
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

  function toggleHidden() {
    FC.updateFrameFrontmatter(id, { hidden: !hidden })
  }

  let xy = $derived(moving || justMoved || { x, y, z })

  let container = $state<HTMLDivElement>(null!)

  onMount(() => {
    // const { left, top, width, height } = container!.getBoundingClientRect()
    // RS.registerFrame({
    //   id,
    //   title,
    //   x: left,
    //   y: top,
    //   w: width,
    //   h: height,
    // })
  })

  let isSelected = $derived(CS.focus === id)
  const isDevMode = import.meta.env.DEV

  let posStyle = $derived(
    bg
      ? `transform: translate(-50%, -50%); z-index: 18;`
      : `transform: translateX(-50%); z-index: ${20 + xy.z};`,
  )
  let c = '#60a5fa'
</script>

<svelte:window
  on:mousemove={moving && handleMouseMove}
  on:mouseup={moving && handleMouseUp}
/>

{#snippet handlingBar()}
  {#if isDevMode && RS.editMode}
    <div
      style={`z-index: ${200 + xy.z}`}
      ondblclick={toggleHidden}
      role="presentation"
      class={cx(
        'h10 absolute peer top-0 left-0 w-full min-w-200px flexcs px2 text-xs rounded-md space-x-2 b-black/10 pointer-events-auto',
        {
          'bg-gray-400 shadow-[0_1.1px_0px_2px_#6B7381]': draft,
          'bg-blue-400 shadow-[0_1.1px_0px_2px_#437CC3]': !draft,
          '-mt12': bg,
        },
      )}
    >
      <span class="font-mono">{id}</span>
      <div class="line-height-2 font-mono text-[8px]">
        <div>X {x.toFixed(0)}</div>
        <div>Y {y.toFixed(0)}</div>
      </div>
      <div class="flex-grow"></div>
      <label>
        <input
          type="checkbox"
          class="peer w0 h0 opacity-0"
          checked={draft}
          onchange={(ev) => {
            console.log(ev.currentTarget.checked)
            FC.updateFrameFrontmatter(id, { draft: ev.currentTarget.checked })
          }}
        />
        <span
          class="bg-gray-300 b-2 b-black/10 b-dashed text-black/20 rounded-md px1 py.5 peer-checked:(bg-blue-400 b-solid text-white) cursor-pointer"
        >
          Draft
        </span>
      </label>
      <div
        onmousedown={handleMouseDown}
        onclick={handleClick}
        role="presentation"
        class="text-white/70 text-lg cursor-move hover:(text-white/100 scale-110) transition-transform"
      >
        <IconMove />
      </div>
    </div>
  {/if}
{/snippet}

{#if !draft || isDevMode}
  {#if !bg}
    <div
      {id}
      bind:this={container}
      style={posStyle}
      class={cx('w-360px pointer-events-auto', {
        'pt12 -mt12': RS.editMode,
        'pt4 -mt4': !RS.editMode,
      })}
    >
      {@render handlingBar()}
      {#if !hidden}
        <div
          class={cx(`relative md w-full`, {
            'saturate-100 hover:brightness-120': !isSelected,
          })}
        >
          {#if !isSelected}
            <a
              class="z-20 block absolute left-0 top-0 size-full bg-white/50 opacity-0 rounded-md bg-[url('/noise20.png')]"
              aria-label="Focus frame"
              href={`#${id}`}
            ></a>
          {:else}
            <div
              class="absolute -inset-2 b-3 blur-sm b-yellow-300 b-dashed rounded-lg z-9 bg-yellow-300/20"
            ></div>
            <div
              class="absolute -inset-2 b-3 b-yellow-300 b-dashed rounded-lg z-9"
            ></div>
          {/if}

          <div
            class={cx(
              'relative z-10 p4 md bg-gray-100 rounded-md shadow-[0_1.5px_0px_2px_#888]',
            )}
          >
            {@render children()}
          </div>
        </div>
      {/if}
    </div>
  {:else}
    <div
      {id}
      bind:this={container}
      style={posStyle}
      role="presentation"
      class={cx(`pointer-events-none`)}
    >
      {@render handlingBar()}
      {#if !hidden}
        <div
          class="hidden peer-hover:block absolute -inset-3px b-3 b-blue-400 rounded-md b-dashed"
        ></div>
        {@render children()}
      {/if}
    </div>
  {/if}
{/if}
