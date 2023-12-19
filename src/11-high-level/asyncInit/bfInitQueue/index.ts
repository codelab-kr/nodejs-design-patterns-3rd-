import { db } from './db'

async function updateLastAeccess() {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccess"`)
}

updateLastAeccess().catch((err) => console.error(err))
