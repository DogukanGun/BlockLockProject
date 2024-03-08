// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "BlockLock/interface/ILockManager.sol";
import "BlockLock/Lock.sol";


contract LockManager is ILockManager {

    mapping (address=>address) userLocks;

    function loginUser() external{
        if(userLocks[msg.sender] == address(0)){
            address userLockAddress = address(new Lock(msg.sender));
            userLocks[msg.sender] = userLockAddress;
        }
    }

    function getLockAddress() view external returns(address){
        return userLocks[msg.sender];
    }
}