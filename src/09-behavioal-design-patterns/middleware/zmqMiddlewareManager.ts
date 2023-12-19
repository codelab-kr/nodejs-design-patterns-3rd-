export class ZmqMiddlewareManager {
  socket: any
  inboundMiddleware: any[]
  outboundMiddleware: any[]

  // 1
  constructor(socket: any) {
    this.socket = socket
    this.inboundMiddleware = []
    this.outboundMiddleware = []
    this.handleIncomingMessages().catch((err) => console.error(err))
  }

  // 2
  async handleIncomingMessages() {
    for await (const [message] of this.socket) {
      await this.executeMiddleware(this.inboundMiddleware, message).catch(
        (err) => console.error(err)
      )
    }
  }

  // 3
  async send(message: any) {
    const finalMessage = await this.executeMiddleware(
      this.outboundMiddleware,
      message
    )
    return this.socket.send(finalMessage)
  }

  // 4
  use(middleware: any) {
    if (middleware.inbound) {
      this.inboundMiddleware.push(middleware.inbound)
    }
    if (middleware.outbound) {
      this.outboundMiddleware.unshift(middleware.outbound)
    }
  }

  // 5
  async executeMiddleware(middlewares: any, initialMessage: any) {
    let message = initialMessage
    for await (const middlewaresFunc of middlewares) {
      message = await middlewaresFunc.call(this, message)
    }
    return message
  }
}
