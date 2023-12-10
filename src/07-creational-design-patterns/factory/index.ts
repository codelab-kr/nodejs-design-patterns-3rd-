import { createProfiler } from "./profiler";

function getAllFactors(intNumber: number) {
  const profiler = createProfiler(`Finding all factors for ${intNumber}`)
  profiler.start()
  const factors: number[] = []
  for (let factor = 2; factor <= intNumber; factor++) {
    while ((intNumber % factor) === 0) {
      factors.push(factor)
      intNumber /= factor
    }
  }
  profiler.end()
  return factors
}

const myNumber = process.argv[2]
const myFactors = getAllFactors(parseInt(myNumber))
console.log(`Factors for ${myNumber} are: `, myFactors)