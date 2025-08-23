import chalk from 'chalk'
import createContextedStore from './contexted-store'

export default createContextedStore('root', () => {
  let editMode = $state(localStorage.getItem('edit-mode') === 'true')
  $effect(() => {
    localStorage.setItem('edit-mode', editMode ? 'true' : 'false')
  })

  const cmd = {
    toggleEditMode() {
      editMode = !editMode
    },
  }

  const cmdProxy = new Proxy(cmd, {
    get: (target, prop: keyof typeof cmd, receiver) => {
      return (...args: Parameters<(typeof cmd)[keyof typeof cmd]>) => {
        console.log(chalk.red('[CMD]'), prop, args)
        return (target[prop] as any)(...args)
      }
    },
  })

  return {
    cmd: cmdProxy,
    get editMode() {
      return editMode
    },
  }
})
