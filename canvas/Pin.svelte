<script lang="ts">
  import { onMount } from 'svelte'
  import store from './canvas-store.svelte'

  const {
    id,
    pos,
    debug,
    children,
  }: {
    id: string
    pos: { x: number; y: number }
    debug?: boolean
    children?: any
  } = $props()

  const CS = store.getContext()

  // onMount(() => {
  //   return () => {
  //     CS.cmd.unregisterPin(id)
  //   }
  // })

  let el: HTMLElement
  // let prevPos: typeof pos | null = null
  // $effect(() => {
  //   if (!prevPos) {
  //     console.log('PIN CREATED')
  //   } else if (prevPos !== pos) {
  //     console.log('PIN UPDATED', pos)
  //   } else {
  //     return
  //   }
  //   prevPos = pos
  //   CS.cmd.registerPin(id, { x: pos.x, y: pos.y, el })
  // })
</script>

{#if debug}
  <div
    class="absolute w10 h10 -translate-1/2 bg-white rounded-full flexcc flex-col font-mono z-999 text-[8px] b-3 b-black/20 pointer-events-none whitespace-nowrap"
    style="left: {pos.x}px; top: {pos.y}px;"
  >
    <div class="bg-black text-white rounded-sm px.5 mb.5">{id}</div>
    <div class="bg-black text-white rounded-sm px.5">{pos.x},{pos.y}</div>
  </div>
{/if}

<div
  class="absolute pointer-events-none"
  style="left: {pos.x}px; top: {pos.y}px;"
  bind:this={el}
>
  <div class="absolute -top-100px left-0" {id}></div>
  {#if children}
    {@render children()}
  {/if}
</div>
