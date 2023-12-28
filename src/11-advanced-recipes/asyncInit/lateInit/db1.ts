import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false
  commandsQueue: any[] = []

  async query(queryString: string) {
    if (!this.connected) {
      console.log(`Request queueed: ${queryString}`)
      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString).then(resolve, reject)
        }
        this.commandsQueue.push(command)
      })
    }

    console.log(`Query executed: ${queryString}`)
  }

  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      this.commandsQueue.forEach((command) => command())
      this.commandsQueue = []
    }, 500)
  }
}

export const db1 = new DB()
