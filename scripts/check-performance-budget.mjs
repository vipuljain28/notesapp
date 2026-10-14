import { readdir, stat } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import path from 'node:path'

const assetRoot = path.resolve('dist/assets')
const limits = {
  '.js': 250 * 1024,
  '.css': 50 * 1024,
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name)
      return entry.isDirectory() ? listFiles(entryPath) : [entryPath]
    }),
  )
  return nested.flat()
}

const files = await listFiles(assetRoot)
let failed = false

for (const file of files) {
  const extension = path.extname(file)
  const limit = limits[extension]
  if (!limit) continue

  const rawSize = (await stat(file)).size
  const { readFile } = await import('node:fs/promises')
  const compressedSize = gzipSync(await readFile(file)).byteLength
  console.log(`${path.basename(file)}: ${(compressedSize / 1024).toFixed(1)} KiB gzip`)
  if (compressedSize > limit) {
    console.error(`${path.basename(file)} exceeds the ${limit / 1024} KiB gzip budget (raw ${rawSize} bytes).`)
    failed = true
  }
}

if (failed) process.exitCode = 1
