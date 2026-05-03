<script module>
  export const metadata = {
    title: 'The Writeorium - Ezequiel A. Schwartzman',
    noNav: true,
    noRail: true,
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte'
  import DarkToggle from '../../components/DarkToggle.svelte'

  import BackStep from '~icons/fa6-solid/backward-step'
  import NextStep from '~icons/fa6-solid/forward-step'
  import Play from '~icons/fa6-solid/play'
  import Stop from '~icons/fa6-solid/stop'
  import Pause from '~icons/fa6-solid/pause'
  import { tunnel } from '@/center/tunnel'
  import { createWriteoriumState, type Action } from './state.svelte'
  import { lsState } from '@/center/utils/runes.svelte'

  const DEBUG = true

  let textarea: HTMLTextAreaElement
  let timelineEl: HTMLDivElement

  // ███████╗████████╗ █████╗ ████████╗███████╗
  // ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝
  // ███████╗   ██║   ███████║   ██║   █████╗
  // ╚════██║   ██║   ██╔══██║   ██║   ██╔══╝
  // ███████║   ██║   ██║  ██║   ██║   ███████╗
  // ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝
  // #region State

  const SS = createWriteoriumState({
    onLoad: () => {
      handleLoadingData()
    },
  })
  const S = $derived(SS.state)
  const T = $derived(SS.traveledState)
  let UI = lsState('writeorium_UI', {
    timeline: false,
    miniature: true,
    maximized: true,
  })

  $effect(() => {
    if (UI.timeline) {
      tick().then(() => {
        // Scroll to bottom
        timelineEl.scrollTop = timelineEl.scrollHeight
      })
    }
  })

  // ███████╗██╗   ██╗███████╗███╗   ██╗████████╗███████╗
  // ██╔════╝██║   ██║██╔════╝████╗  ██║╚══██╔══╝██╔════╝
  // █████╗  ██║   ██║█████╗  ██╔██╗ ██║   ██║   ███████╗
  // ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██║╚██╗██║   ██║   ╚════██║
  // ███████╗ ╚████╔╝ ███████╗██║ ╚████║   ██║   ███████║
  // ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝

  // #region Events

  function handleLoadingData() {
    tick().then(() => {
      textarea.focus()
      textarea.selectionStart = S!.position.start
      textarea.selectionEnd = S!.position.end
      currentPos = { ...SS.state!.position }
      if (timelineEl) {
        timelineEl.scrollTop = timelineEl.scrollHeight
      }
    })
  }

  onMount(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
  })

  onDestroy(() => {
    document.removeEventListener('selectionchange', handleSelectionChange)
  })

  $effect(() => {
    SS.travelTo
    tick().then(() => {
      const targetPosEl = document.getElementById('target-pos')
      if (targetPosEl) {
        targetPosEl.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      } else if (textarea) {
        textarea.focus()
        textarea.selectionStart = S!.position.start
        textarea.selectionEnd = S!.position.end
      }
    })
  })

  let moveTimeout: ReturnType<typeof setTimeout> = null!
  let currentPos = $state({ start: 0, end: 0 })

  function handleSelectionChange() {
    if (document.activeElement === textarea) {
      currentPos.start = textarea.selectionStart
      currentPos.end = textarea.selectionEnd
      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        SS.handleSelectionChange(currentPos)
      }, 500)
    }
  }

  let changeTimeout: ReturnType<typeof setTimeout> = null!
  function handleChange() {
    clearTimeout(changeTimeout)
    clearTimeout(moveTimeout)
    changeTimeout = setTimeout(() => {
      const newCorpus = textarea.value
      console.log(newCorpus)
      SS.handleCorpusChange(newCorpus)
    }, 500)
  }

  // ████████╗██████╗ ███████╗██╗     ██╗     ██╗███████╗
  // ╚══██╔══╝██╔══██╗██╔════╝██║     ██║     ██║██╔════╝
  //    ██║   ██████╔╝█████╗  ██║     ██║     ██║███████╗
  //    ██║   ██╔══██╗██╔══╝  ██║     ██║     ██║╚════██║
  //    ██║   ██║  ██║███████╗███████╗███████╗██║███████║
  //    ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝╚══════╝

  // #region Trellis
</script>

