import { expect } from 'chai'
import { ethers, time } from 'hardhat'

import { deploy, useContracts } from '@/test'
import { BigNumber } from 'ethers'

describe('Token', () => {
  beforeEach(async () => await deploy())
  it('should be correct totalSupply', async () => {
    const { token } = await useContracts()
    const [deployer] = await ethers.getSigners()
    expect(await token.balanceOf(deployer.address)).eq(
      BigNumber.from('21000000').mul('100000000')
    )
  })
  it('should be correct decimals', async () => {
    const { token } = await useContracts()
    expect(await token.decimals()).eq(8)
  })
})
