import { join } from 'path'
import { Level } from 'level'
import { levelSubscribe } from './level-subscribe'

const dbPath = join(__dirname, 'db')
const db = new Level(dbPath, { valueEncoding: 'json' }) as any
levelSubscribe(db)

db.subscribe({ doctype: 'tweet', language: 'en' }, (k, val) => {
  console.log(val)
})

db.put('1', { doctype: 'tweet', text: 'Hi', language: 'en' })
db.put('2', { doctype: 'company', name: 'ACME Co.' })
