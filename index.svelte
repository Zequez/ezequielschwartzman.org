<script lang="ts" module>
  export type Structure = {
    id: string
    tl?: Structure
    tt?: Structure
    tr?: Structure
    rt?: Structure
    rr?: Structure
    rb?: Structure
    br?: Structure
    bb?: Structure
    bl?: Structure
    lb?: Structure
    ll?: Structure
    lt?: Structure
  }

  type FrameOutput = {
    id?: string
    title?: string
    x: number
    y: number
    w: number
    h: number
  }

  export type Context = {
    focus: string
    structure: Structure
    birdsEye: boolean
    editMode: boolean
    registerFrame: (frame: FrameOutput) => void
  }

  import { Canvas } from './canvas'
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import favicon from './favicon.png'

  import './markdown.css'

  import { cx } from '@/center/utils'
  import Frames from './Frames.svelte'
  import BgFrames from './BgFrames.svelte'
  import api from './lib/api.svelte'
  import noise from './noise.png'
  import MdxFrames from './MdxFrames.svelte'

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  let focus = $state('origin')
  let zoom = $state(1)
  let birdsEye = $state(false)
  let scrollContainer = $state<HTMLDivElement>(null!)
  let cavitationContainer = $state<HTMLDivElement>(null!)
  let originContainer = $state<HTMLDivElement>(null!)
  let editMode = $state(localStorage.getItem('edit-mode') === 'true')
  $effect(() => {
    localStorage.setItem('edit-mode', editMode ? 'true' : 'false')
  })

  let framesOverview: FrameOutput[] = $state([])

  function registerFrame(output: FrameOutput) {
    framesOverview.push(output)
  }

  const STRUCTURE: Structure = {
    id: 'origin',
    bb: {
      id: 'presence-link',
      bb: {
        id: 'presencial-service',
      },
    },
    bl: {
      id: 'protocols-link',
    },
    br: {
      id: 'calendar-link',
    },
  }

  const API = api()

  setContext('api', API)

  onMount(() => {
    if (window.location.hash) {
      const focus = window.location.hash.slice(1)
      scrollTo(focus, true)
    }
  })

  function focusOn(id: string) {
    focus = id
    history.pushState(null, '', `#${id}`)
    scrollTo(id)
  }

  function handleHashChange(ev: Event, id: string) {
    ev.preventDefault()
    focus = id
    scrollTo(id)
  }

  function scrollTo(id: string, instant: boolean = false) {
    const el = document.getElementById(id)
    if (!el) return
    const { top, left, bottom, right } = el.getBoundingClientRect()
    const elX = (left + right) / 2
    const elY = (top + bottom) / 2

    // if (!instant && !isTouchDevice) {
    //   attractToPoint(elX, elY)
    // } else {
    document.getElementById(id)!.scrollIntoView({
      behavior: instant ? 'instant' : 'smooth',
      block: 'start',
      inline: 'center',
    })
    // }
  }

  function captureLinksClick(ev: MouseEvent) {
    if (ev.target instanceof HTMLAnchorElement) {
      const url = new URL(ev.target.href)
      if (url.hash) {
        ev.preventDefault()
        ev.stopPropagation()
        birdsEye = false
        focusOn(ev.target.hash.slice(1))
      }
    }
  }

  function handleWindowClick(ev: MouseEvent) {
    captureLinksClick(ev)
  }

  const BASE_FRICTION = 0.01
  const DAMPING_DISTANCE = 200 // beyond this, friction doesn't increase

  function getDynamicFriction(dx: number, dy: number, dampening: number) {
    const distance = Math.sqrt(dx * dx + dy * dy)
    const ratio = Math.min(distance / DAMPING_DISTANCE, 1)
    const maxFriction = BASE_FRICTION + dampening
    // Closer = higher friction
    return BASE_FRICTION + (1 - ratio) * (maxFriction - BASE_FRICTION)
  }

  let canvasSpeed = $state<{ vx: number; vy: number }>({ vx: 0, vy: 0 })
  let attractor = $state<{
    x: number
    y: number
    power: number
    dampening: number
  }>({
    x: 0,
    y: 0,
    power: 0.1,
    dampening: 0.4,
  })
  let attractionFrame: number | null = null

  function handleWindowDblClick(ev: MouseEvent) {
    if (ev.target === cavitationContainer) {
      attractToPoint(ev.clientX, ev.clientY)
    }
  }

  function attractToPoint(x: number, y: number) {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = x - cx
    const dy = y - cy

    const currentX = scrollContainer.scrollLeft
    const currentY = scrollContainer.scrollTop
    attractor.x = currentX + dx
    attractor.y = currentY + dy
    attractor.power = 0.05
    attractor.dampening = 0.5
    animateAttraction()
  }

  function animateAttraction() {
    if (attractionFrame) return

    const threshold = 0.5 // stop when speed is very low
    const maxSteps = 1000 // emergency stop if infinite loop

    let steps = 0
    function step() {
      steps++
      const dx = attractor.x - scrollContainer.scrollLeft
      const dy = attractor.y - scrollContainer.scrollTop
      const distance = Math.hypot(dx, dy)

      // Apply "spring force" toward attractor
      const forceX = dx * attractor.power
      const forceY = dy * attractor.power

      canvasSpeed.vx += forceX
      canvasSpeed.vy += forceY

      // Apply friction
      const dynamicFriction = getDynamicFriction(dx, dy, attractor.dampening)
      canvasSpeed.vx *= 1 - dynamicFriction
      canvasSpeed.vy *= 1 - dynamicFriction

      // Move scroll
      // console.log(canvasSpeed.vx, canvasSpeed.vy)
      scrollContainer.scrollLeft += canvasSpeed.vx
      scrollContainer.scrollTop += canvasSpeed.vy

      const speed = Math.hypot(canvasSpeed.vx, canvasSpeed.vy)
      if ((speed < threshold && distance < 1) || steps > maxSteps) {
        attractionFrame = null
        return
      }

      attractionFrame = requestAnimationFrame(step)
    }

    step()
  }

  function haltAttraction() {
    if (attractionFrame) {
      cancelAnimationFrame(attractionFrame)
      attractionFrame = null
    }
  }

  let pan = $state<{
    scrollStartX: number
    scrollStartY: number
    startX: number
    startY: number
    dx: number
    dy: number
    x: number
    y: number
    t: number
  } | null>(null)

  function handleWindowMousedown(ev: MouseEvent) {
    if (isTouchDevice) return
    if (ev.button === 2) return
    if (cavitationContainer.contains(ev.target as HTMLElement)) {
      ev.preventDefault()
      pan = {
        scrollStartX: scrollContainer.scrollLeft,
        scrollStartY: scrollContainer.scrollTop,
        startX: ev.clientX,
        startY: ev.clientY,
        dx: 0,
        dy: 0,
        x: ev.clientX,
        y: ev.clientY,
        t: Date.now(),
      }
      attractor.x = pan.scrollStartX
      attractor.y = pan.scrollStartY
      attractor.power = 0.3
      attractor.dampening = 0.35
    }
  }

  function handleWindowMousemove(ev: MouseEvent) {
    if (pan) {
      // clearTimeout(standbyMovement)
      const dx = (ev.clientX - pan.startX) * -1
      const dy = (ev.clientY - pan.startY) * -1
      // const dx = ev.movementX * -1
      // const dy = ev.movementY * -1
      pan.dx = dx
      pan.dy = dy
      attractor.x = pan.scrollStartX + dx
      attractor.y = pan.scrollStartY + dy

      animateAttraction()
    }
  }

  function handleWindowMouseup(ev: MouseEvent) {
    if (pan) {
      attractor.power = 0
      attractor.dampening = 0.2

      pan = null
    }
  }

  let accumulatedDelta = 0
  let isThrottling = false
  function handleContainerWheel(ev: WheelEvent) {
    haltAttraction()
    if (ev.ctrlKey) {
      ev.preventDefault()
      accumulatedDelta += ev.deltaY

      if (!isThrottling) {
        isThrottling = true

        setTimeout(() => {
          const zoomDelta = accumulatedDelta > 0 ? 0.05 : -0.05
          zoom += zoomDelta
          accumulatedDelta = 0
          isThrottling = false
          console.log('zoom', zoom)
          // Optionally call updateTransform()
        }, 50)
      }
    }
  }

  let shiftCount = 0
  function handleWindowKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Shift') {
      shiftCount++
      if (shiftCount === 3) {
        console.log('TOGGLING EDIT MODE!')
        editMode = !editMode
      }
      setTimeout(() => {
        shiftCount = 0
      }, 1000)
    }
  }

  let lastZoomSetAt = 0
  function throttledSetZoom(newZoom: number) {
    if (lastZoomSetAt + 100 < Date.now()) {
      lastZoomSetAt = Date.now()
      zoom = newZoom
    } else {
      setTimeout(() => {
        throttledSetZoom(newZoom)
      }, 100)
    }
  }

  const visualCenter = {
    x: document.body.clientWidth / 2,
    y: document.body.clientHeight / 4,
  }

  const C: Context = {
    get focus() {
      return focus
    },
    get structure() {
      return STRUCTURE
    },
    get birdsEye() {
      return birdsEye
    },
    get editMode() {
      return editMode
    },
    registerFrame,
  }

  setContext('main', C)

  $effect(() => {
    if (pan) {
      document.body.classList.add('cursor-grabbing', 'select-none')
    } else {
      document.body.classList.remove('cursor-grabbing', 'select-none')
    }
  })
