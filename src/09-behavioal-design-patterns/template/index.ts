import { IniConfig } from './iniConfig'
import { JsonConfig } from './jsonConfig'

async function main() {
  const jsonConfig = new JsonConfig()
  await jsonConfig.load('src/09-behavioal-design-patterns/template/conf.json')
  jsonConfig.set('book.nodejs', 'design patterns')
  await jsonConfig.save(
    'src/09-behavioal-design-patterns/template/conf_mod.json'
  )
  console.log(jsonConfig.get('book'))

  const iniConfig = new IniConfig()
  await iniConfig.load('src/09-behavioal-design-patterns/template/conf.ini')
  iniConfig.set('book.nodejs', 'design patterns')
  await iniConfig.save('src/09-behavioal-design-patterns/template/conf_mod.ini')
  console.log(iniConfig.get('book'))
}

main()
