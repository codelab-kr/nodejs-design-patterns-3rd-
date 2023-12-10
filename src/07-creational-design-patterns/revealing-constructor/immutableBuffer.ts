const MODIFIER_NAMES = ['swap', 'write', 'fill']

export class ImmutableBuffer {
  constructor(size: any, executor: any) {
    const buffer = Buffer.alloc(size)
    const modifiers = {}
    for (const prop in buffer) {
      if (typeof buffer[prop] !== 'function') {
        continue
      }
      if (MODIFIER_NAMES.some((name) => prop.startsWith(name))) {
        // modifiers[prop] = (buffer[prop] as any).bind(buffer)
        modifiers[prop] = (...args: any[]) => (buffer[prop] as any)(...args)
      } else {
        // this[prop] = (buffer[prop] as any).bind(buffer)
        this[prop] = (...args: any[]) => (buffer[prop] as any)(...args)
      }
    }
    executor(modifiers)
  }
}
