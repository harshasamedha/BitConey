import { ContractFactory } from 'ethers'
import { DeployFunction, DeployOptions } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'

import { ChainTag, chainIds } from './misc'
import { node, types, Types } from './node'

import { config } from '@/gotbit.config'
import process, { exit } from 'process'

const parseConfig = (): {
  chains: Record<ChainTag, { keys?: string[]; api?: string }>
} => {
  return {
    chains: {
      localhost: {},
      eth_mainnet: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.ETH,
      },
      rinkeby: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ETH,
      },
      ropsten: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ETH,
      },
      goerli: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ETH,
      },
      bsc_mainnet: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.BSC,
      },
      bsc_testnet: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.BSC,
      },
      polygon_mainnet: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.POLYGON,
      },
      polygon_testnet: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.POLYGON,
      },
      avax_mainnet: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.AVAX,
      },
      avax_testnet: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.AVAX,
      },
      ftm_mainnet: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.FTM,
      },
      ftm_testnet: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.FTM,
      },
      arbitrum_mainnet: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.ARBITRUM,
      },
      arbitrum_testnet: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ARBITRUM,
      },

      eth_mainnet_remote: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.ETH,
      },
      rinkeby_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ETH,
      },
      ropsten_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ETH,
      },
      goerli_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ETH,
      },
      bsc_mainnet_remote: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.BSC,
      },
      bsc_testnet_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.BSC,
      },
      polygon_mainnet_remote: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.POLYGON,
      },
      polygon_testnet_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.POLYGON,
      },
      avax_mainnet_remote: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.AVAX,
      },
      avax_testnet_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.AVAX,
      },
      ftm_mainnet_remote: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.FTM,
      },
      ftm_testnet_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.FTM,
      },
      arbitrum_mainnet_remote: {
        keys: config.PRIVATE?.MAIN,
        api: config.API?.ARBITRUM,
      },
      arbitrum_testnet_remote: {
        keys: config.PRIVATE?.TEST,
        api: config.API?.ARBITRUM,
      },
    },
  }
}

export const genNetworks = () => {
  const networks = {} as { [key: string]: Object }
  const parsedConfig = parseConfig()

  for (const name of Object.keys(chainIds) as ChainTag[]) {
    if (parsedConfig.chains[name] === undefined) continue
    if (name === 'localhost') continue

    networks[name] = {
      chainId: node(name).chainId,
      url: node(name).rpc,
      accounts: parsedConfig.chains[name].keys,
      tags: [types[name]],
      deploy: [`deploy/${types[name]}/`],
      verify: {
        etherscan: {
          apiKey: parsedConfig.chains[name].api,
        },
      },
    }
  }

  return networks
}

export const genCompilers = (vers: string[]) =>
  vers.map((v) => ({
    version: v,
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  }))

export const wrapperHRE = (hre: HardhatRuntimeEnvironment) => {
  const { deployments } = hre
  const deploy = <Factory extends ContractFactory>(
    name: string,
    options: Omit<DeployOptions, 'args'> | { args: Parameters<Factory['deploy']> }
  ) => deployments.deploy(name, options as DeployOptions)
  return { ...hre, deploy }
}

export const exceptTypes = (...tags: Types[]) => {
  if (tags.length === 0) return async () => true
  return async (hre: HardhatRuntimeEnvironment) =>
    tags.some((tag) => !hre.network.tags[tag])
}

export const setup = (name: string, func: DeployFunction): DeployFunction => {
  return async (hre) => {
    process.stdout.write(`setuping "${name}" ... `)
    await func(hre)
    console.log(`setuped`)
  }
}

export const run = (name: string, f?: (...a: any) => Promise<any>) => {
  if (!f) {
    console.assert(false, 'Not implemented yet')
    exit(1)
  }

  process.stdout.write(`executing "${name}" ... `)
  f()
    .then(() => console.log('done'))
    .catch((e) => {
      console.error(e)
      process.exit(1)
    })
}
