pragma solidity ^0.4.21;

import "./Ownable.sol";


contract Whitelist is Ownable {

    mapping(address => bool) internal whitelist;

    modifier isWhitelisted(address _beneficiary) {
        require(whitelist[_beneficiary]);
        _;
    }

    function addToWhitelist(address _manager) public onlyOwner {
        whitelist[_manager] = true;
    }

    function addManyToWhitelist(address[] _managers) public onlyOwner {
        for (uint256 i = 0; i < _managers.length; i++) {
            whitelist[_managers[i]] = true;
        }
    }

    function removeFromWhitelist(address _manager) public onlyOwner {
        whitelist[_manager] = false;
    }

    function getWhitelistStatus(address _manager) public view onlyOwner returns (bool) {
        return whitelist[_manager];
    }

}
