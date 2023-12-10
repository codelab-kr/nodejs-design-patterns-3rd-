import { FailsafeSocket } from "./failsafeSocket"


const failSafeSocket = new FailsafeSocket({ port: 3002 })

setInterval(() => {
  failSafeSocket.send(process.memoryUsage())
}, 1000)
