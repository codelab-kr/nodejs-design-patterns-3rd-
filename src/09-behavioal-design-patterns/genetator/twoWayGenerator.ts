function* twoWayGenerator() {
  const what = yield null
  yield 'hello' + what
  console.log('what', what) // what undefined (x) -> 여기까지 도달하지 않는 듯
}

const twoWay = twoWayGenerator()
twoWay.next()
// console.log(twoWay.next()) // { value: null, done: false }
console.log(twoWay.next('world')) // { value: 'helloworld', done: false }
