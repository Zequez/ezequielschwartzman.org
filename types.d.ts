declare const __REPO__: string

declare module '*.yml' {
  const value: { [key: string]: any }
  export default value
}

declare module '*.png'
declare module '*.png?width=100;250;500&format=webp&srcset'
declare module '*.png?as=meta:height;width'

declare module '*.jpg?width=100;250;500&format=webp&srcset'
declare module '*.jpg?as=meta:height;width'

declare module '*.webp?width=100;250;500&format=webp&srcset'
declare module '*.webp?as=meta:height;width'

declare module '*.svx' {
  import type { SvelteComponent } from 'svelte'

  export default class Comp extends SvelteComponent {}

  export const metadata: Record<string, unknown>
}
