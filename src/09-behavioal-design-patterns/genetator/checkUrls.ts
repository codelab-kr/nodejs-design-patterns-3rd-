import superAgent from 'superagent'

export class CheckUrls {
  urls: string[]
  constructor(urls: string[]) {
    this.urls = urls
  }
  [Symbol.asyncIterator]() {
    const urlsIterator = this.urls[Symbol.iterator]()

    return {
      async next() {
        const iteratorResult = urlsIterator.next()
        if (iteratorResult.done) {
          return { done: true }
        }
        const url = iteratorResult.value
        try {
          const CheckResult = await superAgent.head(url).redirects(2)
          return { value: `${url} is up, status: ${CheckResult.status}` }
        } catch (error) {
          return { value: `${url} is down, error: ${(error as any).message}` }
        }
      }
    }
  }
}


