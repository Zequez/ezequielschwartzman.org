<script lang="ts">
  const bornAt = new Date('1992-12-14')
  const yearsSince = Math.floor((Date.now() - bornAt.getTime()) / 31536000000)
</script>

{#snippet divisor(hue: number)}
  <div
    class="mb6 flexcc"
    style={`filter: hue-rotate(${hue * ((2 / 5) * 360)}deg);`}
  >
    <div class="w-full overflow-hidden">
      <div class="perspective-10px -my3 w-full scale-x-200% -translate-x-1/2">
        <div
          class="h7.5 w-200% origin-rc bg-yellow-950 dark:bg-yellow-500 -rotate-y-70deg"
        ></div>
      </div>
    </div>
    <div
      class="w6 h6 bg-gray-100 dark:bg-gray-950 rounded-full flexcc relative z-10 -mx-3"
    >
      <div
        class="h4 w4 flex-shrink-0 rounded-full mx2 bg-yellow-500 b-1 b-black/10 shadow-[inset_0_0_5px_2px_#fff6,inset_0_0_2px_1px_#fff6,0_0_4px_1px_#fffa]"
      ></div>
    </div>
    <div class="w-full overflow-hidden -scale-x-100%">
      <div class="perspective-10px -my3 w-full scale-x-200% -translate-x-1/2">
        <div
          class="h7.5 w-200% origin-rc bg-yellow-950 dark:bg-yellow-500 -rotate-y-70deg"
        ></div>
      </div>
    </div>
  </div>
{/snippet}

<DocPage class="text-center">
  <h1>Sitios Web</h1>
  <p>Hola. Mi nombre es Ezequiel.</p>
  <p>La verdad es que no suelo hacer esto.</p>
  <p>Vender cosas digo.</p>
  <p>
    Se siente inauténtico. Siento miedo de estar adaptándome a las formas del
    sistema por dinero.
  </p>
  <p>No quiero vender nada realmente.</p>
  <p>Si quiero compartir lo que hago.</p>
  {@render divisor(0)}

  <p
    >Empecé a hacer sitios web cuando tenía unos 12 años, tengo {yearsSince} ahora.</p
  >
  <p>Es un medio creativo perfecto para mi mente insaciable.</p>
  <p>
    Puedo armar y desarmar cualquier cosa interactiva que se proyecte adentro de
    una pantalla digital sin límites físicos, y lo disfruto mucho.</p
  >
  <p
    ><a href="/me-and-my-jobs"
      >Tuve trabajos en empresas, corporaciones, como contratista, equipos
      quasi-cooperativos/horizontales.</a
    ></p
  >
  <p>
    Todos esos trabajos siempre terminaron igual. Terminaba por hacer cosas que
    solo las hacía porque me pagaban. Y no digo que eso este mal.
  </p>
  <p>
    Estoy en una furiosa lucha interna por crear algo diferente para mí. El
    dinero ya no es una motivación suficiente para moverme. Entre otras cosas
    descubrí que quedarme sin dinero no es la muerte misma y que sobrevivo de
    alguna manera.
  </p>

  {@render divisor(1)}
  <p>
    Durante años cambié radicalmente mi sitio web. Fue evolucionando y tuvo <a
      href="/web-gallery">7 formas muy diferentes</a
    >. Cada vez que lo veía yo era una persona diferente, y el sitio ya no me
    reflejaba.
  </p>
  <p>
    Cada sitio funcionó como un faro que atrajo a las personas y oportunidades
    que yo necesité.
  </p>
  <p>
    Yo quiero que cuando alguien entre a mi sitio web se pueda llevar un reflejo
    auténtico de quién soy yo, de mi misión, de mis valores, de mis
    invitaciones. Quiero inspirar a las personas a tomar acción, a contactarme y
    hacerme propuestas.
  </p>
  <p>
    Si vas a buscar un sitio web al mercado te van a ofrecer sitios web con
    cierta forma, ciertas herramientas, ciertas suposiciones sobre tu propósito,
    sobre tus valores. <a
      href="https://consilienceproject.org/technology-is-not-values-neutral-ending-the-reign-of-nihilistic-design-2/"
      >La tecnología no es neutral de valores.</a
    >
  </p>
  <p>
    Tener un sitio web, con tu foto, con tu nombre, con tus valores, con tu
    misión en el mundo; es una declaración, es un arriesgado salto a ser visto.
  </p>
  {@render divisor(2)}
  <p>
    La verdad es que estoy disfrutando muchísimo creando el sistema, la
    infraestructura de código detrás de este sitio web. Es realmente para mí una
    obra de arte funcional. Me levanto a la mañana y me siento en la computadora
    a programar, y me alimento alimentando el sistema. Darle orden, coherencia y
    armonía al sistema, me da orden, coherencia y armonía a mí.
  </p>
  <p>
    <a href="https://github.com/Zequez/web-environment" target="_blank"
      >El entorno</a
    > ya está preparado para ser re-utilizado infinitas veces sin ningún costo adicional.
    Hace falta solo madurarlo y simplificarlo para bajar la barrera de aprendizaje;
    es mi intención que aprender a crear y publicar en la web sea algo lo más accesible
    posible, y fomentarlo como un medio de juego y arte colaborativo global.
  </p>
  <p>
    Quiero que personas comprometidas con su servicio y entusiasmadas por
    compartir con el mundo lo que hacen me pidan que les prepare un sitio web.
  </p>
  <p>
    Quiero que artistas, escritor@s, investigador@s, sostenedor@s de espacios,
    sanadores, agentes de transformación, usen el sistema digital que yo les
    puedo facilitar. Quiero darles a las personas un medio de expresión,
    difusión y colaboración digital en Internet que no esté ligado a ninguna
    plataforma capturada por el sistema imperante, un espacio propio y
    auténtico, que refleje los valores propios de uno.
  </p>
  {@render divisor(3)}
  <p
    >Si algo de esto te toca, te invito a que visites la página de <a
      href="/servicio-web">Servicio Web.</a
    >
  </p>
</DocPage>
