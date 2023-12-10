export class OnlineState {
  failsafeSocket: any
  hasDisconnected: boolean
  constructor(failsafeSocket) {
    this.failsafeSocket = failsafeSocket
    this.hasDisconnected = false
  }

  send(data) {
    this.failsafeSocket.queue.push(data)
    this._safeWrite(data)
  }

  _safeWrite(data) {
    this.failsafeSocket.socket.write(data, (err) => {
      if (err) {
        this.hasDisconnected = true
        this.failsafeSocket.changeState('offline')
      }
      if (!this.hasDisconnected && !err) {
        this.failsafeSocket.queue.shift()
      }
    })
  }

  activate() {
    this.hasDisconnected = false
    for (const data of this.failsafeSocket.queue) {
      console.log(
        `Sending: ${this.failsafeSocket.queue.length} messages in queue`
      )
      this._safeWrite(data)
    }

    this.failsafeSocket.socket.once('error', () => {
      this.hasDisconnected = true
      this.failsafeSocket.changeState('offline')
    })
  }
}
