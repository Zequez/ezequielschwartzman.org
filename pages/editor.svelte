<script module lang="ts">
  export const metadata = { title: 'Editor experimental' }
</script>

<script lang="ts">
  import { type ClassValue } from 'svelte/elements'

  function handleInput(
    target: string,
    ev: Event & {
      currentTarget: EventTarget & HTMLElement
    },
  ) {
    const sel = window.getSelection()
    const node = sel?.anchorNode?.parentElement
    console.log('input on:', node?.tagName, node, ev)
    console.log(target, ev)
  }

  // VML = Visual Markup Language

  type HTMLNode = HTMLComponentNode | HTMLCodeNode | HTMLTextNode

  type HTMLComponentNode = {
    node: string
    attrs: { [key: string]: string }
    children: HTMLNode[]
  }

  type HTMLCodeNode = { node: '$'; $value: string; children?: HTMLNode[] }
  type HTMLTextNode =
    | { node: 'text'; $value: string }
    | { node: 'text'; value: string }

  let tree: HTMLNode[] = [
    {
      node: 'h1',
      attrs: {},
      children: [
        {
          node: 'text',
          value: 'Lorem Ipsum',
        },
      ],
    },

    {
      node: 'p',
      attrs: {},
      children: [
        {
          node: 'text',
          value: 'Dolor sit amet',
        },
      ],
    },

    {
      node: 'p',
      attrs: {},
      children: [
        {
          node: 'text',
          value: 'Consectetur ',
        },
        {
          node: 'a',
          attrs: { href: 'https://ezequielschwartzman.org', target: '_blank' },
          children: [{ node: 'text', value: 'my cool website' }],
        },
        { node: 'text', value: ' adipiscing elit' },
      ],
    },

    {
      node: 'div',
      attrs: { class: 'flexcc text-center w-full h-40 bg-pink' },
      children: [
        {
          node: 'div',
          attrs: {},
          children: [{ node: 'text', value: 'hello' }],
        },

        {
          node: 'div',
          attrs: {},
          children: [{ node: 'text', value: 'world' }],
        },

        {
          node: 'img',
          attrs: {
            alt: 'Ezequiel',
            $src: 'ezequiel',
            class: 'w20mm filter-grayscale h20mm object-fill rounded-full',
          },
          children: [],
        },
      ],
    },
  ]

  const COLORS = {
    h1: 'bg-fuchsia-500',
    a: 'bg-blue-500',
    p: 'bg-amber-600',
    div: 'bg-slate-600',
    img: 'bg-green-600',
  }

  const CLASS_INLINE = {
    h1: 'bg-fuchsia-500',
    a: 'bg-blue-500 underline',
    p: 'bg-amber-600',
    div: 'bg-slate-600',
    img: 'bg-green-600',
  }

  function allInline(nodes: HTMLNode[]) {
    return nodes.every((n) => n.node === 'text' || n.node === 'a')
  }
</script>

<div class="p6">
  {#snippet TREE(tree: HTMLNode[])}
    {#each tree as node}
      {#if node.node === 'text' && 'value' in node}
        {node.value}
      {:else}
        <div
          class={[
            COLORS[node.node as keyof typeof COLORS] || 'bg-gray-900',
            'bg-opacity-25',
            {
              'inline bg-': node.node === 'a',
            },
          ]}
        >
          <span
            class={[
              ' text-white rounded-0.5 px-[0.5ch]',
              COLORS[node.node as keyof typeof COLORS] || 'bg-gray-900',
            ]}>{node.node}</span
          >

          {#if 'attrs' in node && Object.keys(node.attrs).length > 0}
            <span
              class={[
                ' text-white rounded-0.5 bg-opacity-70 inline-flex',
                COLORS[node.node as keyof typeof COLORS] || 'bg-gray-900',
              ]}
            >
              {#each Object.entries(node.attrs) as [key, value]}
                {@render attr(node, key, value)}
              {/each}
            </span>
          {/if}

          {#if 'children' in node && node.children}
            {@const inlined = allInline(node.children)}
            {#if inlined}
              {@render TREE(node.children)}
            {:else}
              <div class="ml-2ch">
                {@render TREE(node.children)}
              </div>
            {/if}
          {/if}
        </div>
      {/if}
    {/each}
  {/snippet}

  {#snippet attr(node: HTMLNode, key: string, value: string)}
    <span class={[' text-white rounded-0.5 bg-opacity-70']}>
      {#if key === 'href'}
        {@render att('', value, 'underline')}
      {:else if key === 'class'}
        {@render att('', value, 'underline underline-dotted')}
      {:else if key === 'target'}
        {@render att('', value === '_blank' ? 'EX' : 'IN', '')}
      {:else}
        {@render att(key, value, '')}
      {/if}
    </span>
  {/snippet}

  {#snippet att(key: string, value: string, classVal: ClassValue)}
    <span
      class={[
        'px0.5ch bg-black/10 shadow-[inset_0_0_0_1px_#000a] rounded-1',
        classVal,
      ]}
    >
      {#if key}
        {key}=
      {/if}
      {value}
    </span>
  {/snippet}

  <div
    contenteditable="true"
    class="font-mono whitespace-nowrap"
    oninput={(ev) => handleInput('div', ev)}
  >
    {@render TREE(tree)}
  </div>
</div>
