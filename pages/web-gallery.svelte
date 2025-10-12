<script module lang="ts">
  export const metadata = {
    title: 'Web Gallery',
  }
</script>

<script lang="ts">
  import OptimizedImg from '../components/OptimizedImg.svelte'

  const picturesSrc = import.meta.glob('../photos/web-gallery/*.{png,jpg}', {
    query: { format: 'webp', width: '100;250;500', picture: '' },
    import: 'default',
    eager: true,
  })

  const picturesMeta = import.meta.glob('../photos/web-gallery/*.{png,jpg}', {
    query: { format: 'webp', as: 'meta:height;width', picture: '' },
    import: 'default',
    eager: true,
  })

  type ImgData = {
    src: [string, string, string]
    meta: { width: number; height: number }
  }

  type Imgs = {
    [key: string]: ImgData
  }

  let pictures: Imgs = {}
  for (let srcs in picturesSrc) {
    const name = srcs
      .replace('../photos/web-gallery/', '')
      .replace('.png', '')
      .replace('.jpg', '')
    const src = picturesSrc[srcs]
    const meta = picturesMeta[srcs]
    pictures[name] = {
      src: src as [string, string, string],
      meta: meta as { width: number; height: number },
    }
  }

  const PROJECTS = {
    comicsen: {
      name: 'Comicsen',
      narrative: `
        One of my first ambitious works.
        I was really into webcomics, and wanted to translate them to Spanish.
        Made a whole canvas-based drawing tool that allowed me to paint and write over the comics.`,
    },
    targetShooter: {
      name: 'Target Shooter',
      archive:
        'https://web.archive.org/web/20131129030948/http://zequez.com/sandbox/blindmice/',
      narrative: `
        A web based game. I experimented with real-time canvas and was really proud of
        the circles-breaking-into-pieces effect. I submitted the piece to the Chrome Experiments and
        it got accepted; that was really proud of this one. It saddens me that the original code was
        lost, and I'm only left with the mangled minimized one; this was before Github.
      `,
    },
    mapaDeTransporte: {
      name: 'Mapa de Transporte',
      narrative: `
        I was furious that there was no clear way to visualize all the bus routes of my hometown. The
        bus organizion only had a printed document with the list of streets the bus turned on. I decided
        to make this by myself. This was my first incursion into using the Google Maps API, and I learned Ruby on Rails tech stack,
        which opened many doors for me years down the line. There was a crowd-sourcing functionality, where people
        were able to send information about places where you could recharge the bus card.
      `,
    },
    playtimeForTheBuck: {
      name: 'Playtime For The Buck',
      narrative: `
        I noticed that the games I most liked were the ones I most played. So instead of relying on
        reviews for finding games, what if we could see the collective average hours that people spent
        playing games? Well, this information was somewhat available on Steam game reviews sections, where the
        amount of time played was featured along with the review. With this project I learned about web scraping,
        and about leveraging the free Github Pages infrastructure for publishing websites for free. The whole thing
        was generated regularly in my computer and then pushed to Github with a cronjob. I scraped information about
        thousands of Steam games using this.
      `,
    },
    prismataSubredditExtension: {
      name: 'Prismata Subreddit Extension',
      narrative: `
        Prismata was, and still is, a symmetric cards game that I enjoyed for a while. The subreddit
        was very active, and people would quote cards constantly. So I made a Chrome extension that
        would detect cards mentions and cross-link them to the Prismata Wiki and allow you to see
        the card image on hover.
      `,
    },
    redditPlacebot: {},
    factorioModsPortal: {},
    ggfilter: {},
    mandelbrotSandbox: {},
    archyCollab: {},
    componentEditor: {},
    emailSignatures: {},
    beforeAfterAudioPlayer: {},
    wavySvg: {},
    spaceport: {},
    coralSandbox: {},
    hoja: {},
    webEnvironment: {},

    websiteV1: {
      narrative: 'Jekylls green blog',
      archive: 'https://web.archive.org/web/20150502020652/http://zequez.com/',
    },
    websiteV2: {
      narrative: 'The white clean website with a portfolio',
    },
    websiteV3: {
      narrative: 'The rainbow website',
      archive:
        'https://web.archive.org/web/20230312073926/https://zequez.space/',
    },
    websiteV4: {
      narrative: 'The blunder one',
    },
    websiteV5: {
      narrative: 'Balanced one',
    },
    websiteV6: {
      narrative: 'Infinite canvas website',
    },
    websiteV7: {
      narrative: 'The current website',
    },
  }

  type ListImg = [img: string, project: string]

  let LIST: ListImg[][] = $state([
    [
      ['websiteV7-1', 'websiteV7'],
      ['hoja-2', 'hoja'],
      ['hoja-0', 'hoja'],
      ['before-after-player-1', 'beforeAfterAudioPlayer'],
      ['before-after-player-2', 'beforeAfterAudioPlayer'],
      ['before-after-player-3', 'beforeAfterAudioPlayer'],
      ['component-editor-screenshot', 'componentEditor'],
      ['email-signatures-screenshot', 'emailSignatures'],
      ['mandelbrot-sandbox', 'mandelbrotSandbox'],
      ['prismata-subreddit-extension', 'prismataSubredditExtension'],
      ['comicsen', 'comicsen'],
    ],
    [
      ['websiteV7-2', 'websiteV7'],
      ['hoja-1', 'hoja'],
      ['hoja-3', 'hoja'],
      ['spaceport-2', 'spaceport'],
      ['spaceport-3', 'spaceport'],
      ['archy-collab-1', 'archyCollab'],
      ['ggfilter', 'ggfilter'],
      ['ggfilter-v0', 'ggfilter'],
      ['playtime-for-the-buck', 'playtimeForTheBuck'],
      ['target-shooter-1', 'targetShooter'],
    ],
    [
      ['websiteV6-2', 'websiteV6'],
      ['websiteV5-2', 'websiteV5'],
      ['websiteV5-1', 'websiteV5'],
      ['websiteV4-1', 'websiteV4'],
      ['wavy-svg-screenshot', 'wavySvg'],
      ['factorio-mods', 'factorioModsPortal'],
      ['mapa-de-transporte', 'mapaDeTransporte'],
      ['mapa-de-transporte-backend', 'mapaDeTransporte'],
    ],
    [
      ['websiteV6-1', 'websiteV6'],
      ['websiteV6-3', 'websiteV6'],
      ['websiteV5-3', 'websiteV5'],
      ['websiteV4-2', 'websiteV4'],
      ['websiteV3-2', 'websiteV3'],
      ['websiteV3-1', 'websiteV3'],
      ['websiteV2', 'websiteV2'],
      ['websiteV1', 'websiteV1'],
    ],
  ])

  let hovering: string | null = $state(null)
  let moveFocus: [number, number] | null = $state(null)

  function onDropPic(to: [number, number]) {
    const from = moveFocus!
    const toMove = LIST[from[0]][from[1]]
    LIST[from[0]].splice(from[1], 1)
    LIST[to[0]].splice(to[1], 0, toMove)

    console.log(JSON.stringify(LIST))
  }
