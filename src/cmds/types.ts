import type { MultiaddrInfo } from '../utils/multiaddr-info.js'
import type { Argv, Defined } from 'yargs'

export interface GlobalArgs {
  csv: string
}
export type Args = Argv<Defined<GlobalArgs, 'csv'>>

export interface CsvRecord {
  '': string
  peer_id: string
  agent_version: string
  maddr: string
}

export interface JsonRecord extends Omit<CsvRecord, 'maddr'> {
  maddr: string[]
  maddrInfo: MultiaddrInfo
}
