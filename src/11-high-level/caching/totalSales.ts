import { Level } from 'level'
import { join } from 'path'
import sub from 'subleveldown'

const db = new Level(join(__dirname, 'example-db')) as any
const salesDb = sub(db, 'sales', { valueEncoding: 'json' })

export async function totalSales(product) {
  const now = Date.now()
  let sum = 0
  for await (const transaction of salesDb.createValueStream()) {
    if (!product || (transaction as any).product === product) {
      sum += (transaction as any).amount
    }
  }

  console.log(`totalSales() took: ${Date.now() - now}ms`)

  return sum
}
