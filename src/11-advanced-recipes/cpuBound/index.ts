import { createServer } from 'http'
// import { SubsetSum } from './subsetSum'
// import { SubsetSum } from './subsetSumDefer'
// import { SubsetSum } from './subsetSumFork'
import { SubsetSum } from './subsetSumThreads'

createServer((req, res) => {
  const url = new URL(req.url as string, `http://localhost`)
  if (url.pathname !== '/subsetSum') {
    res.writeHead(200)
    return res.end("I'm alive!\n")
  }
  const data = JSON.parse(url.searchParams.get('data') as string)
  const sum = JSON.parse(url.searchParams.get('sum') as string)
  res.writeHead(200)
  const subsetSum = new SubsetSum(sum, data)

  subsetSum.on('match', (match) =>
    res.write(`Match: ${JSON.stringify(match)}\n`)
  )
  subsetSum.on('end', () => res.end('End'))
  subsetSum.start()
}).listen(8000, () => {
  console.log('Server Started')
})
