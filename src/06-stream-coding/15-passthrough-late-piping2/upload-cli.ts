import { createReadStream } from 'fs'
import { createBrotliCompress } from 'zlib'
import { pipeline } from 'stream'
import { basename } from 'path'
import { createUploadStream } from './upload'

const filepath = process.argv[2] // ①
const filename = basename(filepath)


pipeline( // ②
  createReadStream(filepath),
  createUploadStream(`${filename}.br`),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`File uploaded: ${filename}.br`) 
  }
)

