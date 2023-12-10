import { StackCalculator } from '../../proxy/calcurator/stackCalculator'

const enhancedCalculatorHandler = {
  get: function (target: any, prop: string, _receiver: any) {
    if (prop === 'add') {
      return function () {
        const addend2 = target.getValue()
        const addend1 = target.getValue()
        const result = addend1 + addend2
        target.putValue(result)
        return result
      }
    } else if (prop === 'divide') {
      return function () {
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw Error('Division by zero')
        }
        return target.divide()
      }
    }

    return target[prop]
  }
}

function createEnhancedCalculatorProxy(calculator: StackCalculator): any {
  return new Proxy(calculator, enhancedCalculatorHandler)
}

const calculator = new StackCalculator()
const enhancedCalculator = createEnhancedCalculatorProxy(calculator)

enhancedCalculator.putValue(4)
enhancedCalculator.putValue(3)
console.log(enhancedCalculator.add())
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply())
enhancedCalculator.putValue(0)
console.log(enhancedCalculator.divide())
