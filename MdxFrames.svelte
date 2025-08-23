<script lang="ts">
  import FrameEl from './Frame.svelte'
  import PreactWrapper from './PreactWrapper.svelte'
  import framesStore from './lib/frames-store.svelte'
  import { Pin } from './canvas'

  const FC = framesStore.initContext({})
</script>

{#each FC.frames as frame}
  <Pin id={frame.id} x={frame.fm.x} y={frame.fm.y}>
    <FrameEl
      x={frame.fm.x}
      y={frame.fm.y}
      z={frame.fm.z!}
      title={frame.fm.title}
      id={frame.id}
      bg={frame.fm.bg}
      hidden={frame.fm.hidden}
      draft={frame.fm.draft}
    >
      <PreactWrapper component={frame.component} />
    </FrameEl>
  </Pin>
{/each}
