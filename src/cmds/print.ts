import { getParser } from '../utils/csv.js'
import { logger } from '../utils/logger.js'
import type { GlobalArgs } from './types.js'
import type { BuilderCallback } from 'yargs'

const log = logger.forComponent('cmd-print')

export interface PrintArgs extends GlobalArgs {
  limit: number
  start: number
}

export const description = 'print records from the CSV file'

export const builder: BuilderCallback<GlobalArgs, PrintArgs> = (yargv) => {
  return yargv.option('limit', {
    default: 5,
    describe: 'Limit the number of records to print',
    type: 'number'
  })
    .demandOption('limit')
    .option('start', {
      default: 0,
      describe: 'Start printing from this record',
      type: 'number'
    })
}

export const handler = async (argv: PrintArgs): Promise<void> => {
  await printRecords(argv)
}

async function printRecords (argv: PrintArgs): Promise<void> {
  log('Printing records from %s', argv.csv)
  log.trace('verbose test')
  // const csvReadStream = createReadStream(argv.csv)
  const parser = getParser(argv.csv)

  if (argv.start > 0) {
    log(`Skipping the first ${argv.start} records`)
  }

  let count = 0
  for await (const record of parser) {
    if (count < argv.start) {
      count++
      continue
    }

    process.stdout.write(`Item ${count++}: ${record.join(',')}\n`)

    if (count > argv.limit + argv.start) {
      log.trace('Reached limit of %d records', argv.limit)
      break
    }
  }
  log('No more records to print')
}
