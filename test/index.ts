import type { BitconeyToken } from '@/typechain'
import { deployments, ethers } from 'hardhat'

export const useContracts = async () => {
  return {
    token: await ethers.getContract<BitconeyToken>('BitconeyToken'),
  }
}

export const deploy = deployments.createFixture(() =>
  deployments.fixture(undefined, { keepExistingDeployments: true })
)
