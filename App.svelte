<script lang="ts">
  import App from '@/substrates/toroid-web/components/App.svelte'
  import favicon from './photos/favicon.jpg'
  import guarda from './photos/guarda.svg'
  import noiseAbstract from '@/center/collections/patterns/noise-abstract.png'
</script>

<App
  title="Ezequiel Adrián Schwartzman"
  {favicon}
  nav={[
    [
      'index',
      'written',
      'curriculum-vitae',
      'birth-celestial-influences',
      // "material-lovers"
    ],
    ['web-gallery'], // 'on-my-workbench',
    // [
    // "servicio-web",
    // "hola"
    // ],
    // [
    // "flowing-fund-gameworld",
    // "flowing-fund",
    // "etimologia-nueva",
    // "aprendimientos",
    // "distincionario"
    // ],
  ]}
>
  {#snippet NavContainerBg()}
    <div
      class="w-full h-full bg-slate-600 dark:bg-slate-800"
      style={`background-image: url(${noiseAbstract})`}
    ></div>
  {/snippet}

  {#snippet RailingBar()}
    <span
      class={[
        'size-full relative flexcc font-serif overflow-hidden h10',
        'shadow-[0_-1px_0px_#0003,0_-2px_10px_#0004]',
        'b-t-1 b-b-1 b-black/20 dark:b-white/50',
        'bg-gray-200 text-gray-600 text-shadow-[0_1px_0_#fff]',
        'dark:(bg-gray-800! text-gray-300! text-shadow-[0_1px_0_#000])',
      ]}
    >
      <span class="block relative">
        <span
          class="absolute block top-10% right-100% mr1 h-80% opacity-30 dark:filter-invert"
        >
          <img
            src={guarda}
            class="h-full max-w-none"
            alt="Intricate design on left of name"
          />
        </span>

        Ezequiel Adrián Schwartzman

        <span
          class="absolute block top-10% left-100% ml1 h-80% scale-x-[-1] opacity-30 dark:filter-invert"
        >
          <img
            src={guarda}
            class="h-full max-w-none"
            alt="Intricate design on right of name"
          />
        </span>
      </span>
    </span>
  {/snippet}
</App>
