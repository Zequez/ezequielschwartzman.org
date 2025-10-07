<script module>
  export const metadata = { title: 'Ezequiel A. Schwartzman' }
</script>

<script lang="ts">
  import { onMount, type Component } from 'svelte'
  import ezequiel from '../ezequiel.jpeg'
  import { enes } from '../enes.svelte'
  import TelegramIcon from '~icons/fa6-brands/telegram'
  import WhatsappIcon from '~icons/fa6-brands/whatsapp'
  import EmailIcon from '~icons/fa6-solid/envelope'
  import GithubIcon from '~icons/fa6-brands/github'

  import DarkToggle from '../components/DarkToggle.svelte'
  import LangToggle from '../components/LangToggle.svelte'

  onMount(() => {})
</script>

<div class="absolute top-6 left-6">
  <DarkToggle />
</div>

<div class="absolute top-6 right-6">
  <LangToggle />
</div>

<div class="max-w-sm mx-auto pt6">
  <div class="w42 h42 mx-auto mb6">
    <img
      src={ezequiel}
      class="size-full object-cover rounded-full"
      alt="Ezequiel's face"
      title="Picture taken 5th of October 2025"
    />
  </div>
  <h1 class="text-8 text-center font-serif font-bold tracking-wider my6">
    Ezequiel Adrián<br /> Schwartzman
  </h1>

  <div class="text-center font-mono mb6">
    {enes(
      `Artist, Inventor, Gameworld Builder, Researcher and Spaceholder`,
      `Artista, Inventor, Constructor de Mundos de Juego,
    Investigador y Sostenedor de Espacios`,
    )}
  </div>

  <div class="flexcc h12 space-x-6 text-8 mb6">
    {#snippet link(alt: string, href: string, IconComp: Component)}
      <a
        class="opacity-20 hover:opacity-100"
        {href}
        target="_blank"
        title={alt}
      >
        <IconComp {alt} />
      </a>
    {/snippet}
    {@render link('Telegram', 'https://t.me/ezequielschwartzman', TelegramIcon)}
    {@render link('WhatsApp', 'https://wa.me/5492235235568', WhatsappIcon)}
    {@render link('Email', 'mailto:zequez@gmail.com', EmailIcon)}
    {@render link('Github', 'https://github.com/zequez', GithubIcon)}
  </div>
</div>
