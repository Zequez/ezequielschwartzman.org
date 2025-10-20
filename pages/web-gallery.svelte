<script module lang="ts">
  export const metadata = {
    title: 'Web Gallery',
  }
</script>

<script lang="ts">
  import OptimizedImg from '../../../substrates/toroid-web/components/OptimizedImg.svelte'
  import RArrIcon from '~icons/fa6-solid/caret-right'
  import LArrIcon from '~icons/fa6-solid/caret-left'

  import PROJECTS, { type ImgData } from '../photos/web-gallery'
  import { enes } from '../../../center/enes.svelte'

  let LIST: [string[], string[], string[], string[]] = $state([
    [
      'websiteV7',
      'gamez',
      'hoja',
      'hoja',
      'before-after-player',
      'before-after-player',
      'before-after-player',
      'components-editor',
      'email-signatures',
      'mandelbrot-sandbox',
      'prismata-subreddit-extension',
      'comicsen',
    ],
    [
      'websiteV7',
      'gamez',
      'gamez',
      'hoja',
      'hoja',
      'spaceport',
      'spaceport',
      'archy-collab',
      'ggfilter',
      'ggfilter',
      'playtime-for-the-buck',
      'target-shooter',
    ],
    [
      'substrate',
      'gamez',
      'websiteV6',
      'websiteV5',
      'websiteV5',
      'websiteV4',
      'websiteV4',
      'wavy-svg',
      'factorio-mods-portal',

      'mapa-de-transporte',
      'websiteV1',
    ],
    [
      'substrate',
      'gamez',
      'websiteV6',
      'websiteV6',
      'websiteV5',

      'websiteV3',
      'websiteV3',

      'mapa-de-transporte',
      'websiteV2',
    ],
  ])

  let hovering: string | null = $state(null)
  // let moveFocus: [number, number] | null = $state(null)
  let projectFocus: [string, number] | null = $state(null)

  // function onDropPic(to: [number, number]) {
  //   const from = moveFocus!
  //   const toMove = LIST[from[0]][from[1]]
  //   LIST[from[0]].splice(from[1], 1)
  //   LIST[to[0]].splice(to[1], 0, toMove)

  //   console.log(JSON.stringify(LIST))
  // }

  function focusProject(projectId: string, picIndex: number) {
    projectFocus = [projectId, picIndex]
    document.body.classList.add('overflow-hidden')

    function handleEsc(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        closeProjects()
      } else if (ev.key === 'ArrowRight') {
        nextImage()
      } else if (ev.key === 'ArrowLeft') {
        prevImage()
      }
    }

    window.addEventListener('keydown', handleEsc)
  }

  function closeProjects() {
    projectFocus = null
    document.body.classList.remove('overflow-hidden')
  }

  function nextImage() {
    const [projectName, imgIndex] = projectFocus!
    const project = PROJECTS[projectName]
    const nextImg = project.imgs[imgIndex + 1]
    if (nextImg) {
      projectFocus = [projectName, imgIndex + 1]
    } else {
      const projectsKeys = Object.keys(PROJECTS)
      const nextProject = projectsKeys[projectsKeys.indexOf(projectName) + 1]
      if (nextProject) {
        projectFocus = [nextProject, 0]
      } else {
        projectFocus = [projectsKeys[0], 0]
      }
    }
  }

  function prevImage() {
    const [projectName, imgIndex] = projectFocus!
    const project = PROJECTS[projectName]
    const nextImg = project.imgs[imgIndex - 1]
    if (nextImg) {
      projectFocus = [projectName, imgIndex - 1]
    } else {
      const projectsKeys = Object.keys(PROJECTS)
      const nextProject = projectsKeys[projectsKeys.indexOf(projectName) - 1]
      if (nextProject) {
        const nextProject2 = PROJECTS[nextProject]
        projectFocus = [nextProject, nextProject2.imgs.length - 1]
      } else {
        projectFocus = [
          projectsKeys[projectsKeys.length - 1],
          project.imgs.length - 1,
        ]
      }
    }
  }

  function generateProjectImagePicker(projects: typeof PROJECTS) {
    let projectsIndex: { [key: string]: number } = {}

    return (project: keyof typeof projects) => {
      const projectBuilt = projects[project]
      if (projectBuilt === undefined) {
        throw new Error(`No such project: ${project}`)
      }

      if (projectsIndex[project] === undefined) {
        projectsIndex[project] = 0
      } else {
        projectsIndex[project]++
      }

      const img = projects[project].imgs[projectsIndex[project]]
      if (img === undefined) {
        throw new Error(`No more images for ${project}`)
      }
      return [img, projectsIndex[project]] as [ImgData, number]
    }
  }

  let projectImg = $derived(generateProjectImagePicker(PROJECTS))
</script>

