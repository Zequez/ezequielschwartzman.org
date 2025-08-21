<script lang="ts">
  import { Markdown } from 'svelte-rune-markdown'
  import { onMount } from 'svelte'

  let slotContent = ''

  // optional: collect content after slot is rendered
  onMount(() => {
    const el = document.querySelector('#markdown-slot') as HTMLElement
    if (el) {
      slotContent = el.innerHTML
    }
  })
</script>

<!-- This div is hidden but used to extract raw slot content -->
<div id="markdown-slot" class="hidden" aria-hidden="true">
  <slot />
</div>

{#if slotContent}
  <Markdown content={slotContent} />
{/if}
