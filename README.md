# ipfs-transport-cliques
Simple investigation of the clique problem, for IPFS transport subgraphs, with a graph of nodes discovered by probelab crawlers

## Motivation

Mostly wondering how we can answer the question of: “If I enable X, Y, and Z transports, can I talk to the entire network” and “How much of the network can I *not* talk to if I don’t enable X transport?”

A metric/graph showing this information should help us more easily answer the question of browser-reachability, and will be valuable once webrtc is enabled.

I imagine we also want to see how many relay nodes are active, and which transports those peers enable bridging for, because the ability to communicate across transports will depend on specific relay peers, and if we only have a small number of those relays, it will mean more dependency on those relay nodes.
