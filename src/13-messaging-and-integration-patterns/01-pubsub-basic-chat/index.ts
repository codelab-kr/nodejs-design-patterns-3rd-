import { createServer } from 'http'
import { join } from 'path'
import staticHandler from 'serve-handler'
import ws from 'ws'

const server = createServer((req, res) => {
  return staticHandler(req, res, {
    public: join(__dirname, 'www')
  })
})

const wss = new ws.Server({ server })
wss.on('connection', (client) => {
  client.on('message', (msg: string) => {
    console.log(`Message: ${msg}`)
    broadcast(msg)
  })
})

function broadcast(msg: string) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(msg)
    }
  })
}

server.listen(8080, () => {
  console.log(`Started at ${process.pid}`)
})
