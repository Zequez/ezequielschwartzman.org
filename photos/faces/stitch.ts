import sharp from 'sharp'

const imageNames = [
  'fear.jpg',
  'rage.jpg',
  'sadness.jpg',
  'anger-joy.jpg',
  'numb.jpg',
  'rage-fear.jpg',
  'fear-sadness.jpg',
  'joy.jpg',
  'joy-sadness-fear.jpg',
]

const cropSize = 300
const gridSize = 3
const outputSize = cropSize * gridSize

async function processImage(file: string): Promise<Buffer> {
  return await sharp(file)
    .resize(cropSize, cropSize, {
      fit: 'cover',
      position: 'center',
    })
    .grayscale()
    .toBuffer()
}

async function createGrid() {
  const processedImages = await Promise.all(imageNames.map(processImage))

  const composite: sharp.OverlayOptions[] = processedImages.map((img, i) => {
    const x = (i % gridSize) * cropSize
    const y = Math.floor(i / gridSize) * cropSize
    return {
      input: img,
      top: y,
      left: x,
    }
  })

  const output = sharp({
    create: {
      width: outputSize,
      height: outputSize,
      channels: 3,
      background: 'white',
    },
  })

  await output.composite(composite).jpeg({ quality: 90 }).toFile('stitched.jpg')

  console.log('✅ Image saved as output.jpg')
}

createGrid().catch(console.error)
