<script lang="ts">
  import debutLight from '@@@/photos/textures/debut-light.png'

  const { src, title = 'YouTube video' } = $props<{
    src: string
    title?: string
  }>()

  function toEmbedUrl(src: string) {
    try {
      const url = new URL(src)

      if (url.hostname === 'youtu.be') {
        const videoId = url.pathname.slice(1)
        const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`)
        const start = url.searchParams.get('t')

        if (start) embedUrl.searchParams.set('start', start.replace(/s$/, ''))

        return embedUrl.toString()
      }

      if (
        url.hostname === 'youtube.com' ||
        url.hostname === 'www.youtube.com' ||
        url.hostname === 'm.youtube.com'
      ) {
        if (url.pathname.startsWith('/embed/')) {
          return url.toString()
        }

        const videoId = url.searchParams.get('v')
        if (videoId) {
          const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`)
          const start = url.searchParams.get('t')

          if (start) embedUrl.searchParams.set('start', start.replace(/s$/, ''))

          return embedUrl.toString()
        }
      }
    } catch {
      return src
    }

    return src
  }

  const embedSrc = $derived(toEmbedUrl(src))
</script>

<div
  style={`border-color: oklch(0.75 0.14 var(--hue)); background-color: oklch(0.4 0.05 var(--hue)); --un-shadow-color: oklch(0.5 0.10 var(--hue)); background-image: url(${debutLight});`}
  class="-mx-13.5 rounded-2 overflow-hidden shadow-[0_1.5px_0_#0006,0_0_0_1px_#0003,0_0_7px_#0003] b-3 b-black/40"
>
  <div class="w-full relative pt-56.25%">
    <iframe
      class="absolute inset-0 size-full"
      src={embedSrc}
      {title}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  </div>
</div>
