<script lang="ts">
  import cardBgPattern from '../photos/old-moon.png'
  const { isActive, onClick, hue, title } = $props<{
    isActive: boolean
    hue: number
    title: string
    onClick: () => void
  }>()
</script>

<div class="h-12 mb6">
  <button
    onclick={(ev) => {
      onClick()
      if (ev.detail > 0) {
        ev.currentTarget.blur()
      }
    }}
    class={[
      `btn relative rounded-1 px-6 outline-offset-0.25rem! focus:outline-0.25rem! text-5.5/12 bg-gradient-to-r from-black/10 to-black/0 group`,
      { active: isActive },
    ]}
    style={`
    background-color: oklch(0.55 0.20 ${hue});
    outline-color: oklch(0.65 0.09 258);
  `}
  >
    <div
      class="absolute inset-0 rounded-1"
      style={`background-image: url(${cardBgPattern})`}
    ></div>
    <span
      class={[
        'relative z-2 group-active:translate-y-0px',
        {
          'translate-y-0px': isActive,
        },
      ]}>{title}</span
    ></button
  >

  <style>
    .btn {
      overflow: hidden;
      padding-inline: calc(var(--spacing) * 6);
      padding-bottom: 4px;
      transform: translateY(-4px);
      box-shadow:
        inset 0 0 20px 0 #0002,
        inset 0 0 0 1.2px #0002,
        0 1px 0 0.7px #0008;
      text-shadow: 0 1px 0 #0006;
      cursor: pointer;
      transition-property: padding, transform, box-shadow;
      transition-duration: 250ms;
    }

    .btn:before {
      content: '';
      height: 10px;
      bottom: 0;
      width: 100%;
      left: 0;
      position: absolute;
      border-radius: 0 0 0.25rem 0.25rem;
      z-index: 2;
      box-shadow: inset 0 -5px 0 #0005;
      background: transparent;
      transition: transform 250ms;
      transform: translateY(0);
    }

    .btn:active:before,
    .btn.active:before {
      transform: translateY(5px);
    }

    .btn:hover {
      filter: brightness(1.05);
    }

    .btn:focus:not(:active) {
      outline: solid 4px;
      outline-offset: 3px;
    }

    .btn:active,
    .btn.active {
      padding-bottom: 0;
      transform: translateY(0px);
      filter: brightness(1.1);

      box-shadow:
        inset 0 0 3px 1.5px #0008,
        inset 0 0 14px 1.5px #0009,
        0 1px 0 #0005;
      text-shadow:
        0 1px 0 #0006,
        0 2px 4px #fff3;
    }
  </style>
</div>
