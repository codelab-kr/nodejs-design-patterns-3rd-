import { UrlBuilder } from './url-builder'

const url = new UrlBuilder()
  .setProtocol('https')
  .setAuthentication('user', 'pass')
  .setHostname('www.google.com')
  .setPathname('/search')
  .setParams(['q=design+patterns'])
  .build()

console.log(url.toString())
