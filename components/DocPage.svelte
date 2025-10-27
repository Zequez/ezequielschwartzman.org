<script lang="ts">
  import '@/center/doc.css'
  import type { ClassValue } from 'svelte/elements'

  const props: { children: any; class?: ClassValue } = $props()
</script>

<div class={['max-w-screen-md mx-auto px6 doc pb12', props.class]}>
  {@render props.children?.()}
</div>
