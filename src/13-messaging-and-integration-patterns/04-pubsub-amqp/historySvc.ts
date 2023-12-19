import { createServer } from 'http'
import { Level } from 'level'
import { join } from 'path'
import amqp from 'amqplib'
import timestamp from 'monotonic-timestamp'
import JSONStream from 'JSONStream'
import sub from 'subleveldown'

async function main() {
  const db = new Level(join(__dirname, 'msgHistory')) as any
  const historyDb = sub(db, 'history', { valueEncoding: 'json' })

  const connetcion = await amqp.connect('amqp://localhost')
  const channel = await connetcion.createChannel()
  await channel.assertExchange('chat', 'fanout')
  const { queue } = await channel.assertQueue('chat_history')
  await channel.bindQueue(queue, 'chat', '')

  channel.consume(queue, async (msg) => {
    const content = msg?.content.toString()
    console.log(`Saving message: ${content}`)
    await historyDb.put(timestamp(), content)
    channel.ack(msg as any)
  })

  createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200)
    await historyDb.createValueStream().pipe(JSONStream.stringify()).pipe(res)
  }).listen(8090)
}

main().catch((err) => console.error(err))
