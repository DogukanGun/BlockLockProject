// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "BlockLock/interface/ILock.sol";


contract Property is Ownable {

    string location;
    string name;

    address tempOwner;
    address lockContractAddress;

    event OpenDoor();

    modifier onlyTempOwner {
        require(tempOwner == msg.sender,"To open the door, you have to buy or rent this property");
        _;
    }

    modifier canOpenDoor {
        require(tempOwner == msg.sender || owner() == msg.sender,"To open the door, you have to buy or rent this property");
        _;
    }

    constructor(string memory _name, string memory _location,address ownerAddress) Ownable(){
        _transferOwnership(ownerAddress);
        location = _location;
        name = _name;
        lockContractAddress = msg.sender;
    }

    function rentOwner(address renter) public onlyOwner{
        tempOwner = renter;
    }

    function finishRent() public onlyOwner {
        tempOwner = address(0);
    }

    function openDoor() public canOpenDoor {
        emit OpenDoor();
    }
    
    function transferOwnership(address newOwner) override public {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        ILock(lockContractAddress).deleteProperty(address(this));
        _transferOwnership(newOwner);
        //TODO add this property to new user's lock contract
    }

}