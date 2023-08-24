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


# On-chain Attestations
An on-chain attestation is an attestation that is published on the blockchain for the world to see. Because of this its timestamp can be guaranteed and any smart contract on the blockchain can easily reference and verify the attestation.

# Off-chain Attestations
An off-chain attestation is an attestation that is not stored in the blockchain. An off-chain attestation can be public or private. Off-chain attestations carry the entire attestation data and digital signature required to verify and validate the authenticity of itself. 
You can also timestamp and revoke off-chain attestations on-chain giving them additional superpowers.

Referenced Attestations
refUID is one of the most powerful features of an EAS attestation that unlocks its composability by allowing one attestation to reference another.

# Referenced Attestations
refUID is one of the most powerful features of an EAS attestation that unlocks its composability by allowing one attestation to reference another.

This functionality enables the creation of a hierarchy or a chain of attestations that depend on one another. In doing so, attestations can be organized in a more structured manner and their relationships can be easily understood.

# Revoking Attestations
Attestations on EAS can be revoked when they are no longer valid or accurate. This can be done both on-chain and off-chain. Revoking an attestation will mark it as invalid. This can be useful in situations where an attestation was made in error, or if the data it represents has changed or become outdated.


# WALLET 
JSON wallets are a common way to store private keys and other sensitive information in a JSON format encrypted with a password. They are generally considered secure if implemented correctly. However, the security of JSON wallets depends on a few factors:

Password Strength: The security of a JSON wallet largely depends on the strength of the password used to encrypt it. A strong password makes it significantly harder for attackers to crack the encryption.

Encryption Algorithm: The encryption algorithm used to protect the JSON wallet is crucial. Modern encryption algorithms like AES (Advanced Encryption Standard) with strong key derivation functions are recommended.

Key Derivation: A good JSON wallet implementation should use a strong key derivation function to convert the password into an encryption key. This helps protect against brute-force attacks.

Salting: Adding a random value (salt) during the key derivation process enhances security by making precomputed attacks more difficult.

Implementation Quality: The library or tool you use to create, manage, and access JSON wallets should be well-tested and maintained. Bugs or vulnerabilities in the implementation could compromise security.

Offline Storage: Storing JSON wallets offline, such as on an air-gapped machine or a hardware wallet, can add an extra layer of security by minimizing the exposure to potential online attacks.

Physical Security: If an attacker gains access to the unencrypted JSON wallet file, they can easily compromise the associated account. Physical security of your devices is important.

Backup and Recovery: Always keep secure backups of your JSON wallet, preferably in multiple physical locations. However, this should be balanced with the risk of someone else discovering your backup.


# github
https://github.com/xunorus/iurisnaturalis

# Demo
https://iurisnaturalis.web.app/