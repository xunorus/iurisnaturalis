
const apiKey = "06VYM1TUuOg9XABK7QnpSiaFwFckZuR9PdgNaU5CWW2kKL5CoqnelNFqU8E7w3Tj";
let ipfsGateway = 'https://w3s.link/ipfs/';
let ipfsGatewayCID = 'https://bafybeicdigz6bzpgv4zx5newdfggjm7l73e5urhlzqin567ol3raf5icaq.ipfs.w3s.link/';
   
ABIs = {
opptonev15ABI : [
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Approval",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }
    ],
    "name": "ApprovalForAll",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Burned",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Created",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "_challenged",
            "type": "uint256"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "_arbiter",
            "type": "uint256"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "_disputeId",
            "type": "uint256"
        }
    ],
    "name": "Dispute",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "Paused",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "previousAdminRole",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "newAdminRole",
            "type": "bytes32"
        }
    ],
    "name": "RoleAdminChanged",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }
    ],
    "name": "RoleGranted",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "account",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "sender",
            "type": "address"
        }
    ],
    "name": "RoleRevoked",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "Transfer",
    "type": "event"
},
{
    "anonymous": false,
    "inputs": [
        {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "Unpaused",
    "type": "event"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "burnUniversalPass",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "_challenger",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "_challenged",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "_reason",
            "type": "string"
        }
    ],
    "name": "createDispute",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
        }
    ],
    "name": "createValue",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "grantRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "uri",
            "type": "string"
        }
    ],
    "name": "mintUniversalPass",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "removeFromDAO",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "renounceRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "disputeId",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "result",
            "type": "uint256"
        }
    ],
    "name": "resolveDispute",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "revoke",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "revokeRole",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
        }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        },
        {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
        }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "from",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "uri",
            "type": "string"
        }
    ],
    "name": "updateUniversalPass",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "validate",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [],
    "name": "_DAOIdsCounter",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "_OPENDISPUTESCounter",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "_value",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "ARBITER_ROLE",
    "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "DAO",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "DAO_ROLE",
    "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "DAOlist",
    "outputs": [
        {
            "internalType": "uint256[]",
            "name": "_DAO",
            "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "DAOmembers",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "DEFAULT_ADMIN_ROLE",
    "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "DISPUTES",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "disputeId",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "challenger",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "challenged",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "arbiter",
            "type": "uint256"
        },
        {
            "internalType": "string",
            "name": "reason",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "dateOpened",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "dateResolved",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "isResolved",
            "type": "bool"
        },
        {
            "internalType": "uint256",
            "name": "result",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "DisputesPerUP",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "uint256",
                    "name": "disputeIndex",
                    "type": "uint256"
                }
            ],
            "internalType": "struct OPPTONEv15.UserDispute[]",
            "name": "_disputesHistory",
            "type": "tuple[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "getApproved",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        }
    ],
    "name": "getRoleAdmin",
    "outputs": [
        {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "getUniversalPass",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes32",
            "name": "role",
            "type": "bytes32"
        },
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "hasRole",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "owner",
            "type": "address"
        },
        {
            "internalType": "address",
            "name": "operator",
            "type": "address"
        }
    ],
    "name": "isApprovedForAll",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "challengerTokenId",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "challengedTokenId",
            "type": "uint256"
        }
    ],
    "name": "Kleroterion",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "name",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "OPENDISPUTES",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "openDisputesList",
    "outputs": [
        {
            "internalType": "uint256[]",
            "name": "_OPENDISPUTES",
            "type": "uint256[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "OPENDISPUTESquantity",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "ownerOf",
    "outputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "paused",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
        }
    ],
    "name": "supportsInterface",
    "outputs": [
        {
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "symbol",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        }
    ],
    "name": "TIds",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "tokenURI",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "universalPass",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "address",
            "name": "creator",
            "type": "address"
        },
        {
            "internalType": "string",
            "name": "uri",
            "type": "string"
        },
        {
            "internalType": "uint256",
            "name": "dateCreated",
            "type": "uint256"
        },
        {
            "internalType": "uint256",
            "name": "dateUpdated",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "hasHonor",
            "type": "bool"
        },
        {
            "internalType": "bool",
            "name": "isValidated",
            "type": "bool"
        },
        {
            "internalType": "uint256",
            "name": "validationCount",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "name": "VALIDATED",
    "outputs": [
        {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "internalType": "bool",
            "name": "hasValidated",
            "type": "bool"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "validatorsListPerTokenId",
    "outputs": [
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "hasValidated",
                    "type": "bool"
                }
            ],
            "internalType": "struct OPPTONEv15.USER[]",
            "name": "_validators",
            "type": "tuple[]"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}
],

