import { Readable, ReadableOptions } from 'stream'
import Chance from 'chance'

const chance = new Chance()

export class RandomStream extends Readable {
  emittedBytes: number
  
  constructor(options: ReadableOptions | undefined) {
    super(options)
    this.emittedBytes = 0
  }

  _read(size: number) {
    const chunk = chance.string({ length: size })
    this.push(chunk, 'utf8')
    this.emittedBytes += chunk.length
    console.log(`Pushing chunk of size: ${chunk.length}`)
    this.push(chunk, 'utf8')
    if (chance.bool({ likelihood: 5 })) {
      this.push(null)
    }
  }
}
