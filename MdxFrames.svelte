<script lang="ts">
  import FrameEl from './Frame.svelte'
  import PreactWrapper from './PreactWrapper.svelte'
  import { initFramesContext } from './lib/frames-store.svelte'

  const FC = initFramesContext()
</script>

{#each FC.frames as frame}
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
{/each}
