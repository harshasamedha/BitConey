# Bitconey Token

## Project Overview

Bitconey Token is a simple ERC20 token with static supply.

## Functional requirements

The token has all basic ERC20 features. It doesn’t provide any special privileges to specific wallets (no owner/roles mechanism). It has 21 million static total supply – no burning or minting functions. It uses 8 precision points.

## Technical requirements

### Contract information

#### BitconeyToken.sol

A simple ERC20 token contract inheriting OpenZeppelin’s ERC20 implementation. It allows to set the token’s name and ticker through constructor arguments and mints all supply to the contract deployer. It overrides the decimals() function from OpenZeppelin’s implementation to indicate usage of 8 precision points instead of 18.
