// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ILockManager {
    function loginUser() external;
    function getLockAddress() view external returns(address);
}