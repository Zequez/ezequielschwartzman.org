<script lang="ts">
  const { href, children } = $props<{ href: string; children?: any }>()
</script>

<a
  class="flex group no-underline! hover:brightness-110 relative bg-gray-50 cursor-pointer py-1.5 px3 rounded-2 text-black/70 shadow-[0_1.5px_0_#0005]"
  target="_blank"
  {href}
>
  <span class="w-12 flexcc h-12 mr1.5">
    <span class="i-fa6-solid-globe text-8"></span>
  </span>
  <span class="flex flex-col">
    <span class="text-3/6 font-mono underline"
      >{href.replace(/https?:\/\//, '')}</span
    >
    <span class="text-4.5/6 font-bold">{@render children?.()}</span>
  </span>
  <span
    class="absolute flexcc opacity-0 transition-opacity group-hover:opacity-100 h12 w12 right-1.5 top-1.5"
  >
    <span class="i-fa6-solid-arrow-right-to-bracket text-sky-400 text-8"></span>
  </span>
</a>
