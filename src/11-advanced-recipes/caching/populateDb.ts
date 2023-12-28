import nanoid from 'nanoid'
import { Level } from 'level'
import { join } from 'path'
import sub from 'subleveldown'

const db = new Level(join(__dirname, 'example-db')) as any
const salesDb = sub(db, 'sales', { valueEncoding: 'json' })
const products = ['book', 'game', 'app', 'song', 'movie']

async function populate() {
  for (let i = 0; i < 100000; i++) {
    await salesDb.put(nanoid(), {
      amount: Math.ceil(Math.random() * 100),
      product: products[Math.floor(Math.random() * 5)]
    })
  }

  console.log('DB populated')
}

populate()
