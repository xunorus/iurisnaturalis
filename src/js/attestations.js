
function addAttestIAMcode(){
  console.log('adding add attesttation for IAM code ')

  let attestUI = `

<section id="makeAttests" class="container">

<p data-translate="addAttests" class="heading">1- MAKE ATESTATION</p>
<p></p>

  <button type="button" class="btn btn-warning" onclick="event.stopPropagation();attest();">ATTEST</button>
  
</section>


`
// attesttionUI
document.getElementById('attesttionUI').innerHTML = attestUI
// document.getElementById('soveraindocspremint').innerHTML = attestUI
document.getElementById('attesttionUI').style.display='flex'
document.getElementById('soveraindocs').style.display='none'
document.getElementById('splash').style.display='none'
document.getElementById('soveraindocspremint').style.display='none'

}




// const provider = new ethers.providers.JsonRpcProvider("https://goerli.optimism.io");
// console.log('provider:',provider);
// const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Optimism Goerli v1.0.1



function stringToBytes32(inputString) {
  // Ensure the input string is not longer than 32 bytes
  if (inputString.length > 32) {
      throw new Error("Input string is too long for bytes32");
  }

  // Create a new Uint8Array with a length of 32 bytes (bytes32)
  const bytes32 = new Uint8Array(32);

  // Convert the input string to UTF-8 bytes
  const utf8Bytes = new TextEncoder().encode(inputString);

  // Copy the UTF-8 bytes to the bytes32 array
  bytes32.set(utf8Bytes);

  return bytes32;
}  



//sepolia with bytes32
// https://sepolia.easscan.org/schema/view/0x555f3e615bdcbc8af0b83820b451e4bde6ca57cb74b6307ae16ec83d29486b1e
// attestation with timestamp: https://sepolia.easscan.org/offchain/url/#attestation=eNqdkUuuFDEMRfdS4xKK%2F%2Fbw9atmE4hBEjsLQCCxfFLdLABhKZ4kOT66%2Fna0L6jHCQAiu51H%2B%2F2JarEeF1kKk%2FtncdBXuB4mhO1C0gIHqeN%2BzCJkc9aayRgmq6lVorjMEQYqy4hTlsQKp1hsbh1N3CfCEnpBCINMOBAQl0g1HWQmtmhzV0KCB5P0ZI2aUZHZig1XmoCOfpxoN%2BcZz1iamPAMQPPx8SjGixp0irzw8bDRPtxeQyObxFiloYVwM8e0rMxSWOyjUTfIjr3MjLzZWsaZwdhR2PIFEZEtqSAj55jeVxtOjm2wQPHYrNnF5jAeSs16gdZ0Sgx2HfDO8N%2B1QQ0QQknPtn8e588fv%2Bq1hmDgTdg3fpOoEROQ7xO7t%2F%2Bt2mG%2F1eqt1sdWy79qiWNstX6rtRO%2B%2FwFBypSD


async function attest() {
 
  
  console.log('ATTEST IAM code is controlled by IAM address');

const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia Testnet v0.26
const provider = new ethers.providers.JsonRpcProvider("https://endpoints.omniatech.io/v1/eth/sepolia/public");
const privateKey = "0xeddb270797ba825b0e911b0fd9d203e50d753f61691d1172c9fd9bd9c10f520d";
const signer = new ethers.Wallet(privateKey, provider);
console.log('signer:', signer)
      let eas= new EAS(EASContractAddress);
      console.log('provider: ', provider);
      eas.connect(provider);

console.log('offchainIAM')
const inputString = "IAM-chm-04181980";
const bytes32Value = stringToBytes32(inputString);
console.log(bytes32Value);
const offchain = await eas.getOffchain();


const schemaEncoder = new SchemaEncoder("bytes32 IAMcode,address IAMaddress");
const encodedData = schemaEncoder.encodeData([
  { name: "IAMcode", value: bytes32Value, type: "bytes32" },
  { name: "IAMaddress", value: signer.address, type: "address" },
]);

const offchainAttestation = await offchain.signOffchainAttestation({
recipient: signer.address,
expirationTime: 0,
time: 1671219636,
revocable: true,
version: 1,
nonce: 0,
schema: "0x555f3e615bdcbc8af0b83820b451e4bde6ca57cb74b6307ae16ec83d29486b1e",
refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
data: encodedData,
}, signer);
console.log('offchainAttestation:' ,offchainAttestation)
o = offchainAttestation;
y= JSON.stringify(o)
let offchainobject  = {sig: offchainAttestation, signer: signer.address}
const url = createOffchainURL(offchainobject);
console.log('URL:','https://sepolia.easscan.org'+url )

    
}
 