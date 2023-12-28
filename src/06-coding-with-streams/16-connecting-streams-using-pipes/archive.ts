import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { randomBytes } from 'crypto'
import { createCompressAndEncypt } from './combind-stream'

const [, , password, source] = process.argv
const iv = randomBytes(16)
const destination = `${source}.gz.enc`

pipeline(
  createReadStream(source),
  createCompressAndEncypt(password, iv),
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`${destination} created with iv: ${iv.toString('hex')}`)
  }
)
