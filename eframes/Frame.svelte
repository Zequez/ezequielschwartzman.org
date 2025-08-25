<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { cx } from '@/center/utils'
  import framesStore, { type FullFrontmatter } from './frames-store.svelte'
  import rootStore from '../lib/root-store.svelte'
  import canvasStore from '../canvas/canvas-store.svelte'
  import IconMove from '~icons/fa6-solid/arrows-up-down-left-right'
  import Doorways from './Doorways.svelte'
  import HandlingBar from './HandlingBar.svelte'
  import draggable from './draggable.svelte'

  const {
    id,
    p,
    children,
  }: {
    id: string
    p: FullFrontmatter
    children: any
  } = $props()

  const RS = rootStore.getContext()
  const FS = framesStore.getContext()
  const CS = canvasStore.getContext()

  let topZ = $state<null | number>(null)
  const { dragging, handleDragOnMouseDown } = draggable(
    () => {
      topZ = FS.topZ() + 1
    },
    ({ dx, dy }) => {
      FS.cmd.updateProps(id, {
        x: p.x + dx,
        y: p.y + dy,
        z: topZ!,
      })
    },
    () => {
      FS.cmd.commitProps(id)
      topZ = null
    },
  )

  let container = $state<HTMLDivElement>(null!)

  let isSelected = $derived(CS.focus === id)
  const isDevMode = import.meta.env.DEV

  let zIndex = $derived(
    FS.hoveringId === id
      ? 9999 + 1
      : p.layer === 'bg'
        ? 18
        : 20 + (topZ || p.z),
  )
  let positioning = $derived(
    p.layer === 'bg' ? 'translate(-50%, -50%)' : 'translateX(-50%)',
  )
  let posStyle = $derived(`transform: ${positioning}; z-index: ${zIndex};`)
</script>

{#if !p.draft || isDevMode}
  {#if p.layer === 'fg'}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_mouse_events_have_key_events -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      bind:this={container}
      class={cx('w-360px pointer-events-auto relative')}
      onmouseover={() => (!dragging ? FS.cmd.hovering(id) : null)}
      onmousedown={(ev) => ev.shiftKey && handleDragOnMouseDown(ev)}
      style={posStyle}
    >
      <HandlingBar
        {p}
        {id}
        draggingHandler={handleDragOnMouseDown}
        isDragging={!!dragging}
      />
      {#if !p.hidden}
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
              class="absolute -inset-2 b-3 blur-sm b-yellow-300 b-dashed rounded-lg z-9 bg-yellow-300/20 pointer-events-none"
            ></div>
            <div
              class="absolute -inset-2 b-3 b-yellow-300 b-dashed rounded-lg z-9 pointer-events-none"
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
    <Doorways z={zIndex} {positioning} />
  {:else}
    <div
      bind:this={container}
      style={posStyle}
      role="presentation"
      class={cx(`pointer-events-none relative`)}
    >
      <HandlingBar
        {p}
        {id}
        draggingHandler={handleDragOnMouseDown}
        isDragging={!!dragging}
      />
      {#if !p.hidden}
        <div
          class="hidden peer-hover:block absolute -inset-3px b-3 b-blue-400 rounded-md b-dashed"
        ></div>
        {@render children()}
      {/if}
    </div>
  {/if}
{/if}
