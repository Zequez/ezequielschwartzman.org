<script lang="ts">
  import { cx } from '@/center/utils'
  import { fade } from 'svelte/transition'

  const {
    direction,
    hue,
    class: klass,
    style,
  }: {
    direction: number
    hue: number
    class?: string
    style?: string
  } = $props()

  let prevDir = 0

  let closestDirection = $derived.by(() => {
    const newDir = direction

    // Normalize both to [-PI, PI)
    const a = ((newDir + Math.PI) % (2 * Math.PI)) - Math.PI
    const b = ((prevDir + Math.PI) % (2 * Math.PI)) - Math.PI

    // Smallest angular difference
    let diff = a - b
    if (diff > Math.PI) diff -= 2 * Math.PI
    if (diff < -Math.PI) diff += 2 * Math.PI

    // New direction = previous + minimal step
    const result = prevDir + diff

    // Update stored value
    prevDir = result
    return result
  })

  const SHAPE =
    'M60 53C29 53 29.0001 6.99998 60 6.99998C75.0001 6.99998 90 20 112 25C116.876 26.1081 116.876 33.8919 112 35C90 40 74.5 53 60 53Z'
</script>

<div class={cx('flexcc bg-black/10 rounded-full', klass)} {style}>
  <!--  transition-transform duration-100 ease-in-out -->
  <div
    class="w-2/3 h-2/3 relative"
    style={`transform: rotate(${closestDirection}rad); color: hsla(${hue}, 100%, 70%,1);`}
  >
    <svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full absolute inset-0 z-30 scale-70 blur-20px"
      style={`color: white`}
    >
      <g>
        <path d={SHAPE} fill="currentColor" />
      </g>
    </svg>

    <svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full absolute inset-0 z-20"
      style={`color: hsla(${hue}, 100%, 90%,1);`}
    >
      <g>
        <path d={SHAPE} fill="currentColor" />
      </g>
    </svg>

    <svg
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full absolute inset-0 blur-15px opacity-80 z-10"
      style={`color: hsla(${hue}, 100%, 50%,1);`}
    >
      <g>
        <path d={SHAPE} fill="currentColor" />
      </g>
    </svg>
  </div>
</div>
