<script lang="ts">
  import { onMount } from 'svelte'

  const props: { scale: number; children: any } = $props()
  let container: HTMLDivElement
</script>

<div bind:this={container}>
  <div
    class={[
      'scale-25 pointer-events-none transform-origin-tl w-screen overflow-hidden ',
      'bg-gray-100 text-gray-950 dark:(bg-gray-950! text-gray-100!)',
    ]}
  >
    {@render props.children()}
  </div>
</div>
