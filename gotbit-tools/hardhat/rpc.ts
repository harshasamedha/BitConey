import { ChainTag, RemoteChainTag, RpcFunction } from './utils/misc'
import { rpcs, extraRpcs } from './utils/node'

/** @deprecated */
export const moralisRpc = (moralisId: string): RpcFunction => {
  const moralisPath: Partial<Record<ChainTag, string>> = {
    localhost: '/',
    eth_mainnet: '/eth/mainnet',
    bsc_mainnet: '/bsc/mainnet',
    polygon_mainnet: '/polygon/mainnet',
    avax_mainnet: '/avalanche/mainnet',
    ftm_mainnet: '/fantom/mainnet',
    arbitrum_mainnet: '/arbitrum/mainnet',
    rinkeby: '/eth/rinkeby',
    ropsten: '/eth/ropsten',
    goerli: '/eth/goerli',
    bsc_testnet: '/bsc/testnet',
    polygon_testnet: '/polygon/mumbai',
    avax_testnet: '/avalanche/testnet',
    ftm_testnet: '/fantom/tesnet',
    arbitrum_testnet: '/arbitrum/testnet',
  }

  return (chainTag: ChainTag) =>
    'https://speedy-nodes-nyc.moralis.io/' + moralisId + moralisPath[chainTag]
}

export const defaultRpc = (): RpcFunction => {
  return (chainTag: ChainTag) => rpcs[chainTag]
}

export const ankrRpc = (): RpcFunction => {
  const ankrPath: Partial<Record<ChainTag, string>> = {
    avax_mainnet: '/avalanche',
    bsc_mainnet: '/bsc',
    arbitrum_mainnet: '/arbitrum',
    eth_mainnet: '/eth',
    ftm_mainnet: '/fantom',
    polygon_mainnet: '/polygon',

    avax_testnet: '/avalanche_fuji',
    polygon_testnet: '/polygon_mumbai',
    ftm_testnet: '/fantom_testnet',
    rinkeby: '/eth_rinkeby',
    ropsten: '/eth_ropsten',
    goerli: '/eth_goerli',
  }

  return (chainTag: ChainTag) => 'https://rpc.ankr.com' + ankrPath[chainTag] ?? ''
}

const goodRpcProvider = [ankrRpc()]

export const extraRpc = (indexes?: Partial<Record<ChainTag, number>>) => {
  return (chainTag: ChainTag) => {
    let index = 0
    if (indexes) {
      const possibleIndex = indexes[chainTag]
      if (possibleIndex !== undefined) index = possibleIndex
    }

    const rpcList = extraRpcs[chainTag]

    for (const goodRpc of goodRpcProvider) {
      const rpc = goodRpc(chainTag)
      if (rpc) rpcList.push(rpc)
    }

    return index < rpcList.length ? rpcList[index] : ''
  }
}

export const universalRpc = (): RpcFunction => {
  const ankr = ankrRpc()
  const default_ = defaultRpc()
  return (chainTag: ChainTag) => {
    const a: Record<ChainTag, string> = {
      avax_mainnet: ankr(chainTag),
      bsc_mainnet: ankr(chainTag),
      arbitrum_mainnet: ankr(chainTag),
      eth_mainnet: ankr(chainTag),
      ftm_mainnet: ankr(chainTag),
      polygon_mainnet: ankr(chainTag),

      avax_testnet: ankr(chainTag),
      polygon_testnet: ankr(chainTag),
      ftm_testnet: ankr(chainTag),
      rinkeby: ankr(chainTag),
      ropsten: ankr(chainTag),
      goerli: ankr(chainTag),

      arbitrum_testnet: default_(chainTag),
      bsc_testnet: default_(chainTag),
      localhost: default_(chainTag),

      eth_mainnet_remote: '',
      bsc_mainnet_remote: '',
      polygon_mainnet_remote: '',
      avax_mainnet_remote: '',
      ftm_mainnet_remote: '',
      arbitrum_mainnet_remote: '',
      rinkeby_remote: '',
      ropsten_remote: '',
      goerli_remote: '',
      bsc_testnet_remote: '',
      polygon_testnet_remote: '',
      avax_testnet_remote: '',
      ftm_testnet_remote: '',
      arbitrum_testnet_remote: '',
    }
    return a[chainTag]
  }
}

export const remoteRpc = (tags: Partial<Record<RemoteChainTag, string>>): RpcFunction => {
  return (chainTag: ChainTag) => {
    const remote = tags[chainTag as RemoteChainTag]
    if (remote) return remote
    return universalRpc()(chainTag)
  }
}
