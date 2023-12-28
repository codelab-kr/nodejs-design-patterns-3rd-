import { CancelError } from './cancelError'

export function createCancleWrapper() {
  let cancleRequested = false

  function cancel() {
    cancleRequested = true
  }

  function cancleWrapper(func, ...args) {
    if (cancleRequested) {
      throw Promise.reject(new CancelError())
    }
    return func(...args)
  }

  return { cancleWrapper, cancel }
}
