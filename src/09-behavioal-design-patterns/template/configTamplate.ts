import { promises as fs } from 'fs'
import objectPath from 'object-path'

export class ConfigTemplate {
  data: any
  async load(file: string) {
    console.log(`Deserializing from ${file}`)
    this.data = this._deserialize(await fs.readFile(file, 'utf-8'))
  }

  async save(file: string) {
    console.log(`Serializing to ${file}`)
    await fs.writeFile(file, this._serialize(this.data) as any, 'utf-8')
  }

  get(path: string) {
    return objectPath.get(this.data, path)
  }

  set(path: string, value: any) {
    return objectPath.set(this.data, path, value)
  }

  _serialize(data?: any) {
    throw new Error('_serialize() must be implemented')
  }

  _deserialize(data?: any) {
    throw new Error('_deserialize() must be implemented')
  }
}
