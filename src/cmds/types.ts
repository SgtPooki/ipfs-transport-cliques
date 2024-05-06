import type { Argv, Defined } from 'yargs'

export interface GlobalArgs {
  csv: string
}
export type Args = Argv<Defined<GlobalArgs, 'csv'>>
