import { createServer } from 'http'
import httpProxy from 'http-proxy'
import Consul from 'consul'

const routing = [
  {
    path: '/api',
    service: 'api-service',
    index: 0
  },
  {
    path: '/',
    service: 'webapp-service',
    index: 0
  }
]

const consulClient = new Consul()
const proxy = httpProxy.createProxyServer()

const server = createServer((req, res) => {
  const route = routing.find((route) => req.url?.startsWith(route.path)) // ③
  console.log('route', route)
  consulClient.agent.service.list((err, services) => {
    // ④
    const servers =
      !err &&
      Object.values(services!).filter((service: any) =>
        service.Tags.includes(route?.service)
      )

    console.log('servers', servers)
    if (err || !servers || (servers && servers.length === 0)) {
      res.writeHead(502)
      return res.end('Bad gateway')
    }

    if (!route) {
      res.writeHead(404)
      return res.end('Not found')
    }
    route.index = (route.index + 1) % servers.length // ⑤
    const server = servers[route.index]
    const target = `http://${server.Address}:${server.Port}`
    proxy.web(req, res, { target })
  })
})

server.listen(8111, () => console.log('Load balancer started on port 8111'))
