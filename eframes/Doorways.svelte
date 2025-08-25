<script lang="ts">
  const { z, positioning }: { z: number; positioning: string } = $props()
</script>

{#snippet doorway(klass: string)}
  <div
    class="absolute z-9 w1/3 h1/3 {klass}  transition-margin cursor-pointer opacity-50 hover:(opacity-100 bg-yellow-300) pointer-events-auto"
  ></div>
{/snippet}

{#snippet doorwayText(klass: string, text?: string)}
  {#if text}
    <div
      class="{klass} bg-black absolute px.5 py.25 text-white text-xs rounded-sm pointer-events-auto"
    >
      {text}
    </div>
  {/if}
{/snippet}

<div
  class="absolute -inset-x-4 -inset-y-2 -bottom-3 ml-4 pointer-events-none"
  style={`transform: ${positioning}; z-index: ${z - 1};`}
>
  {@render doorway(
    'top-0 left-0 bg-gray-500 hover:(-mt4 -ml4) cursor-nw-resize rounded-tl-md',
  )}
  {@render doorway('top-0 left-1/3 bg-gray-400 hover:-mt4 cursor-n-resize')}
  {@render doorway(
    'top-0 right-0 bg-gray-400 hover:(-mt4 -mr4) cursor-ne-resize rounded-tr-md',
  )}
  {@render doorway('top-1/3 right-0 bg-gray-500 hover:-mr4 cursor-e-resize')}
  {@render doorway(
    'bottom-0 right-0 bg-gray-400 hover:(-mb4 -mr4) cursor-se-resize rounded-br-md',
  )}
  {@render doorway('bottom-0 left-1/3 bg-gray-500 hover:-mb4 cursor-s-resize')}
  {@render doorway(
    'bottom-0 left-0 bg-gray-400 hover:(-mb4 -ml4) cursor-sw-resize rounded-bl-md',
  )}
  {@render doorway('bottom-1/3 left-0 bg-gray-500 hover:-ml4 cursor-w-resize')}
</div>

<div
  class="absolute -inset-x-4 -inset-y-2 -bottom-3 ml-4 pointer-events-none"
  style={`transform: ${positioning}; z-index: ${z + 1};`}
>
  {@render doorwayText('top-0 left-0 cursor-nw-resize', 'Hey you!')}
  {@render doorwayText(
    'top-0 left-1/2 -translate-x-1/2 cursor-n-resize',
    'Up top!',
  )}
  {@render doorwayText('top-0 right-0  cursor-ne-resize ', 'Right there')}
  {@render doorwayText(
    'top-1/2 left-1/1 -translate-y-1/2  cursor-e-resize -ml4 ',
    'Right there',
  )}
  {@render doorwayText(
    'bottom-0 right-0 bg-gray-400 hover:(-mb4 -mr4) cursor-se-resize rounded-br-md',
  )}
  {@render doorwayText(
    'bottom-0 left-1/3 bg-gray-500 hover:-mb4 cursor-s-resize',
  )}
  {@render doorwayText(
    'bottom-0 left-0 bg-gray-400 hover:(-mb4 -ml4) cursor-sw-resize rounded-bl-md',
  )}
  {@render doorwayText(
    'bottom-1/3 left-0 bg-gray-500 hover:-ml4 cursor-w-resize',
  )}
</div>
