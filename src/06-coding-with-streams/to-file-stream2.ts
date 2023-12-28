import { Writable } from 'stream'
import { promises as fs } from 'fs'
import { dirname, join } from 'path'
import { mkdirp } from 'mkdirp'

const toFileStream = new Writable({
  objectMode: true,
  write(chunk: any, encoding: string, cb: (error?: Error | null) => void) {
    console.log(dirname(chunk.path))
    mkdirp(dirname(chunk.path))
      .then(() => fs.writeFile(chunk.path, chunk.content))
      .then(() => cb())
      .catch(cb)
  }
})

const tfs = toFileStream

tfs.write({
  path: join(__dirname, 'files', 'file1.txt'),
  content: 'Hello'
})
tfs.write({
  path: join(__dirname, 'files', 'file2.txt'),
  content: 'Node.js'
})
tfs.write({
  path: join(__dirname, 'files', 'file3.txt'),
  content: 'streams'
})
tfs.end(() => console.log('All files created'))
