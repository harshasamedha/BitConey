import { BigNumber, BigNumberish } from 'ethers'
import { ethers, deployments, time } from 'hardhat'
import { Token, Antisnipe, IUniswapV2Router02, AntisnipeToken } from '@/typechain'

export interface AntisnipeParameters {
  threshold: BigNumberish
  buyLimit: BigNumberish
  sellLimit: BigNumberish
  buyDelay: BigNumberish
  sellDelay: BigNumberish
  blacklist: boolean
}

export interface LockParameters {
  rateX1000: number
  unit: number
  unlockX1000: number
  unlockPeriod: number
  threshold: number
}

export interface BlacklistParameters {
  threshold: BigNumberish
  collectPeriod: BigNumberish
}

export interface Parameters {
  register: boolean
  token: string
  poolToken: string
  router: string
  pair: string
  lp: string
  salt: BigNumberish
  Antisnipe: AntisnipeParameters
  lock: LockParameters
  blacklist: BlacklistParameters
}

export interface InputParameters {
  poolToken: string
  router: string
  lp: string
  launch: number
  antisnipe: AntisnipeParameters
  lock: LockParameters
  blacklist: BlacklistParameters
  whitelists: string[]
}

export const mockInputParamaters = (
  poolToken: string,
  router: string,
  lp: string,
  salt: BigNumberish = '1'
): InputParameters => ({
  poolToken,
  router,
  lp: hash(lp, salt),
  launch: 0,
  antisnipe: {
    threshold: '1',
    buyLimit: '1',
    sellLimit: '1',
    buyDelay: '1',
    sellDelay: '1',
    blacklist: false,
  },
  lock: {
    rateX1000: 1,
    unit: 1,
    threshold: 1,
    unlockPeriod: 0,
    unlockX1000: 0,
  },
  blacklist: {
    threshold: '60',
    collectPeriod: BigNumber.from(2 * 7 * 24 * 60 * 60), // 2 weeks
  },
  whitelists: [],
})

// const bankBUSD = '0x98a5737749490856b401DB5Dc27F522fC314A4e1'
export const bankBUSD = '0xf977814e90da44bfa03b6295a0616a897441acec'
export const launchTime = Math.floor(Date.now() / 1000) + 24 * 3600
export const deadline = ethers.constants.MaxUint256

export const setup = deployments.createFixture(async () => {
  await deployments.fixture(undefined, { keepExistingDeployments: true })
  return {
    token: (await ethers.getContract('AntisnipeToken')) as AntisnipeToken,
    busd: (await ethers.getContract('BUSD')) as Token,
    router: (await ethers.getContract('Router')) as IUniswapV2Router02,
    antisnipe: (await ethers.getContract('Antisnipe')) as Antisnipe,
  }
})

export function hash(user: string, salt: BigNumberish): string {
  const hashUser = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(['address'], [user])
  )
  return ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(['bytes32', 'uint256'], [hashUser, salt])
  )
}

export async function passLock(lockParameters: LockParameters) {
  const period =
    (lockParameters.unit as number) * (1000 / (lockParameters.rateX1000 as number)) +
    (lockParameters.threshold as number) +
    (lockParameters.unlockPeriod as number)
  await time.increaseTime(period)
}
