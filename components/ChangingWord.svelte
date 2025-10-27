<script lang="ts">
  import { getContext, onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  const props: { text: string } = $props()

  const allWords = $derived(props.text.split('/'))
  const isPreviewMode = getContext('preview-page-mode')

  let wordShown = $state(0)
  onMount(() => {
    let interval: any = null
    setTimeout(() => {
      interval = setInterval(() => {
        if (wordShown < allWords.length - 1) {
          wordShown++
        } else {
          wordShown = 0
        }
      }, 3000)
    }, Math.random() * 750)

    return () => clearInterval(interval)
  })
</script>

<span>
  {#if isPreviewMode}
    <div>{props.text}</div>
  {:else}
    <!-- ChatGPT -->
    <div class="relative h6 w-full">
      {#each allWords as word, i (word)}
        {#if wordShown === i}
          <span class="absolute top-1/2 left-1/2 -translate-x-1/2">{word}</span>
        {/if}
      {/each}
    </div>
  {/if}
</span>
