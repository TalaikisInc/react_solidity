pragma solidity ^0.4.23;

import "./standard/Ownable.sol";
import "./standard/Basic.sol";


contract Contract is Ownable, Basic {

    bytes32 public symbol;
    bytes32 public  tokenName;
    uint8 public decimals;

    constructor() public {
        symbol = "RSB";
        tokenName = "ReactSolidityBoilerplate";
        decimals = 18;
    }

}
