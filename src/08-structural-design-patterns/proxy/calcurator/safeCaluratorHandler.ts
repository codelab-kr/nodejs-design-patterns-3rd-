import { StackCalculator } from './stackCalculator'

const safeCalculatorHandler = {
  get: (target: any, property: string) => {
    if (property === 'divide') {
      return function () {
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw Error('Division by zero')
        }
        return target.divide()
      }
    }
    return target[property]
  }
}

export function createSafeCalculatorProxy(
  calculator: StackCalculator
): StackCalculator {
  return new Proxy(calculator, safeCalculatorHandler)
}
