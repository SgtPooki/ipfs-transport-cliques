import { createReadStream } from 'node:fs'
import { type Parser, parse } from 'csv-parse'
import { logger } from './logger.js'

const log = logger.forComponent('utils-csv')

export function getParser (csvPath: string): Parser {
  log.trace('Getting csv parser for %s', csvPath)

  const csvReadStream = createReadStream(csvPath)
  log.trace('Created read stream for %s', csvPath)

  return csvReadStream.pipe(parse())
}
