import { createServer } from 'http'
import { join } from 'path'
import ws from 'ws'
import yargs from 'yargs'
import staticHandler from 'serve-handler'
import * as zmq from 'zeromq'

interface IArguments {
  [x: string]: unknown
  _: (string | number)[]
  $0: string
  pub: string // 'pub' 속성 추가
  sub: never[] // 'sub' 속성 추가
}

let pubSocket
let sendMsg: string = ''
const argv = yargs.argv as IArguments

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, {
    public: join(__dirname, 'www')
  })
})

async function initializationSockets() {
  pubSocket = new zmq.Publisher()
  await pubSocket.bind(`tcp://127.0.0.1:${argv.pub}`)

  const subSocket = new zmq.Subscriber()
  const subPort = [].concat(argv.sub)
  for (const port of subPort) {
    subSocket.connect(`tcp://127.0.0.1:${port}`)
  }
  subSocket.subscribe('chat')

  for await (const [msg] of subSocket) {
    const message = msg.toString().split(' ')[1]
    console.log(`Message from another server: ${message}`)
    broadcast(message)
  }
}

initializationSockets()

const wss = new ws.Server({ server })
wss.on('connection', (client) => {
  console.log('Client connected')
  client.on('message', (msg) => {
    console.log(`Message: ${msg}`)
    sendMsg = msg.toString()
    broadcast(msg.toString())
    pubSocket.send(`chat ${msg}`)
  })
})

function broadcast(msg: any) {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN && msg.toString() !== sendMsg) {
      client.send(msg)
    }
  }
}

server.listen(argv.http || 8080)
