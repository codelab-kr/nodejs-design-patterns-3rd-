export function createObservable ( target: any, observer: any) {
  const observerable = new Proxy(target, {
    set (obj: any, prop: string, value: any) {
      if ( value !== obj[prop]) {
        const prev = obj[prop]
        obj[prop] = value
        observer({ prop, prev, curr: value })
      }
      return true
    }
  })
  return observerable
}