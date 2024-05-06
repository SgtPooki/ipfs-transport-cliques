import { accessSync, constants } from 'node:fs'
import { resolve } from 'node:path'
import yargs from 'yargs'
import * as defaultCmd from './cmds/default.js'
import * as printCmd from './cmds/print.js'
import { enableDebugLog, enableVerboseLog, logger } from './utils/logger.js'

const log = logger.forComponent('cli')

export const argv = yargs(process.argv.slice(2))
  .middleware((argv) => {
    // check for debug/verbose and enable logging as appropriate
    if (argv.debug === true) {
      enableDebugLog()
      log('Debug logging enabled')
    } else if (argv.verbose === true) {
      enableVerboseLog()
      log('Verbose logging enabled')
    }
  })
  .positional('csv', {
    describe: 'Path to the CSV file containing nodes information',
    type: 'string'
  })
  .demandOption('csv')
  .option('debug', { alias: 'd', type: 'boolean', default: false, description: 'Run in debug mode' })
  .option('verbose', { alias: 'v', type: 'boolean', default: false, description: 'Run in verbose mode' })
  .command('$0 [csv]', defaultCmd.description, defaultCmd.builder, defaultCmd.handler)
  .command('print [csv]', printCmd.description, printCmd.builder, printCmd.handler)
  .check((argv) => {
    log.trace('argv is %O', argv)
    if (argv.csv == null) {
      throw new Error('Argument check failed: csv is required')
    }
    // throw if not readable
    accessSync(resolve(process.cwd(), argv.csv), constants.R_OK)

    return true
  })
  .fail((msg, err, yargs) => {
    log.error('error parsing command line arguments. %s', msg, err)

    yargs.showHelp()

    process.exit(1)
  })
  .wrap(72)
  .help()
  .argv
