import type { MDXContent } from 'mdx/types'
import { getContext, setContext } from 'svelte'
import type api from '../lib/api.svelte'
import createContextedStore, { proxifyCmd } from '../lib/contexted-store'
import chalk from 'chalk'

export type Frontmatter = {
  x?: number
  y?: number
  title?: string
  layer?: 'fg' | 'bg'
  draft?: boolean
  z?: number
  hidden?: boolean
}

export type FullFrontmatter = {
  x: number
  y: number
  title: string
  layer: 'fg' | 'bg'
  draft: boolean
  z: number
  hidden: boolean
}

export type Frame = {
  id: string
  fm: Frontmatter
  component: MDXContent
}

export default createContextedStore('frames', () => {
  const allFramesRaw = import.meta.glob('../frames/*.mdx', {
    eager: true,
  })

  const rawFramesById = Object.fromEntries(
    Object.entries(allFramesRaw).map(([key, value]) => {
      const fm = { ...((value as any).frontmatter || {}) } as Frontmatter
      const id = key.replace('../frames/', '').replace('.mdx', '')
      return [id, { id, fm, component: (value as any).default as MDXContent }]
    }),
  )

  const ids = Object.keys(rawFramesById)

  const extendedFmById: { [key: string]: FullFrontmatter } = Object.fromEntries(
    Object.values(rawFramesById).map(({ id, fm }) => {
      let fm2 = { ...fm }
      if (!fm2.title) fm2.title = id
      if (!fm2.z) fm2.z = 0
      if (!fm2.x) fm2.x = 0
      if (!fm2.y) fm2.y = 0
      if (!fm2.layer) fm2.layer = 'fg'
      if (!fm2.hidden) fm2.hidden = false
      return [id, fm2 as FullFrontmatter]
    }),
  )

  const fmUpdates = $state<{ [key: string]: Partial<Frontmatter> }>({})

  const outputFrames = $derived(
    ids.map((id) => {
      const fm = fmUpdates[id]
        ? { ...extendedFmById[id], ...fmUpdates[id] }
        : extendedFmById[id]
      const component = rawFramesById[id].component
      return { id, fm, component }
    }),
  )

  const API = getContext('api') as ReturnType<typeof api>

  let hoveringId = $state<string | null>(null)

  const cmd = {
    updateProps(id: string, frontmatter: Partial<Frontmatter>) {
      rawFramesById[id].fm
      if (fmUpdates[id]) {
        fmUpdates[id] = { ...fmUpdates[id], ...frontmatter }
      } else {
        fmUpdates[id] = frontmatter
      }
    },
    commitProps(id: string) {
      if (fmUpdates[id]) {
        const rawFm = rawFramesById[id].fm
        const newFm = { ...rawFm, ...fmUpdates[id] }
        API.setFrameFrontmatter(id, newFm)
      }
    },
    hovering(id: string) {
      hoveringId = id
    },
  }

  const cmdProxy = proxifyCmd(chalk.cyan('[CMD]'), cmd)

  function topZ() {
    return Math.max(...outputFrames.map((f) => f.fm.z || 0))
  }

  return {
    cmd: cmdProxy,
    get frames() { return outputFrames }, //prettier-ignore
    get hoveringId() { return hoveringId }, //prettier-ignore
    topZ,
  }
})
