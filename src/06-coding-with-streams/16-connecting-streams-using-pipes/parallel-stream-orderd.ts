import { Transform, pipeline } from 'stream'
import parallelTransform from 'parallel-transform'
import split from 'split2'
import { createReadStream, createWriteStream } from 'fs'
import superagent from 'superagent'
import path from 'path'

pipeline(
  createReadStream(process.argv[2]),
  split(),
  parallelTransform(
    4,
    async function (this: Transform, url: string, done: any) {
      if (!url) {
        return done()
      }
      console.log(url)
      try {
        await superagent.head(url, { timeout: 5 * 1000 })
        this.push(`${url} is up\n`)
      } catch (err) {
        this.push(`${url} is down\n`)
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
