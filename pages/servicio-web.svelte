<script module lang="ts">
  export const metadata = {
    title: 'Servicio Web',
    description: 'Ofrezco sitios web a mi gente',
  }
</script>

<script lang="ts">
  import { mergeImagesImports } from '@/center/utils/neutral'
  import OptimizedImg from '@/substrates/toroid-web/components/OptimizedImg.svelte'
  import ChangingWord from '../components/ChangingWord.svelte'

  const photosSrc = import.meta.glob('../photos/servicio-web/*.{png,jpg}', {
    query: { format: 'webp', width: '100;250;500', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: [string, string, string] }

  const photosMeta = import.meta.glob('../photos/servicio-web/*.{png,jpg}', {
    query: { format: 'webp', as: 'meta:height;width', picture: '' },
    import: 'default',
    eager: true,
  }) as { [key: string]: { height: number; width: number } }

  const photos = mergeImagesImports(
    '../photos/servicio-web/',
    photosSrc,
    photosMeta,
  )

  const sites = [
    ['ezequiel', 'https://ezequielschwartzman.org'],
    ['nami', 'https://nami.ezequielschwartzman.org'],
    ['agroeco', 'https://agroeco.ezequielschwartzman.org'],
    ['mogotes', 'https://mogotes.ezequielschwartzman.org'],
    ['webenv', 'https://webenv.ezequielschwartzman.org'],
  ]
</script>

{#snippet cat(
  title: string,
  value: string,
  toAddress: string,
  explain?: string,
)}
  <div
    class=" bg-blue-300 dark:bg-blue-500 p3 rounded-2 b b-black/10 text-center"
  >
    <div
      class="text-5 lh-6 underline underline-(1 offset-2.5) text-white font-serif text-shadow-[0_1px_0_#0005]"
    >
      {title}
    </div>
    <div class="font-mono">{value}</div>
    <div class="font-mono text-sm">{toAddress}</div>
    {#if explain}
      <div class="mt6">{explain}</div>
    {/if}
  </div>
{/snippet}

<DocPage>
  <h1>Un Sitio Web<br />es tu propio<br />Jardín Digital</h1>
  <div
    class="mx-auto w-80 h-50 flex relative bg-main-700 p6 rounded-2 mb12 mt12 b-4 b-main-900 shadow-[0_0_0px_1px] shadow-main-800"
  >
    <div class="absolute -inset-5 rounded-2 b b-10 b-dotted b-yellow-400"></div>
    <div
      class="flexcc uppercase font-mono font-bold tracking-wide text-center flex-grow text-white text-shadow-[0_1px_0_#0006]"
      >Pida su <br />sitio web <br />aquí</div
    >
    <div
      class="bg-main-900 relative w-1/2 h-full flexcc rounded-2 shadow-[0_2px_0] shadow-main-500"
      title="Cada vez que volví a editar esta página me  encontré con adjetivos diferentes que me resonaban; y decidí elegirlos todos."
    >
      <div class="w-1/2 h-full relative top-16% font-mono">
        <ChangingWord
          text="bellos/elegantes/hermosos/maravillosos/geniales/fantásticos/increíbles/novedosos/innovadores/zarpadísimos"
        />
        <ChangingWord
          text="funcionales/autogestivos/soberanos/futurísticos/arqueárquicos/valiosos/auténticos/artesanales"
        />
        <ChangingWord text="prácticos/útiles/customizables" />
      </div>
    </div>
  </div>

  <div> </div>

  <div class="flex space-x-1">
    {#snippet site(photoStr: string, url: string)}
      {@const photo = photos[photoStr]}
      <a
        class="block b b-black/50 rounded-2 overflow-hidden hover:brightness-120 mb1"
        target="_blank"
        href={url}
      >
        <OptimizedImg {...photo} alt={photoStr} />
      </a>
    {/snippet}
    <div class="w1/3">
      {@render site(sites[0][0], sites[0][1])}
    </div>
    <div class="w1/3">
      {@render site(sites[1][0], sites[1][1])}
      {@render site(sites[3][0], sites[3][1])}
    </div>
    <div class="w1/3">
      {@render site(sites[2][0], sites[2][1])}
      {@render site(sites[4][0], sites[4][1])}
    </div>
    <!--
    {#each [['ezequiel', 'https://ezequielschwartzman.org'], ['nami', 'https://nami.ezequielschwartzman.org'], ['agroeco', 'https://agroeco.ezequielschwartzman.org'], ['mogotes', 'https://mogotes.ezequielschwartzman.org'], ['webenv', 'https://webenv.ezequielschwartzman.org']] as [key, href] (key)}
      {@const photo = photos[key]}
      <div class="">
        <a
          class="block b b-black/50 rounded-2 overflow-hidden hover:brightness-120"
          target="_blank"
          {href}
        >
          <OptimizedImg {...photo} alt={key} />
        </a>
      </div>
    {/each} -->
  </div>

  <p>
    Si no leiste la página titulada <a href="/sitios-web">Sitios Web</a>; ahí
    está. Es un artículo, creo. O un manifesto. O simplemente un texto que
    escribí donde expreso lo que siento, lo que pienso, de donde vengo, y mis
    valores.
  </p>

  <h2>¿Por qué pedirme un sitio web a mí?</h2>

  <p>
    Acá van razones (para facilitarte la toma de decisión) ordenadas del valor
    más comúnmente compartido por los seres humanos, al menos común.
  </p>

  <ul>
    <li>Porque los sitios web que facilito no tienen costo de mantenimiento</li>
    <li>Porque están son 100% software libre, código abierto</li>
    <li>
      Porque el sistema es 100% cooperativo; las funcionalidades que hago para
      una persona, sirven a todas las personas; pedirme funcionalidades es un
      sirvicio a los demás también.
    </li>
    <li>
      Porque es un sistema experimental y en evolución, co-creativo, donde vos
      también podés meter mano para traesformarlo y evolucionarlo. Lo que
      instalás en tu computadora es el mismo entorno de desarrollo que uso yo en
      mi computador; no te doy una "app" o una "plataforma", te preparo el
      entorno de tu compu para que operes directo con el código fuente y recibas
      actualizaciones directas del repositorio de código público que yo custodio
      (con una interface visual que diseñé con este propósito que ya está
      preparada)
    </li>
    <li>
      Porque sí, porque te resuena. Porque adentro tuyo hay algo que dice SI!
      QUIERO ESTO!
    </li>
  </ul>

  <h2>¿Y cómo me pedís un sitio web?</h2>

  <p>
    Mirá. Sé que el dinero es un tema sensible para muchos (incluyéndome) y
    siento miedo porque quiero ser super cuidadoso con lo próximo que voy a
    proponer.
  </p>

  <p>
    <span class="num">1</span>
    Hay una lista de espera.
  </p>

  <p>
    <span class="num">2</span>
    Para entrar en la lista de espera tenés que señar (mandar una señal)
  </p>

  <p>
    <span class="num">3</span>
    La señal es diferente dependiendo de tu posición relativa a mí; mientras más
    lejos estés, la señal debe ser más fuerte.
  </p>

  <div class="grid grid-cols-2 gap-6 my6">
    {@render cat(
      'Familia y Comunidad',
      'AR$ 10,000',
      'Alias: ezequiel.servicio',
      `Aplica si sos familiar de sangre mío, o estaría dispuesto presentarte a mi hijo
          como su tí@ "X". O nos conocemos personalmente y me invitaste a pasar a tu casa.`,
    )}
    {@render cat(
      'Bioregion Paternal',
      'AR$ 15,000',
      'Alias: ezequiel.servicio',
      '¿Viajaría 2 veces por semana a Mar del Plata desde ahí para que mi hijo esté con su madre? Aplica si vivís en Mar del Plata, Mar Chiquita, Chapadmalal, Sierra de los Padres, o alrededores.',
    )}
    {@render cat('Latinoamerica', 'US$ 12', 'Airtm: zequez')}
    {@render cat('Resto del Mundo', 'US$ 40', 'Wise: zequez@gmail.com')}
  </div>

  <p>
    <span class="num">4</span>
    Podés enviarme mensajes con todas las consultas que quieras antes de señar, y
    si vivís cerca podes invitarme a tu casa.
  </p>

  <p>
    <span class="num">5</span>
    Estás invitad@ a negociar conmigo otro intercambios en vez de la seña.
  </p>

  <p>
    La seña es una señal para darme luz verde a mí para enfocar mi energía en lo
    que me estás pidiendo, sin que sea una imposición mía, y yo poder trabajar
    con la confianza de que es algo que realmente es deseado.
  </p>

  <h2>¿En qué momento se considera que el acuerdo está completado?</h2>

  <p></p>

  <ul>
    <li>Tenés un sitio web propio en un dominio de tu elección</li>
    <li>
      Tenés en algún dispositivo el sistema necesario para modificar el sitio
      web, y el sistema está funcionando de tal manera que se actualiza
      automáticamente desde un repositorio público custodiado por mí.
    </li>
    <li>
      El sistema tiene los bloques de construcción que vos necesitás para crear
      en él lo que vos querés
    </li>
    <li>
      Tenés en tu mente integrado el conocimiento para usar el sistema para
      crear lo que querés
    </li>
    <li>
      El sitio web tiene una portada, diseño y estilo adaptados a vos o tu
      proyecto que son de tu agrado y aprovación
    </li>
  </ul>

  <p>
    La señal de cierre es la siguiente: en alguna red social pública compartís
    el link a tu nuevo sitio web, o lo pintás o imprimís en algún medio físico
    para compartir.
  </p>
  <p>Con la señal tu sitio se marca como completado en la lista de espera.</p>
  <p>
    La prioritización es heuréstica y es posible que sea necesario enfocarme en
    varios sitios simultáneamente.
  </p>

  <h2>¿Qué podés esperar de mí una vez señado?</h2>

  <ul>
    <li>Te voy a enviar un mensaje confirmando que recibí la señal</li>
    <li>
      Te voy a invitar a que me compartas tu visión lo más detallada posible del
      resultado que te gustaría recibir.
    </li>
    <li>
      En la medida que avance con tu pedido voy a mandarte actualizaciones
    </li>
    <li>
      Vas a recibir un mensaje con instrucciones para instalar el sistema en tu
      dispositivo
    </li>
    <li>
      Vas a recibir toda la atención y asistencia necesaria para que el sistema
      esté funcionando, incluido videollamadas y compartir pantallas si fuese
      necesario.
    </li>
    <li>
      Te voy a pedir que tomes algunas decisiones concretas, por ejemplo,
      respecto al dominio web donde querés que esté el sitio. Y si preferís
      encargarte vos del alquiler y la configuración o de darme el dinero a mí y
      que yo me encargue.
    </li>
  </ul>

  <h2>¿Y qué pasa cuando se completa el acuerdo señado?</h2>

  <p>
    Te voy a invitar a que salga de tí compensar en el espíritu del regalo
    acorde a lo que recibiste de la manera que a vos te surja, y te voy a
    ofrecer posibilidades que yo valoro.
  </p>

  <p>
    Esta página la voy actualizar con una captura del sitio marcado como
    completado.
  </p>

  <p>
    Vas a seguir recibiendo soporte y actualizaciones automáticas del sistema, y
    te vas a seguir beneficiando de nuevas funcionalidades que yo vaya
    agregando.
  </p>

  <h2 class="text-center">Lista de Espera</h2>

  <div class="flexcc mb6">
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLScLL2NP9yUfqvtdmEZKUB-0qLiuTYT1KA029CmvqAD510OImw/viewform?usp=header"
      target="_blank"
      class="btn bg-blue-400 hover:bg-blue-300 dark:(bg-blue-500 hover:bg-blue-400) text-white uppercase font-mono px3 py3 rounded-1 b b-black/10 shadow-[0_1.5px_0px_0px_#0006] text-shadow-[0_1px_0_#0005]"
      >Completar Formulario</a
    >
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
    <div class="b b-black/10 rounded-1 p3 bg-black/10 dark:bg-white/10"
      ><strong>Familia y Comunidad</strong><br />
      <a target="_blank" href="https://www.instagram.com/rodrigovaldesortiz/"
        >Rodrigo Valdés</a
      >
    </div>
    <div class="b b-black/10 rounded-1 p3 bg-black/10 dark:bg-white/10"
      ><strong>Bioregión</strong></div
    >
    <div class="b b-black/10 rounded-1 p3 bg-black/10 dark:bg-white/10"
      ><strong>Latinoamérica</strong>
    </div>
    <div class="b b-black/10 rounded-1 p3 bg-black/10 dark:bg-white/10"
      ><strong>Resto del Mundo</strong>
    </div>
  </div>
</DocPage>

<style>
  .num {
    @apply h6 w6 mr1ch inline-block text-center font-bold rounded-full bg-blue-300 b b-black/10 dark:bg-blue-500 text-white text-shadow-[0_0_0_#0005];
  }
</style>
