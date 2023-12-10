import { createReadStream } from 'fs'
import { parse } from 'csv-parse'
import { FilterByCountry } from './filter-by-country'
import { SumProfit } from './sum-profit'
import path from 'path'

const csvParser = parse({ columns: true, delimiter: ',' })

createReadStream(path.join(__dirname, 'data.csv'))
  .pipe(csvParser)
  .pipe(new FilterByCountry('Italy'))
  .pipe(new SumProfit())
  .pipe(process.stdout)
