<script lang="ts">
  import navBg from '../photos/noise.png'
  import NavContainer from '@/substrates/toroid-web/components/NavContainer.svelte'
</script>

<NavContainer
  bgImage={navBg}
  containerClass="bg-slate-600 dark:bg-slate-800"
  bgClass=""
>
  <slot />
</NavContainer>
