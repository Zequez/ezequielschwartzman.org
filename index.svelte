<script lang="ts" module>
  export type Context = {
    focus: string
  }
</script>

<script lang="ts">
  import { onMount, setContext } from 'svelte'
  import Frame from './Frame.svelte'
  import fearImg from './fear.jpg'
  import { cx } from '@/center/utils'
  import WildGrid from './WildGrid.svelte'

  let focus = $state('origin')
  let zoom = $state(1)
  let scrollContainer = $state<HTMLDivElement>(null!)
  let cavitationContainer = $state<HTMLDivElement>(null!)
  let originContainer = $state<HTMLDivElement>(null!)

  type Structure = {
    id: string
    tl: Structure
    tt: Structure
    tr: Structure
    rt: Structure
    rr: Structure
    rb: Structure
    br: Structure
    bb: Structure
    bl: Structure
    lb: Structure
    ll: Structure
    lt: Structure
  }

  onMount(() => {
    if (window.location.hash) {
      const focus = window.location.hash.slice(1)
      scrollTo(focus, true)
    }
  })

  function focusOn(id: string) {
    focus = id
    history.pushState(null, '', `#${id}`)
    scrollTo(id)
  }

  function handleHashChange(ev: Event, id: string) {
    ev.preventDefault()
    focus = id
    scrollTo(id)
  }

  function scrollTo(id: string, instant: boolean = false) {
    cancelInertia()
    document.getElementById(id)!.scrollIntoView({
      behavior: instant ? 'instant' : 'smooth',
      block: 'center',
      inline: 'center',
    })
  }

  function captureLinksClick(ev: MouseEvent) {
    if (ev.target instanceof HTMLAnchorElement) {
      console.log(ev.target.href)
      const url = new URL(ev.target.href)
      if (url.hash) {
        ev.preventDefault()
        ev.stopPropagation()
        focusOn(ev.target.hash.slice(1))
      }
    }
  }

  let currentPan = $state<{ x: number; y: number; startedAt: number } | null>(
    null,
  )

  function handleWindowMousedown(ev: MouseEvent) {
    if (ev.target === cavitationContainer) {
      cancelInertia()
      currentPan = {
        x: ev.clientX,
        y: ev.clientY,
        startedAt: Date.now(),
      }
    }
  }

  function handleWindowMousemove(ev: MouseEvent) {
    if (currentPan) {
      const dx = ev.movementX * -1
      const dy = ev.movementY * -1
      scrollContainer.scrollLeft += dx
      scrollContainer.scrollTop += dy
    }
  }

  function handleWindowMouseup(ev: MouseEvent) {
    if (currentPan) {
      const dx = ev.clientX - currentPan.x
      const dy = ev.clientY - currentPan.y
      const dt = Date.now() - currentPan.startedAt
      const vx = dx / dt
      const vy = dy / dt

      const constant = 20
      animateInertia(vx * constant, vy * constant)

      currentPan = null
    }
  }

  let inertiaFrame: number | null = null
  function animateInertia(vx: number, vy: number) {
    const friction = 0.95 // closer to 1 = more glide
    const threshold = 0.5 // stop when velocity is very low

    function step() {
      vx *= friction
      vy *= friction

      if (Math.abs(vx) < threshold && Math.abs(vy) < threshold) return

      scrollContainer.scrollLeft -= vx
      scrollContainer.scrollTop -= vy

      inertiaFrame = requestAnimationFrame(step)
    }

    inertiaFrame = requestAnimationFrame(step)
  }

  function cancelInertia() {
    if (inertiaFrame !== null) {
      cancelAnimationFrame(inertiaFrame)
      inertiaFrame = null
    }
  }

  const C: Context = {
    get focus() {
      return focus
    },
  }

  setContext('main', C)

  $effect(() => {
    if (currentPan) {
      document.body.classList.add('cursor-grabbing', 'select-none')
    } else {
      document.body.classList.remove('cursor-grabbing', 'select-none')
    }
  })
</script>

<svelte:window
  onclick={captureLinksClick}
  onhashchange={(ev) => handleHashChange(ev, window.location.hash.slice(1))}
  onmouseup={handleWindowMouseup}
  onmousemove={handleWindowMousemove}
  onmousedown={handleWindowMousedown}
