<script module lang="ts">
  export const metadata = {
    title: 'Material Lovers',
  }

  import { enes } from '../../../center/enes.svelte'
  import { mergeImagesImports } from '@/center/utils/neutral'
  import OptimizedImg from '../../../substrates/toroid-web/components/OptimizedImg.svelte'
  import Lang from '../../../center/components/Lang.svelte'

  const picturesSrc = import.meta.glob('../photos/material-lovers/*.jpeg', {
    query: { format: 'webp', width: '100;250;500', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: [string, string, string] }

  const picturesMeta = import.meta.glob('../photos/material-lovers/*.jpeg', {
    query: { format: 'webp', as: 'meta:height;width', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: { height: number; width: number } }

  const pictures = mergeImagesImports(
    '../photos/material-lovers/',
    picturesSrc,
    picturesMeta,
  )
</script>

<DocPage>
  <Lang lang="en">
    <h1>Material Lovers</h1>
    <p class="text-justify">
      One day I asked myself if my personal posessions were my slaves.
      Everything material is Gaia. And the material things that follow me around
      and I take with me everywhere, and my energy is all mixed up with them; I
      decided to call them, my <em>Material Lovers</em>.
    </p>
  </Lang>
  <Lang lang="es">
    <h1>Amantes Materiales</h1>
    <p class="text-justify">
      Un día me pregunté a mi mismo si mis posesiones materiales eran mis
      esclavas. Todo lo material es Gaia. Y las cosas materiales que me siguen y
      que llevo conmigo a todos lados, y mi energía está mezclada con ellas;
      decidí llamarlas, mis <em>Amantes Materiales</em>.
    </p>
  </Lang>

  <h2 class="text-center">Rubilí</h2>
  <div class="flexcc">
    <div class="font-mono mb6 darkish rounded-3 p6 mx-auto">
      MacBook Pro 15" mid-2015<br />
      2,2 GHz Quad-Core Intel Core i7<br />
      16 GB RAM DDR3<br />
      500 GB SSD
    </div>
  </div>
  <OptimizedImg
    class="block  rounded-2 b-0.25rem b-gray-300 dark:b-gray-700 object-cover"
    {...pictures['rubili']}
    alt="Rubilí"
  />
</DocPage>
