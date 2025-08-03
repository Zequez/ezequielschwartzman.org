<script lang="ts">
  import { cx } from '@/center/utils'
  import { getContext } from 'svelte'
  import { type Context } from './index.svelte'
  const { id, children, w, x, y, origin } = $props<{
    id: string
    children: any
    w: number
    x: number
    y: number
    origin: string
    onclick?: () => void
  }>()

  const C = getContext('main') as Context

  const frameUnit = 300
  let mX = $derived(x * frameUnit)
  let mY = $derived(y * frameUnit)
</script>

<div
  {id}
  style={`width: ${w}rem; padding: 1rem; left: ${mX}px; top: ${mY}px; `}
  class={cx(
    `block text-left absolute z-20 max-w-none bg-white/90 max-w-full -translate-x-1/2 -translate-y-1/2
    w-100 rounded-md hover:bg-gray-200 cursor-alias shadow-[0_1.5px_0px_2px_#888]`,
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
</div>
