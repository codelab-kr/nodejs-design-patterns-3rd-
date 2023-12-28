import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()
let emittedBytes: number = 0

const randomStream = new Readable({
  highWaterMark: 100,
  read(size: number) {
    const chunk = chance.string({ length: size })
    this.push(chunk, 'utf8')
    emittedBytes += chunk.length
    console.log(`Pushing chunk of size: ${chunk.length}`)
    this.push(chunk, 'utf8')
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
})

randomStream.on('data', (chunk) => {
  console.log(`Chunk received (${chunk.length} bytes): "${chunk.toString()}"`)
})
randomStream.on('end', () => {
  console.log(`Produced ${emittedBytes} bytes of random data`)
})
randomStream.on('error', (error) => {
  console.log(`Error: ${error.message}`)
})