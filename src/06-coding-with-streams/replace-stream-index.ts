import { ReplaceStream } from './replace-stream'

const replaceStream = new ReplaceStream('World', 'Node.js')
replaceStream.on('data', (chunk) => console.log('========', chunk.toString()))

console.log('hello W'.slice(-4))

replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.end()

// 'hello W'.slice(-4) // 'lo W' --> tail
// 'hello W'.slice(0, -4) // hel --> pieces

// 'lo World!'
