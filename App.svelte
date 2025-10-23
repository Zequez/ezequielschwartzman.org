<script lang="ts">
  import App from '@/substrates/toroid-web/components/App.svelte'
  import favicon from './photos/favicon.jpg'
  import noise from './photos/noise.png'
  import guarda from './photos/guarda.svg'
</script>

<App
  title="Ezequiel Adrian Schwartzman"
  {favicon}
  {guarda}
  navBg={noise}
  nav={[
    ['index', 'land-base', 'birth-celestial-influences', 'material-lovers'],
    ['on-my-workbench', 'web-gallery'],
    ['flowing-fund'],
    ['flowing-fund-gameworld', 'etimologia-nueva', 'aprendimientos'],
  ]}
></App>
