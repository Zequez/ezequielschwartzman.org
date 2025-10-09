<script lang="ts" module>
  export const metadata = { title: 'Birth Celestial Influences' }
</script>

<script lang="ts">
  import aspects1 from '../celestial-influences/aspects-1.png?width=100;250;500&format=webp&srcset'
  import aspects1Meta from '../celestial-influences/aspects-1.png?as=meta:height;width'
  import aspects2 from '../celestial-influences/aspects-2.png?width=100;250;500&format=webp&srcset'
  import aspects2Meta from '../celestial-influences/aspects-2.png?as=meta:height;width'
  import wheel from '../celestial-influences/wheel.png?width=100;250;500&format=webp&srcset'
  import wheelMeta from '../celestial-influences/wheel.png?as=meta:height;width'
  import summary from '../celestial-influences/summary.png?width=100;250;500&format=webp&srcset'
  import summaryMeta from '../celestial-influences/summary.png?as=meta:height;width'
  import houses1 from '../celestial-influences/houses-1.png?width=100;250;500&format=webp&srcset'
  import houses1Meta from '../celestial-influences/houses-1.png?as=meta:height;width'
  import houses2 from '../celestial-influences/houses-2.png?width=100;250;500&format=webp&srcset'
  import houses2Meta from '../celestial-influences/houses-2.png?as=meta:height;width'
  import humanChart from '../celestial-influences/human-chart.png?width=100;250;500&format=webp&srcset'
  import humanChartMeta from '../celestial-influences/human-chart.png?as=meta:height;width'
  import humanExtra from '../celestial-influences/human-extra.png?width=100;250;500&format=webp&srcset'
  import humanExtraMeta from '../celestial-influences/human-extra.png?as=meta:height;width'
  import OptimizedImg from '../components/OptimizedImg.svelte'
</script>

<DocPage>
  <h1>Birth Celestial Influences</h1>
  <p>Also known as astrology and human design.</p>
  <p>Wether you believe on it's significance or not makes no difference.</p>
  <p>
    It is a fact that at the time of my birth, there was a higher-order material
    configuration of beings in the solar system and the galaxy. And I'm using
    the term beings very broadly here, to refer to planets and stars also.
  </p>
  <p>
    The assumption here is that when I decided to come to Earth, I chose the
    exact time of my birth so that this particular configuration would happen so
    I would have a human body with certain functionalities, and so learning
    about this
  </p>
  <div class="flexcc font-serif mb6">
    <div
      class="bg-yellow-500 bg-gradient-to-b from-white/10 to-white/0 b-black/10 b-t-white/30 b-x-0.5 b-1.5 p2 text-center rounded-1 text-yellow-100 font-bold text-shadow"
    >
      <span class="underline underline-(offset-2 1.2)"
        >Ezequiel Adrián Schwartzman</span
      ><br />
      14 December 1992, 11:40<br />
      Mar del Plata, Argentina
    </div>
  </div>
  <div class="flex w-full">
    <div class="w57% flex-shrink-0">
      <OptimizedImg src={wheel} meta={wheelMeta} alt="Astroligical wheel" />
    </div>
    <div class="">
      <OptimizedImg src={summary} meta={summaryMeta} alt="Summary" />
    </div>
  </div>

  <div class="flex w-full">
    <div class="w46% flex-shrink-0">
      <OptimizedImg src={aspects1} meta={aspects1Meta} alt="Aspects part 1" />
    </div>
    <div class="">
      <OptimizedImg src={aspects2} meta={aspects2Meta} alt="Aspects part 2" />
    </div>
  </div>

  <div class="flex w70% mx-auto">
    <div class="w52.7% flex-shrink-0">
      <OptimizedImg src={houses1} meta={houses1Meta} alt="Houses part 1" />
    </div>
    <div class="">
      <OptimizedImg src={houses2} meta={houses2Meta} alt="Houses part 2" />
    </div>
  </div>

  <div class="w70% mx-auto">
    <OptimizedImg
      src={humanChart}
      meta={humanChartMeta}
      alt="Huuman Design Chart"
    />
  </div>
  <div class="w50% mx-auto mb6">
    <OptimizedImg
      src={humanExtra}
      meta={humanExtraMeta}
      alt="Houses Design Extra"
    />
  </div>
  <!-- <div class=""></div> -->
</DocPage>
