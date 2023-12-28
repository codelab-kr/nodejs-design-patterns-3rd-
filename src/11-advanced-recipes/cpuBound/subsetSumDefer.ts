import EventEmitter from 'events'

export class SubsetSum extends EventEmitter {
  sum: any
  set: any
  totalSubsets: number
  runningCombine: number
  constructor(sum, set) {
    super()
    this.sum = sum
    this.set = set
    this.totalSubsets = 0
    this.runningCombine = 0
  }

  _combine(set, subset) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i])
      this._combineInterleaved(set.slice(i + 1), newSubset)
      this._processSubset(newSubset)
    }
  }

  _processSubset(subset) {
    console.log('Subset', ++this.totalSubsets, subset)
    const res = subset.reduce((prev, item) => prev + item, 0)
    if (res === this.sum) {
      this.emit('match', subset)
    }
  }

  _combineInterleaved(set, subset) {
    this.runningCombine++
    setImmediate(() => {
      this._combine(set, subset)
      if (--this.runningCombine === 0) {
        this.emit('end')
      }
    })
  }

  start() {
    this.runningCombine = 0
    this._combineInterleaved(this.set, [])
  }
}
