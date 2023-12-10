import { PassThrough } from 'stream'

let bytesWhitten = 0
export const monitor = new PassThrough()
monitor.on('data', (chunk) => {
  bytesWhitten += chunk.length
})
monitor.on('finish', () => {
  console.log(`Bytes written: ${bytesWhitten}`)
})

// monitor.write('Hello World')
// monitor.write('Hello World')
// monitor.write('Hello World')
// monitor.end()