</script>

<DocPage>
  <h1>{enes('Web Gallery', 'Galería de obras web')}</h1>
  <p>
    Back in 2005 when I was about 12 years old, I crafted my first web page
    using the Windows XP Notepad.
  </p>
</DocPage>

{#snippet dropTarget(listNum: number, listIndex: number)}
  {#if moveFocus}
    <div class="h-0 relative z-100">
      <button
        onclick={() => {
          onDropPic([listNum, listIndex])
        }}
        class="h-6 bg-black/50 w-full rounded-1 text-white font-bold hover:bg-black/80"
        >DROP</button
      >
    </div>
  {/if}
{/snippet}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  style={`grid-template-columns: repeat(${LIST.length}, minmax(0, 1fr))`}
  onmouseleave={() => {
    hovering = null
  }}
  class="pb18 grid gap-6 max-w-screen-xl px6 mx-auto"
>
  {#each LIST as sublist, i}
    <div class="flex flex-col justify-end">
      {@render dropTarget(i, 0)}
      {#each sublist as [pic, project], j}
        {@const projectVal = PROJECTS[project as keyof typeof PROJECTS]}
        <button
          class={[
            'overflow-hidden rounded-1 mt-6 ring-1 ring-black/30',
            {
              'mt-0': j === 0,
              ' shadow-[0_0_0_.5rem] shadow-yellow-400': hovering === project,
            },
          ]}
          onfocus={() => {
            hovering = project
          }}
          onmouseenter={() => {
            hovering = project
          }}
          onclick={(ev) => {
            if (ev.shiftKey) {
              moveFocus = [i, j]
            }
          }}
        >
          <OptimizedImg {...pictures[pic]} alt={(projectVal as any).name} />
        </button>
        {@render dropTarget(i, j + 1)}
      {/each}
    </div>
  {/each}
</div>
