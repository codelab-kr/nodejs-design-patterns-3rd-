export class Matrix {
  data: number[][]

  constructor(inMatrix: number[][]) {
    this.data = inMatrix
  }

  get(row: number, column: number) {
    if (row > this.data.length || column > this.data[0].length) {
      throw new Error('Out of bounds')
    }
    return this.data[row][column]
  }

  set(row: number, column: number, value: number) {
    if (row > this.data.length || column > this.data[0].length) {
      throw new Error('Out of bounds')
    }
    this.data[row][column] = value
  }

  [Symbol.iterator]() {
    let nextRow = 0
    let nextCol = 0

    return {
      next: () => {
        if (nextRow === this.data.length) {
          return { done: true }
        }
        const currVal = this.data[nextRow][nextCol]

        if (nextCol === this.data[nextRow].length - 1) {
          nextRow++
          nextCol = 0
        } else {
          nextCol++
        }

        return { value: currVal }
      }
    }
  }
}
