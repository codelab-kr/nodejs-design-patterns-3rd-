import { ZmqMiddlewareManager } from './zmqMiddlewareManager'
import { jsonMiddleware } from './jsonMiddleware'
import { zlibMiddleware } from './zlibMiddleware'
import { Reply } from 'zeromq'

async function main() {
  const socket = new Reply()
  await socket.bind('tcp://127.0.0.1:3000')

  const zmqm = new ZmqMiddlewareManager(socket)
  zmqm.use(zlibMiddleware())
  zmqm.use(jsonMiddleware())
  zmqm.use({
    async inbound(message: any) {
      console.log('Received: ', message)
      if (message.action === 'ping') {
        await zmqm.send({
          action: 'pong',
          echo: message.echo
        })
      }
      return message
    }
  })
  console.log('Server started')
}

main()
