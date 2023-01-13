# BitConey Token

## Getting Started

Recommended Node version is 16.0.0.

```bash
$ yarn
$ yarn compile
$ yarn testf
```

## Project Structure

This a hardhat typescript project with `hardhat-deploy` extension.
Solidity version `0.8.10`

### Tests

Tests are found in the `./test/` folder.

To run tests

```bash
$ yarn testf
```

To run coverage

```bash
$ yarn coverage
```

### Coverage result

```text
Network Info
============
> HardhatEVM: v2.9.6
> network:    hardhat

No need to generate any newer typings.


  Token
    ✔ should be correct totalSupply
    ✔ should be correct decimals


  2 passing (214ms)

--------------------|----------|----------|----------|----------|----------------|
File                |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
--------------------|----------|----------|----------|----------|----------------|
 contracts/         |      100 |      100 |      100 |      100 |                |
  BitconeyToken.sol |      100 |      100 |      100 |      100 |                |
--------------------|----------|----------|----------|----------|----------------|
All files           |      100 |      100 |      100 |      100 |                |
--------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
```

### Contracts

Solidity smart contracts are found in `./contracts/`.
`./contracts/mock` folder contains contracts mocks that are used for testing purposes.

### Deploy

Deploy script can be found in the `./deploy/localhost` for local testing and `./deploy/mainnet` for mainnet deploy

Generate `.env` file

```bash
$ cp .env.example .env
```

Add .env file to the project root.

To add the private key of a deployer account, assign the following variable

```
PRIVATE_TEST=
PRIVATE_MAIN=
```

To add API Keys for verifying

```
API_ETH=
API_BSC=
API_POLYGON=
API_AVAX=
API_FTM=
API_ARBITRUM=
```

To deploy contracts on `BNB Chain`

```bash
$ yarn deploy --network bsc_mainnet
```

### Deployments

Deployments on mainnets and testnets store in `./deployments`

### Verify

To verify contracts on `BNB Chain`

```bash
$ yarn verify --network bsc_mainnet
```

## Tokenomics

- **Currency Name**: `BITCONEY`
- **Token symbol**: `BITCONEY`
- **Total supply**: `21,000,000 BITCONEY`
- **Supported Chain**: `BNB Chain`
- **Decimal number**: `8`

## Project Overview

Bitconey Token is a simple ERC20 token with static supply.

## Functional requirements

The token has all basic ERC20 features. It doesn’t provide any special privileges to specific wallets (no owner/roles mechanism). It has 21 million static total supply – no burning or minting functions. It uses 8 precision points.

## Technical requirements

### Contract information

#### BitconeyToken.sol

A simple ERC20 token contract inheriting OpenZeppelin’s ERC20 implementation. It allows to set the token’s name and ticker through constructor arguments and mints all supply to the contract deployer. It overrides the decimals() function from OpenZeppelin’s implementation to indicate usage of 8 precision points instead of 18.
