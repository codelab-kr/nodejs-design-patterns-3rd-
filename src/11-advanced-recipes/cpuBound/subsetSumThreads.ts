import { EventEmitter } from 'events'
import { join } from 'path'
import { ThreadPool } from './threadPool'

const workerFile = join(__dirname, 'workers', 'subsetSumThreadWorker.js')
const workers = new ThreadPool(workerFile, 2)

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
    worker.postMessage({ sum: this.sum, set: this.set })
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
