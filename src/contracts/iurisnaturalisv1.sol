// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
/**
 * @title iurisnaturalis
 * @author xunorus
 */
import "@openzeppelin/contracts@4.5.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.5.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.5.0/security/Pausable.sol";
import "@openzeppelin/contracts@4.5.0/access/AccessControl.sol";
import "@openzeppelin/contracts@4.5.0/utils/Counters.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";


contract IURISNATURALIS is ERC721, ERC721URIStorage, Pausable, AccessControl {

// ---------------------------------------

// ---------------------------------------
// ROLES
    bytes32 public constant DAO_ROLE = keccak256("DAO_ROLE");
    bytes32 public constant ARBITER_ROLE = keccak256("ARBITER_ROLE");

// --------------------------------------------------
// EVENTS
    event Created(address indexed to, uint256 indexed tokenId);
    event Burned(address indexed to, uint256 indexed tokenId);
    event Dispute(uint256 indexed _challenged,uint256 indexed _arbiter,  uint256 indexed _disputeId);

    // --------------------------------------------------
    // STRUCTS

  struct UP{
        uint256 tokenId;
        address creator;
        string uri; // dinamic metadata ipfs link
        uint dateCreated;
        uint dateUpdated;
        bool hasHonor;
        bool isValidated;// <2 witnesses
        mapping(uint256 => UserDispute[])  disputes;
        uint256 validationCount;
        mapping(uint => USER[]) validating;
    }
    struct USER{// is still needed? QUITAR?
        address userAddress; 
        uint256 tokenId; 
        bool hasValidated;
    }
    
    struct UserDispute {
        uint disputeIndex;// o id?
    }

      struct DISPUTE {//este es para mapping
        uint256 disputeId;
        uint256 challenger;
        uint256 challenged; // address challenger;
        uint256 arbiter;
        string reason;
        uint dateOpened;
        uint dateResolved;
        bool isResolved;
        uint result;// 0,1,2,3
    }

  struct UPId{
        uint256  tokenId;
    }
    // --------------------------------------------------
    // MAPPINGS AND ARRAYS
    mapping(address => UPId) public TIds;// para assignar una addres a cada token ID y que sea facil de buscar
    mapping(uint256 => UP) public universalPass;
    mapping(address => mapping(uint256 => USER)) public VALIDATED;// QUITAR?nop..
    mapping(uint256 => DISPUTE) public DISPUTES;//new!
    uint256[] public DAO;
    uint256[] public OPENDISPUTES;
    uint256 private _tokenIdCounter;
   // ---------------------------------------
    // COUNTERS
    using Counters for Counters.Counter;
    // Counters.Counter private _tokenIdCounter;
    Counters.Counter private _disputeIdCounter;
    Counters.Counter public _DAOIdsCounter;
    Counters.Counter public _OPENDISPUTESCounter;

    // ---------------------------------------
    // CONSTRUCTOR
    constructor() ERC721("IURIS-NATURALIS", "IU") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);// during testing phase, this role is renounceable after that phase
        _grantRole(DAO_ROLE, msg.sender);
        // _grantRole(DAO_ROLE, 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2);/// solo para testeo QUITARRder);
    }

    // ---------------------------------------
    // PAUSE UNPAUSE FUNCTIONS
    function pause() public onlyRole(DAO_ROLE) {_pause();}
    function unpause() public onlyRole(DAO_ROLE) {_unpause();}

    // ---------------------------------------
    // ALLOW DEPOSITING FUNDS TO DAO ADMIN
       event Received(address sender, uint256 amount);

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // ALLOW DEPOSITS IN CONTRACT NATIVE CURRENCY
    function deposit() public payable {
    // Additional logic can be added here if needed
        emit Received(msg.sender, msg.value);

    }
    fallback() external payable {
    // Additional logic can be added here if needed
    }


    // ---------------------------------------
    // COUNT FUNCTION
    // avoid correlative token numbering
    function generateTokenId() internal  view returns (uint256) {
        //  combination of the current timestamp and the sender's address
        uint256 uniqueTokenId = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % (10**16);
        return uniqueTokenId;
    }

    // ---------------------------------------
    // MINT Universal Pass
    function mintUniversalPass(string memory uri) public returns (uint256){// return the id (uint256)
        //require that msg.sender has is not already created an nft 
        require(balanceOf(msg.sender) == 0, "Only one universal pass per address");
     
        uint256 tokenId = generateTokenId();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        
            universalPass[tokenId].tokenId = tokenId;// assigned tokenId
            universalPass[tokenId].creator = msg.sender;// creator address
            universalPass[tokenId].uri = uri;// uri
            universalPass[tokenId].dateCreated = block.timestamp;// dateCreated
            universalPass[tokenId].dateUpdated = block.timestamp;// dateUpdated
            universalPass[tokenId].hasHonor = true;//  
            universalPass[tokenId].isValidated = false;// QUITAR? reemplazado por hasWitness
            universalPass[tokenId].validationCount = 0;// 
        
            // NUEVO
            TIds[msg.sender].tokenId = tokenId;// tokenId assigned to address

        return tokenId;
    }
 


    // ---------------------------------------
    // UPDATE UNIVERSAL PASS
    function updateUniversalPass(uint256 tokenId, string memory uri ) public  {
        require(_exists(tokenId), "ERC721: token not minted yet"); // check tokenId exists
        require(msg.sender == universalPass[tokenId].creator, "Must be owner");// only owner can update his Universal pass
        require(universalPass[tokenId].hasHonor == true, "Must be in honor");// must be in honor

        universalPass[tokenId].uri = uri;//new ipfs link
        universalPass[tokenId].dateUpdated = block.timestamp;//udate date
    }    

    // ---------------------------------------
    // GET UNIVERSAL PASS
    function getUniversalPass(uint256 tokenId) public view returns (string memory) { 
            return universalPass[tokenId].uri;
        }



    // ---------------------------------------
    // BURN FUNCTION
      function burnUniversalPass(uint256 tokenId) public  {
        
        //create a require that checks the token exists
        require( universalPass[tokenId].creator  == msg.sender, "Only soveraign owner of the token can burn it");
        
        _burn(tokenId);

        // update Universal Pass data
        universalPass[tokenId].creator = address(0);//?
        universalPass[tokenId].uri = '';//new ipfs link
        universalPass[tokenId].dateCreated = 0;
        universalPass[tokenId].hasHonor = false;
        universalPass[tokenId].isValidated = false;
        universalPass[tokenId].validationCount = 0;
        TIds[msg.sender].tokenId = 0;// tokenId assigned to address

    }

    function revoke(uint256 tokenId) external onlyRole(DAO_ROLE)  {
        _burn(tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256) pure override internal {
        require(from == address(0) || to == address(0), "This is a non-transferable token");// when from is addres 0, the token has been issued, when is to address 0 the token has been burn
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId) override internal {

        if (from == address(0)) {
            emit Created(to, tokenId);// when from is addres 0, the token has been issued, we emit the Created event
        } else if (to == address(0)) {
            emit Burned(to, tokenId);// when to == address 0, the token has been burn, we emit the Burned event

        }
    }
    

    // ---------------------------------------
    // VALIDATE FUNCTIONS
    // need to have 2 or more witnesses or attests to be validated
    function validate(uint256 tokenId)   public  returns (bool)  {
        require(_exists(tokenId), "ERC721: token does not exist");// require tokenId exists
        require(universalPass[tokenId].creator != msg.sender, "you cannot self validate");// require is validator is not owner
        require(!VALIDATED[msg.sender][tokenId].hasValidated, "you already validated this universal pass");//require only 1 validation per addres per tokenId
        require(universalPass[tokenId].hasHonor, "you have to be in honor");//require validator hasHonor == true

        // set validator in struct to true
        VALIDATED[msg.sender][tokenId].hasValidated = true;

        // add validator to List
        universalPass[tokenId].validating[tokenId].push(USER(msg.sender,block.timestamp,true));

       //update validator's length in UP
        universalPass[tokenId].validationCount =  universalPass[tokenId].validating[tokenId].length;

        // if has two or more validations then receives the DAO_ROLE!
        if(universalPass[tokenId].validating[tokenId].length >= 2){
            universalPass[tokenId].isValidated = true;
            addToDAO(tokenId);
            return true;
        }
        if(universalPass[tokenId].validating[tokenId].length < 2){
            universalPass[tokenId].isValidated = false;
            return false;
        } 

        return false;
    }

    function validatorsListPerTokenId (uint tokenId) external view returns(USER[] memory _validators) {
         return universalPass[tokenId].validating[tokenId];
    } 
     

   
// ---------------------------------------
// HONOR - DISHONOR DISPUTE VIEW FUNCTIONS
    function DisputesPerUP (uint tokenId) external view returns(UserDispute[] memory _disputesHistory) {
         return universalPass[tokenId].disputes[tokenId];
    }

// DISPUTES
   function openDisputesList () public view returns(uint256[] memory _OPENDISPUTES) {
         return OPENDISPUTES;
    } 

 

function OPENDISPUTESquantity() view public returns(uint){
   return _OPENDISPUTESCounter.current();// no se actualiza cuna
}


function deleteOpenDispute(uint256 disputeId, uint256 result) internal {//hacer internal o private 
    delete OPENDISPUTES[disputeId]; //delete disputeId from array of OPENDISPUTES

    //delete/reset in mapping
    DISPUTES[disputeId].dateResolved = block.timestamp;//
    DISPUTES[disputeId].isResolved = true;//
    DISPUTES[disputeId].result = result;//
    
  }
  // ---------------------------------------
// SET AND RESOLVE DISPUTE FUNCTION

function resolveDispute(uint256 disputeId, uint256 result) public onlyRole(ARBITER_ROLE) returns(uint) {//hacer internal o private 

    // possible results
    // 0- Neither's honor is restored
    // 1-challenger(A) honor is restored
    // 2- challenged(B) honor is restored
    // 3- both honor is restored

    // set variables
    uint256 A = DISPUTES[disputeId].challenger;
    uint256 B = DISPUTES[disputeId].challenged;
    uint256 C = DISPUTES[disputeId].arbiter;
    
    // get arbiter address
   address arbiterAddress =  universalPass[C].creator;

    // require msg.sender is the same as the owner of arbiterTokenId
    require(msg.sender == arbiterAddress, "arbiter must be the owner of assigned arbiterTokenId");

    // revoke arbiter role
    _revokeRole(ARBITER_ROLE, arbiterAddress);

    // apply arbiter result
    if(result == 0) {
    DISPUTES[disputeId].dateResolved = block.timestamp;//
    DISPUTES[disputeId].isResolved = true;//
    DISPUTES[disputeId].result = result;//
    return 0;
    }
    if(result == 1) universalPass[A].hasHonor = true;// token ID de challenger
    if(result == 2) universalPass[B].hasHonor = true;// token ID de challenger
    if(result == 3) {
        universalPass[A].hasHonor = true;// token ID de challenger
        universalPass[B].hasHonor = true;// token ID de challenger
    }

    // delete open dispute from OPENDISPUTES array
    delete OPENDISPUTES[disputeId];  

    // update counter in OPENDISPUTES array
    _OPENDISPUTESCounter.decrement();

    //update DISPUTE in mapping
    DISPUTES[disputeId].dateResolved = block.timestamp;//
    DISPUTES[disputeId].isResolved = true;//
    DISPUTES[disputeId].result = result;//
    return result;
}



// honor battle mechanism
 function createDispute(uint256 _challenger, uint256 _challenged,  string memory _reason) public returns(uint256) { //DISPUTE!
    //Alice dishonors Bob. 
    //As result both(challenger and challenged ) are temporally dishonored and a random arbiter from DAO is selected to arbit on this dispute
    require(msg.sender == universalPass[_challenger].creator, "_challenger must be the owner to dishonor");// require challenger owns challenger tokenId
    require(_challenger != _challenged, "_challenger cannot  be the same as _challenged");// require challenger cannot be != challenged
    require(_exists(_challenger), "ERC721: token  for challenger does not exist");// require both token exists
    require(_exists(_challenged), "ERC721: token  for challenged does not exist");// require both token exists
    require(universalPass[_challenged].hasHonor, "_challenged is already dishonored");// require challenged is not already dishonored 
    require(universalPass[_challenger].hasHonor, "_challenged is already dishonored");// require challenger is not already dishonored 

    // put both in dishonor
    universalPass[_challenger].hasHonor = false;// token ID de challenger
    universalPass[_challenged].hasHonor = false;/// token ID de challenged
    
    // set counter for each honor dispute
    _disputeIdCounter.increment();// dispute coun starts by 1
    uint256 disputeIdCounter = _disputeIdCounter.current();
        
    // add disputeId to  array with OPENDISPUTES
    _OPENDISPUTESCounter.increment();// count starts by 1
    uint256 OPENDISPUTESCounter = _OPENDISPUTESCounter.current();
    OPENDISPUTES.push(OPENDISPUTESCounter);

    // select arbiter by kleroterion
    uint256 _arbiter = Kleroterion( _challenger,  _challenged) ;
    
    // get arbiter address
      address arbiterAddress = universalPass[_arbiter].creator = msg.sender;// creator

    // grant arbiter ARBITER_ROLE
    _grantRole(ARBITER_ROLE, arbiterAddress);


    // Add to mapping (instead of arrray) 
    DISPUTES[disputeIdCounter].disputeId = disputeIdCounter;// dipsuteId
    DISPUTES[disputeIdCounter].challenger = _challenger;// no va msg.sender sino el creador del token en tal caso
    DISPUTES[disputeIdCounter].challenged = _challenged;// challenged tokenId
    DISPUTES[disputeIdCounter].arbiter = _arbiter;// arbiter tokenId
    DISPUTES[disputeIdCounter].reason = _reason;// string with brief description of dishonoring
    DISPUTES[disputeIdCounter].dateOpened = block.timestamp;//dateOpened
    DISPUTES[disputeIdCounter].dateResolved = 0;//dateResolved
    DISPUTES[disputeIdCounter].isResolved = false;//

    // add dispute index/id to array inside universalPass mapping
    universalPass[_challenger].disputes[_challenger].push(UserDispute(disputeIdCounter));

    emit Dispute(  _challenged,  _arbiter,  disputeIdCounter);

    return disputeIdCounter;
  }

// ---------------------------------------
// KLEROTERION FUNCTIONS
    function Kleroterion(uint256 challengerTokenId, uint256 challengedTokenId)  view public returns(uint256  ){
        uint _arraylength = DAO.length;
        bytes32 hash = keccak256(abi.encodePacked(block.timestamp, msg.sender));// hashes  block number with address and tokenId as nonce
        uint256 randomNumber =  uint256(hash) % _arraylength ;
        while (randomNumber == 0 || randomNumber == challengerTokenId || randomNumber == challengedTokenId) randomNumber ++ % _arraylength ;
        return randomNumber ;//returns DAO member tokenId
    }

// ---------------------------------------
// DAO 

    function DAOlist() public view returns(uint256[] memory _DAO) {
        return DAO;
    } 

    function DAOmembers() view public returns(uint){// REAL ammount of DAO members
        return _DAOIdsCounter.current();// 
    }

    function addToDAO(uint256 tokenId) internal {
        _grantRole(DAO_ROLE, universalPass[tokenId].creator);
        DAO.push(tokenId);
        _DAOIdsCounter.increment();//actualize active DAO members
    }
    
    function removeFromDAO(uint256 tokenId) public {
        require(_exists(tokenId), "ERC721: token does not exist"); // check tokenId exists
        require(universalPass[tokenId].hasHonor, "tokenId has to be in honor");//require validator hasHonor == true

        _revokeRole(DAO_ROLE, universalPass[tokenId].creator);
        delete DAO[tokenId]; //0,1,2,3,4-after deleting 3 becomes- 0,1,2,0//sans pop
        _DAOIdsCounter.decrement();//actualize active DAO members
    }


    // ---------------------------------------
    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        // quizas solo poner esta funcion aqui
        // TIds[msg.sender].tokenId = 0;// tokenId assigned to address
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return universalPass[tokenId].uri;//fix to have dynamic uri
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}



