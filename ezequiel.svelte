<script lang="ts">
  // import ezequiel from '/assets/ezequiel.jpg'
  import SS from '@/store/store.svelte'
  import ezequiel from './ezequiel.jpg'

  const S = SS.store
</script>

<div class="rounded-b-md overflow-hidden relative h-full w-full">
  <!-- <div
    class="absolute inset-0 flexcc bg-black text-white text-xl whitespace-pre-line z-200"
    >{JSON.stringify(S.framesComponents['ezequiel'].meta, null, 2)}</div
  > -->
  <img
    class="w-full h-full object-cover"
    src={ezequiel}
    alt="Ezequiel on the park smiling"
    draggable="false"
  />
  <div
    class="absolute bottom-0 font-thin left-0 w-full pl4 pb4 pt4
     text-white
    text-[35px] line-height-[1]
    font-black text-shadow-[0px_0px_2px_rgba(0,0,0,0.8)] tracking-wide"
  >
    <span
      class="mb1 inline-block p1 px2 backdrop-blur-2 rounded-[4px] bg-black/20"
    >
      Ezequiel
    </span>
    <br />

    <span
      class="mb1 inline-block p1 px2 backdrop-blur-2 rounded-[4px] bg-black/20"
    >
      Adrián
    </span>
    <br />
    <span class="inline-block p1 px2 backdrop-blur-2 rounded-[4px] bg-black/20">
      Schwartzman
    </span>
  </div>
</div>
