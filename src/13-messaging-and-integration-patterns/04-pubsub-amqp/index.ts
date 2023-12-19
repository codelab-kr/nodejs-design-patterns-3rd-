import { createServer } from 'http'
import serveHandler from 'serve-handler'
import ws from 'ws'
import amqp from 'amqplib'
import JSONStream from 'JSONStream'
import supersgent from 'superagent'
import { join } from 'path'

const httpPort = process.argv[2] ?? 8080
let sendMsg: string = ''

async function main() {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertExchange('chat', 'fanout')
  const { queue } = await channel.assertQueue(`chat_svc_${httpPort}`, {
    exclusive: true
  })
  await channel.bindQueue(queue, 'chat', '')

  channel.consume(
    queue,
    async (msg) => {
      const message = msg?.content.toString() ?? ''
      console.log(`From queue: ${message}`)
      broadcast(message)
    },
    { noAck: true }
  )

  const server = createServer((req, res) => {
    return serveHandler(req, res, {
      public: join(__dirname, 'www')
    })
  })

  const wss = new ws.Server({ server })

  wss.on('connection', (client) => {
    console.log('Client connected')

    client.on('message', (msg) => {
      console.log(`From client: ${msg}`)
      sendMsg = msg.toString()
      broadcast(msg.toString())
      channel.publish('chat', '', Buffer.from(msg.toString()))
    })

    supersgent
      .get(`http://localhost:8090`)
      .on('error', (err) => console.error(err))
      .pipe(JSONStream.parse('*'))
      .on('data', (msg) => {
        client.send(msg)
      })
  })

  function broadcast(msg: any) {
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN && msg.toString() !== sendMsg) {
        client.send(msg)
      }
    }
  }

  server.listen(httpPort)
}

main().catch((err) => console.error(err))
