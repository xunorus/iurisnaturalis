
# IUS NATURALIS
# ⚠️ Project Moved to a New Repository

This project has been moved to [https://github.com/energiasonora/iusdappv2](https://github.com/energiasonora/iusdappv2).

Please visit the new repository for the latest updates and developments. This repository is now **archived** and will no longer be maintained.


## demo 
new demo https://iusnaturalis.web.app/
old demo https://iuris.web.app/



# Run
```
yarn parcel src/index.html  --port 3333 
```

# To deploy
```
yarn parcel src/index.html --dist-dir pages  --public-url ./
```

# IURIS NATURALIS
A proof of personhood’s honor experiment based on honorable human interactions under natural law


# Description

Iuris Naturalis  is a dapp to host public documents and attestations self goberned by through the honorability of its members.
This system is developed by combining EAS attestations with IPFS, and smart contracts to solve onchain dispute resolutions.

The goal of Iuris Naturalis is to create a resilient decentraliced platform for individuals to make self-sovereign public attestations, by using a mechanism based on personhood and its rights in a group.

The DAP usses  EAS  attestations combined with IPFS and three smart contract (two from EAS and one from IURISNATURALIS) which uses an arbiter selection mechanism (based on the greek klerotherion concept) to resolve honor disputes.


# Attestations
Attestations are digital records made by anyone about anything that certify the authenticity of information. They are created by an Attestor, who signs the attestation with their Ethereum wallet and adds it to the EVM l2 blockchain. Attestations can be verified by anyone with access to the blockchain and the attestation's unique UID.

Attestations are made up of two key components: the schema and the attestation data. The schema is a predefined structure for creating and verifying attestations. It defines the data types, format, and composition of an attestation. EAS uses Solidity ABI types as acceptable fields for schemas. The attestation data is the actual information that is being attested to. It must follow the structure defined in the schema in order to be considered a valid attestation.


# IAM Attestation Schema

This schema assumes that the attestor is the IAMcode's address. The productID can be a unique identifier for a specific product that includes all necessary information such as product name, manufacturer, and other relevant details. As the product is sold and moved throughout the supply chain there can be an immutable chain of record showing where the product originated and where it ended up. This would be verifiable through the chain of attestations made throughout the supplychain process.

bytes32 IAMcode
<!-- bytes32 batchNumber
string locationOfProduction
uint64 dateOfProduction -->

# IAM document attestatino schema
https://sepolia.easscan.org/schema/view/0x5e9a817ef4acf13c8e2dba0944586660292e02e169a2da473530e6709c502338


# Private Off-Chain Attestations records
This example off-chain attestation record is for "Making a Statement". The difference between the on-chain record and this off-chain attestation is that this attestation is public. The server doesn't even know about it. You can easily share this attestation URL with others who can then decode the attestation data, publish it to IPFS, and more. If this attestation were to be published or pinned to IPFS, the status icon will change to "public".
<!-- 
# Off-chain Attestations with private data
An off-chain attestation is an attestation that is not stored in the blockchain. An off-chain attestation can be public or private. Off-chain attestations carry the entire attestation data and digital signature required to verify and validate the authenticity of itself. 
You can also timestamp and revoke off-chain attestations on-chain giving them additional superpowers.


# Generate Proofs of Private Data
Once the attestation is made, the attester can provide anyone with the entire data or parts of the data from the tree which will allow her to generate proofs from it.


# On-chain Attestations
An on-chain attestation is an attestation that is published on the blockchain for the world to see. Because of this its timestamp can be guaranteed and any smart contract on the blockchain can easily reference and verify the attestation.


Referenced Attestations
refUID is one of the most powerful features of an EAS attestation that unlocks its composability by allowing one attestation to reference another.

# Referencing Attestations
refUID is one of the most powerful features of an EAS attestation that unlocks its composability by allowing one attestation to reference another.

This functionality enables the creation of a hierarchy or a chain of attestations that depend on one another. In doing so, attestations can be organized in a more structured manner and their relationships can be easily understood.


# Verifiable Proofs
Once your proofs have been generated you can share them with individuals to verify your information. For example, if you want to only selectively disclose the legalName and over100k values, then you would just generate a proof for those. Anyone with the proof can go to the easscan website and verify the proof against the Merkle Tree root.


# Revoke Attestations
Attestations can be revoked when they are no longer valid or accurate. This can be done both on-chain and off-chain. Revoking an attestation will mark it as invalid. 
This can be useful in situations where an attestation was made in error, or if the data it represents has changed or become outdated.


# WALLETS 
As an option to metamas, this dapp comes with a powerful local wallet that can be utiliced to generate and store keypairs, used to sign and make transactions. 
This local wallet stores an encrypted json wallet based en ethers-js. This type of json wallets are generally considered secure if implemented correctly. However, the security of JSON wallets depends on a few factors:

# Password Strength: 
The security of a JSON wallet largely depends on the strength of the password used to encrypt it. A strong password makes it significantly harder for attackers to crack the encryption.

# Encryption Algorithm: 
The encryption algorithm used to protect the JSON wallet is crucial. Modern encryption algorithms like AES (Advanced Encryption Standard) with strong key derivation functions are recommended.

# Key Derivation: 
A good JSON wallet implementation should use a strong key derivation function to convert the password into an encryption key. This helps protect against brute-force attacks.

# Salting: 
Adding a random value (salt) during the key derivation process enhances security by making precomputed attacks more difficult.

# Implementation Quality: 
The library used to create, manage, and access JSON wallets is the well-tested and maintained ethers js.

# Offline Storage: 
Storing JSON wallets offline, such as on an air-gapped machine or a hardware wallet, can add an extra layer of security by minimizing the exposure to potential online attacks.

Physical Security: 
If an attacker gains access to the unencrypted JSON wallet file, they can easily compromise the associated account. Physical security of your devices is important.

Backup and Recovery: Always keep secure backups of your JSON wallet, preferably in multiple physical locations. However, this should be balanced with the risk of someone else discovering your backup. -->


# github
https://github.com/xunorus/iurisnaturalis


# Demo
https://xunorus.github.io/iurisnaturalis/


