import { Writable } from 'stream'
import { promises as fs } from 'fs'
import { dirname } from 'path'
import { mkdirp } from 'mkdirp'

export class ToFileStream extends Writable {
  constructor(options?: any) {
    super({
      ...options,
      objectMode: true
    })
  }

  _write(
    chunk: any,
    encoding: string,
    cb: (error?: Error | null) => void
  ) {
    console.log(dirname(chunk.path));
    mkdirp(dirname(chunk.path))
    .then(()=> fs.writeFile(chunk.path, chunk.content))
    .then(() => cb())
    .catch(cb)
  }
}
