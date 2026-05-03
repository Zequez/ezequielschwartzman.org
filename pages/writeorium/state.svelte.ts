import { tunnel } from '@/center/tunnel'
import { onMount } from 'svelte'
// @ts-ignore
import importedActions from './actions.json?nohmr'

export type Action =
  | {
      type: 'create'
      data: string
      timestamp: number
    }
  | {
      type: 'move'
      start: number
      end: number
      timestamp: number
    }

export type State = {
  corpus: string
  position: {
    start: number
    end: number
  }
  actions: Action[]
}

export function createWriteoriumState({
  onLoad: onLoad,
}: {
  onLoad?: () => void
}) {
  let S = $state(
    (() => {
      if (import.meta.env.DEV) {
        return null
      } else {
        return deriveStateFromActions(importedActions as Action[])
      }
    })(),
  )

  onMount(() => {
    if (import.meta.env.DEV) {
      tunnel(
        'repos/ezequiel/pages/writeorium/storeActions.ts/readActions' as any,
        {},
      ).then((actionsFromFilesystem) => {
        S = deriveStateFromActions(JSON.parse(actionsFromFilesystem))
        onLoad?.()
      })
    } else {
      onLoad?.()
    }
  })

  let travelTo: null | number = $state(null)
  let traveledToActions = $derived(
    S
      ? travelTo !== null
        ? S.actions.slice(0, travelTo + 1)
        : S.actions
      : null,
  )
  let traveledState: null | State = $derived(
    S && traveledToActions !== S.actions
      ? deriveStateFromActions(traveledToActions!)
      : S,
  )
  let encodedLength = $state(0)
  let encodedTimespan = $state(0)
  let storingTimout: ReturnType<typeof setTimeout> = null!

  $effect(() => {
    if (!S) return
    const now = Date.now()
    let stateToStore = encodeState(S)
    encodedLength = stateToStore.length
    encodedTimespan = Date.now() - now
    clearTimeout(storingTimout)
    storingTimout = setTimeout(() => {
      if (import.meta.env.DEV) {
        tunnel(
          'repos/ezequiel/pages/writeorium/storeActions.ts/storeActions' as any,
          {
            actions: stateToStore,
          },
        ).then((success) => {
          console.log('Saving actions success')
        })
      }
    }, 500)
  })

  function handleCorpusChange(newCorpus: string) {
    if (!S) return
    if (newCorpus === S.corpus) {
      return
    }
    const [moveAction, createAction] = extractActionFromCorpusChange(
      S.corpus,
      newCorpus,
    )

    if (
      S.position.start !== moveAction.start ||
      S.position.end !== moveAction.end
    ) {
      console.log('Auto move action', moveAction)
      S.actions.push(moveAction)
    }

    S.position = moveAction

    S.actions.push(createAction)
    S.position.start += createAction.data.length
    S.position.end = S.position.start
    console.log(createAction)

    S.corpus = newCorpus
  }

  function handleSelectionChange(pos: { start: number; end: number }) {
    if (!S) return
    const moveAction: Action = {
      type: 'move',
      start: pos.start,
      end: pos.end,
      timestamp: Date.now(),
    }
    if (
      S.position.start === moveAction.start &&
      S.position.end === moveAction.end
    ) {
      return
    }
    S.actions.push(moveAction)
    S.position = moveAction
    console.log(moveAction)
  }

  function travel(actionIndex: number | null) {
    travelTo = actionIndex
  }

  return {
    get state() {
      return S
    },

    get encodedLength() {
      return encodedLength
    },
    get encodedTimespan() {
      return encodedTimespan
    },
    get travelTo() {
      return travelTo
    },
    get traveledState() {
      return traveledState
    },
    get traveledToActions() {
      return traveledToActions
    },
    get lastTraveledAction() {
      return traveledToActions
        ? traveledToActions[traveledToActions.length - 1]
        : null
    },
    handleCorpusChange,
    handleSelectionChange,
    travel,

    // get corpus() {
    //   return S.corpus
    // },
    // get position() {
    //   return S.position
    // },
    // get actions() {
    //   return S.actions
    // },
  }
}

// ██╗   ██╗████████╗██╗██╗     ███████╗
// ██║   ██║╚══██╔══╝██║██║     ██╔════╝
// ██║   ██║   ██║   ██║██║     ███████╗
// ██║   ██║   ██║   ██║██║     ╚════██║
// ╚██████╔╝   ██║   ██║███████╗███████║
//  ╚═════╝    ╚═╝   ╚═╝╚══════╝╚══════╝

// #region Utils

function encodeState(state: State): string {
  return JSON.stringify(state.actions)
}

function decodeState(encoded: string): State {
  const actions = JSON.parse(encoded)
  return deriveStateFromActions(actions)
}

// #region Derive
function deriveStateFromActions(actions: Action[]): State {
  let C = ''
  let start = 0
  let end = 0
  for (let action of actions) {
    switch (action.type) {
      case 'create': {
        const before = C.slice(0, start)
        const position = C.slice(start, end)
        const after = C.slice(end)
        C = before + action.data + after
        end = end + action.data.length - position.length
        start = end
        break
      }
      case 'move': {
        start = action.start
        end = action.end
        break
      }
    }
  }

  return {
    corpus: C,
    position: {
      start,
      end,
    },
    actions,
  }
}

// #region Extract
function extractActionFromCorpusChange(
  previousCorpus: string,
  nextCorpus: string,
): [
  { type: 'move'; start: number; end: number; timestamp: number },
  { type: 'create'; data: string; timestamp: number },
] {
  let start = 0
  const sharedLength = Math.min(previousCorpus.length, nextCorpus.length)

  while (start < sharedLength && previousCorpus[start] === nextCorpus[start]) {
    start++
  }

  let previousEnd = previousCorpus.length
  let nextEnd = nextCorpus.length

  while (
    previousEnd > start &&
    nextEnd > start &&
    previousCorpus[previousEnd - 1] === nextCorpus[nextEnd - 1]
  ) {
    previousEnd--
    nextEnd--
  }

  return [
    { type: 'move', start, end: previousEnd, timestamp: Date.now() },
    {
      type: 'create',
      data: nextCorpus.slice(start, nextEnd),
      timestamp: Date.now(),
    },
  ]
}
