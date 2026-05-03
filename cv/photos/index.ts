const picturesSrc = import.meta.glob('./*.{png,jpg}', {
  query: { format: 'webp', width: '480;768;1280;1920', picture: '' },
  import: 'default',
  eager: true,
})

const picturesMeta = import.meta.glob('./*.{png,jpg}', {
  query: { format: 'webp', as: 'meta:height;width', picture: '' },
  import: 'default',
  eager: true,
})

export type ImgData = {
  src: [string, string, string]
  meta: { width: number; height: number }
}

let pictures: { [key: string]: ImgData } = {}
for (let srcs in picturesSrc) {
  const name = srcs.replace('./', '').replace('.png', '').replace('.jpg', '')
  const src = picturesSrc[srcs]
  const meta = picturesMeta[srcs]
  pictures[name] = {
    src: src as [string, string, string],
    meta: meta as { width: number; height: number },
  }
}

export const sizes = [480, 768, 1280, 1920]

console.log('assaa')

export default pictures
