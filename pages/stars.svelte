<script module>
  export const metadata = {
    title: 'Ezequiel A. Schwartzman',
    noNav: true,
    noRail: true,
  }
</script>

<script lang="ts">
  import StarrySky from '@@@/components/StarrySky.svelte'
</script>

<div class="size-screen">
  <StarrySky density={100} upscale={0.25} />
</div>
