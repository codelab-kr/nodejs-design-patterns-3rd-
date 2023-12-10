import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform } from 'stream'

export function concatFiles(destination: string, filenames: string[]) {
  return new Promise<void>((resolve, reject) => {
    const destStream = createWriteStream(destination)
    Readable.from(filenames) // 1
      .pipe(
        // 2
        new Transform({
          objectMode: true,
          transform(filename, _, callback) {
            const src = createReadStream(filename)
            src.pipe(destStream, { end: false })
            src.on('error', callback)
            src.on('end', callback) // 3
          }
        })
      )
      .on('error', reject)
      .on('finish', () => {
        // 4
        destStream.end()
        resolve()
      })
  })
}
