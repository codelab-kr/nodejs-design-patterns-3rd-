import { Url } from "./url"

export class UrlBuilder {
  // private protocol: string = ''
  // private username: string = ''
  // private password: string = ''
  // private hostname: string = ''
  // private port: number = 0
  // private pathname: string = ''
  // private params: string[] = []
  // private hash: string = ''

  setProtocol(protocol) {
    this.protocol = protocol
    console.log(this)
    return this
  }

  setAuthentication(username, password) {
    this.username = username
    this.password = password
    return this
  }

  
  setHostname(hostname) {
    this.hostname = hostname
    return this
  }

  setPort(port) {
    this.port = port
    return this
  }

  setPathname(pathname) {
    this.pathname = pathname
    return this
  }

  setParams(params) {
    this.params = params
    return this
  }

  setHash(hash) {
    this.hash = hash
    return this
  }

  

  build() {
    return new Url(
      this.protocol,
      this.username,
      this.password,
      this.hostname,
      this.port,
      this.pathname,
      this.params,
      this.hash
    )
  }
}


