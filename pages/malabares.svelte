<script module>
  export const metadata = { title: 'Malabares' }
</script>

<script lang="ts">
  import { getContext } from 'svelte'
  import YouTubeIcon from '~icons/fa6-brands/youtube'
  import OptimizedImg from '../../../substrates/toroid-web/components/OptimizedImg.svelte'

  import pelotas from '../photos/pelotas.jpg?width=100;250;500&format=webp&srcset'
  import pelotasMeta from '../photos/pelotas.jpg?as=meta:height;width'

  const isPreviewMode = getContext('preview-page-mode')
</script>

<DocPage>
  <h1>Malabares</h1>
  <p>
    Podés aprender a malabarear los patrones básicos en par de horas, y aprender
    unos cuantos trucos en par de semanas, y convertirte en un malabarista
    bastante decente en par de meses.
  </p>

  <p>
    El malabarismo es un arte de más de mil años que ya se practicaba en el
    antiguo Egipto. Es una actividad que, en adición a ser extremadamente
    entretenida, promueve la coordinación, concentración, auto-estima y el
    desarrollo de ciertas partes del cerebro.
  </p>

  <a
    class={[
      'block mx-auto max-w-140 text-left flex px6 btn bg-red-600 rounded-1 py3 mb6',
      'bg-gradient-linear from-white/10 to-white/0',
      'shadow-[inset_0_-1px_0_3px_#0002]',
      'hover:bg-red-500',
    ]}
    href="https://www.youtube.com/playlist?list=PLNkT_GNP42hj9RWmnrAz3VHe0i9pJnrcp"
    target="_blank"
  >
    <div>
      <YouTubeIcon class="w12 text-white h-full flex-shrink-0 flexcc mr3" />
    </div>
    <span class="block text-white">
      Lista de reproducción en YouTube con videos de personas que empujan los
      límites de lo que es posible en el malabarismo.
    </span>
  </a>

  <h2>Tutorial Básico</h2>

  <p
    >Y el mejor tutorial que encontré de como malabarear <a
      href="https://www.youtube.com/watch?v=EcgARTjABAQ&t=4s">está en inglés</a
    >. El segundo mejor, está en español y lo grabé yo el otro día con la
    asistencia de Coral:</p
  >

  <div class="relative w-full pt-56% mb6">
    <div class="absolute inset-0">
      {#if isPreviewMode}
        <div class=""></div>
      {:else}
        <iframe
          class="size-full"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/DqjlrNCNkuc?si=UugIMCcCwNc83mMb"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      {/if}
    </div>
  </div>

  <p>
    (Las instaucciones escritas no reemplazan mirar el video porque es
    importante ver los movimientos)
  </p>

  <h3>Postura</h3>
  <ul>
    <li> Pies separados a la distancia de los hombros </li>
    <li>Pies apuntando adelante</li>
    <li>Mantené las rodillas un poco dobladas</li>
    <li>Espalda recta</li>
    <li>Antebrazos paralelos al suelo</li>
    <li>Manos apuntando hacia adentro</li>
    <li>Cabeza mirando para arriba</li>
  </ul>

  <h3>Movimiento de los brazos</h3>
  <p>Fijate como van por arriba de la cabeza</p>

  <h3>1 pelota</h3>
  <p>
    No se puede correr antes de aprender a caminar. Vas a pasar la pelota de una
    lado al otro. Es el mismo movimiento físico que cuando lo hacés con 3. Esto
    es importante para que se vaya formando la memoria muscular.
  </p>
  <p>Practicá tirándola alto y bajo.</p>
  <p>Una vez que te sientas confiad@ con eso, pasá a...</p>

  <h3>2 pelotas</h3>
  <p>
    El error más común es tratar de pasar una por arriba y la otra por abajo,
    porque así lo hacen en los dibujos animados. En el video vas a ver un
    ejemplo de eso al principio. Fijate que hay que tirarlas las 2 para arriba,
    simétricamente.
  </p>
  <p
    >Practicá haciendo derecha-izquiera-pausa, y luego izquierda-derecha-pausa.</p
  >
  <p>
    Una vez que logres hacerlo 10 veces perfectas (sin tener que mover los pies,
    y que las pelotas lleguen a la misma altura) y/o te sientas confiad@ con
    esto, pasá a...
  </p>

  <h3>3 pelotas con pausa</h3>
  <p>
    Es igual al anterior, pero en vez de hacer una pausa, hacés otro
    lanzamiento; y luego la pausa. Arrancá con 2 pelotas en una mano y una en la
    otra. Derecha-izquierda-derecha-pausa / izquierda-derecha-izquierda-pausa.
  </p>
  <p>
    También podés practicar hacer con 2 pelotas, mientras sostenés una más en la
    mano, como muestra el video.
  </p>
  <p>Una vez que esto te sale...</p>
  <h3>3 pelotas</h3>
  <p>Simplemente en vez de hacer una pausa, seguí tirando pelotas.</p>

  <h2 id="pelotas">Pelotas Artesanales</h2>

  <p>Para esta receta necesitás:</p>
  <ul>
    <li>1 pelota de tenis</li>
    <li>Cinta aisladora</li>
    <li>Maiz pisingallo</li>
    <li>Algo filoso suficiente para hacer un tajo en una pelota de tenis</li>
    <li>Recomendado: Un embudo</li>
    <li>Recomendado: Pegamento tipo Unipox o UHU</li>
    <li>Recomendado: Tijera para cortar la cinta prolijo</li>
  </ul>
  <p>1. Hacer un tajo de unos 2-3cm en la pelota de tenis</p>
  <p
    >2. Meterle maiz pisingallo hasta que no entre más; el embudo puede ayudar
    acá</p
  >
  <p
    >3. Recomiendo sellar el tajo con pegamento, ¿Por qué? Un vez quedó una
    pelota en el agua y luego de un tiempo me encontré con que todo el maiz se
    había pudrido porque le habia entrado agua adentro.</p
  >
  <p
    >4. Envolver con cinta aisladora. Para esto recomiendo no dar vueltas y
    vueltas y vueltas la pelota porque es probable que te quede ovalada. En vez
    de eso hacer una vuelta, recortar, hacer otra vuelta en otra dirección,
    recortar, etc. Esto también abre a la posibilidad de que las pelotas las
    hagas de varios colores.</p
  >
  <p>5. Listo.</p>

  <OptimizedImg
    class="rounded-1"
    src={pelotas}
    meta={pelotasMeta}
    alt="Pelotas artesanales"
  />
</DocPage>
