//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

/**
 * @title BitconeyToken
 * @author gotbit
 */

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BitconeyToken is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 21_000_000e8);
    }

    /// @inheritdoc ERC20
    function decimals() public pure override returns (uint8) {
        return 8;
    }
}
