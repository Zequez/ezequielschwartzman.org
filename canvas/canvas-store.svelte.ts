import chalk from 'chalk'
import createContextedStore from '../lib/contexted-store'

export default createContextedStore('canvas', () => {
  let zoom = $state(1)
  let birdsEye = $state(false)
  let edgeScrollMode = $state(false)
  // let x = $state(0);
  // let y = $state(0);
  let edgeScrollDirection = $state<number | null>(null)

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
    goTo(x: number, y: number) {},
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
    get zoom() {
      return zoom
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
  }
})
