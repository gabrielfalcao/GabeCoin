pragma solidity ^0.4.21;

contract ICO {
    
    
    string public name;
    string public symbol;
    uint public decimals;
    uint public bonusEnds;
    uint public icoEnds;
    uint public icoStarts;
    uint public allContributers;
    uint allTokens;
    address admin;
    mapping (address => uint) public balances;
    
    constructor () {
        name = 'GangstaCoin';
        decimals = 18;
        symbol = 'OG';
        bonusEnds = now + 2 weeks;
        icoEnds = now + 4 weeks;
        icoStarts = now;
        allTokens = 100000000000000000000 * 100;
        admin = (msg.sender);
        balances[msg.sender] = allTokens;
        
    }
 
 function buyTokens() public payable {
     uint tokens;
     tokens = msg.value;
     balances[msg.sender] = balances[msg.sender] + tokens;
     allTokens = allTokens + tokens;
 }
 function totalSupply() public constant returns (uint) {
     return allTokens;
 }
 function myBalance() public constant returns (uint){
     return (balances[msg.sender]);
 }
 function myAddress() public constant returns (address) {
     address myAddr = msg.sender;
     return myAddr;
 }
 function endSale() public {
     require(msg.sender == admin);
     admin.transfer(address(this).balance);
 }
}