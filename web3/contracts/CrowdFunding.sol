// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
   struct Campaign{    //think of it as an object
       address owner;
       string title;
       string description;
       uint256 target;
       uint256 deadline;
       uint256 amountCollected;
       string image;     //gonna put a url of image
       address[] donators;
       uint256[] donations;
       
   } 
   
   mapping(uint256 => Campaign) public campaigns; //now we can use campaigns[0]

   uint256 public numberOfCampaigns = 0;       //keep track of number of campaigns created 

   function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];   //fillup our campaigns array

        // is everything okay ?
        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future");
                
        campaign.owner = _owner;  //filling up the campaign
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1; // index of the most newly created campaign

   }
   
   //we need to get the id of campaign we want to donate to || payable is to indicate we gonna send some cryptocurrency through this function
   function donateToCampaign(uint256 _id) public payable {
    uint256 amount = msg.value;  //this is what were tryign to send from our frontend

    Campaign storage campaign = campaigns[_id];    //we have our campaign we wnt tot donate to

    campaign.donators.push(msg.sender); //push the address of person that donated
    campaign.donations.push(amount);  

    //transaction || bool sent let us know if the transaction has been sent or not
    (bool sent,) = payable(campaign.owner).call{value: amount}("");  //payable returns 2 values  we only accessing one thats why , has been put//

    if(sent) {
        campaign.amountCollected = campaign.amountCollected + amount;
    }

   }

   function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        //returns donators, donations
        return (campaigns[_id].donators, campaigns[_id].donations);
   }

   function getCampaigns() public view returns (Campaign[] memory) {
    //creating a new variable called allcampigns which is of type array of multiple campaign structures [{}, {}, {}]
    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); 

    //now loop thru all campaign and populate that variable
    for(uint i =0; i<numberOfCampaigns; i++){
        Campaign storage item = campaigns[i];

        allCampaigns[i] = item;
    }
    
    return allCampaigns;
   }

}