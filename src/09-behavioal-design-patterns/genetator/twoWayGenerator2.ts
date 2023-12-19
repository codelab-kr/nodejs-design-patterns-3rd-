function* twoWayGenerator2() {
  try {
    const what = yield null
    yield 'hello' + what
  } catch (err: any) {
    yield 'Hello error:' + err.message
  }
}

console.log('Using throw(): ')
const twoWayException = twoWayGenerator2()
twoWayException.next()
console.log(twoWayException.throw(new Error('Something went wrong')))

console.log('Using return(): ')
const twoWayReturn = twoWayGenerator2()
console.log(twoWayReturn.return('world' as any))