<div class="size-screen flex flex-col">
  {#if !UI.maximized}
    <div class="shrink-0 h6 flexcc bg-black/10 bg-black/5 dark:bg-white/5">
      <DarkToggle />
    </div>

    <h1 class="shrink-0 text-12/24 text-center font-serif">The Writeorium</h1>
  {/if}
  {#if S !== null && T !== null && SS.lastTraveledAction !== null}
    <div>
      <button onclick={() => (UI.maximized = !UI.maximized)}>MAX</button>
      <button onclick={() => (UI.timeline = !UI.timeline)}>TIMELINE</button>
      <button>MINIMAP</button>
      <button>CONTENT</button>
      <button>CORPUS</button>
    </div>
    <div
      class="h-12 bg-gradient-to-b from-gray-50 to-gray-200 dark:(from-gray-800 to-gray-900)"
    >
      {currentPos.start}, {currentPos.end} | {S.position.start}, {S.position
        .end}
      {SS.encodedLength / 1000}kb | {SS.encodedTimespan}ms
    </div>
    <div
      class="grow bg-gray-200 dark:bg-gray-900 pb3 flex space-x-3 overflow-auto px-3"
    >
      {#if UI.timeline}
        <div class="w-60 shrink-0 flex flex-col">
          <div class="overflow-auto grow p3 text-2.5/3" bind:this={timelineEl}>
            {#snippet btn(text: string, travelN: number | null)}
              <button
                onclick={() => SS.travel(travelN)}
                class={[
                  'block w-full text-left overflow-hidden text-ellipsis hover:bg-black/5 dark:hover:bg-white/5',
                  {
                    'bg-black/10 dark:bg-white/10': travelN === SS.travelTo,
                  },
                ]}
              >
                {text}
              </button>
            {/snippet}
            {#each S.actions as action, i (i)}
              {@const prevAction = S.actions[i - 1]}
              {#if action.type === 'move'}
                {@render btn(`[M] ${action.start}, ${action.end}`, i)}
              {:else if action.type === 'create'}
                {@const deletedChars = prevAction
                  ? prevAction.type === 'move' &&
                    prevAction.end - prevAction.start
                  : 0}
                {@render btn(
                  `[C] ${deletedChars ? `[-${deletedChars}]` : ''} ${action.data}`,
                  i,
                )}
              {/if}
            {/each}
            {@render btn('Last', null)}
          </div>
          <div>
            <button aria-label="Prev">
              <BackStep />
            </button>
            <button aria-label="Stop">
              <Stop />
            </button>
            <button aria-label="Play / Pause">
              <Play />
            </button>
            <button aria-label="Prev">
              <NextStep />
            </button>
          </div>
        </div>
      {/if}
      <div
        class="w-60 shrink-0 bg-black/5 dark:bg-white/5 b b-black/10 dark:b-white/20 b-l-0 h-full rounded-r-2 text-2.5/3 p3"
      >
        Hey</div
      >
      {#if SS.travelTo === null}
        <textarea
          bind:this={textarea}
          class={`block grow font-mono text-4/6 font-light
        b b-black/10 dark:b-white/20 bg-black/5 dark:bg-white/5
       mx-auto w-screen-lg max-w-full p3 h-full
      focus:bg-black/10 focus:dark:bg-white/10 outline-none rounded-2 resize-none

      `}
          value={S.corpus}
          oninput={handleChange}
        ></textarea>
      {:else}
        <div
          class={`grow  font-mono text-4/6 font-light
            bg-gray-300 dark:bg-gray-800
            b b-black/10 dark:b-white/20
            rounded-2
            p3 whitespace-pre-wrap overflow-auto
          `}
        >
          {#if T.position.start === T.position.end}
            {@const insertLen =
              SS.lastTraveledAction.type === 'create'
                ? SS.lastTraveledAction.data.length
                : 0}

            {T.corpus.slice(0, T.position.start - insertLen)}{#if insertLen > 0}
              <span class="bg-green-500/50"
                >{T.corpus.slice(
                  T.position.start - insertLen,
                  T.position.start,
                )}</span
              >
            {/if}<span class="inline-block w-0 h5 vertical-bottom">
              <span
                id="target-pos"
                class="relative bg-yellow-500/90 w-4px block -translate-y-2px -translate-x-2px h-full"
              >
                <span
                  class="block absolute top-0 left-1/2 -translate-x-1/2 w-1px bg-black h-full animate-blink"
                ></span>
              </span>
            </span>{T.corpus.slice(T.position.end)}
          {:else}
            {T.corpus.slice(0, T.position.start)}<span
              id="target-pos"
              class="bg-yellow-500/50"
              >{T.corpus.slice(T.position.start, T.position.end)}</span
            >{T.corpus.slice(T.position.end)}
          {/if}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .animate-blink {
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
