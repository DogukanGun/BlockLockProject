// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Property.sol";
import "./interface/ILock.sol";

contract Lock is Ownable, ILock{

    constructor(address ownerAddress) Ownable(ownerAddress){
        transferOwnership(ownerAddress);
    }

    address[] public  properties;
    mapping (address=>string) public propertyMap;

    modifier onlyItself(address property) {
        require(property == msg.sender,"Only can the property delete");
        _;
    }

    function transferOwner(address property) external {
        properties.push(property);
    }

    function addProperty(string memory _name, string memory _location) external   {
        address newProperty = address(new Property(_name,_location,msg.sender));
        properties.push(newProperty);
        propertyMap[newProperty] = _name;
    }

    function deleteProperty(address propertyAddress) external onlyItself(propertyAddress){
        for (uint i = 0; i<properties.length; i++) 
        {
            if(properties[i]==propertyAddress){
                delete properties[i];
            }
        }
    
    }

}