// interface IpfsNode {
//   peer_id: string
//   agent_version: string
//   maddr: string
// }

// function parseMultiaddr (maddr: string): string[] {
//   // Parse multiaddr and extract transport type
//   const components = maddr.split('/')
//   return components.map(component => component.split('/')[1]) // Extract transport type
// }

// function analyzeTransportSupport (nodes: IpfsNode[], enabledTransports: string[]): void {
//   const unsupportedNodes: IpfsNode[] = []
//   const disabledTransportImpact: IpfsNode[] = []

//   nodes.forEach(node => {
//     const transports = parseMultiaddr(node.maddr)

//     // Check if any of the enabled transports are supported
//     const supportsEnabledTransport = transports.some(transport => enabledTransports.includes(transport))

//     if (!supportsEnabledTransport) {
//       unsupportedNodes.push(node)
//     }

//     // Check if disabling X transport impacts communication
//     if (!transports.includes('X') && enabledTransports.includes('X')) {
//       disabledTransportImpact.push(node)
//     }
//   })

//   const networkCoverage = unsupportedNodes.length === 0 ? 'Entire network' : 'Partial network'
//   console.log(`With transports ${enabledTransports.join(', ')}, can communicate with: ${networkCoverage}`)

//   console.log(`Nodes impacted by disabling X transport: ${disabledTransportImpact.map(node => node.peer_id).join(', ')}`)
// }

// // Example usage
// const nodes: IpfsNode[] = [
//   { peer_id: 'node1', agent_version: 'v1.0', maddr: '/ip4/127.0.0.1/tcp/4001' },
//   { peer_id: 'node2', agent_version: 'v2.0', maddr: '/ip6/::1/tcp/4001' }
//   // Add more nodes...
// ]

// const enabledTransports = ['tcp', 'udp'] // Enable transports X, Y, and Z
// analyzeTransportSupport(nodes, enabledTransports)
