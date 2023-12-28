import { Transform, TransformCallback } from "stream";

export class ParallelStream extends Transform {
  private running: number
  private terminateCb: any
  
  constructor(
    private userTransform: any,
    private options?: any
  ) {
    super({ objectMode: true, ...options })
    this.userTransform = userTransform
    this.running = 0
    this.terminateCb = null
  }

  _transform(chunk: any, encoding: BufferEncoding, done: any) {
    this.running++
    this.userTransform(
      chunk,
      encoding,
      this.push.bind(this),
      this._onComplete.bind(this)
    )
    done()
  }

  _flush(done: TransformCallback): void {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete(err?: any) {
    this.running--
    if (err) {
      return this.emit('error', err)
    }
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}