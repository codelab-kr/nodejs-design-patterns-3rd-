import { createReadStream, createWriteStream } from 'fs'
import split from 'split2'

const destination = process.argv[2]
const sources = process.argv.slice(3)

const destinationStream = createWriteStream(destination)

let endCount = 0
for (const source of sources) {
  const sourceStream = createReadStream(source, { highWaterMark: 16 })
  sourceStream.on('end', () => {
    if (++endCount === sources.length) {
      destinationStream.end()
      console.log(
        `${destination} created with content from ${sources.join(', ')}`
      )
    }
  })
  sourceStream
    .pipe(split((line) => line + '\n'))
    .pipe(destinationStream, { end: false })
}
