// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Counter {
    uint256 public number;

    event NumberSet(uint256 number);
    error NumberTooHigh(uint256 number);
    error NumberTooLow(uint256 number);

    function setNumber(uint256 newNumber) public {
        number = newNumber;
        emit NumberSet(newNumber);
    }

    function increment() public {
        if (number >= 10) {
            revert NumberTooHigh(number);
        }
        number++;
        emit NumberSet(number);
    }

    function decrement() public {
        if (number <= 0) {
            revert NumberTooLow(number);
        }
        number--;
        emit NumberSet(number);
    }

    function getBlockNumber() external view returns (uint256) {
        return block.number;
    }

    function getBlockTimestamp() external view returns (uint256) {
        return block.timestamp;
    }
}
