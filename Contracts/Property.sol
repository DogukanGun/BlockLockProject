// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "BlockLock/interface/ILock.sol";
import "BlockLock/interface/ILockManager.sol";


contract Property is Ownable {

    string location;
    string name;

    address tempOwner;
    address lockContractAddress;
    address lockManagerContractAddress;

    event OpenDoor();

    modifier onlyTempOwner {
        require(tempOwner == msg.sender,"To open the door, you have to buy or rent this property");
        _;
    }

    modifier canOpenDoor {
        require(tempOwner == msg.sender || owner() == msg.sender,"To open the door, you have to buy or rent this property");
        _;
    }

    constructor(string memory _name, string memory _location,address ownerAddress,address _lockContractAddress) Ownable(){
        transferOwnership(ownerAddress);
        location = _location;
        name = _name;
        lockContractAddress = _lockContractAddress;
    }

    function rentOwner(address renter) external onlyOwner{
        tempOwner = renter;
    }

    function finishRent() external onlyOwner {
        tempOwner = address(0);
    }

    function openDoor() external canOpenDoor {
        emit OpenDoor();
    }
    
    function transferOwnership(address newOwner) override public {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        ILock(lockContractAddress).deleteProperty(address(this));
        _transferOwnership(newOwner);
    }

}