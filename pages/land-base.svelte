<script module lang="ts">
  import { enes } from '../../../center/enes.svelte'
  import { mergeImagesImports } from '@/center/utils/neutral'
  import OptimizedImg from '../../../substrates/toroid-web/components/OptimizedImg.svelte'

  export const metadata = {
    title: 'Land-base',
  }

  const picturesSrc = import.meta.glob('../photos/land-base/*.png', {
    query: { format: 'webp', width: '100;250;500', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: [string, string, string] }

  const picturesMeta = import.meta.glob('../photos/land-base/*.png', {
    query: { format: 'webp', as: 'meta:height;width', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: { height: number; width: number } }

  const pictures = mergeImagesImports(
    '../photos/land-base/',
    picturesSrc,
    picturesMeta,
  )

  const picsWithAlt = [
    { alt: 'Planet', pic: pictures['1'] },
    { alt: 'Bioregion', pic: pictures['2'] },
    { alt: 'City', pic: pictures['3'] },
    { alt: 'Neighborhood', pic: pictures['4'] },
    { alt: 'Block', pic: pictures['5'] },
    { alt: 'Land-base', pic: pictures['6'] },
  ]
</script>

<DocPage>
  <h1>{enes('Land-base', 'Base-terrestre')}</h1>
  <p class="text-center">
    {enes('Cooperative Experimental House', 'Casa Cooperativa Experimental')}<br
    />
    <em class="text-8 font-serif underline">Nami</em>
  </p>

  <div class="grid cols-2 gap-4">
    {#each picsWithAlt as { alt, pic }}
      <OptimizedImg
        class="block  rounded-2 b-0.25rem b-gray-300 dark:b-gray-700 object-cover"
        {...pic}
        {alt}
      />
    {/each}
  </div>
</DocPage>
