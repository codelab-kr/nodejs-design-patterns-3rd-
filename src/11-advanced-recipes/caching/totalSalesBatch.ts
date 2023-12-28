import { totalSales as totalSalesRaw } from './totalSales'

const runningRequests = new Map()

export async function totalSales(product) {
  console.log('runningRequests', runningRequests) 
  
  if (runningRequests.has(product)) {
    console.log('Batching')
    return runningRequests.get(product)
  }

  const resultPromise = totalSalesRaw(product)
  runningRequests.set(product, resultPromise)
  console.log('runningRequests', runningRequests) 
  resultPromise.finally(() => {
    console.log('finally')
    runningRequests.delete(product)
  })

  return resultPromise
}
