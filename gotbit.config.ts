import { defineConfig } from '@/gotbit-tools/hardhat/config'
import { ankrRpc, defaultRpc } from '@/gotbit-tools/hardhat/rpc'

export const config = defineConfig({
  rpc: defaultRpc(),
  PRIVATE: {
    TEST: process.env.PRIVATE_TEST ? process.env.PRIVATE_TEST?.split(',') : [],
    MAIN: process.env.PRIVATE_MAIN ? process.env.PRIVATE_MAIN?.split(',') : [],
  },
  API: {
    ETH: process.env.API_ETH,
    BSC: process.env.API_BSC,
    POLYGON: process.env.API_POLYGON,
    AVAX: process.env.API_AVAX,
    FTM: process.env.API_FTM,
    ARBITRUM: process.env.API_ARBITRUM,
  },
})
