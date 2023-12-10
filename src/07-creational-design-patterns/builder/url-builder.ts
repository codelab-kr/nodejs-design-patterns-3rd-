import { Url } from "./url"

export class UrlBuilder {
  private protocol: string = ''
  private username: string = ''
  private password: string = ''
  private hostname: string = ''
  private port: number = 0
  private pathname: string = ''
  private params: string[] = []
  private hash: string = ''

  setProtocol(protocol: string) {
    this.protocol = protocol
    return this
  }

  setAuthentication(username: string, password: string) {
    this.username = username
    this.password = password
    return this
  }

  
  setHostname(hostname: string) {
    this.hostname = hostname
    return this
  }

  setPort(port: number) {
    this.port = port
    return this
  }

  setPathname(pathname: string) {
    this.pathname = pathname
    return this
  }

  setParams(params: string[]) {
    this.params = params
    return this
  }

  setHash(hash: string) {
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


