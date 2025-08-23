import type { MDXContent } from 'mdx/types'
import { getContext, setContext } from 'svelte'
import type api from './api.svelte'
import createContextedStore from './contexted-store'

export type Frontmatter = {
  x: number
  y: number
  title: string
  bg?: boolean
  draft?: boolean
  z?: number
  hidden?: boolean
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

  const allFrames: Frame[] = Object.entries(allFramesRaw)
    .map(([key, value]) => {
      const fm = { ...(value as any).frontmatter } as Frontmatter
      const id = key.replace('../frames/', '').replace('.mdx', '')
      if (!fm.title) fm.title = id
      if (!fm.z) fm.z = 0
      if (!fm.x) fm.x = 0
      if (!fm.y) fm.y = 0
      if (!fm.hidden) fm.hidden = false
      return { id, fm, component: (value as any).default as MDXContent }
    })
    .filter((f) => f.fm.x != null && f.fm.y != null)

  const API = getContext('api') as ReturnType<typeof api>

  // ---------------

  // ---------------

  function updateFrameFrontmatter(
    id: string,
    frontmatter: Partial<Frontmatter>,
  ) {
    console.log(allFramesRaw)
    const rawFrame = allFramesRaw[`../frames/${id}.mdx`]
    const fm = (rawFrame as any).frontmatter as Frontmatter
    const updatedFrontmatter = { ...fm, ...frontmatter }
    API.setFrameFrontmatter(id, updatedFrontmatter)
  }

  function topZ() {
    return Math.max(...allFrames.map((f) => f.fm.z || 0))
  }

  return {
    updateFrameFrontmatter,
    get frames() {
      return allFrames
    },
    topZ,
  }
})

// function init()

// export type FramesContext = ReturnType<typeof init>

// export function initFramesContext() {
//   const store = init()
//   setContext('frames', store)
//   return store
// }

// export function getFramesContext() {
//   return getContext('frames') as FramesContext
// }
