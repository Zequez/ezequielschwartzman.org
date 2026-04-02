<script lang="ts">
  import pageBgPattern from '../photos/subtle-white-feathers.png'

  import CVBlock, {
    type BlockType,
    blockTypes,
  } from '../components/CVBlock.svelte'
  import CVButton from '../components/CVButton.svelte'
  import DarkToggle from '../components/DarkToggle.svelte'

  import { type SvelteComponent } from 'svelte'

  const blocks = import.meta.glob('../cv/*.svx', {
    eager: true,
  }) as {
    [key: string]: {
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

          console.log(slug, b)
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

  console.log('a  ssssssrsrssssa')
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
    class="flexcc flex-wrap space-x-6 text-white mb6 bg-slate-200 bg-gradient-to-b from-white/50 to-white/0 pt6 rounded-2 px6 shadow-[inset_0_-1.5px_0_#0005,0_0_0px_1px_#0001] dark:shadow-[inset_0_-1.5px_0_#0005,0_0_4px_0_#000f] mb12"
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
  </div>
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
