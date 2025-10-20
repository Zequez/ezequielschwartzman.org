<script lang="ts">
  import { getLang, toggleLang } from '../../../center/enes.svelte'
</script>

<button onclick={toggleLang} class="font-thin text-center">
  <span
    class={[
      'inline-block w6 text-center',
      {
        'font-black': getLang() === 'en',
        'opacity-50': getLang() !== 'en',
      },
    ]}>EN</span
  ><span class="mx.5 opacity-50 -translate-y-1px inline-block">|</span><span
    class={[
      'inline-block w6 text-center',
      {
        'font-black': getLang() === 'es',
        'opacity-50': getLang() !== 'es',
      },
    ]}>ES</span
  >
</button>
