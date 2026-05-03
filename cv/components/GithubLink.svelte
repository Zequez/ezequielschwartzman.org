<script lang="ts">
  const { url } = $props<{ url: string }>()
</script>

<a
  href={url}
  target="_blank"
  class="relative group w-full no-underline! whitespace-nowrap h-24 flex bg-gray-100 hover:brightness-105 shadow-[0_1.5px_0_#0005] rounded-2 overflow-hidden"
>
  <span class="h-full w-24 flexcc text-black/80 shrink-0">
    <span class="i-fa6-brands-github text-50px"></span>
  </span>
  <span
    class="text-black/80 flexcs font-mono text-5/12 text-shadow-[0_1px_0_#fff]"
    >{url.replace('https://github.com/', '')}</span
  >
  <!-- <span
    class="absolute flexcc opacity-0 transition-opacity group-hover:opacity-100 h24 w24 right-1.5 top-1.5"
  >
    <span class="i-fa6-solid-arrow-right-to-bracket text-sky-500 text-8"></span>
  </span> -->
</a>
