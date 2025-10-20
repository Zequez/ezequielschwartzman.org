<script module>
  export const metadata = {
    title: 'Personal Card',
  }
</script>

<script lang="ts">
  import { lsState } from '@/center/utils/runes.svelte'

  import StarrySky from '../components/StarrySky.svelte'

  import ezequiel from '../photos/ezequiel.jpg'

  let printMode = lsState('card-print-mode', { v: false })
</script>

{#snippet card()}
  <div
    class={[
      'text-gray-950 overflow-hidden flex-shrink-0',
      'w-94mm h-58mm bg-gray-50 pt6mm relative',
      'bg-gray-950 shadow-[inset_0_0_0_1.5mm_#000]',
      'rounded-0 relative',
    ]}
  >
    <div
      class="absolute inset-2mm z-9 bg-white rounded-2mm shadow-[inset_0_-1mm_0_0_#0005]"
    ></div>
    <div class="w-full h-full relative z-10">
      <div class="flexcc flex w-full">
        <div class="flex">
          <!-- <div class="flex-grow flexcc"> -->
          <img
            src={ezequiel}
            alt="Ezequiel"
            class="w20mm filter-grayscale h20mm object-fill rounded-full"
          />
          <!-- </div> -->
          <div
            class="font-serif font-bold tracking-wider text-left ml4mm flex-shrink-0 text-7mm lh-10mm"
          >
            <div>Ezequiel Adrián</div>
            <div class="text-8.32mm">Schwartzman</div>
          </div>
        </div>
      </div>
      <div class="font-mono mt6mm text-center lh-4mm text-3.085mm px6mm"
        >Artista, Inventor, Constructor de Mundos de Juego, Investigador y
        Sostenedor de Espacios</div
      >
      <div class="mt4mm text-center px6mm font-mono lh-4mm text-3.2mm flex">
        <span class="[word-spacing:-4px] underline underline-(offset-5 dashed)"
          >+54 9 223 5235568</span
        >
        <span class="flex-grow"></span>
        <span class="underline underline-(offset-5)"
          >ezequielschwartzman.org</span
        >
      </div>

      <div class="text-right pr6mm font-mono lh-4mm text-3.2mm"> </div>
    </div>
    <!-- <div class="h-full w-58mm absolute top-0 right-0 bg-red-400/40"> </div>
    <div class="h-[61.8%] w-full absolute top-0 left-0 bg-red-400/40"> </div> -->
  </div>
{/snippet}

<div class="w-full relative bg-gray-950">
  <!-- <StarrySky class="print:hidden" /> -->
  <div class="flexcc py6 print:p0 z-100 relative">
    <button
      class={[
        'print:hidden',
        'bg-gray-50 rounded-1 py3 px6 text-white uppercase font-bold',
        'transition-all transition-duration-1000',
        {
          'bg-gray-500/25 text-white/25': !printMode.v,
          'bg-yellow-500 shadow-[0_0_15px_10px_hsla(50deg,100%,75%,0.5)]':
            printMode.v,
        },
      ]}
      onclick={() => (printMode.v = !printMode.v)}>Print Mode</button
    >
  </div>
  {#if printMode.v}
    <div
      class="mx-auto scale-80 print:(m0 scale-100 overflow-hidden) w-[210mm] h-[297mm] bg-gray-100 relative"
    >
      <div
        class="pt-7.5mm w-[297mm] h-[210mm] bg-white max-w-none absolute left-1/2 top-1/2 -translate-1/2 print:rotate-90"
      >
        <div class="flexcc flex-wrap">
          {@render card()}
          {@render card()}
          {@render card()}
          {@render card()}
          {@render card()}
          {@render card()}
          {@render card()}
          {@render card()}
          {@render card()}
        </div>
      </div>
    </div>
  {:else}
    <div class="flexcc py6">
      {@render card()}
    </div>
  {/if}
</div>

<style>
  @page {
    size: A4;
    margin: 0;
  }
</style>
