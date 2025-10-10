<script lang="ts">
  import { lsState, onTripleKey } from '@/center/utils/runes.svelte'

  // VERTICAL RYHTHM GRID TOGGLING
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let vGridEnabled = lsState('v-grid-enabled', { v: false })

  if (typeof window !== 'undefined') {
    onTripleKey('1', window, () => {
      vGridEnabled.v = !vGridEnabled.v
    })
  }
</script>

{#if vGridEnabled.v}
  <div
    class="absolute inset-0 pointer-events-none z-0 mix-blend-normal"
    aria-hidden="true"
    style="--rhythm:1.5rem; --line-thickness:1px; background-image: repeating-linear-gradient(to bottom, rgba(0,0,0,0.12) 0 calc(var(--line-thickness)), transparent calc(var(--line-thickness)) var(--rhythm));"
  ></div>
{/if}
