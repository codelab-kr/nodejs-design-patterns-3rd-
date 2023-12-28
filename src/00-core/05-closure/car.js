// var car = {
//   fuel: Math.ceil(Math.random() * 10 + 10),
//   power: Math.ceil(Math.random() * 3 + 2),
//   moved: 0,
//   run: function () {
//     var km = Math.ceil(Math.random() * 6)
//     var wasteFuel = km / this.power
//     if (this.fuel < wasteFuel) {
//       console.log('이동불가')
//       return
//     }
//     this.fuel -= wasteFuel
//     this.moved += km
//     console.log(km + 'km 이동 (총 ' + this.moved + 'km)')
//   }
// }

var createCar = function (name) {
  var fuel = Math.ceil(Math.random() * 10 + 10)
  var power = Math.ceil(Math.random() * 3 + 2)
  var moved = 0
  console.log(name, 'fuel: ' + fuel, 'power: ' + power)
  var publicMembers = {
    name: name,
    get moved() {
      return moved
    },
    run: function () {
      var km = Math.ceil(Math.random() * 6)
      var wasteFuel = km / power
      if (fuel < wasteFuel) {
        console.log('이동불가')
        return
      }
      fuel -= wasteFuel
      moved += km
      console.log(
        `[${name}]`,
        km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel
      )
    }
  }
  return Object.freeze(publicMembers)
}

var car1 = createCar('car1')
var car2 = createCar('car2')
console.log(car1)
car1.run()
car2.run()
car2.run()
car1.run()
