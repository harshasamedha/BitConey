import { accounts, fork, forks, push, verify } from './controllers'
import { tenderlyTask } from './utils'

tenderlyTask('push', 'Push contracts on tenderly', async (_, hre) => await push(hre))

tenderlyTask('verify', 'Verify contracts on fork', async (_, hre) => await verify(hre))

tenderlyTask('fork', 'Create fork', async (_, hre) => await fork(hre))

tenderlyTask('forks', 'Print forks', async (_, hre) => await forks(hre))

tenderlyTask('accounts', 'Print accounts', async (_, hre) => await accounts(hre))