/>

<!-- <WildGrid /> -->

{#snippet title(text: string)}
  <div class="text-xl text-black/75 font-bold mb-1.5">{text}</div>
{/snippet}

<!-- bg-[hsl(100deg_100%_100%)] -->
<div
  bind:this={scrollContainer}
  class="relative h-full w-full bg-gray-800 overflow-auto no-scrollbar"
>
  <div
    class="fixed bottom-0 left-1/2 -translate-x-1/2 bg-black/90 text-white px2 py1 rounded-t-md uppercase text-xs font-bold"
  >
    {focus}
  </div>
  <div
    bind:this={cavitationContainer}
    class="relative w-5000px h-5000px max-w-none max-h-none"
  >
    <div bind:this={originContainer} class="absolute w-0 h-0 left-1/2 top-1/2">
      <!-- <div class="absolute z-10 inset-0 bg-[url('/noise20.png')] opacity-30"></div> -->
      <Frame id="origin" w={30} x={0} y={0} origin="">
        <!-- <img
        src={fearImg}
        alt="Fear"
        class="w-30 rounded-full absolute -top-12 -left-20 saturate-0 contrast-130 shadow-[0_1.5px_0px_2px_#888]"
      /> -->
        <div class="flex mb4">
          <img
            src={fearImg}
            alt="Fear"
            class="w-30 h-30 flex-shrink-0 -mt-4 -ml-4 mr4 rounded-tl-md saturate-0 contrast-130 rounded-br-md shadow-[1.5px_1.5px_0px_2px_#888]"
          />
          <div class="flexsc flex-col text-left flex-grow">
            <div class="text-2xl text-black/75 font-bold mb-1.5">
              Ezequiel Schwartzman
            </div>
            <div class="-mt-1.5 mb-1.5 opacity-50 text-xs">
              Researcher & Artist & Inventor & Web-Technologist &
              EHP-Spaceholder-Apprentice & Mage-Apprentice & ...
            </div>
            <div class="text-xs">
              Taking a stand for Aliveness, Simplicity and Authenticity
            </div>
          </div>
        </div>

        <div class="text-sm flex flex-col space-y-1.5">
          <p>
            You don't get to tell me what I create or how. Yet you might inspire
            me with great amounts of money.
          </p>
          <p></p>
          <p>
            By buying credits for my <a href="#presencial-service">
              Presencial Service
            </a>
            , you pay to meet with me.
          </p>
          <p>
            You are welcome to buy a lifetime worth of meetings with me, and you
            can schedule them at your leisure by using the Calendar Link. No
            more than once or twice per week. You may also use the Calendar Link
            to join group-sized Presencial Service offerings that I publish. You
            can stay in touch with my offerings by subscribing on my Presence
            Link.
          </p>
          <p>
            You can see your credits with me on the Credits Link. You may buy
            credits with any currency and form of material and non-material
            value. There is a credits vending machine at the Protocols Link. For
            negotiation PM me. Mutual Credit is an option. And there is still
            plenty of spaces on my EHP training credits line. If we haven't met
            each other make sure to contact me before scheduling on the Calendar
            Link.
          </p>
          <p>
            You can find the most effective protocols for contacting me at my
            Protocols Link.
          </p>
        </div>
      </Frame>
      <Frame id="protocols-link" w={20} x={-1} y={1} origin="origin@bl">
        {@render title('Protocols Link')}
        <div>Instant messages:</div>
        EzequielSchwartzman @ Telegram Whatsapp
      </Frame>
      <Frame id="presence-link" w={30} x={0} y={1} origin="origin@b">
        {@render title('Presence Link')}
        <a class="block" href="https://github.com/zequez">Github activity</a>
        <a class="block" href="https://medium.com/@ezequiel.schwartzman">
          Articles on Medium
        </a>
      </Frame>
      <Frame id="calendar-link" w={24} x={1} y={1} origin="origin@br">
        {@render title('Calendar Link')}
      </Frame>
      <Frame
        id="presencial-service"
        w={30}
        x={0}
        y={2}
        origin="presencial-service@b"
      >
        {@render title('Presencial Service')}
      </Frame>
    </div>
  </div>
</div>

<style>
  .no-scrollbar {
    scrollbar-width: 0;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