<DocPage>
  <h1>{enes('Web Gallery', 'Galería de obras web')}</h1>
  <p>
    Back in 2005 when I was about 12 years old, I crafted my first web page
    using the Windows XP Notepad.
  </p>
</DocPage>

{#snippet dropTarget(listNum: number, listIndex: number)}
  <!-- {#if moveFocus}
    <div class="h-0 relative z-100">
      <button
        onclick={() => {
          onDropPic([listNum, listIndex])
        }}
        class="h-6 bg-black/50 w-full rounded-1 text-white font-bold hover:bg-black/80"
        >DROP</button
      >
    </div>
  {/if} -->
{/snippet}

{#if projectFocus}
  {@const projectVal = PROJECTS[projectFocus[0] as keyof typeof PROJECTS]}
  <div class="fixed z-9999 bg-gray-950 h-full w-full top-0 left-0">
    <div class="w-full h-full overflow-hidden flexcc">
      <OptimizedImg
        class="block object-contain max-h-full max-w-full"
        {...projectVal.imgs[projectFocus[1]]}
        alt={(projectVal as any).name}
      />
    </div>
    <div
      class="absolute bottom-0 w-full bg-black/30 backdrop-blur-sm text-white p6"
    >
      <div class="text-8 font-serif">{(projectVal as any).name}</div>
      <div>{(projectVal as any).narrative}</div>
    </div>
    <button
      class="absolute h12 w12 top-0 right-0 z-100 bg-black hover:bg-gray-900 text-white text-8 rounded-bl-1"
      onclick={closeProjects}>&times;</button
    >
    <button
      onclick={nextImage}
      class="absolute z-90 w12 top-1/6 rounded-l-4 right-0 h-2/3 bg-black/10 hover:bg-black/20 text-white text-12 flexcc"
    >
      <RArrIcon class="relative z-20" />
      <div class="absolute inset-0 flexcc">
        <RArrIcon class="relative z-10 top-1px left-1px text-black" />
      </div>
    </button>
    <button
      onclick={prevImage}
      class="absolute z-90 w12 top-1/6 rounded-r-4 left-0 h-2/3 bg-black/10 hover:bg-black/20 text-white text-12 flexcc"
    >
      <LArrIcon class="relative z-20" />
      <div class="absolute inset-0 flexcc">
        <LArrIcon class="relative z-10 top-1px left-1px text-black" />
      </div>
    </button>
  </div>
{/if}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  style={`grid-template-columns: repeat(${LIST.length}, minmax(0, 1fr))`}
  onmouseleave={() => {
    hovering = null
  }}
  class="pb18 grid gap-0 sm:gap-0 max-w-screen-xl mx-auto z-4"
>
  {#each LIST as sublist, i}
    <div class="flex flex-col justify-end relative">
      {@render dropTarget(i, 0)}
      {#each sublist as project, j}
        {@const hasPrev = sublist[j - 1] === project}
        {@const hasNext = sublist[j + 1] === project}
        {@const nothingOnRight =
          LIST[i + 1] === undefined || LIST[i + 1].indexOf(project) === -1}
        {@const nothingOnLeft =
          LIST[i - 1] === undefined || LIST[i - 1].indexOf(project) === -1}
        {@const projectVal = PROJECTS[project as keyof typeof PROJECTS]}
        {@const [img, imgIndex] = projectImg(project)}
        <button
          class={[
            'relative ',
            {
              'ml-1 sm:ml-4': nothingOnLeft,
              'mr-1 sm:mr-4': nothingOnRight,
              'mt-1.5 sm:mt-6': !hasPrev,
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
              // moveFocus = [i, j]
            } else {
              focusProject(project, imgIndex)
            }
          }}
        >
          <OptimizedImg
            style={`border-color: hsl(${projectVal.hue}, ${project === hovering ? '70%, 50%' : '40%, 60%'}); `}
            class={[
              'relative b-x-0.25rem sm:b-x-1rem',
              {
                'z-11': project !== hovering,
                'z-20': project === hovering,
                'b-t-0.25rem rounded-t-1 sm:(b-t-1rem rounded-t-4)': !hasPrev,
                'b-b-0.25rem rounded-b-1 sm:(b-b-1rem rounded-b-4)': !hasNext,
              },
            ]}
            {...img}
            alt={projectVal.name}
          />
          <div
            class={[
              'absolute top-0 left-0 w-full h-full bg-gray-700 shadow-[0_0_0px_1.5px] shadow-gray-700 dark:shadow-gray-50',
              {
                'z-5': project !== hovering,
                'z-19': project === hovering,
                'shadow-[0_0_0px_3px]': hovering === project,
                'rounded-t-1 sm:rounded-t-4': !hasPrev,
                'rounded-b-1 sm:rounded-b-4': !hasNext,
              },
            ]}
          ></div>
        </button>
        {@render dropTarget(i, j + 1)}
      {/each}
    </div>
  {/each}
</div>
