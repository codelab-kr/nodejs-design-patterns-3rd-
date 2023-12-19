import { createServer } from 'http'
import Consul from 'consul'
import portfinder from 'portfinder'
import nanoid from 'nanoid'

const serviceType = process.argv[2]
const { pid } = process

async function main() {
  const consulClient = new Consul()

  const port = await portfinder.getPortPromise()
  const address = process.env.ADDRESS || 'localhost'
  const servicId = nanoid()

  console.log('servicId', servicId)

  function registerService() {
    consulClient.agent.service.register(
      {
        id: servicId,
        name: serviceType,
        address,
        port,
        tags: [serviceType]
      },
      (err) => {
        if (err) throw err
        console.log(
          `${serviceType} registered successfully - service ${servicId}`
        )
      }
    )
  }

  function unregisterService(err) {
    err && console.error(err)
    console.log(`${serviceType} deregistering - service ${servicId}`)
    consulClient.agent.service.deregister(servicId, () => {
      process.exit(err ? 1 : 0)
    })
  }

  process.on('SIGINT', unregisterService)
  process.on('exit', unregisterService)
  process.on('uncaughtException', unregisterService)

  const server = createServer((req, res) => {
    // CPU-bound work
    for (let i = 1e7; i > 0; i--) {}
    console.log(`Handling request from ${pid}`)
    res.end(`${serviceType} response from ${pid}\n`)
  })

  server.listen(port, address, () => {
    registerService()
    console.log(`Started ${serviceType} at ${pid} on port ${port}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
