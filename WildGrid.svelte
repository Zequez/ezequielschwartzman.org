<script lang="ts">
  import { onMount } from 'svelte'

  let canvas: HTMLCanvasElement = $state<HTMLCanvasElement>(null!)

  onMount(() => {
    const ctx = canvas.getContext('2d')!

    const gridSize = 10
    const canvasSize = 500
    const baseCellSize = canvasSize / gridSize

    // Initialize 10x10 matrix filled with 1s
    const scaleMatrix = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => 1),
    )

    // Example distortion: a larger value in the center
    scaleMatrix[4][4] = 2
    scaleMatrix[2][6] = 1.5
    scaleMatrix[7][3] = 1.7

    // Utility to calculate warped position offsets
    function getWarpedOffsets() {
      const xOffsets = [0]
      const yOffsets = [0]

      for (let i = 0; i < gridSize; i++) {
        xOffsets[i + 1] = xOffsets[i] + baseCellSize * scaleMatrix[i][0]
        yOffsets[i + 1] = yOffsets[i] + baseCellSize * scaleMatrix[0][i]
      }

      return { xOffsets, yOffsets }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { xOffsets, yOffsets } = getWarpedOffsets()

      // Draw warped vertical lines
      for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath()
        ctx.moveTo(xOffsets[i], 0)
        ctx.lineTo(xOffsets[i], canvasSize)
        ctx.strokeStyle = '#aaa'
        ctx.stroke()
      }

      // Draw warped horizontal lines
      for (let j = 0; j <= gridSize; j++) {
        ctx.beginPath()
        ctx.moveTo(0, yOffsets[j])
        ctx.lineTo(canvasSize, yOffsets[j])
        ctx.strokeStyle = '#aaa'
        ctx.stroke()
      }

      // Draw balls in each cell
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = xOffsets[i]
          const y = yOffsets[j]
          const w = xOffsets[i + 1] - x
          const h = yOffsets[j + 1] - y

          const r = Math.min(w, h) / 3

          ctx.beginPath()
          ctx.arc(x + w / 2, y + h / 2, r, 0, Math.PI * 2)
          ctx.fillStyle = 'skyblue'
          ctx.fill()
        }
      }
    }

    draw()
  })
</script>

<canvas
  class="fixed z-200 bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  bind:this={canvas}
  width="500"
  height="500"
></canvas>
