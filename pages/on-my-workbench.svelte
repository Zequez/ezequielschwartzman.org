<script module>
  export const metadata = { title: 'On My Workbench' }
</script>

<script lang="ts">
  import { enes } from '../../../center/enes.svelte'

  let itemClass = 'mb6 darkish p6 rounded-3'

  let showArchive = $state(false)
  function toggleArchive() {
    showArchive = !showArchive
  }
</script>

{#snippet TAGS(tags: string[])}
  <div class="absolute -top-3 left-3">
    {#each tags as tag}
      <span
        class={[
          'px3 uppercase text-xs font-bold font-mono lh-6 rounded-2 text-white',
          'text-shadow-[0_1px_0_#0003] shadow-[inset_0_0_0_1.5px_#0002]',
          'inline-block mr1.5',
          {
            'bg-lime-400': tag.startsWith('visibility'),
            'bg-red-400': tag.startsWith('tech'),
            'bg-blue-400': tag.startsWith('writing'),
            'bg-orange-400': tag.startsWith('waitlist'),
            'bg-purple-400': tag.startsWith('curation'),
            'bg-yellow-400': tag.startsWith('local'),
            'bg-teal-400': tag.startsWith('aprendimiento'),
            'bg-gray-500': tag.startsWith('on-hold'),
            'bg-black text-white shadow-[inset_0_0_0_1.5px_#fff4]':
              tag.startsWith('edge'),
          },
        ]}>{tag}</span
      >
    {/each}
  </div>
{/snippet}

<DocPage>
  <h1 class="text-12 font-serif text-center py6">
    {enes('On My Workbench', 'En mi banco de trabajo')}
  </h1>

  <div class="item">
    {@render TAGS(['tech'])}
    Toroid Substrate improvements:
    <ul>
      <li class="line-through">
        Optimize PagesList component so that pages are rendered and loaded
        asynchronically and on-deman and progressively as they become visible on
        the viewport on scrolling.
      </li>
      <li class="line-through">
        Polish the rendering process sizing so that the margins of the pages can
        be expressed and rendered precisely
      </li>
      <li class="line-through">
        Make the PageList page hovering and page active elements customizable
      </li>
      <li>
        On development mode add list of pages that are not visible on the
        PageList
      </li>
      <li>
        On development mode allow to move pages from one column to the other and
        update the App file configuration
      </li>
      <li>
        Make sticky header more consisten so it sticks to bottom when above and
        it sticks to top when below
      </li>
    </ul>
  </div>

  <div class="item">
    {@render TAGS(['tech'])}
    Web Environment:
    <ul>
      <li>
        Add tunneling server that allows you to call any arbitrary file and
        function of any substrate as an API that has access to the filesystem
        and such
      </li>
    </ul>
  </div>

  <div class="item">
    {@render TAGS(['waitlist'])}
    Sitio web para Rodrigo
  </div>

  <div class="item">
    {@render TAGS(['waitlist', 'local'])}
    Sitio web para el mundo de juego de Muralismo Itinerante
  </div>

  <div class="item">
    {@render TAGS(['visibility', 'writing'])}
    Write <a href="/grant-application">grant application</a> for 6 months of
    personal material support for my work on the the Web Environment commons
    project to be sent to the
    <a href="https://nlnet.nl/propose/">NLNet Foundation</a> to be delivered by
    filling my
    <a href="/flowing-fund">Flowing Fund</a>.
  </div>

  <div class="item">
    {@render TAGS(['writing'])}
    Escribir la página de <a href="/servicio-web">/servicio-web</a> y publicarla
    junto con <a href="/sitios-web">/sitios-web</a>
  </div>

  <div class="item">
    {@render TAGS(['visibility', 'local'])}
    Difundir
    <a href="https://agroeco.ezequielschwartzman.org/propuesta"
      >agroeco.ezequielschwartzman.org/propuesta</a
    >
  </div>

  <div class="item">
    {@render TAGS(['visibility', 'local'])}
    Clarificar propuesta barrial para mogotes; preparar un sitio como agroeco para
    el barrio.
  </div>

  <div class="item">
    {@render TAGS(['writing', 'tech', 'visibility'])}
    Create and publish Web Environment Handbook at webenv.ezequielschwartzman.org</div
  >

  <div class="item">
    {@render TAGS(['writing', 'visibility', 'local'])}

    Preparar contenido del sitio de casa nami como para publicarlo.
  </div>

  <div class="item">
    {@render TAGS(['writing', 'visibility', 'local'])}

    Preparar propuesta para comunidad PM de mejoramiento de Startover; en
    meta-startover.ezequielshwartzman.org
  </div>

  <div class="item">
    {@render TAGS(['writing'])}
    Create a page about the Web Substrating Gameworld and the Digital Substrate distinction.
  </div>

  <div class="item">
    {@render TAGS(['tech'])}
    Test Web Environment Setup And Running from zero on Rediguana laptop
  </div>

  <div class="item">
    {@render TAGS(['tech'])}
    Adding substrate selection and initialization to the Web Environment repos UI
  </div>

  <div class="item">
    {@render TAGS(['tech'])}
    Optimize loading of pages on the Toroid Substrate so that the pages list load
    as you scroll instead of all the pages loading at the same time even when outside
    the viewport.
  </div>

  <div class="item">
    {@render TAGS(['tech'])}
    Experiment with generating a Toroid Substrate with just images on a folder named
    in a certain way.
  </div>

  <div class="item">
    {@render TAGS(['tech', 'on-hold'])}
    Experimenting with Structured Code Editing for Svelte Components so that it can
    be integrated into the Toroid Substrate for editing pages without a code editor.

    <br />
    I did some experimenting at <a href="/editor">/editor</a> on how to render it;
    was not very satisfactory, but interesting nonetheless.
  </div>

  <div class="item">
    {@render TAGS(['writing', 'visibility'])}
    Add the first entry to the
    <a href="/team-report-letters">Team Report Letters</a> page for writing regularly
    about all the stuff that I created, as an alternative to newsletters. Share on
    Archiarchy Creation Village.
  </div>

  <div class="item">
    {@render TAGS(['curation'])}
    Collect gold from personal conversations from Telegram and create a section here
    on the website to publish them. Do the same with AI/ChatGPT conversations.
  </div>

  <div class="item">
    {@render TAGS(['curation'])}
    Add gallery of physical art projects
  </div>

  <div class="item">
    {@render TAGS(['writing', 'aprendimiento', 'local'])}

    Efectuar el
    <a href="/etimologia-nueva-reemplazativa#aprendimientos">aprendimiento</a>
    de
    <a href="/aprendimientos#malabarista-vendedor-de-pelotas"
      >El Malabarista Vendedor de Pelotas</a
    >
    <ul>
      <li class="line-through">
        Terminar de pintar cartel con "El malabarismo es una fusión de arte y
        juego" "Fomenta la coordinación, concentración, auto-estima y
        neuroplasticidad" "Pelotas de prática artesanales x3 + Link
        video-tutorial = $6,000"</li
      >
      <li></li>
      <li class="line-through">
        Grabar videotutorial de como hacer malabares y colgar en <a
          href="/malabares">/malabares</a
        ></li
      >
      <li class="line-through">
        Imprimir mi <a href="/card">tarjeta personal</a>, recortarlas y
        agregarle /malabares, para entregar con las pelotas.
      </li>
      <li class="line-through">
        Escribir instrucciones de como producir pelotas artesanales, agregarle
        fotos.
      </li>
    </ul>
    <p class="line-through"
      >Nota al pie, decidí que voy a salir hoy 20 Oct 2hs de 12:00 a 14:00 a
      hacer esto <a href="https://maps.app.goo.gl/8EvbbwGAhMThAPsT9"
        >acá en la costa</a
      >. Si se venden antes de las 14:00 vuelvo antes. Voy a imprimir las
      tarjetas también.</p
    >
    <p>Nota2: Escribir resultados</p>
  </div>

  <h2>Archive</h2>
  <button
    onclick={toggleArchive}
    class="w-full bg-blue-300 b b-black/10 text-white rounded-1 py3 mb6"
    >{showArchive ? 'Hide' : 'Show'}</button
  >

  <!--
   █████╗ ██████╗  ██████╗██╗  ██╗██╗██╗   ██╗███████╗
  ██╔══██╗██╔══██╗██╔════╝██║  ██║██║██║   ██║██╔════╝
  ███████║██████╔╝██║     ███████║██║██║   ██║█████╗
  ██╔══██║██╔══██╗██║     ██╔══██║██║╚██╗ ██╔╝██╔══╝
  ██║  ██║██║  ██║╚██████╗██║  ██║██║ ╚████╔╝ ███████╗
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝  ╚══════╝
                                                       -->

  {#if showArchive}
    <div class="item">
      {@render TAGS(['waitlist', 'local'])}
      Creating website for Nami house.

      <br />

      Done
      <a href="https://nami.ezequielschwartzman.org"
        >nami.ezequielschwartzman.org</a
      > independent domain pending
    </div>

    <div class="item">
      {@render TAGS(['tech'])}
      Extracting Toroid Substrate from my personal website
    </div>

    <div class="item relative">
      {@render TAGS(['visibility', 'local', 'edge'])}

      <div
        class="bg-gray-50/90 text-black absolute inset-8 rounded-md p6 mb6 b-0.5rem b-green-500 b-dashed overflow-auto"
      >
        <p>Went to sleep and now I've got more clarity.</p>
        <p>Mundo de Juego: Sistema Cooperativo Barrial | Sistema Mogotes</p>
        <p>
          I'm setting up a crowdfunding and group-waitlist for a collaborative
          websites for social organisms, such as the Mogotes neighbourhood where
          my landbase is currently at.
        </p>
        <ul>
          <li>
            The purpose of this Gameworld is to hold space for Cooperation,
            Creative Collaboration, Possibility and Empowerment to do their work
            in the neighbourhood.
          </li>
          <li>The website uses the Toroid Substrate</li>
          <li>
            Each participant gets one individual page for their project or
            person.
          </li>
          <li>
            To become involved you commit to provide a one-time AR$ 10,000 for
            each person seat in your Gameworld. So a business with 10 employees,
            that's AR$ 100,000.
          </li>
          <li>
            For each seat you can get one invitation to the neighbourhood
            discussion group. You still get one page no matter the seats. If
            your Gameworld splits off, you can transfer the seat to the new
            Gameworld. The discussion group it's held as a Telegram group. Here
            we can propose in-person meetups.
          </li>
          <li>
            The page can just be a simple image created using software like
            Canva and sent to me via Whatsapp or Telegram</li
          >
          <li>
            Each participant puts AR$ 10,000 on my Flowing Fund or the
            equivalent as credits for their Gameworld
          </li>
          <li>
            When 5 participants are reached, a domain name is bought, one
            collaborative index page is added, and one individual page for each
            participant, and then it's published.
          </li>
          <li>
            There is one individual page for each project or person and there
            are also group-context pages, such as a map of the neighbourhood for
            example, or categories of Gameworlds such as gastronomic or
            home-maintenance, hospedage, food-sourcing, pet stores, beaches,
            oficios such as woodworking, metalworking, clothworking,
            ceramicworking, art spaces, rooms available for workshops, personal
            services such as therapies, etc.
          </li>
          <li>
            Participants additionally get support for setting up their own
            free-to-create and free-from-upkeep website with as many pages as
            they want with their own domain; which will get easier and easier as
            the system matures.
          </li>
        </ul>
        <p>
          Next step is to create a separate page on my website for this one
          campaign specifically; will be at /sistema-mogotes
        </p>
      </div>
      <div
        class="bg-gray-950 text-white rounded-md p6 mb6 b-0.5rem b-red-500 b-dashed"
      >
        <strong>Emotional Reaction</strong><br />
        I'm working on clarifying what is this and my Box is going haywire about
        it. I'm scared about asking for money or selling or being seen or something.
        If I try to sell something locally and it doesn't work, then I'm doomed to
        rely on being global Internet-reliant for money and I cannot create any value
        for anyone around me and if the Internet collapses or something I'll be cast
        away as a useless person and die in the woods. And people in my born-culture
        will see what I create and laugh and say it's useless and that they don't
        use the Internet anyway; "Who wants websites? Such a useless thing" (they
        will say), "We've got Instagram why would I want a website? I don't want
        more complexity in my life!" "You are a programmer, go work on Globant or
        something!"
        <br />
        <br />
        I'll just go to sleep and check back tomorrow what I want to do about this.
        Maybe I can bring it up on Heart Gym.
      </div>
      <p>End result wanted: A land-base filled with human and cat food.</p>
      <p>
        Alright, I already got that. Something else. End result wanted: I give a
        local greengrocer with money for a bag full of fruit.
      </p>
      <p>
        <strong>MISSION:</strong> Use all my skills to earn some money by serving
        my land-base neighbourhood and city
      </p>

      <p>
        Truth is, for all my tech skills and all my experience working on
        companies and programming and creating, I've never sold anything to
        anyone.
      </p>

      <p></p>

      1. Print a sheet of <a href="/card">personal cards</a> and cut them.<br />
      2. Write a AR$ 10,000 Flowing Fund Credit. Add to
      <a href="/flowing-fund">FF Page</a>.<br />
      3. Go to neighbourhood shop, ask them if they want a website like mine for
      their project, show them on my phone.<br />
      4. Tell them I'm applying for a grant to 5. Post on Facebook, LinkedIn Print
      personal card and go around the neighbourhood and leave it on shops. 1. Imprimir
      mi tarjeta personal Imprimir mi
      <a href="/card">tarjeta personal</a>.
      <ul>
        <li>Whole food shop</li>
        <li>Barbershop</li>
        <li>Pet food store</li>
        <li></li>
      </ul>
    </div>
  {/if}
</DocPage>

<style>
  .item {
    @apply mb6  p6 rounded-3 relative;
    @apply bg-black/10 shadow-[inset_0_0_0_1px_#0001] dark:(bg-white/10 shadow-[inset_0_0_0_1px_#fff3]);
  }

  .tag {
    @apply px3 uppercase text-xs font-bold font-mono lh-6 rounded-2 text-white;
    @apply text-shadow-[0_1px_0_#0003] shadow-[inset_0_0_0_1.5px_#0002];
  }
</style>
