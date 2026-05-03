<script lang="ts">
  import imgs, { sizes } from '../photos'
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'
  import debutLight from '@@@/photos/textures/debut-light.png'

  const { id, alt, ids } = $props<
    { id: string; alt: string } | { ids: [string, string][] }
  >()

  let shownId = $state(id || ids[0][0])
  let shownAlt = $state(alt || ids[0][1])

  console.log(ids)

  $effect(() => {
    console.log(ids)
  })

  function setShown(id: string, alt: string) {
    shownId = id
    shownAlt = alt
  }

  // Intentionally non-reactive
  // svelte-ignore state_referenced_locally
  const heightRatio = imgs[shownId].meta.height / imgs[shownId].meta.width
</script>

<div
  style={`border-color: oklch(0.75 0.14 var(--hue)); background-color: oklch(0.4 0.05 var(--hue)); --un-shadow-color: oklch(0.5 0.10 var(--hue)); background-image: url(${debutLight});`}
  class="-mx-13.5 rounded-2 overflow-hidden shadow-[0_1.5px_0_#0006,0_0_0_1px_#0003,0_0_7px_#0003] b-3 b-black/40"
>
  <div class="w-full">
    <div style={`padding-top: ${heightRatio * 100}%`} class="w-full relative">
      <a
        href={imgs[shownId].src[imgs[shownId].src.length - 1]}
        target="_blank"
        class="absolute inset-0 flexcc cursor-pointer"
      >
        <OptimizedImg
          src={imgs[shownId].src}
          meta={imgs[shownId].meta}
          {sizes}
          class="object-scale-down max-h-full max-w-full"
          alt={shownAlt}
        />
      </a>
    </div>
  </div>
  {#if ids.length > 1}
    <div class="h-24 flexcc p1 space-x-1">
      {#each ids as [id, alt] (id)}
        {@const isActive = id === shownId}
        <button
          onclick={() => setShown(id, alt)}
          class="h-full w22 p1 relative cursor-pointer hover:brightness-105"
        >
          <!-- {#if isActive}
            <div class="bg-white/50 absolute inset-1.5 rounded-2"></div>
          {/if} -->
          <img
            style={isActive
              ? `border-color: oklch(0.75 0.14 var(--hue));`
              : 'border-color: oklch(0.65 0.10 var(--hue));;'}
            class={[
              'size-full  object-cover rounded-1 shadow-[0_1px_0_#0006]',
              {
                'b ': !isActive,
                'b-4': isActive,
              },
            ]}
            src={imgs[id].src[0]}
            {alt}
          />
        </button>
      {/each}
    </div>
  {/if}
  <!-- <div class="text-center text-4/6 py-3 text-white text-shadow-[0_1px_0_#0006]"
    >{alt}</div
  > -->
</div>
