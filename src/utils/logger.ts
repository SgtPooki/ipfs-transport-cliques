import { logger as lp2plogger, prefixLogger } from '@libp2p/logger'
import debug from 'debug'

/**
 * TODO: fix :trace logs not showing unless we set the DEBUG env var from the command line
 */
export function enableDebugLog (): void {
  debug.enable('*,*:trace')
}

export function enableVerboseLog (): void {
  debug.enable('ipfs-transport-cliques*')
}

export const log = lp2plogger('ipfs-transport-cliques')

export const logger = prefixLogger('ipfs-transport-cliques')
