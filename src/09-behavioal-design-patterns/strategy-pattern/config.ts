import { promises as fs } from 'fs'
import objectPath from 'object-path'

export class Config {
  private data: object
  private formatStrategy: any
  constructor(formatStrategy) {
    this.data = {}
    this.formatStrategy = formatStrategy
  }

  get(configPath: string) {
    return objectPath.get(this.data, configPath)
  }

  set(configPath: string, value: string) {
    return objectPath.set(this.data, configPath, value)
  }

  async load(filepath: string) {
    console.log(`Deserializing from ${filepath}`)
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filepath, 'utf-8')
    )
  }

  async save(filepath: string) {
    console.log(`Serializing to ${filepath}`)
    await fs.writeFile(
      filepath,
      this.formatStrategy.serialize(this.data),
      'utf-8'
    )
  }
}
