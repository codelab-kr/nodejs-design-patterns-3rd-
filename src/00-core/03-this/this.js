
var obj22 = {
  outer: function() {
    // console.log('1', this)
    // console.log('2', this === obj22)

    var innerFunc = function() {
      // console.log('3', this)
      // console.log('4', this === obj2)
      // console.log('5', globalThis)
    }
    innerFunc()

    var obj2 = {
      innerMethod: innerFunc
    }
    obj2.innerMethod()
}}
// obj22.outer()
// console.log('6', globalThis)
var outer33 = function() {
    console.log('1', this)
    // console.log('2', this === obj22)
}
outer33()