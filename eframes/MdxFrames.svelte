<script lang="ts">
  import FrameEl from './Frame.svelte'
  import PreactWrapper from './PreactWrapper.svelte'
  import framesStore from './frames-store.svelte'
  import { Pin } from '../canvas'

  const FC = framesStore.initContext({})
</script>

{#each FC.frames as frame (frame.id)}
  <Pin id={frame.id} pos={frame.fm} debug={false}>
    <FrameEl p={frame.fm} id={frame.id}>
      <PreactWrapper component={frame.component} />
    </FrameEl>
  </Pin>
{/each}
