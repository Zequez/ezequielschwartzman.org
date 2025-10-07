<script lang="ts">
  // import { getContext } from 'svelte'

  const props: { children: any } = $props()

  // const isPreviewMode = (getContext('preview-page-mode') as boolean) || false
</script>

<!-- <svelte:head>
  {#if props.title && !isPreviewMode}
    <title>{props.title}</title>
  {/if}
</svelte:head> -->

<div class="max-w-screen-md mx-auto px6 doc">
  {@render props.children?.()}
</div>

<style>
  .doc :global(h1) {
    @apply text-12 font-serif font-bold text-center my6;
  }

  .doc :global(h2) {
    @apply text-8 font-serif font-bold mb6;
  }

  .doc :global(h3) {
    @apply text-6 line-height-12 font-sans underline underline-(offset-2 2 black/70) mb6;
  }

  .doc :global(p) {
    @apply mb6;
  }

  .doc :global(ul),
  .doc :global(ol) {
    @apply mb6 pl6;
  }

  .doc :global(li) {
    @apply list-disc list-inside;
  }

  .doc :global(ol li) {
    @apply list-decimal list-inside;
  }
</style>
