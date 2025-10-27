<script lang="ts">
  import App from '@/substrates/toroid-web/components/App.svelte'
  import favicon from './photos/favicon.jpg'
  import noise from './photos/noise.png'
  import Guarda from './components/Guarda.svelte'
  import NavContainer from './components/NavContainer.svelte'
</script>

<App
  title="Ezequiel Adrian Schwartzman"
  {favicon}
  {Guarda}
  {NavContainer}
  navBg={noise}
  nav={[
    [
      'index',
      'written',
      'land-base',
      'birth-celestial-influences',
      'material-lovers',
    ],
    ['on-my-workbench', 'web-gallery'],
    ['servicio-web'],
    [
      'flowing-fund-gameworld',
      'flowing-fund',
      'etimologia-nueva',
      'aprendimientos',
      'distincionario',
    ],
  ]}
></App>
