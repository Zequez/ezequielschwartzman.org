import targetShooter1 from '../photos/web-gallery/target-shooter-1.png?width=100;250;500&format=webp&srcset'
import targetShooter1Meta from '../photos/web-gallery/target-shooter-1.png?as=meta:height;width'
import factorioMods from '../photos/web-gallery/factorio-mods.png?width=100;250;500&format=webp&srcset'
import factorioModsMeta from '../photos/web-gallery/factorio-mods.png?as=meta:height;width'

type ImgData = {
  src: [string, string, string]
  meta: { width: number; height: number }
}

type Imgs = {
  [key: string]: ImgData
}

const imgs = {
  targetShooter1: {
    src: targetShooter1,
    meta: targetShooter1Meta,
  },
  factorioMods: {
    src: factorioMods,
    meta: factorioModsMeta,
  },
}

export default imgs
