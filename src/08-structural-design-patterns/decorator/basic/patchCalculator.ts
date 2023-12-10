import { StackCalculator } from '../../proxy/calcurator/stackCalculator'

function patchCalculator(calculator: any) {
  calculator.add = function () {
    const addend2 = this.getValue()
    const addend1 = this.getValue()
    const result = addend1! + addend2!
    this.putValue(result)
    return result
  }

  const divideOrig = calculator.divide
  calculator.divide = function () {
    const divisor = this.peekValue()
    if (divisor === 0) {
      throw Error('Division by zero')
    }
    return divideOrig.apply(calculator)
  }

  return calculator
}

const calculator = new StackCalculator()
const patchedCalculator = patchCalculator(calculator)

patchedCalculator.putValue(4)
patchedCalculator.putValue(3)
console.log(patchedCalculator.add())
patchedCalculator.putValue(2)
console.log(patchedCalculator.multiply())
