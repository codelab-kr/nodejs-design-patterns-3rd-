var Person = function (name) {
  var _name = name
  Person.prototype.getName = function () {
    return _name
  }
}

var p = new Person('zhangsan')
// console.log(p.__proto__ === Person.prototype)
// console.log(p.__proto__.getName())


var Person2 = function (name) {
  this._name = name
}

Person2.prototype.getName = function () {
  return this._name
}

var p2 = new Person2('zhangsan')
console.log(Person2.prototype)
console.log(p2.getName())