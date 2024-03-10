// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface ILock {
    function deleteProperty(address propertyAddress) external;
    function addProperty(string memory _name, string memory _location) external ;
}