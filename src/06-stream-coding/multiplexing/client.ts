import { fork } from 'child_process'
import { Socket, connect } from 'net'

function multiplexChannels(sources: any[], destination: Socket) {
  let openChannels = sources.length
  for (let i = 0; i < sources.length; i++) {
    sources[i]
      // 1
      .on('readable', function (this: any) {
        let chunk: any
        while ((chunk = this.read()) !== null) {
          const outBuff = Buffer.alloc(1 + 4 + chunk.length) // 2
          outBuff.writeUInt8(i, 0)
          outBuff.writeUInt32BE(chunk.length, 1)
          chunk.copy(outBuff, 5)
          console.log(`Sending packet to channel: ${i}`)
          destination.write(outBuff) // 3
        }
      })
      .on('end', () => {
        // 4
        if (--openChannels === 0) {
          destination.end()
        }
      })
  }
}

const socket = connect('3000', () => {
  const child = fork(process.argv[2], process.argv.slice(3), {
    silent: true
  })
  multiplexChannels([child.stdout, child.stderr], socket)
})
