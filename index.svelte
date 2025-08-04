<script lang="ts" module>
  import favicon from './favicon.png'
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

  export type Context = {
    focus: string
    structure: Structure
    setFrameXY: (id: string, x: number, y: number) => void
  }
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte'

  import { cx } from '@/center/utils'
  import Frames from './Frames.svelte'
  import { SERVER_FILES_PORT } from '@/center/ports'
  import type { BackMsg, FrontMsg } from '@/back/servers/files-server'

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  let focus = $state('origin')
  let zoom = $state(1)
  let scrollContainer = $state<HTMLDivElement>(null!)
  let cavitationContainer = $state<HTMLDivElement>(null!)
  let originContainer = $state<HTMLDivElement>(null!)

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

  let socket = $state<WebSocket>(null!)
  let framesContent = $state('')

  function sendMsg(msg: FrontMsg) {
    socket.send(JSON.stringify(msg))
  }

  function setFrameXY(id: string, x: number, y: number) {
    if (framesContent) {
      const newContent = setXYOnFramesFile(framesContent, id, x, y)
      framesContent = newContent
      sendMsg(['write-file', 'repos/ezequiel/Frames.svelte', newContent])
    }
  }

  function setXYOnFramesFile(
    content: string,
    id: string,
    x: number,
    y: number,
  ) {
    const frameRegex = new RegExp(
      `<Frame([^>]*id=["']${id}["'][^>]*)x=\\{[^}]*\\}\\s*y=\\{[^}]*\\}`,
      'g',
    )

    return content.replace(frameRegex, (_match, preAttrs) => {
      return `<Frame${preAttrs}x={${x}} y={${y}}`
    })
  }

  onMount(() => {
    if (window.location.hash) {
      const focus = window.location.hash.slice(1)
      scrollTo(focus, true)
    }

    socket = new WebSocket(`ws://localhost:${SERVER_FILES_PORT}?repo=ezequiel`)

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as BackMsg
      console.log('EVENT!', data)
      if (data[0] === 'file-content') {
        if (data[1] === 'repos/ezequiel/Frames.svelte') {
          framesContent = data[2]
        }
      }
    })

    socket.addEventListener('open', () => {
      console.log('Socket open!')
      sendMsg(['read-file', 'repos/ezequiel/Frames.svelte'])
    })
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

    if (!instant && !isTouchDevice) {
      attractToPoint(elX, elY)
    } else {
      document.getElementById(id)!.scrollIntoView({
        behavior: instant ? 'instant' : 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }

  function captureLinksClick(ev: MouseEvent) {
    if (ev.target instanceof HTMLAnchorElement) {
      console.log(ev.target.href)
      const url = new URL(ev.target.href)
      if (url.hash) {
        ev.preventDefault()
        ev.stopPropagation()
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
    if (ev.target === cavitationContainer) {
      if (isTouchDevice) return
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

  function handleContainerWheel(ev: Event) {
    haltAttraction()
  }

  const C: Context = {
    get focus() {
      return focus
    },
    get structure() {
      return STRUCTURE
    },
    setFrameXY: setFrameXY,
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

<svelte:window
  onhashchange={(ev) => handleHashChange(ev, window.location.hash.slice(1))}
  onclick={handleWindowClick}
  ondblclick={handleWindowDblClick}
  onmouseup={handleWindowMouseup}
  onmousemove={handleWindowMousemove}
  onmousedown={handleWindowMousedown}
/>

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
<div
  bind:this={scrollContainer}
  onwheel={handleContainerWheel}
  class="relative h-full w-full bg-gray-800 overflow-auto no-scrollbar"
>
  <div
    class="fixed z-999 bottom-0 left-1/2 -translate-x-1/2 bg-black/90 text-white px2 py1 rounded-t-md uppercase text-xs font-bold"
  >
    {focus}
  </div>
  <div
    bind:this={cavitationContainer}
    class="relative w-5000px h-5000px max-w-none max-h-none"
  >
    <div bind:this={originContainer} class="absolute w-0 h-0 left-1/2 top-1/2">
      <!-- <div class="absolute z-10 inset-0 bg-[url('/noise20.png')] opacity-30"></div> -->
      <Frames />
    </div>
  </div>
</div>

<style>
  .no-scrollbar {
    scrollbar-width: 0;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  a {
    text-decoration: underline;
  }
</style>
