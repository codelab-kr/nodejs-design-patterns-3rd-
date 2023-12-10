import { OfflineState } from './offlineState'
import { OnlineState } from './onlineState'

export class FailsafeSocket {
  options: any
  queue: any[]
  currentState: any
  socket: any
  states: any

  constructor(options: any) {
    this.options = options
    this.queue = []
    this.currentState = null
    this.socket = null
    this.states = {
      offline: new OfflineState(this),
      online: new OnlineState(this)
    }
    this.changeState('offline')
  }

  changeState(state) {
    console.log(`Activating state: ${state}`)
    this.currentState = this.states[state]
    this.currentState.activate()
  }

  send(data) {
    console.log(`Queuing ${this.queue.length} messages`)
    this.currentState.send(data)
    console.log(`Queuing ${this.queue.length} messages`)
  }
}
