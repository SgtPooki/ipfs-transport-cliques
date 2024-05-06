import type { GlobalArgs } from './types.js'
import type { BuilderCallback } from 'yargs'

export interface DefaultArgs extends GlobalArgs {
}

export const description = 'TODO description'

export const builder: BuilderCallback<GlobalArgs, DefaultArgs> = (yargv) => {
  return yargv
}

export const handler = async (argv: DefaultArgs): Promise<void> => {
  process.stdout.write('Not Implemented...')
}
