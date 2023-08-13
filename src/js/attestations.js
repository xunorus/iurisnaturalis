
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




const provider = new ethers.providers.JsonRpcProvider("https://goerli.optimism.io");
console.log('provider:',provider);
const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Optimism Goerli v1.0.1



async function attest() {
  const eas = new EAS(EASContractAddress);
eas.connect(provider);
  window.eas = eas;
  console.log('eas:',eas);

    // const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";
    const uid = "0x555f3e615bdcbc8af0b83820b451e4bde6ca57cb74b6307ae16ec83d29486b1e";//my custom IAM/address schema

    // const attestation =  eas.getAttestation(uid);
    const attestation = await eas.getAttestation(uid);
    a = attestation
    console.log(attestation);
    
}

async function offchainAttest(){
  const eas = new EAS(EASContractAddress);
  // eas.connect(provider);

const offchain = await eas.getOffchain();

// Initialize SchemaEncoder with the schema string
const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
const encodedData = schemaEncoder.encodeData([
  { name: "eventId", value: 1, type: "uint256" },
  { name: "voteIndex", value: 1, type: "uint8" },
]);

// Signer is an ethers.js Signer instance
// const signer = new ethers.Wallet(privateKey, provider);
const signer = localWallet.connect(provider)
console.log('signer:', signer)
// const contractWithSigner = contract.connect(signer);


const offchainAttestation = await offchain.signOffchainAttestation({
  recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
  // Unix timestamp of when attestation expires. (0 for no expiration)
  expirationTime: 0,
  // Unix timestamp of current time
  time: 1671219636,
  revocable: true,
  version: 1,
  nonce: 0,
  schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
  refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
  data: encodedData,
}, signer);
}



async function offch(){

// ---------------------------------------------
      //  CHECK WALLET CHOICE (CONNECTED-DISCONNECTED)
      let walletChoice = localStorage.getItem('wallet');
      if (walletChoice) {
          console.log('THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE')
          if(walletChoice == "METAMASK"){
              console.log('USE METAMASK ')              
          }
                if(walletChoice =="LOCALWALLET"){
                    console.log('USE LOCALWALLET:')

              //   -------------------------------------------------------------
                      //STEP 0 -  DECRYPT WALLET TO MAKE THE TRANSACTION
                      await Swal.fire({ title: 'Unlock your LOCALWALLET', input: 'password', inputAttributes: { autocapitalize: 'off' }, showCancelButton: true, confirmButtonText: 'Enter', showLoaderOnConfirm: true, backdrop: true, preConfirm: (login) => { }, allowOutsideClick: () => { const popup = Swal.getPopup(); popup.classList.remove('swal2-show'); setTimeout(() => { popup.classList.add('animate__animated', 'animate__headShake') }); setTimeout(() => { popup.classList.remove('animate__animated', 'animate__headShake') }, 500); return false }, })
                      .then((result) => {
                      if (result.isConfirmed) {
                      console.log('password entered!')
                        if(result.value ==''){ console.log('IS EMPTY'); Toast.fire({ icon: 'error', title: 'Password cannot be empty' }); return; }

                        // cancelMinting.disabled = true;//DISABLE CANCEL
                        openModalId('#attestingModal')
                        step0.innerHTML= `<h5>1- Decrypt wallet  <span id="step0Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="step0Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>
                        <div id="step0Progress"></div>`;
                        
                        let encryptedjson = localStorage.getItem('jsonWallet')
                        let ew = JSON.parse( encryptedjson)
                        console.log('pub key of wallet in localstorage:', ew.address)
                
                        let wallet;
                        try { 
                          wallet =  ethers.Wallet.fromEncryptedJson(encryptedjson, result.value, decryptProgress)
                          .then(async (localWallet) => {

                            w=localWallet;
                            console.log('WALLET DECRYPTED: ', localWallet.address)
                            
                            // DO SOMETHING HERE...


                            const provider =  new ethers.providers.JsonRpcProvider("https://goerli.optimism.io");
                            console.log('provider:',provider);
                            const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Optimism Goerli v1.0.1


                            const eas = new EAS(EASContractAddress);
                            await eas.connect(provider);
                          
                          const offchain = await eas.getOffchain();
                          
                          // Initialize SchemaEncoder with the schema string
                          const schemaEncoder = new SchemaEncoder("uint256 eventId, uint8 voteIndex");
                          const encodedData = schemaEncoder.encodeData([
                            { name: "eventId", value: 1, type: "uint256" },
                            { name: "voteIndex", value: 1, type: "uint8" },
                          ]);
                          
                          // Signer is an ethers.js Signer instance
                          // const signer = new ethers.Wallet(privateKey, provider);
                          const signer = localWallet.connect(provider)
                          console.log('signer:', signer)
                          // const contractWithSigner = contract.connect(signer);
                          
                          
                          const offchainAttestation = await offchain.signOffchainAttestation({
                            recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
                            // Unix timestamp of when attestation expires. (0 for no expiration)
                            expirationTime: 0,
                            // Unix timestamp of current time
                            time: 1671219636,
                            revocable: true,
                            version: 1,
                            nonce: 0,
                            schema: "0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995",
                            refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
                            data: encodedData,
                          }, signer);


                            // --- END
                          })
                        } catch (error) {
                          console.log('ERROR AT LOCALWALLET DECRYPTING:', error);
                           Toast.fire({ icon: 'error', title: 'Password incorrect' })
                          return;
                          }
                        }
                      })
                    }
                  }



}