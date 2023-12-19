import superagent from 'superagent'

export class Invoker {
  private history: any[] = []

  constructor() {
    this.history = []
  }

  run(cmd: any) {
    this.history.push(cmd)
    cmd.run()
  }

  undo() {
    const cmd = this.history.pop()
    cmd.undo()
    console.log('Command undone', cmd.serialize())
  }

  delay(cmd: any, delay: number) {
    setTimeout(() => {
      console.log('Executing delayed command', cmd.serialize())
      this.run(cmd)
    }, delay)
  }

  async runRemotely(cmd: any) {
    await superagent
      .post('http://localhost:3000/cmd')
      .send({ json: cmd.serialize() })
    console.log('Command executed remotely', cmd.serialize())
  }
}
