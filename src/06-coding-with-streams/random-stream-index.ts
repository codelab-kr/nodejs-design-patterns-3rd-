import { RandomStream } from './random-stream'

const randomStream = new RandomStream({ highWaterMark: 100 })
randomStream
  .on('data', (chunk) => {
    console.log(`Chunk received (${chunk.length} bytes): "${chunk.toString()}"`)
  })
  .on('end', () => {
    console.log(`Produced ${randomStream.emittedBytes} bytes of random data`)
  })
  .on('error', (error) => {
    console.log(`Error: ${error.message}`)
  })
