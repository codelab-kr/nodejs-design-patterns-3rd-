import { EventEmitter } from 'events'
import { QueringState } from './queringState'
import { InitializedState } from './initializedState'

class DB extends EventEmitter {
  state: any
  connected: boolean = false

  constructor() {
    super()
    this.state = new QueringState(this)
  }

  async query(queryString: string) {
    return this.state.query(queryString)
  }

  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      const oldState = this.state
      this.state = new InitializedState()
      oldState[oldState.deactivate] && oldState[oldState.deactivate]()
    }, 500)
  }
}

export const db = new DB()
