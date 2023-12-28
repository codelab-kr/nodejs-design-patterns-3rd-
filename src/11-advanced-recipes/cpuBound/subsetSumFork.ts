import { EventEmitter } from 'events'
import { join } from 'path'
import { ProcessPool } from './processPool'

const workerFile = join(__dirname, 'workers', 'subsetSumWorker.js')
const workers = new ProcessPool(workerFile, 2)

export class SubsetSum extends EventEmitter {
  sum: any
  set: any
  constructor(sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start() {
    const worker = (await workers.acquire()) as any
    worker.send({ sum: this.sum, set: this.set })
    const onMessage = (msg) => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      }
      this.emit(msg.event, msg.data)
    }
    worker.on('message', onMessage)
  }
}
