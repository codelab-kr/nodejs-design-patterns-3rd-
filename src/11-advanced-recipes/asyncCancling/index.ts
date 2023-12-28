import { asyncRoutine } from "./asyncRoutine";
import { CancelError } from "./cancelError";

async function canclable (cancleObj) {
  const resA = await asyncRoutine('A')
  console.log(resA)
  if (cancleObj.cancleRequested) {
    throw new CancelError()
  }
  const resB = await asyncRoutine('B')
  console.log(resB)
  if (cancleObj.cancleRequested) {
    throw new CancelError()
  }

  const resC = await asyncRoutine('C')
  console.log(resC)
}

const cancleObj = { cancleRequested: false }
canclable(cancleObj).catch((err) => {
  if (err instanceof CancelError) {
    console.log('Operation canceled')
  } else {
    console.error(err)
  }
})

setTimeout(() => {
  cancleObj.cancleRequested = true
}, 150)