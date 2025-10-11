<script lang="ts">
  import TelegramIcon from '~icons/fa6-brands/telegram'
  import WhatsappIcon from '~icons/fa6-brands/whatsapp'
  import EmailIcon from '~icons/fa6-solid/envelope'
  import { type Component } from 'svelte'

  const props: { children: any } = $props()

  let open = $state(false)
  let el: HTMLButtonElement

  function handleOpen(ev: MouseEvent) {
    if (open) return
    ev.preventDefault()
    ev.stopPropagation()
    open = true
    function nextClick(ev2: MouseEvent) {
      setTimeout(() => {
        open = false
      }, 50)
      window.removeEventListener('click', nextClick)
    }
    setTimeout(() => {
      window.addEventListener('click', nextClick)
    }, 50)
  }
</script>

<button class="link relative" bind:this={el} onclick={handleOpen}>
  {@render props.children()}

  {#if open}
    <div
      class="flexcc space-x-6 text-8 z-999 shadow-md b-1.5 b-gray-200 absolute bg-gray-800 text-white rounded-1 px6 py3 left-1/2 top-1/2 -translate-1/2"
    >
      {#snippet link(alt: string, href: string, IconComp: Component)}
        <a
          class="btn text-white opacity-50 hover:opacity-100 flexcc flex-col"
          {href}
          target="_blank"
          title={alt}
        >
          <IconComp {alt} />
          <span class="text-4">{alt}</span>
        </a>
      {/snippet}
      {@render link(
        'Telegram',
        'https://t.me/ezequielschwartzman',
        TelegramIcon,
      )}
      {@render link('WhatsApp', 'https://wa.me/5492235235568', WhatsappIcon)}
      {@render link('Email', 'mailto:ezequielschwartzman@gmail.com', EmailIcon)}
    </div>
  {/if}
</button>
