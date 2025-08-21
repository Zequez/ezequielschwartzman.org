<script lang="ts">
  import { onMount } from 'svelte'
  import { render } from 'preact'
  import type { MDXContent } from 'mdx/types'

  const { component }: { component: MDXContent } = $props()
  let el = $state<HTMLDivElement | null>(null)

  onMount(() => {
    render(component({}), el!)
  })
</script>

<div bind:this={el}></div>
