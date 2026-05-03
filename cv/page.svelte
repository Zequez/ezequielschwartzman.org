<script module lang="ts">
  export const metadata = {
    title: 'Curriculum Vitae',
  }
</script>

<script lang="ts">
  import pageBgPattern from '../photos/textures/subtle-white-feathers.png'
  import cardBgPattern from '../photos/textures/old-moon.png'

  import CVBlock, {
    type BlockType,
    blockTypes,
  } from './components/CVBlock.svelte'
  import CVButton from './components/CVButton.svelte'
  import DarkToggle from '../components/DarkToggle.svelte'

  import { type SvelteComponent } from 'svelte'
  import { resolveTitle } from './utils'

  type Item = {
    default: SvelteComponent
    metadata: {
      title: string
      blockType: string
      size: string
      datePrecision: string
      fromDate: string
      toDate?: string
    }
  }

  const blocks = import.meta.glob('./items/*.svx', {
    eager: true,
  }) as {
    [key: string]: Item
  }

  const activeBlockTypes = $state<BlockType[]>([
    'passionProject',
    'hiredProject',
    'training',
    'travel',
    'septenary',
    'core',
  ])

  function toggleBlockType(blockType: BlockType) {
    if (activeBlockTypes.indexOf(blockType) === -1) {
      activeBlockTypes.push(blockType)
    } else {
      activeBlockTypes.splice(activeBlockTypes.indexOf(blockType), 1)
    }
  }

  let filteredBlocks = $derived(
    Object.fromEntries(
      Object.entries(blocks)
        .filter(([slug, b]) => {
          if (slug.endsWith('PASSION-template.svx')) return false
          const slugBlockType = slugToBlockType(slug)

          // console.log(slug, b)
          b.metadata.blockType = slugBlockType
          return activeBlockTypes.includes(b.metadata.blockType)
        })
        .reverse(),
    ),
  )

  function slugToBlockType(slug: string): string {
    const slugs = slug.split('/')
    const slugType = slugs[slugs.length - 1].split('-')[1]
    if (slugType === 'PASSION') return 'passionProject'
    if (slugType === 'HIRED') return 'hiredProject'
    if (slugType === 'TRAINING') return 'training'
    if (slugType === 'TRAVEL') return 'travel'
    if (slugType === 'SEPTENARY') return 'septenary'
    if (slugType === 'CORE') return 'core'

    return 'passionProject'
  }

  let visualMode = $state<'wavy' | 'grid' | 'center'>('wavy')

  console.log('a a ssssssssssrsrsssssa')

  let blocksBySeven = $derived(
    Object.entries(filteredBlocks).reduce<{
      [key: string]: { [key: string]: Item }
    }>((all, [slug, b]) => {
      const age = Number(slug.replace(/\.\/items\//, '').split('-')[0])
      console.log(age)
      const group = Math.floor(age / 7)
      all[group] = all[group] || {}
      all[group][slug] = b
      return all
    }, {}),
  )
</script>

<div class="absolute top-6 left-6">
  <DarkToggle />
</div>

<div
  class="flex flex-col justify-center items-center font-serif py24 px6 bg-stone-100 dark:bg-gray-800"
  style={`background-image: url(${pageBgPattern})`}
>
  <div class="mb24 text-center">
    <h1
      data-emboss="Curriculum Vitae"
      class="relative text-14/24 md:text-18/24 my-6 font-bold"
      ><span
        class="text-transparent relative z-2 bg-clip-text bg-gradient-to-b from-gray-600 to-gray-700 dark:(from-gray-200 to-gray-300)"
        >Curriculum Vitae</span
      ></h1
    >
    <div class="text-8/12 -mt-6 font-italic opacity-50 dark:opacity-70"
      >Literally means «Course of Life»</div
    >
  </div>
  <!-- <div
    class="bg-red-300 flexcc -mt6 text-white b-2 b-black/20 text-shadow-[0_1px_0_#0006] font-bold font-mono py-3 px6 rounded-2 uppercase text-6/12 mb-12"
  >
    <div class="mr-4 -mt-1 text-1.2em">
      <div
        class="i-fa6-solid-triangle-exclamation h-8 w-8 flexcc text-black/40"
      >
      </div>
      <div
        class="i-fa6-solid-triangle-exclamation h-8 w-8 flexcc -mt-8.40 text-white"
      >
      </div>
    </div>Under construction
  </div> -->

  <div
    class="flexcc flex-wrap space-x-6 text-white mb6 bg-slate-200 bg-gradient-to-b from-white/40 to-white/70 pt6 rounded-2 px6 shadow-[inset_0_-1.5px_0_#0005,0_0_0px_1px_#0001,inset_0_0_20px_#0001] dark:shadow-[inset_0_-1.5px_0_#0005,0_0_4px_0_#000f] mb12"
  >
    {#each Object.keys(blockTypes) as blockType}
      {@const { title, hue } = blockTypes[blockType]}
      {@const isActive = activeBlockTypes.includes(blockType)}
      <CVButton
        {isActive}
        {hue}
        {title}
        onClick={() => toggleBlockType(blockType)}
      />
    {/each}

    <div class="text-white grid cols-2 sm:cols-3 gap-3 mb-6">
      {#each Object.entries(blocksBySeven).reverse() as [group, blocks], i}
        {@const g = Number(group)}
        {@const isLast = i === 0}
        <div>
          <div class="rounded-2 overflow-hidden bg-gray-800">
            <div class="text-7/12 text-center">
              {#if isLast}
                {g * 7}+
              {:else}
                {g * 7}-{(g + 1) * 7}
              {/if}
            </div>
            {#each Object.entries(blocks) as [slug, item] (slug)}
              {@const title = resolveTitle(slug, item.metadata.title)}
              {@const { hue } = blockTypes[item.metadata.blockType]}
              <a
                href={`#${slug}`}
                class="text-3/6 block px1.5 font-mono hover:brightness-110 shadow-[inset_0_-1px_0_#0005] last:shadow-none"
                style={`background-color: oklch(0.55 0.20 ${hue});`}>{title}</a
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- <div class="flexcc">
    <button
      aria-label="Wavy mode"
      class="h-12 w-12 bg-red mb6 flexcc"
      onclick={() => (visualMode = 'wavy')}
    >
      <div class="i-fa6-solid-s text-6"></div>
    </button>
    <button
      aria-label="Grid mode"
      class="h-12 w-12 bg-red mb6 flexcc"
      onclick={() => (visualMode = 'grid')}
    >
      <div class="i-fa6-solid-wave-square text-6"></div>
    </button>
    <button
      aria-label="Center mode"
      class="h-12 w-12 bg-red mb6 flexcc"
      onclick={() => (visualMode = 'center')}
    >
      <div class="i-fa6-solid-align-center text-6"></div>
    </button>
  </div> -->

  {#if visualMode === 'grid'}
    <div class={'w-full relative grid cols-1 sm:cols-2 md:cols-4 gap-0.5 mb6'}>
      <!-- <div class="w-full pt-100% bg-green"></div> -->
      {#each Object.entries(filteredBlocks) as [slug, { default: Comp, metadata }], i (slug)}
        {@const Comp2 = Comp as any}
        {#if activeBlockTypes.includes(metadata.blockType)}
          {@const { hue } = blockTypes[metadata.blockType]}
          {@const title = resolveTitle(slug, metadata.title)}
          <div
            style={`background-color: oklch(0.55 0.20 ${hue}); background-image: url(${cardBgPattern});`}
            class="text-white sm:flex-col font-bold text-shadow-[0_1px_0_#0005] rounded-1 flexcc text-center tracking-wider bg-gradient-to-r from-black/10 to-black/0 shadow-[inset_0_-1.5px_0_#0005,inset_0_0_40px_#0001,inset_0_2.5px_0px_#fff5]"
          >
            <div class="text-4.5/6 h18 flexcc w-1/2 sm:w-auto px-1.5"
              >{title}</div
            >
            <div class="w-full pt-40% sm:pt-61% bg-black rounded-b-1"></div>
          </div>
        {/if}
      {/each}
    </div>
  {:else if visualMode === 'wavy'}
    <div class={`w-full`}>
      {#each Object.entries(filteredBlocks) as [slug, { default: Comp, metadata }], i (slug)}
        {@const Comp2 = Comp as any}
        {#if activeBlockTypes.includes(metadata.blockType)}
          <CVBlock {...metadata as any} n={i} {slug}>
            <Comp2 />
          </CVBlock>
        {/if}
      {/each}
    </div>
  {:else if visualMode === 'center'}
    <div class={`w-full`}>
      {#each Object.entries(filteredBlocks) as [slug, { default: Comp, metadata }], i (slug)}
        {@const Comp2 = Comp as any}
        {#if activeBlockTypes.includes(metadata.blockType)}
          <CVBlock {...metadata as any} n={0} {slug}>
            <Comp2 />
          </CVBlock>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style global>
  [data-emboss]:before {
    content: attr(data-emboss);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    text-shadow:
      0 -1px 0 #ccc,
      0 1px 0 #000,
      0 0 10px #fff;
  }

  :global(.dark) [data-emboss]:before {
    text-shadow:
      0 -1px 0 #ccc,
      0 1px 0 #000,
      0 0 10px #fff5;
  }
</style>
