import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split2'
import superagent from 'superagent'
import { LimitedParallelStream } from './limited-parallel-stream'
import path from 'path'

pipeline(
  createReadStream(process.argv[2]),
  split(),
  new LimitedParallelStream(
    process.argv[3] as unknown as number,
    async (url: string, encoding: BufferEncoding, push: any, done: any) => {
      if (!url) {
        return done()
      }
      try {
        await superagent.head(url, { timeout: 5 * 1000 })
        push(`${url} is up\n`)
      } catch (err) {
        push(`${url} is down\n`)
      }
      done()
    }
  ),
  createWriteStream(path.join(__dirname, 'results.txt')),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('All urls have been checked')
  }
)
