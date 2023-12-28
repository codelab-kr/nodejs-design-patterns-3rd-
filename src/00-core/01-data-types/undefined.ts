// ---- 자동으로 undefined를 부여하는 경우 ----
var aa
console.log('1', aa) // 값을 대입하지 않은 변수에 접근
// console.log(b) // ReferenceError: b is not defined

const objEx = { a: 1 }
console.log('2-1', objEx.b) // 존재하지 않는 프로퍼티에 접근 1

var arr = []
console.log('2-2', arr[0]) // 존재하지 않는 프로퍼티(여기서는 배열의 요소)에 접근 2

var func = function () {}
console.log('3', func()) // return 값이 없는 함수의 실행 결과

// ---- undefined와 배열 ----
var arr1 = []
console.log('4', arr1)
arr1.length = 3
console.log('5', arr1) // [ <3 empty items> ]

var arr2 = new Array(3)
console.log('6', arr2) // [ <3 empty items> ]

var arr3 = [undefined, undefined, undefined]
console.log('7', arr3) // [ undefined, undefined, undefined ]

// ---- 빈 요소와 배열의 순회 ----
var arr4 = [undefined, 1]
var arr5 = []
arr5[1] = 1

arr4.forEach(function (v, i) {
  console.log('8', v, i)
}) // undefined 0  / 1 1

arr5.forEach(function (v, i) {
  console.log('9', v, i)
}) // 1 1

const arr4Mapp = arr4.map(function (v, i) {
  return v + i
})
console.log('10', arr4Mapp) // [NaN, 2]

const arr5Mapp = arr5.map(function (v, i) {
  console.log('11', v, i) // 1 1
  return v + i
})
console.log('11', arr5Mapp) // [ < 1 empty item>, 2]

const arr4Filter = arr4.filter(function (v) {
  console.log('12', v) // undefined / 1
  return !v
})
console.log('12', arr4Filter) // [undefined]

const arr5Filter = arr5.filter(function (v) {
  console.log('13', v) // 1
  !v
})
console.log('13', arr5Filter) // []

var arr6 = [1, 2, 3]
const arr6reduce = arr6.reduce(function (p, c, i) {
  console.log('14', p, c, i) //  1 0 / 10 2 1 / 1021 3 2
  return p + c + i
}, '')
console.log('14', arr6reduce) // 102132

const arr4reduce = arr4.reduce(function (p, c, i) {
  console.log('15', p, c, i) //   undefined 0 / undefined0 1 1
  return p + c + i
}, '')
console.log('15', arr4reduce) // undefined011

const arr5reduce = arr5.reduce(function (p, c, i) {
  console.log('16', p, c, i) //   1 1
  return p + c + i
}, '')
console.log('16', arr5reduce) // 11

// ---- null, undefined 동등비교, 일치비교 ----
const n = null
console.log('17', typeof n) // object
console.log('18', n == undefined) // true (동등연산) - null, undefined 모두 값이 없음을 나타내는 특별한 값으로 동등비교 시 동등하다고 간주
console.log('19', n === undefined) // false (일치연산)
console.log('20', n == null) // true (동등연산)
console.log('21', n === null) // true (일치연산)

var a = 1
var outer = function () {
  var b = 2
  var inner = function () {
    console.dir(inner)
  }
  inner()
}
outer()
