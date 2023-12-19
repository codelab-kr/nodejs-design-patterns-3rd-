import { once } from 'events'
import { db1 as db } from './db1'

db.connect()

async function updateLastAeccess() {
  if (!db.connected) {
    console.log('Connecting to the database...')
    await once(db, 'connected')
    console.log('Connected!')
  }
  await db.query(`INSERT (${Date.now()}) INTO "LastAccess"`)
}

// updateLastAeccess().catch((err) => console.error(err))
setTimeout(() => {
  updateLastAeccess()
}, 600)
