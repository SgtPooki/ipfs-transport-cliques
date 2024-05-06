Simple investigation of the clique problem, for IPFS transport subgraphs, with a graph of nodes discovered by probelab crawlers

## Motivation

Mostly wondering how we can answer the question of: “If I enable X, Y, and Z transports, can I talk to the entire network” and “How much of the network can I *not* talk to if I don’t enable X transport?”

A metric/graph showing this information should help us more easily answer the question of browser-reachability, and will be valuable once webrtc is enabled.

I imagine we also want to see how many relay nodes are active, and which transports those peers enable bridging for, because the ability to communicate across transports will depend on specific relay peers, and if we only have a small number of those relays, it will mean more dependency on those relay nodes.

# ipfs-transport-cliques

[![codecov](https://img.shields.io/codecov/c/github/SgtPooki/ipfs-transport-cliques.svg?style=flat-square)](https://codecov.io/gh/SgtPooki/ipfs-transport-cliques)
[![CI](https://img.shields.io/github/actions/workflow/status/SgtPooki/ipfs-transport-cliques/js-test-and-release.yml?branch=main\&style=flat-square)](https://github.com/SgtPooki/ipfs-transport-cliques/actions/workflows/js-test-and-release.yml?query=branch%3Amain)

> Simple investigation of the clique problem, for IPFS transport subgraphs, with a graph of nodes discovered by probelab crawlers

# Install

```console
$ npm i ipfs-transport-cliques
```

# Helpful commands


## JSON

You can output the json format of the CSV, with some additional data processing on multiaddrs for each Peer by using the `json` command

### Output json

```console
node dist/src/index.js json peerids_agents_transports.csv
```

You should probably save to json file so you don't have to re-parse the csv every time

```console
node dist/src/index.js json peerids_agents_transports.csv > peerids_agents_transports.json
```

### Use jq to count browser dialable peers

```console
node dist/src/index.js json peerids_agents_transports.csv | jq '[ .[] | select(.maddrInfo.isBrowserDialable == true) ] | length'
```

or save to json file (see above).. so you don't have to re-parse the csv every time

```console
jq '[ .[] | select(.maddrInfo.isBrowserDialable == true) ] | length' peerids_agents_transports.json
```

# License

Licensed under either of

- Apache 2.0, ([LICENSE-APACHE](https://github.com/SgtPooki/ipfs-transport-cliques/LICENSE-APACHE) / <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT ([LICENSE-MIT](https://github.com/SgtPooki/ipfs-transport-cliques/LICENSE-MIT) / <http://opensource.org/licenses/MIT>)

# Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
