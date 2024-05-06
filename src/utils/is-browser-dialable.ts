import type { MultiaddrInfo } from './multiaddr-info.js'

export function isBrowserDialable (multiaddrInfo: MultiaddrInfo): boolean {
  return multiaddrInfo.http ?? multiaddrInfo.https ?? multiaddrInfo.ws ?? multiaddrInfo.wss ?? multiaddrInfo.webtransport ?? multiaddrInfo.webrtc ?? multiaddrInfo.wrtcDirect ?? false
}
