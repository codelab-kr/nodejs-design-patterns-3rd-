import { ConfigTemplate } from "./configTamplate"

export class JsonConfig extends ConfigTemplate {
    _serialize(data: any) {
        return JSON.stringify(data, null, ' ')
    }
    _deserialize(data: any) {
        return JSON.parse(data)
    }
}