import { Config  } from './config'
import { jsonStrategy, iniStrategy } from './strategies'

async function main() {
  const iniConig = new Config(iniStrategy)
  await iniConig.load('src/09-behavioal-design-patterns/strategy-pattern/conf.ini')
  iniConig.set('book.nodejs', 'design patterns')
  await iniConig.save('src/09-behavioal-design-patterns/strategy-pattern/conf-modified.ini')

  const jsonConfig = new Config(jsonStrategy)
  await jsonConfig.load('src/09-behavioal-design-patterns/strategy-pattern/conf.json')
  jsonConfig.set('book.nodejs', 'design patterns')
  await jsonConfig.save('src/09-behavioal-design-patterns/strategy-pattern/conf-modified.json')
} 

main()