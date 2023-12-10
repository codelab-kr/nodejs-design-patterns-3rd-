export class Url {
  constructor(
    private protocol: string,
    private username: string,
    private password: string,
    private hostname: string,
    private port: number,
    private pathname: string,
    private params: string[],
    private hash: string
  ) {
    this.protocol = protocol
    this.username = username
    this.password = password
    this.hostname = hostname
    this.port = port
    this.pathname = pathname
    this.params = params
    this.hash = hash

    this.validate()
  }

  private validate() {
    if (!this.protocol || !this.hostname) {
      throw new Error('Must specify a protocol and a hostname')
    }
  }

  toString() {
    let url = ''
    url += `${this.protocol}://`

    if (this.username && this.password) {
      url += `${this.username}:${this.password}@`
    }

    url += this.hostname

    if (this.port) {
      url += `:${this.port}`
    }

    if (this.pathname) {
      url += this.pathname
    }

    if (this.params.length) {
      url += this.params.join('&')
    }

    if (this.hash) {
      url += `#${this.hash}`
    }
    return url
  }
}
