<div
  class="bg-black/20 p3 rounded-2 b-4 b-[oklch(0.85_0.09_var(--hue))] diagonal-lines shadow-[inset_0_0_5px_#0004]"
  ><strong>TODO:</strong> <slot /></div
>

<style>
  .diagonal-lines {
    background-image: repeating-linear-gradient(
      -45deg,
      #0001 0px,
      #0001 2.5px,
      transparent 2.5px,
      transparent 5px
    );
  }
</style>
