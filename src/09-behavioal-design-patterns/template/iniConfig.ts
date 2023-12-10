import { ConfigTemplate } from './configTamplate'
import ini from 'ini'

export class IniConfig extends ConfigTemplate {
  _serialize(data: any) {
    return ini.stringify(data)
  }
  _deserialize(data: any) {
    return ini.parse(data)
  }
}
