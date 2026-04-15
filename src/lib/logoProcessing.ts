import sharp from 'sharp'

const EDGE_LIGHT_THRESHOLD = 242
const EDGE_NEUTRAL_TOLERANCE = 18
const MIN_BACKGROUND_RATIO = 0.03

type FileLike = {
  alt?: string | null
  filename: string
  mimeType?: string | null
}

type ProcessedLogoUpload = {
  buffer: Buffer
  filename: string
  mimeType: string
  size: number
}

function isLikelyLogoUpload({ alt, filename, mimeType }: FileLike): boolean {
  if (!mimeType?.startsWith('image/')) return false
  if (mimeType === 'image/svg+xml' || mimeType === 'image/gif') return false

  const haystack = `${alt ?? ''} ${filename}`.toLowerCase()
  return haystack.includes('logo') || haystack.includes('brand')
}

function isLightNeutralPixel(data: Buffer, index: number): boolean {
  const alpha = data[index + 3]
  if (alpha === 0) return false

  const red = data[index]
  const green = data[index + 1]
  const blue = data[index + 2]

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)

  return (
    red >= EDGE_LIGHT_THRESHOLD &&
    green >= EDGE_LIGHT_THRESHOLD &&
    blue >= EDGE_LIGHT_THRESHOLD &&
    max - min <= EDGE_NEUTRAL_TOLERANCE
  )
}

function setTransparent(data: Buffer, index: number) {
  data[index + 3] = 0
}

export async function stripLightBackgroundFromLogo(
  file: FileLike & { buffer: Buffer },
): Promise<ProcessedLogoUpload | null> {
  if (!isLikelyLogoUpload(file)) return null

  const { data, info } = await sharp(file.buffer)
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info
  const totalPixels = width * height
  const queue = new Uint32Array(totalPixels)
  const visited = new Uint8Array(totalPixels)
  let head = 0
  let tail = 0
  let transparentPixels = 0

  const enqueue = (x: number, y: number) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return

    const pixelIndex = y * width + x
    if (visited[pixelIndex]) return

    const offset = pixelIndex * channels
    if (!isLightNeutralPixel(data, offset)) return

    visited[pixelIndex] = 1
    queue[tail++] = pixelIndex
  }

  for (let x = 0; x < width; x++) {
    enqueue(x, 0)
    enqueue(x, height - 1)
  }

  for (let y = 1; y < height - 1; y++) {
    enqueue(0, y)
    enqueue(width - 1, y)
  }

  while (head < tail) {
    const pixelIndex = queue[head++]
    const x = pixelIndex % width
    const y = Math.floor(pixelIndex / width)
    const offset = pixelIndex * channels

    setTransparent(data, offset)
    transparentPixels++

    enqueue(x - 1, y)
    enqueue(x + 1, y)
    enqueue(x, y - 1)
    enqueue(x, y + 1)
  }

  if (transparentPixels / totalPixels < MIN_BACKGROUND_RATIO) {
    return null
  }

  const output = await sharp(data, {
    raw: {
      width,
      height,
      channels,
    },
  })
    .png()
    .toBuffer()

  const safeBaseName = file.filename.replace(/\.[^.]+$/, '')

  return {
    buffer: output,
    filename: `${safeBaseName}.png`,
    mimeType: 'image/png',
    size: output.length,
  }
}
