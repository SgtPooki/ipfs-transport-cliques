/* eslint-disable complexity */
import { multiaddr, type Multiaddr } from '@multiformats/multiaddr'
import * as maMatcher from '@multiformats/multiaddr-matcher'
import isIpPrivate from 'private-ip'
import { logger } from './logger.js'

const log = logger.forComponent('multiaddr-info')

export interface MultiaddrInfo {
  invalidMultiaddr?: boolean
  p2p?: boolean
  tcp?: boolean
  udp?: boolean
  relay?: boolean
  webrtc?: boolean
  wrtcDirect?: boolean
  ws?: boolean
  wss?: boolean
  webtransport?: boolean
  dns?: boolean
  dnsaddr?: boolean
  dns4?: boolean
  dns6?: boolean
  quic?: boolean
  quicv1?: boolean
  ipOrDomain?: boolean
  ip?: boolean
  ip4?: boolean
  ip6?: boolean
  isPrivateIp?: boolean
  peerId?: boolean
  http?: boolean
  https?: boolean
  isBrowserDialable?: boolean
}

export function isBrowserDialable (multiaddrInfo: MultiaddrInfo): boolean {
  if (multiaddrInfo.invalidMultiaddr ?? multiaddrInfo.isPrivateIp ?? false) {
    // not browser dialable if private IP or invalid multiaddr
    // NOTE: private IP is not necessarily not-browser-dialable, but we're assuming it is for now.
    return false
  }

  return multiaddrInfo.http ?? multiaddrInfo.https ?? multiaddrInfo.ws ?? multiaddrInfo.wss ?? multiaddrInfo.webtransport ?? multiaddrInfo.webrtc ?? multiaddrInfo.wrtcDirect ?? false
}

/**
 * Map a given multiaddr to it's identified transport protocol and other details necessary
 * for determining which subgraph/clique it belongs to.
 */
// export function multiaddrInfo (mAddr: string): { transport: string, details: string } {
export function multiaddrInfo (mAddr: string): MultiaddrInfo {
  log.trace('Getting multiaddr info for %s', mAddr)
  let ma: Multiaddr
  try {
    ma = multiaddr(mAddr)
  } catch (err) {
    // eslint-disable-next-line no-console
    log.error('Invalid multiaddr:', mAddr)
    return {
      invalidMultiaddr: true
    }
  }
  const results: MultiaddrInfo = {}

  if (maMatcher.P2P.exactMatch(ma)) {
    results.p2p = true
    // TODO: confirm if this is false, whether that means it's not dialable or an invalid multiaddr or what exactly.
  }

  if (maMatcher.TCP.exactMatch(ma)) {
    results.tcp = true
  }
  if (maMatcher.UDP.exactMatch(ma)) {
    results.udp = true // probably not necessary
  }

  if (maMatcher.Circuit.exactMatch(ma)) {
    // listening on a circuit relay, we need to find the listening addresses for the relay to determine the clique
    results.relay = true
  }

  if (maMatcher.WebRTC.exactMatch(ma)) {
    results.webrtc = true
  }
  if (maMatcher.WebRTCDirect.exactMatch(ma)) {
    results.wrtcDirect = true
  }
  if (maMatcher.WebSockets.exactMatch(ma)) {
    results.ws = true
  }
  if (maMatcher.WebSocketsSecure.exactMatch(ma)) {
    results.wss = true
  }
  if (maMatcher.WebTransport.exactMatch(ma)) {
    results.webtransport = true
  }

  if (maMatcher.QUIC.exactMatch(ma)) {
    results.quic = true
  }
  if (maMatcher.QUICV1.exactMatch(ma)) {
    results.quicv1 = true
  }

  if (maMatcher.IP_OR_DOMAIN.matches(ma)) {
    results.ipOrDomain = true
    if (maMatcher.IP.exactMatch(ma)) {
      results.ip = true
      results.isPrivateIp = isIpPrivate(ma.toOptions().host)

      if (maMatcher.IP4.matches(ma)) {
        results.ip4 = true
      }
      if (maMatcher.IP6.matches(ma)) {
        results.ip6 = true
      }
    } else if (maMatcher.DNS.matches(ma)) {
      results.dns = true
      if (maMatcher.DNSADDR.matches(ma)) {
        results.dnsaddr = true
      }
      if (maMatcher.DNS4.matches(ma)) {
        results.dns4 = true
      }
      if (maMatcher.DNS6.matches(ma)) {
        results.dns6 = true
      }
    }
  } else {
    results.peerId = true
  }

  if (maMatcher.HTTP.exactMatch(ma)) {
    results.http = true
  }

  if (maMatcher.HTTPS.exactMatch(ma)) {
    results.https = true
  }

  results.isBrowserDialable = isBrowserDialable(results)

  // TODO: remove this console.log
  // eslint-disable-next-line no-console
  // console.log(results)

  return results
}
