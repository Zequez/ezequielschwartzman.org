<script lang="ts">
  import { onMount } from 'svelte'
  import store from './canvas-store.svelte'

  const {
    id,
    x,
    y,
    debug,
    children,
  }: { id: string; x: number; y: number; debug?: boolean; children?: any } =
    $props()

  const CS = store.getContext()

  onMount(() => {
    return () => {
      CS.cmd.unregisterPin(id)
    }
  })

  let el: HTMLElement
  $effect(() => {
    CS.cmd.registerPin(id, { x, y, el })
  })
</script>

{#if debug}
  <div
    class="absolute w10 h10 -translate-1/2 bg-white rounded-full flexcc flex-col font-mono z-999 text-[8px] b-3 b-black/20"
    style="left: {x}px; top: {y}px;"
  >
    <div>{id}</div>
    <div>{x},{y}</div>
  </div>
{/if}

<div
  class="absolute pointer-events-none"
  style="left: {x}px; top: {y}px;"
  bind:this={el}
>
  {#if children}
    {@render children()}
  {/if}
</div>