opptonev16ABI : [
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "approved",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Approval",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "operator",
              "type": "address"
          },
          {
              "indexed": false,
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
          }
      ],
      "name": "ApprovalForAll",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Burned",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Created",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "_challenged",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "_arbiter",
              "type": "uint256"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "_disputeId",
              "type": "uint256"
          }
      ],
      "name": "Dispute",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "Paused",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "indexed": true,
              "internalType": "bytes32",
              "name": "previousAdminRole",
              "type": "bytes32"
          },
          {
              "indexed": true,
              "internalType": "bytes32",
              "name": "newAdminRole",
              "type": "bytes32"
          }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
          }
      ],
      "name": "RoleGranted",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "account",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "sender",
              "type": "address"
          }
      ],
      "name": "RoleRevoked",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": false,
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "Unpaused",
      "type": "event"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "burnUniversalPass",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "_challenger",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "_challenged",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "_reason",
              "type": "string"
          }
      ],
      "name": "createDispute",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "string",
              "name": "uri",
              "type": "string"
          }
      ],
      "name": "mintUniversalPass",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "removeFromDAO",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "disputeId",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "result",
              "type": "uint256"
          }
      ],
      "name": "resolveDispute",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "revoke",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "bytes",
              "name": "_data",
              "type": "bytes"
          }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "operator",
              "type": "address"
          },
          {
              "internalType": "bool",
              "name": "approved",
              "type": "bool"
          }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "from",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "to",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "uri",
              "type": "string"
          }
      ],
      "name": "updateUniversalPass",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "validate",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "_DAOIdsCounter",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "_OPENDISPUTESCounter",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "_value",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "ARBITER_ROLE",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          }
      ],
      "name": "balanceOf",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "DAO",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "DAO_ROLE",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "DAOlist",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "_DAO",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "DAOmembers",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "DISPUTES",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "disputeId",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "challenger",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "challenged",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "arbiter",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "reason",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "dateOpened",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "dateResolved",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "isResolved",
              "type": "bool"
          },
          {
              "internalType": "uint256",
              "name": "result",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "DisputesPerUP",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "disputeIndex",
                      "type": "uint256"
                  }
              ],
              "internalType": "struct OPPTONEv16.UserDispute[]",
              "name": "_disputesHistory",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getApproved",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          }
      ],
      "name": "getRoleAdmin",
      "outputs": [
          {
              "internalType": "bytes32",
              "name": "",
              "type": "bytes32"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "getUniversalPass",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes32",
              "name": "role",
              "type": "bytes32"
          },
          {
              "internalType": "address",
              "name": "account",
              "type": "address"
          }
      ],
      "name": "hasRole",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "owner",
              "type": "address"
          },
          {
              "internalType": "address",
              "name": "operator",
              "type": "address"
          }
      ],
      "name": "isApprovedForAll",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "challengerTokenId",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "challengedTokenId",
              "type": "uint256"
          }
      ],
      "name": "Kleroterion",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "name",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "OPENDISPUTES",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "openDisputesList",
      "outputs": [
          {
              "internalType": "uint256[]",
              "name": "_OPENDISPUTES",
              "type": "uint256[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "OPENDISPUTESquantity",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "ownerOf",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "paused",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "bytes4",
              "name": "interfaceId",
              "type": "bytes4"
          }
      ],
      "name": "supportsInterface",
      "outputs": [
          {
              "internalType": "bool",
              "name": "",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "symbol",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "name": "TIds",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "tokenURI",
      "outputs": [
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "universalPass",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "address",
              "name": "creator",
              "type": "address"
          },
          {
              "internalType": "string",
              "name": "uri",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "dateCreated",
              "type": "uint256"
          },
          {
              "internalType": "uint256",
              "name": "dateUpdated",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "hasHonor",
              "type": "bool"
          },
          {
              "internalType": "bool",
              "name": "isValidated",
              "type": "bool"
          },
          {
              "internalType": "uint256",
              "name": "validationCount",
              "type": "uint256"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          }
      ],
      "name": "VALIDATED",
      "outputs": [
          {
              "internalType": "address",
              "name": "userAddress",
              "type": "address"
          },
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          },
          {
              "internalType": "bool",
              "name": "hasValidated",
              "type": "bool"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
          }
      ],
      "name": "validatorsListPerTokenId",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "address",
                      "name": "userAddress",
                      "type": "address"
                  },
                  {
                      "internalType": "uint256",
                      "name": "tokenId",
                      "type": "uint256"
                  },
                  {
                      "internalType": "bool",
                      "name": "hasValidated",
                      "type": "bool"
                  }
              ],
              "internalType": "struct OPPTONEv16.USER[]",
              "name": "_validators",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
]
};

optionsList =[
    {
      "TOKEN_NAME": "MUMBAI",
      "TOKEN_ADDRESS": "0xf2b1dC371eDC20D4A13821E9dC46ae6facAa1632",
      "TOKEN_ABI": 'opptonev16ABI',
      "TOKEN_CHAINID": '80001',
      "API": 'https://polygon-testnet.public.blastapi.io',
      "EXPLORER": 'https://mumbai.polygonscan.com/'
    },
    {
      "TOKEN_NAME": "Goerli", 
      "TOKEN_ADDRESS": "0xafA14234a25c1f051cB620c561462Da78D52e4B9",
      "TOKEN_ABI": 'opptonev16ABI',
      "TOKEN_CHAINID": '5',
      "API": 'https://goerli.infura.io/v3/c4b256df660f44dbb2278e969d255588',
      "EXPLORER": 'https://goerli.etherscan.io/'
    },
    {
        "TOKEN_NAME": "SCROLL",
        "TOKEN_ADDRESS": "0x4F77Af04f85a0E57630348D839E89764458f6Ed3",
        "TOKEN_ABI": 'opptonev16ABI',
        "TOKEN_CHAINID": '534353',
        "API": 'https://alpha-rpc.scroll.io/l2',
        "EXPLORER": 'https://scrollexplorer.unifra.io/'
      }
     
  ];



function openModalId(id,event){
    console.log('openingModal', id,event)
    setTimeout(() => {
       xModal = new bootstrap.Modal(document.querySelector(`${id}`))
      xModal.show(event)
    }, 50);
  }

  function closeModalId(id,event){
    console.log('closing modal', id,event)
      xModal.hide(event)
  }
