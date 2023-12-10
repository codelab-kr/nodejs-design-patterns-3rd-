import { ImmutableBuffer } from './immutableBuffer'

const hello = 'Hello!'
const immutable = new ImmutableBuffer(hello.length, ({ write }) =>
  write(hello)
) as any

console.log(String.fromCharCode(immutable.readUInt8(0)))

// immutable.write('World!')
