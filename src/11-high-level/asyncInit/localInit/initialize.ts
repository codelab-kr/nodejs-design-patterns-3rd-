import { once } from 'events'
import { db0 as db } from './db0'

async function initialize() {
  db.connect()
  await once(db, 'connected')
}

async function updateLastAeccess() {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccess"`)
}

initialize().then(() => {
  // updateLastAeccess()
  setTimeout(() => {
    updateLastAeccess()
  }, 600)
})
