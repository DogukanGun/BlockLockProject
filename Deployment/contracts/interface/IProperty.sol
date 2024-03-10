// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

interface IProperty {
    function rentOwner(address renter) external;
    function finishRent() external;
    function openDoor() external;
}