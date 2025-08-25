<script lang="ts">
  import FrameEl from './Frame.svelte'
  import PreactWrapper from './PreactWrapper.svelte'
  import framesStore from './frames-store.svelte'
  import { Pin } from '../canvas'
  import rootStore from '../lib/root-store.svelte'

  const FS = framesStore.getContext()
  const RS = rootStore.getContext()

  export const context = FS
</script>

{#each FS.frames as frame (frame.id)}
  {#if !RS.backgroundMode || (RS.backgroundMode && frame.fm.layer === 'bg')}
    <Pin id={frame.id} pos={frame.fm} debug={false}>
      <FrameEl p={frame.fm} id={frame.id}>
        <PreactWrapper component={frame.component} />
      </FrameEl>
    </Pin>
  {/if}
{/each}
