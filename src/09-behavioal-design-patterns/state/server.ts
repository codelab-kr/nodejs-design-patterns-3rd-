import jsonOverTcp from 'json-over-tcp-2'

const server = jsonOverTcp.createServer({ port: 3002 })
server.on('connection', (socket) => {
  console.log('Someone connected to the server')
  socket.on('data', (data) => {
    console.log('Client says:', data)
  })
})

server.listen(3002, () => console.log('Server Started'))
