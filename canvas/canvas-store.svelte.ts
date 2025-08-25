import chalk from 'chalk'
import createContextedStore, { proxifyCmd } from '../lib/contexted-store'
import { onMount } from 'svelte'

const zoomLevels = new Array(5).fill(1).map((_, i) => 1 * 0.75 ** i)

export default createContextedStore('canvas', () => {
  let focus = $state<null | string>(null)
  let zoom = $state(zoomLevels[0])
  let birdsEye = $state(false)
  let edgeScrollMode = $state(false)
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
    setInterval(edgeScrollTick, 10)
  })

  const EDGE_SCROLL_SPEED = 10
  function edgeScrollTick() {
    if (edgeScrollDirection !== null) {
      const dx = Math.cos(edgeScrollDirection) * EDGE_SCROLL_SPEED
      const dy = Math.sin(edgeScrollDirection) * EDGE_SCROLL_SPEED

      scrollContainer.scrollBy(dx, dy)
    }
  }

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
    shiftZoom(zoomShift: number, clientX?: number, clientY?: number) {
      const resolvedClientX = clientX ?? window.innerWidth / 2
      const resolvedClientY = clientY ?? window.innerHeight / 2
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
        const dx = resolvedClientX - originX
        const dy = resolvedClientY - originY

        zoom = newZoom
        scrollContainer.scrollBy(-dx * zoomDelta, -dy * zoomDelta)
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

  const cmdProxy = proxifyCmd(chalk.yellow('[CMD]'), cmd)

  return {
    cmd: cmdProxy,
    get vp() {
      return vp
    },
    get zoom() {
      return zoom
    },
    getZoom() {
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
