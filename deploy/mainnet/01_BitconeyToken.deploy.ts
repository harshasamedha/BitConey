import { ethers } from 'hardhat'
import type { DeployFunction } from 'hardhat-deploy/types'

import { wrapperHRE } from '@/gotbit-tools/hardhat'
import type { BitconeyToken__factory } from '@/typechain'

const func: DeployFunction = async (hre) => {
  const { deploy } = wrapperHRE(hre)
  const [deployer] = await ethers.getSigners()

  await deploy<BitconeyToken__factory>('BitconeyToken', {
    from: deployer.address,
    args: ['BITCONEY', 'BITCONEY'],
    log: true,
  })
}
export default func

func.tags = ['BitconeyToken.deploy']
