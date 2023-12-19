const METHODS_REQUEST_CONNECTION = ['query']
const deactivate = Symbol('deactivate')

export class QueringState {
  db: any
  commandsQueue: any[]

  constructor(db) {
    this.db = db
    this.commandsQueue = []

    METHODS_REQUEST_CONNECTION.forEach((methodName: string) => {
      this[methodName] = function (...args) {
        console.log(`Command queueed: ${methodName}(${args.join(', ')})`)
        return new Promise((resolve, reject) => {
          const command = () => {
            db[methodName](...args).then(resolve, reject)
          }
          this.commandsQueue.push(command)
        })
      }
    })
  }

  [deactivate]() {
    this.commandsQueue.forEach((command) => command())
    this.commandsQueue = []
  }
}
