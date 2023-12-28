import { Transform, TransformCallback } from 'stream'

const searchStr = 'World'
const replaceStr = 'Node.js'
let tail = ''

export class ReplaceStream extends Transform {
  private tail: string

  constructor(
    private searchStr: string,
    private replaceStr: string,
    options?: any
  ) {
    super({ ...options })
    this.searchStr = searchStr
    this.replaceStr = replaceStr
    this.tail = ''
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    console.log('this.tail + chunk)', (this.tail + chunk).toString())
    const pieces = (this.tail + chunk).split(this.searchStr)
    console.log('pieces', pieces)
    const lastPiece = pieces[pieces.length - 1]
    console.log('lastPiece', lastPiece)
    const tailLen = this.searchStr.length - 1
    console.log('tailLen', tailLen)
    this.tail = lastPiece.slice(-tailLen)
    console.log('lastPiece', lastPiece)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)
    console.log('lastPiece.slice(0, -tailLen)', lastPiece.slice(0, -tailLen))
    console.log('pieces.join(this.replaceStr)', pieces.join(this.replaceStr))
    this.push(pieces.join(this.replaceStr))
    callback()
  }

  _flush(callback: TransformCallback): void {
    this.push(this.tail)
    callback()
  }
}
