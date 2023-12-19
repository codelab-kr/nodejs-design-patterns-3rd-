import { CheckUrls } from './checkUrls'

async function main() {
  const checkUrls = new CheckUrls([
    'https://www.naver.com',
    'https://www.google.com',
    'https://www.daum.net',
    'https://www.bing.com',
    'https://www.something.com'
  ])

  for await (const checkResult of checkUrls) {
    console.log(checkResult)
  }
}

main()
