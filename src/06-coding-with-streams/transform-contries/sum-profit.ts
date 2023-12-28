import { Transform } from 'stream'

export class SumProfit extends Transform {
  private sum: number
  constructor(options: any = {}) {
    options.objectMode = true
    super(options)
    this.sum = 0
  }

  _transform(record: any, encoding: BufferEncoding, callback: any) {
    // console.log('record', record, typeof record.profit)
    this.sum += parseFloat(record.profit) as number
    callback()
  }

  _flush(callback: any) {
    this.push(this.sum.toString())
    callback()
  }
}
