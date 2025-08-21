<script lang="ts">
  import { getContext } from 'svelte'
  import { cx } from '@/center/utils'
  import { type Context } from './index.svelte'

  const {
    x,
    y,
    children,
    rotateForward,
  }: { x: number; y: number; children: any; rotateForward?: boolean } = $props()

  const C = getContext('main') as Context
</script>

<div
  style={`left: ${x}px; top: ${y}px;`}
  class={cx(
    'absolute z-19 pointer-events-none -translate-x-1/2 -translate-y-1/2',
    {
      'rotate-x-20': C.birdsEye && !rotateForward,
      '-rotate-x-20': C.birdsEye && rotateForward,
    },
  )}
>
  {@render children()}
</div>
