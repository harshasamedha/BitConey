export const chainIds = {
  localhost: 31337,
  eth_mainnet: 1,
  bsc_mainnet: 56,
  polygon_mainnet: 137,
  avax_mainnet: 43114,
  ftm_mainnet: 250,
  arbitrum_mainnet: 42161,

  eth_mainnet_remote: 100001,
  bsc_mainnet_remote: 1000056,
  polygon_mainnet_remote: 10000137,
  avax_mainnet_remote: 1000043114,
  ftm_mainnet_remote: 10000250,
  arbitrum_mainnet_remote: 1000042161,

  rinkeby: 4,
  ropsten: 3,
  goerli: 5,
  bsc_testnet: 97,
  polygon_testnet: 80001,
  avax_testnet: 43113,
  ftm_testnet: 4002,
  arbitrum_testnet: 421611,

  rinkeby_remote: 100004,
  ropsten_remote: 100003,
  goerli_remote: 100005,
  bsc_testnet_remote: 1000097,
  polygon_testnet_remote: 1000080001,
  avax_testnet_remote: 1000043113,
  ftm_testnet_remote: 100004002,
  arbitrum_testnet_remote: 10000421611,
}

export const remoteChainIds = {
  eth_mainnet_remote: 100001,
  bsc_mainnet_remote: 1000056,
  polygon_mainnet_remote: 10000137,
  avax_mainnet_remote: 1000043114,
  ftm_mainnet_remote: 10000250,
  arbitrum_mainnet_remote: 1000042161,

  rinkeby_remote: 100004,
  ropsten_remote: 100003,
  goerli_remote: 100005,
  bsc_testnet_remote: 1000097,
  polygon_testnet_remote: 1000080001,
  avax_testnet_remote: 1000043113,
  ftm_testnet_remote: 100004002,
  arbitrum_testnet_remote: 10000421611,
}
export type ChainTag = keyof typeof chainIds
export type RemoteChainTag = keyof typeof remoteChainIds

export type RpcFunction = (chainTag: ChainTag) => string

const APIS = ['ETH', 'BSC', 'POLYGON', 'AVAX', 'FTM', 'ARBITRUM'] as const

export type GotBitConfig = {
  rpc: RpcFunction
  API?: Partial<Record<typeof APIS[number], string>>
  PRIVATE?: {
    TEST?: string[]
    MAIN?: string[]
  }
}

export function defineConfig(config: GotBitConfig) {
  return config
}
