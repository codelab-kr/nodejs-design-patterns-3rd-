import { ZmqMiddlewareManager } from './zmqMiddlewareManager'
import { jsonMiddleware } from './jsonMiddleware'
import { zlibMiddleware } from './zlibMiddleware'
import { Request } from 'zeromq'

async function main() {
  const socket = new Request()
  socket.connect('tcp://127.0.0.1:3000')

  const zmqm = new ZmqMiddlewareManager(socket)
  zmqm.use(zlibMiddleware())
  zmqm.use(jsonMiddleware())
  zmqm.use({
    inbound(message: any) {
      console.log('Echoed back : ', message)
      return message
    }
  })

  console.log('Client started')

  setInterval(() => {
    zmqm.send({ action: 'ping', echo: Date.now() })
  }, 1000)

  // while (true) {
  //   await zmqm.send({ action: 'ping', echo: Date.now() })
  //   await new Promise((resolve) => {
  //     setTimeout(resolve, 1000)
  //   })
  // }
}

main()
