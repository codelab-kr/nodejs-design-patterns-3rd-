import { createWriteStream } from 'fs'
import { createServer } from 'net'

function demultiplexChannel(
  source: NodeJS.ReadableStream,
  destinations: NodeJS.WritableStream[]
) {
  let currentChannel = null
  let currentLength = null

  // 1
  source
    .on('readable', () => {
      let chunk: any
      // 2
      if (currentChannel === null) {
        chunk = source.read(1)
        currentChannel = chunk?.readUInt8(0)
      }

      // 3
      if (currentLength === null) {
        chunk = source.read(4)
        currentLength = chunk?.readUInt32BE(0)
        if (currentLength === null) {
          return
        }
      }

      chunk = source.read(currentLength) // 4
      if (chunk === null) {
        return
      }

      console.log(`Received packet from: ${currentChannel}`)
      destinations[currentChannel!].write(chunk) // 5

      currentChannel = null
      currentLength = null
    })
    // 6
    .on('end', () => {
      destinations.forEach((destination) => destination.end())
      console.log('Source channel closed')
    })
}

const server = createServer((socket) => {
  const stdoutStream = createWriteStream(`stdout.log`)
  const stderrStream = createWriteStream(`stderr.log`)
  demultiplexChannel(socket, [stdoutStream, stderrStream])
})
server.listen(3000, () => console.log('Server started'))
