import { asyncRoutine } from './asyncRoutine'
import { CancelError } from './cancelError'
import { createCancleWrapper } from './createCancleWrapper'

async function cancelable(cancleWrapper) {
  const resA = await cancleWrapper(asyncRoutine, 'A')
  console.log(resA)
  const resB = await cancleWrapper(asyncRoutine, 'B')
  console.log(resB)
  const resC = await cancleWrapper(asyncRoutine, 'C')
  console.log(resC)
}

const { cancleWrapper, cancel } = createCancleWrapper()

cancelable(cancleWrapper).catch((err) => {
  if (err instanceof CancelError) {
    console.log('Operation canceled')
  } else {
    console.error(err)
  }
})

setTimeout(() => {
  cancel()
}, 100)
