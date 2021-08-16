// contracts/MyContract.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Guitar is Ownable {
    uint8 public strings;
    bool public broken;
    uint8 public cost = 10;

    event Music(string song);

    constructor(uint8 _strings){
        strings = _strings;
    }

    function fix(uint8 _strings) public payable {
        require(_strings == strings, "Fixed wrong guitar");
        require(broken);
        require(msg.value > cost);
        broken = false;
    }

    function play(string calldata song) public onlyOwner {
        require(!broken, "the guitar is broken");
        emit Music(song);
        broken = true;
    }
}