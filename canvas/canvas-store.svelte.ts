import chalk from 'chalk'
import createContextedStore from '../lib/contexted-store'
import { onMount } from 'svelte'

export default createContextedStore('canvas', () => {
  let focus = $state<null | string>(null)
  let zoom = $state(1)
  let birdsEye = $state(false)
  let edgeScrollMode = $state(false)
  // let x = $state(0);
  // let y = $state(0);
  let edgeScrollDirection = $state<number | null>(null) // -PI to + PI
  let pins = $state<{
    [key: string]: { x: number; y: number; el: HTMLElement }
  }>({})
  let cavitationSize = $derived.by(() => {
    return Object.keys(pins).length
  })

  type VP = {
    x: number
    y: number
    z: number
  }
  let vp = $state<VP>({ x: 0, y: 0, z: 1 })
  let targetVp = $state<VP>({ x: 0, y: 0, z: 1 })

  let scrollContainer: HTMLElement = null!
  onMount(() => {
    scrollContainer = document.getElementById('scroll')!
    // scrollLoop();
    setInterval(edgeScrollTick, 10)
  })

  // $effect(() => {
  //   if (
  //     (targetVp.x !== vp.x || targetVp.y !== vp.y || targetVp.z !== vp.z) &&
  //     !doingAnimation
  //   ) {
  //     animationFrame = requestAnimationFrame(animationLoop)
  //   }
  // })

  const EDGE_SCROLL_SPEED = 10
  function edgeScrollTick() {
    if (edgeScrollDirection !== null) {
      // targetVp.x += Math.cos(edgeScrollDirection) * EDGE_SCROLL_SPEED
      // targetVp.y += Math.sin(edgeScrollDirection) * EDGE_SCROLL_SPEED
      const dx = Math.cos(edgeScrollDirection) * EDGE_SCROLL_SPEED
      const dy = Math.sin(edgeScrollDirection) * EDGE_SCROLL_SPEED

      scrollContainer.scrollBy(dx, dy)
    }
  }

  // const XY_SPEED = 50
  // const Z_SPEED = 0.01
  // let doingAnimation = false
  // let animationFrame = 0
  // function animationLoop() {
  //   let moved = false

  //   // Chase X
  //   if (vp.x !== targetVp.x) {
  //     const dx = targetVp.x - vp.x
  //     if (Math.abs(dx) <= XY_SPEED) {
  //       vp.x = targetVp.x
  //     } else {
  //       vp.x += Math.sign(dx) * XY_SPEED
  //     }
  //     moved = true
  //   }

  //   // Chase Y
  //   if (vp.y !== targetVp.y) {
  //     const dy = targetVp.y - vp.y
  //     if (Math.abs(dy) <= XY_SPEED) {
  //       vp.y = targetVp.y
  //     } else {
  //       vp.y += Math.sign(dy) * XY_SPEED
  //     }
  //     moved = true
  //   }

  //   // Chase Z
  //   if (vp.z !== targetVp.z) {
  //     const dz = targetVp.z - vp.z
  //     console.log(targetVp.z, vp.z)
  //     if (Math.abs(dz) <= Z_SPEED) {
  //       vp.z = targetVp.z
  //     } else {
  //       vp.z += Math.sign(dz) * Z_SPEED
  //     }
  //     moved = true
  //   }

  //   if (moved) {
  //     animationFrame = requestAnimationFrame(animationLoop)
  //   } else {
  //     animationFrame = 0
  //   }
  // }

  const zoomLevels = new Array(5).fill(1).map((_, i) => 1 * 0.75 ** i)

  function containerTransformCenterToScreenPos() {
    const scrollX = scrollContainer.scrollLeft
    const scrollY = scrollContainer.scrollTop
    const contW = scrollContainer.scrollWidth
    const contH = scrollContainer.scrollHeight
    const originX = contW / 2 - scrollX
    const originY = contH / 2 - scrollY
    return { originX, originY }
  }

  const cmd = {
    toggleEdgeScrollMode() {
      edgeScrollMode = !edgeScrollMode
      if (!edgeScrollMode) {
        edgeScrollDirection = null
      }
    },
    informEdgeScroll(direction: number | null) {
      edgeScrollDirection = direction
    },
    focus(target: string | null) {
      focus = target
    },
    shiftZoom(zoomShift: number, clientX: number, clientY: number) {
      const zoomIndex = zoomLevels.indexOf(zoom)
      const newZoomIndex = zoomIndex + zoomShift
      if (newZoomIndex >= 0 && newZoomIndex < zoomLevels.length) {
        const newZoom = zoomLevels[newZoomIndex]
        const zoomDelta = 1 - newZoom / zoom

        // If zoom delta > 0 = zooming out, shrinks
        // If zoom delta < 0 = zooming in, enlarges

        const { originX, originY } = containerTransformCenterToScreenPos()

        // If cursor is at the right of originX, scroll left
        // If cursor is at the left of originX, scroll right
        console.log(originX, clientX)
        const dx = clientX - originX
        const dy = clientY - originY

        zoom = newZoom
        console.log('DELTA', dx * zoomDelta)
        scrollContainer.scrollBy(-dx * zoomDelta, -dy * zoomDelta)
        // scrollContainer.scrollTo({
        //   left: scrollContainer.scrollLeft - dx * zoomDelta,
        //   top: scrollContainer.scrollTop - dy * zoomDelta,
        //   behavior: 'instant',
        // })
        // scrollContainer.scrollLeft = scrollContainer.scrollLeft - dx * zoomDelta
        // scrollContainer.scrollTop = scrollContainer.scrollTop - dy * zoomDelta

        // setTimeout(() => {
        //   console.log(dx, zoomDelta, dx * zoomDelta)

        //   // scrollContainer.scrollBy(scrollX, scrollY)
        // }, 300)
        return true
      } else {
        return false
      }
    },
    goTo(location: Partial<{ x: number; y: number; z: number }>) {
      targetVp = { ...targetVp, ...location }
    },
    registerPin: (
      id: string,
      pinData: { x: number; y: number; el: HTMLElement },
    ) => {
      pins[id] = pinData
    },
    unregisterPin: (id: string) => {
      delete pins[id]
    },
  }

  const cmdProxy = new Proxy(cmd, {
    get: (target, prop: keyof typeof cmd, receiver) => {
      return (...args: Parameters<(typeof cmd)[keyof typeof cmd]>) => {
        console.log(chalk.yellow('[CMD]'), prop, args)
        return (target[prop] as any)(...args)
      }
    },
  })

  return {
    // get x() {

    // },
    cmd: cmdProxy,
    get vp() {
      return vp
    },
    get zoom() {
      return zoom
    },
    get focus() {
      return focus
    },
    get edgeScrollMode() {
      return edgeScrollMode
    },
    get edgeScrollDirection() {
      return edgeScrollDirection
    },
    get birdsEye() {
      return birdsEye
    },
    get cavitationSize() {
      return cavitationSize
    },
  }
})
