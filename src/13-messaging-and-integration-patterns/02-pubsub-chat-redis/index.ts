import { createServer } from 'http'
import { join } from 'path'
import ws from 'ws'
import Redis from 'ioredis'
import staticHandler from 'serve-handler'

const redisSub: Redis = new Redis()
const redisPub: Redis = new Redis()
let sendMsg: string = ''

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, {
    public: join(__dirname, 'www')
  })
})
const wss = new ws.Server({ server })
wss.on('connection', (client) => {
  console.log('Client connected')
  client.on('message', (msg) => {
    console.log(`Message: ${msg}`)
    sendMsg = msg.toString()
    redisPub.publish('chat_messages', msg)
  })
})

redisSub.subscribe('chat_messages')
redisSub.on('message', (channel, msg) => {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN && msg.toString() !== sendMsg) {
      client.send(msg)
    }
  }
})

server.listen(process.argv[2] || 8080)
