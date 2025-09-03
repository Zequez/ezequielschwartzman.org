import { cx } from '@/center/utils'
import { useState, useEffect } from 'preact/hooks'
import { getContexts } from '@/center/contexted-store'
type Positions = [number, number][]

export default function Composicion(props: {
  images: { [key: string]: { default: string } }
  sizes: number[]
  positions: Positions
}) {
  const initialPositions = Array(Object.keys(props.images).length)
    .fill([0, 0])
    .map((p, i) => props.positions[i] || p)
  const [positions, setPositions] = useState<Positions>(() => initialPositions)
  const [sizes, setSizes] = useState(props.sizes)

  function handleMouseDown(ev: MouseEvent, index: number) {
    if (ev.button === 1) {
      adjustSize(index, 0.1)
      ev.preventDefault()
      ev.stopPropagation()
    }
    if (ev.button !== 0) return

    const contexts = getContexts()
    const zoom = contexts.get('canvas').getZoom()
    // const el = ev.currentTarget as HTMLImageElement
    ev.preventDefault()
    ev.stopPropagation()

    let newPositions = [...positions]

    function onMouseMove(ev: MouseEvent) {
      const dx = ev.movementX
      const dy = ev.movementY
      newPositions = [...newPositions]
      newPositions[index] = [
        newPositions[index][0] + dx / zoom,
        newPositions[index][1] + dy / zoom,
      ]
      setPositions(newPositions)
    }

    function onMouseUp() {
      console.log(JSON.stringify(newPositions))
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function adjustSize(i: number, val: number) {
    const newSizes = [...sizes]
    newSizes[i] += val
    console.log(JSON.stringify(newSizes))
    setSizes(newSizes)
  }

  return (
    <div class="w1300px h1300px relative">
      {Object.entries(props.images).map(([path, img], i) => (
        // <div class="w-230px h-230px overflow-hidden flex">
        <img
          key={path}
          onMouseDown={(ev) => handleMouseDown(ev, i)}
          onContextMenu={(ev) => {
            adjustSize(i, -0.1)
            ev.preventDefault()
          }}
          style={`top: ${positions[i][1]}px; left: ${positions[i][0]}px; width: ${sizes[i] * 300}px;`}
          class={cx(
            'absolute w300px max-w-full rounded-full object-cover object-center aspect-square',
            {
              'pointer-events-auto': true,
            },
          )}
          src={img.default}
          alt={img.default.split('/').pop()!.replace('.jpg', '')}
        />
        // </div>
      ))}
    </div>
  )
}
