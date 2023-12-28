import { Transform, TransformCallback } from 'stream'

export class LimitedParallelStream extends Transform {
  private running: number
  private terminateCb: any
  private continueCb: any

  constructor(
    private concurrency: number,
    private userTransform: any,
    private options?: any
  ) {
    super({ ...options, objectMode: true })
    this.concurrency = concurrency
    this.userTransform = userTransform
    this.running = 0
    this.continueCb = null
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
    if (this.running < this.concurrency) {
      done()
    } else {
      this.continueCb = done
    }
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
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}
