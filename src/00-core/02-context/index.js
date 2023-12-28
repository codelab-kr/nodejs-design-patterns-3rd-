var a = 1
var outer22 = function () {
  var b = 2
  var inner = function () {
    console.log(b)
    debugger
  }
  inner()
}
outer()
