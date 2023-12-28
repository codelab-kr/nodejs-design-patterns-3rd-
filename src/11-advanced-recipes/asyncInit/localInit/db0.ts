import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false
  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
    }, 500)
  }

  async query(queryString: string) {
    if (!this.connected) {
      throw new Error('Not connected yet')
    }
    console.log(`Query executed: ${queryString}`)
  }
}

export const db0 = new DB()
