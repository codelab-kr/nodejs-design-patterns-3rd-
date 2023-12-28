import { request } from 'http'
import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'
import { basename } from 'path'
import { createCipheriv, randomBytes } from 'crypto'
import { monitor } from './pass-throught/observabilty'

const filename = process.argv[2]
const serverURL = process.argv[3]
const secret = Buffer.from(process.argv[4], 'hex')
const iv = randomBytes(16)

const httpRequestOptions = {
  hostname: serverURL,
  port: 3000,
  path: '/',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    'X-Filename': basename(filename),
    'X-Initialization-Vector': iv.toString('hex')
  }
}

const req = request(httpRequestOptions, (res) => {
  console.log(`Server response: ${res.statusCode}`)
})

createReadStream(filename)
  .pipe(createGzip())
  .pipe(monitor)
  .pipe(createCipheriv('aes192', secret, iv))
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent')
  })
