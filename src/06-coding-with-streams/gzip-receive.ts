import { createServer } from 'http'
import { createGunzip } from 'zlib'
import { createWriteStream } from 'fs'
import { basename, join } from 'path'
import { createDecipheriv, randomBytes } from 'crypto'

const secret = randomBytes(24)
console.log(`Secret: ${secret.toString('hex')}`)

export const server = createServer((req, res) => {
  const filename = basename(req.headers['x-filename'] as string)
  const iv = Buffer.from(req.headers['x-initialization-vector'] as string, 'hex')
  const destFilename = join(__dirname, 'received', filename)
  console.log(`File request received: ${filename}`)
  req
    .pipe(createDecipheriv('aes192', secret, iv))
    .pipe(createGunzip())
    .pipe(createWriteStream(destFilename))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' })
      res.end('OK\n')
      console.log(`File saved: ${destFilename}`)
    })
})

server.listen(3000, () => console.log('Listening on http://localhost:3000/'))
