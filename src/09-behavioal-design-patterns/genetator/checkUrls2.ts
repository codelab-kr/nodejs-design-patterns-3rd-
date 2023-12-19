import superAgent from 'superagent'

export class CheckUrls {
  urls: string[]
  constructor(urls: string[]) {
    this.urls = urls
  }

  async *[Symbol.asyncIterator]() {
    for (const url of this.urls) {
      try {
        const CheckResult = await superAgent.head(url).redirects(2)
        yield `${url} is up, status: ${CheckResult.status}`
      } catch (error) {
        yield `${url} is down, error: ${(error as any).message}`
      }
    }
  }
}
