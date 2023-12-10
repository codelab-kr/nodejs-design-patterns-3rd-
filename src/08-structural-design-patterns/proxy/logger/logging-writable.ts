export function createLogginWritable (writable: any) {
  return new Proxy(writable, {
    get (target: any, property: string, _receiver) {
      if (property === 'write') {
        return function (...args: any[]) {
          const [chunk] = args
          console.log('Writing ', chunk)
          return target.write(...args)
        }
      }
      return target[property]
    }
  })
}