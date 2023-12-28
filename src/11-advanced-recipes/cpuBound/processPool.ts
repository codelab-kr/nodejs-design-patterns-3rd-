import { fork } from 'child_process'

export class ProcessPool {
  file: any
  poolMax: number
  pool: any[]
  active: any[]
  waiting: any[]

  constructor(file, poolMax = 4) {
    this.file = file
    this.poolMax = poolMax
    this.pool = []
    this.active = []
    this.waiting = []
  }

  acquire() {
    return new Promise((resolve, reject) => {
      let worker
      if (this.pool.length > 0) {
        worker = this.pool.pop()
        this.active.push(worker)
        return resolve(worker)
      }

      if (this.active.length >= this.poolMax) {
        return this.waiting.push({ resolve, reject })
      }

      worker = fork(this.file)
      worker.once('message', (message) => {
        if (message === 'ready') {
          this.active.push(worker)
          return resolve(worker)
        }
        worker.kill()
        reject(new Error('Imrpoper process start!'))
      })
      worker.once('exit', (code) => {
        console.log(`Worker stopped with exit code ${code}`)
        this.active = this.active.filter((worker) => worker !== worker)
        this.pool = this.pool.filter((worker) => worker !== worker)
      })
    })
  }

  release(worker) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift()
      resolve(worker)
    } else {
      this.active = this.active.filter((worker) => worker !== worker)
      this.pool.push(worker)
    }
  }
}
