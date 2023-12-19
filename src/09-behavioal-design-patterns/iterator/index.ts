import { Matrix } from './matrix'

const matrix2x2 = new Matrix([
  [11, 12],
  [21, 22]
])

const iterator = matrix2x2[Symbol.iterator]()
let iteratorResult = iterator.next()
while (!iteratorResult.done) {
  console.log(iteratorResult.value)
  iteratorResult = iterator.next()
}

for (const val of matrix2x2) {
  console.log(val)
}

const flattenedMatrix = [...matrix2x2]
console.log(flattenedMatrix)

const [one, two, three, four] = matrix2x2
console.log(one, two, three, four)
