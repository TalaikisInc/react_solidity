pragma solidity ^0.4.21;

import "./standard/Ownable.sol";
import "./standard/Basic.sol";


contract Contract is Ownable, Basic {

    bytes32 public symbol;
    bytes32 public  tokenName;
    uint8 public decimals;

    function Contract() public {
        symbol = "RSB";
        tokenName = "ReactSolidityBoilerplate";
        decimals = 18;
    }

}
