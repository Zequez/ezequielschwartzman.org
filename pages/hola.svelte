<script module lang="ts">
  export const metadata = { title: 'Hola' }
  import DocPage from '@/substrates/toroid-web/components/DocPage.svelte'
  import IconSun from '~icons/fa6-solid/sun'
</script>

<div
  class="min-h-screen bg-gradient-to-b from-yellow-200 to-orange-300 p-6 font-sans flex flex-col items-center space-y-10"
>
  <header
    class="text-5xl font-bold text-orange-700 tracking-wide drop-shadow-xl mt-6"
  >
    Vanesa
    <IconSun />
  </header>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl"
  >
    <div
      class="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-orange-200 hover:scale-[1.02] transition-transform"
    >
      <h2 class="text-2xl font-semibold text-orange-800 mb-3">Sol radiante</h2>
      <p class="text-orange-900/80 mb-4"
        >Un pequeño mensaje cálido que ilumina como un amanecer suave.</p
      >
      <img
        src=""
        alt="imagen"
        class="w-full h-40 object-cover rounded-xl bg-yellow-100/60"
      />
    </div>

    <div
      class="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-orange-200 hover:scale-[1.02] transition-transform"
    >
      <h2 class="text-2xl font-semibold text-orange-800 mb-3"
        >Flores danzantes</h2
      >
      <p class="text-orange-900/80 mb-4"
        >Algo en movimiento, como la brisa que le habla a las hojas.</p
      >
      <img
        src=""
        alt="imagen"
        class="w-full h-40 object-cover rounded-xl bg-orange-100/60"
      />
    </div>

    <div
      class="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-orange-200 hover:scale-[1.02] transition-transform"
    >
      <h2 class="text-2xl font-semibold text-orange-800 mb-3">Sueño dorado</h2>
      <p class="text-orange-900/80 mb-4"
        >Los colores cálidos que abrazan como una siesta después del mediodía.</p
      >
      <img
        src=""
        alt="imagen"
        class="w-full h-40 object-cover rounded-xl bg-yellow-200/60"
      />
    </div>
  </div>

  <div class="mt-10 text-center max-w-xl text-orange-900/90 leading-relaxed">
    <p class="text-xl">
      Y aquí un toque inesperado: un pequeño remolino decorativo que gira en tu
      imaginación.
    </p>
    <div
      class="mt-6 w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-500 animate-spin-slow shadow-lg mx-auto"
    ></div>
  </div>
</div>

<style>
  @keyframes spin-slow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
</style>
