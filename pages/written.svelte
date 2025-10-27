<script module lang="ts">
  export const metadata = { title: "Stuff I've Written" }

  import { enes } from '@/center/enes.svelte'
</script>

<DocPage>
  <h1>{enes("Stuff I've Written", 'Cosas que escribí')}</h1>

  <p>
    Expresión creativa mediante el lenguage escrito con una forma más o menos
    reconocible como un artículo o ensayo.
  </p>

  <h2>2025</h2>
  <ul>
    <li><a href="/me-and-my-jobs">Me and my jobs</a></li>
    <li><a href="/sitios-web">Sitios Web</a></li>
    <li
      ><a
        href="https://medium.com/@ezequiel.schwartzman/lo-que-aprend%C3%AD-de-salir-a-vender-chip%C3%A1-en-la-placita-c217c1aadee0"
        target="_blank">Lo que aprendí de vender chipá en la plaza (Medium)</a
      ></li
    >
  </ul>
</DocPage>
