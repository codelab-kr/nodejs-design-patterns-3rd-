import { createServer } from 'http'
// import { totalSales } from './totalSales'
// import { totalSales } from './totalSalesBatch'
import { totalSales } from './totalSalesCache'

createServer(async (req, res) => {
  const url = new URL(req.url as string, 'http://localhost')
  const product = url.searchParams.get('product')
  console.log(`Processing query: ${url.search}`)

  const sum = await totalSales(product)

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  res.end(
    JSON.stringify({
      product,
      sum
    })
  )
}).listen(8000, () => console.log('Server started'))
