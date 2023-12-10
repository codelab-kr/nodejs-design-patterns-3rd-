import { StackCalculator } from './stackCalculator'
import { SafeCalculator } from './safeCalculator'
// import { createSafeCalculator } from './createSafeCalculator'
// import { patchToSafeCalculator } from './patchToSafeCalculator'
import { createSafeCalculatorProxy } from './safeCaluratorHandler'

const calulator = new StackCalculator()
const safeCalculator = new SafeCalculator(calulator)
// const safeCalculator2 = createSafeCalculator(calulator)
// const patchedSafeCalculator = patchToSafeCalculator(calulator)
const safeCalculatorProxy = createSafeCalculatorProxy(calulator)

calulator.putValue(3)
calulator.putValue(2)
console.log(calulator.multiply())

safeCalculator.putValue(2)
console.log(calulator.multiply())

// calulator.putValue(0)
// console.log(calulator.divide())

// safeCalculator.clear()
// safeCalculator.putValue(4)
// safeCalculator.putValue(0)
// console.log(safeCalculator.divide())

// safeCalculator2.clear()
// safeCalculator2.putValue(4)
// safeCalculator2.putValue(0)
// console.log(safeCalculator2.divide())

// patchedSafeCalculator.clear()
// patchedSafeCalculator.putValue(4)
// patchedSafeCalculator.putValue(0)
// console.log(patchedSafeCalculator.divide())

console.log(safeCalculatorProxy instanceof StackCalculator)

safeCalculatorProxy.clear()
safeCalculatorProxy.putValue(4)
safeCalculatorProxy.putValue(0)
console.log(safeCalculatorProxy.divide())