</script>

<!--
<svelte:window
  onhashchange={(ev) => handleHashChange(ev, window.location.hash.slice(1))}
  onclick={handleWindowClick}
  ondblclick={handleWindowDblClick}
  onmouseup={handleWindowMouseup}
  onmousemove={handleWindowMousemove}
  onmousedown={handleWindowMousedown}
  onkeydown={handleWindowKeydown}
/> -->

<svelte:head>
  <title>Ezequiel A. Schwartzman</title>
  <meta name="viewport" content="width=device-width, initial-scale=0.5" />
  <!-- Favicon -->
  <link rel="icon" type="image/png" href={favicon} />
</svelte:head>

<!-- <WildGrid /> -->

<!-- Render pan line -->

<!-- {#if pan}
  {@const hyp = Math.sqrt(pan.dx ** 2 + pan.dy ** 2)}
  {@const rot = Math.atan2(-pan.dy, -pan.dx)}
  <div>
    <div
      class="absolute w2 h2 bg-white z-200 transform-origin-left-center pointer-events-none"
      style={`
        width: ${hyp}px;
        left: ${pan.startX}px;
        top: ${pan.startY}px;
        transform: rotate(${rot}rad);
      `}
    ></div>
  </div>
{/if} -->

<!-- bg-[hsl(100deg_100%_100%)] -->
<button
  class="fixed z-999 bottom-0 left-1/2 -translate-x-1/2 bg-black/90 text-white px2 py1 rounded-t-md uppercase text-xs font-bold"
  onclick={() => (birdsEye = !birdsEye)}
>
  {focus}
</button>
<Canvas>
  <div class="bg-red-500">Hello there</div>
</Canvas>

<!-- <div
  bind:this={scrollContainer}
  onwheel={handleContainerWheel}
  class="relative h-full w-full bg-black overflow-auto no-scrollbar"
>
  <div
    bind:this={cavitationContainer}
    class="relative w-5000px h-5000px max-w-none max-h-none"
  >
    <div
      bind:this={originContainer}
      onwheel={(ev) => ev.stopPropagation()}
      style={`transform: scale(${zoom})`}
      class={cx('absolute w-0 h-0 left-1/2 top-1/2 transition', {
        'perspective-2000px scale-1/2': birdsEye,
      })}
    >
      <div
        style={`background-image: url(${noise});`}
        class="w-5000px h-5000px bg-repeat absolute -left-2500px -top-2500px pointer-events-none"
      ></div>
      <MdxFrames />
    </div>
  </div>
</div> -->
