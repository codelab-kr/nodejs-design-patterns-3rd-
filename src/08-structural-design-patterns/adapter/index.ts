import { Level } from "level"
import { createFSAdapter } from "./fs-adapter"
import { join } from "path"

const fs = createFSAdapter(new Level(join(__dirname, 'db'), { valueEncoding: 'binary' }))

fs.writeFile('test.txt', 'Hello World!', (err) => {
  fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(data)
  })
})

fs.readFile('mms.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
