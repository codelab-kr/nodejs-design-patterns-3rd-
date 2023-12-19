import { request } from 'http'
import getStream from 'get-stream'

const server = [
  { host: 'localhost', port: 8081 },
  { host: 'localhost', port: 8082 }
]

let i = 0

export function balancedRequest(options: any) {
  return new Promise((resolve, reject) => {
    i = (i + 1) % server.length
    options.hostname = server[i].host
    options.port = server[i].port

    request(options, (res) => {
      resolve(getStream(res))
    })
      .on('error', reject)
      .end()
  })
}
