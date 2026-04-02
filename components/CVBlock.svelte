<script module lang="ts">
  export const blockTypes: {
    [key: string]: {
      title: string
      hue: number
    }
  } = {
    passionProject: {
      title: 'Passion Project',
      hue: 140,
    },
    hiredProject: {
      title: 'Hired For',
      hue: 240,
    },
    training: {
      title: 'Training',
      hue: 280,
    },
    travel: {
      title: 'Travel',
      hue: 200,
    },
    septenary: {
      title: 'Septenary',
      hue: 35,
    },
    core: {
      title: 'Life Stage',
      hue: 5,
    },
  }

  export type BlockType = keyof typeof blockTypes
</script>

<script lang="ts">
  import cardBgPattern from '../photos/old-moon.png'

  const {
    blockType,
    title,
    slug,
    size = 'md',
    shrinked = false,
    n,
    fromDate,
    toDate,
    children,
  } = $props<{
    blockType: BlockType
    title: string
    slug: string
    shift?: number
    shrinked?: boolean
    n: number
    size?: 'xs' | 'sm' | 'md' | 'lg'
    fromDate: string
    toDate?: string
    children?: any
  }>()

  const resolvedTitle = $derived.by(() => {
    if (title) return title
    const splits = slug.split('/')
    const slugName = splits[splits.length - 1]
      .split('-')
      .slice(2)
      .map((s: any) => s[0].toUpperCase() + s.slice(1))
      .join(' ')
      .replace('.svx', '')
    return slugName
  })

  const { hue, title: bTitle } = blockTypes[blockType]
  const shift = $derived(Math.sin((n - Math.PI / 2) * 0.3))
  const shiftWeight = $derived(Math.abs(shift * 50))
  const shiftNext = $derived(Math.sin((n + 1 - Math.PI / 2) * 0.3))
  const shiftWeightNext = $derived(Math.abs(shiftNext * 50))
  const shiftDerivative = $derived(shiftWeightNext - shiftWeight)

  const dateFromSplits = $derived(fromDate.split('-').map(Number))
  const toDateFromSplits = $derived(
    toDate ? toDate.split('-').map(Number) : null,
  )
  const datePrecision = $derived.by(() => {
    const splits = fromDate.split('-').length
    return splits === 1 ? 'y' : splits === 2 ? 'm' : 'd'
  })

  function monthNToName(n: number) {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ][n - 1]
  }

  function monthNToNameShort(n: number) {
    return [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ][n - 1]
  }

  function thDate(d: number) {
    if (d === 1 || d === 21 || d === 31) {
      return `${d}st`
    } else if (d === 2 || d === 22) {
      return `${d}nd`
    } else if (d === 3 || d === 23) {
      return `${d}rd`
    } else {
      return `${d}th`
    }
  }
</script>

<div class="max-w-screen-xl w-full mx-auto flexcc mb-6">
  <div
    class="bg-red-400 h-full hidden sm:block"
    style={`order:0; width: ${50 - shiftWeight}%;`}
  ></div>
  <div
    class="bg-blue-400 h-full hidden sm:block"
    style={`order: 2; width: ${shiftWeight}%;`}
  ></div>
  <div
    style={`background-color: oklch(0.55 0.20 ${hue}); --un-skew-x: skewX(${shiftDerivative * -0.05}deg);`}
    class={[
      'relative max-w-full order-1 bg-black transform-none sm:transform rounded-2 text-white p12 tracking-wider bg-gradient-to-r from-black/10 to-black/0 shadow-[inset_0_-1.5px_0_#0005,inset_0_0_40px_#0001,inset_0_2.5px_0px_#fff5,0.5px_1.3px_2px_0.5px_#0008]',
      {
        'w-screen-xs': size === 'xs',
        'w-screen-sm': size === 'sm',
        'w-screen-md': size === 'md',
        'w-screen-lg': size === 'lg',
        'py-6 cursor-pointer hover:brightness-105': shrinked,
      },
    ]}
  >
    <div
      class="absolute inset-0 z-1 rounded-2 pointer-events-none"
      style={`background-image: url(${cardBgPattern})`}
    ></div>
    {#if !shrinked}
      <div
        class="absolute z-2 w-1 top-8 left-3.5 bottom-7 bg-black/20 bg-gradient-to-r from-black/20 to-black/0 rounded-full shadow-[1px_1px_0_0_#fff3]"
      ></div>
      <div
        class="absolute z-2 w-1 top-8 right-3.5 bottom-7 bg-black/20 bg-gradient-to-r from-black/20 to-black/0 rounded-full shadow-[1px_1px_0_0_#fff3]"
      ></div>
      <div
        class="absolute z-2 w-2 h-2 left-3 bottom-3 bg-black/20 rounded-full bg-gradient-to-r from-black/20 to-black/0 rounded-full shadow-[1px_1px_0_0_#fff3]"
      ></div>
      <div
        class="absolute z-2 w-2 h-2 right-3 bottom-3 bg-black/20 rounded-full bg-gradient-to-r from-black/20 to-black/0 rounded-full shadow-[1px_1px_0_0_#fff3]"
      ></div>
      <div
        class="relative flex z-3 font-italic text-5/6 text-gray-100 text-shadow-[0_1px_0_#0006]"
      >
        <div class="grow">{bTitle}</div>
        {#snippet ddate(splitDate: number[])}
          {#if datePrecision === 'd'}
            {thDate(splitDate[2])}
          {/if}
          {#if datePrecision === 'm' || datePrecision === 'd'}
            <span class="hidden md:inline">{monthNToName(splitDate[1])}</span>
            <span class="md:hidden">{monthNToNameShort(splitDate[1])}</span>
          {/if}
          {splitDate[0]}
        {/snippet}
        <div>
          <!-- {#if datePrecision !== 'd'}
            ~
          {/if} -->
          {@render ddate(dateFromSplits)}
          {#if toDateFromSplits}
            -
            {@render ddate(toDateFromSplits)}
          {/if}
        </div>
      </div>
    {/if}
    <div
      class="absolute z-2 w-2 h-2 left-3 top-4 bg-black/20 rounded-full bg-gradient-to-r from-black/20 to-black/0 rounded-full shadow-[1px_1px_0_0_#fff3]"
    ></div>

    <div
      class="absolute z-2 w-2 h-2 right-3 top-4 bg-black/20 rounded-full bg-gradient-to-r from-black/20 to-black/0 rounded-full shadow-[1px_1px_0_0_#fff3]"
    ></div>

    <div
      class={[
        'relative z-3 font-serif text-8/12 my-6 font-bold text-white text-shadow-[0_1px_0_#0006]',
      ]}
    >
      {resolvedTitle}
    </div>
    {#if !shrinked}
      <div class="relative z-3 font-sans text-4.5/6 markdown">
        {@render children?.()}
      </div>
    {/if}
  </div>
</div>

<style global>
  :global(.markdown > *) {
    @apply mb6;
  }

  :global(.markdown > *:last-child) {
    @apply mb0;
  }
</style>
