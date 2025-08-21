<script lang="ts">
  import BgFrame from './BgFrame.svelte'
  import bg from './bg.svg'
  import miniGarden from './photos/mini-garden.jpg'
  import faces from './photos/faces/stitched.jpg'
</script>

<BgFrame x={0} y={-600} rotateForward={true}>
  <div
    class="flex flex-wrap overflow-hidden scale-100 rounded-xl w400px contrast-150"
  >
    <img src={faces} alt="Faces" class="max-w-none h400px w400px" />
  </div>
</BgFrame>
<BgFrame x={0} y={0}>
  <img src={bg} alt="Background painting" class="max-w-none w-1000px" />
</BgFrame>
<BgFrame x={800} y={-50}>
  <img
    class="w-500px max-w-none rounded-xl"
    src={miniGarden}
    alt="Miniature moss garden growing on a brick"
  />
</BgFrame>
