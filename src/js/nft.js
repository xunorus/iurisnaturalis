async function mint(){
  console.log('fake mint!')
  Swal.fire(
    'stay in touch..',
    'this feature is not available yet',
    'question'
  )

}

async function mint2(){
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

                        cancelMinting.disabled = true;//DISABLE CANCEL

                        openModal('#mintingModal')
                        document.getElementById('step0').innerHTML= `<h5>1- Decrypt wallet  <span id="step0Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="step0Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>
                        <div id="step0Progress"></div>`;

                        
                        let encryptedjson = localStorage.getItem('jsonWallet')
                        let ew = JSON.parse( encryptedjson)
                        console.log('pub key of wallet in localstorage:', ew.address)
                
                
                        let wallet;
                        try { 
                          wallet =  ethers.Wallet.fromEncryptedJson(encryptedjson, result.value, decryptProgress)
                          .then(async (localWallet) => {

                          // STEP 0
                              w=localWallet;
                              console.log('WALLET DECRYPTED: ', localWallet.address)
                              document.getElementById('step0Spinner').style.display= 'none'
                              document.getElementById('step0Check').style.visibility= 'visible'
                              document.getElementById('step0Progress').innerText= ''
                            
                          //   -------------------------------------------------------------
                          // STEP 1= CHECK LOCALSTORAGE BEFORE UPLOADING TO IPFS
                          let oldmetadata=  localStorage.getItem('metadata');

                          // - UPLOAD TO IPFS
                          document.getElementById('step1').innerHTML= `<h5>2- Uploading Metadata to IPFS  <span id="step1Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="step1Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>`;
    
                          let metadataString;
                          try { metadataString = await prepareMetadata();}
                          catch (error) { console.log(error.message); document.getElementById('step1Spinner').style.display= 'none'; document.getElementById('step1Check').style.visibility= 'visible'; document.getElementById('step1Check').innerHTML= '<i class="fa-solid fa-circle-xmark" style="color:red"></i>'; let printCIDMessage = `<div class="alert alert-warning alert-dismissible fade show" role="alert">${error.message} </div>`; step1.innerHTML+= printCIDMessage; return }
                          console.log('metadata:' ,metadataString);
              
                          // // UPLOAD TO IPFS  
                          const jsonString = JSON.stringify(metadataString);
                          const jsonBlob = new Blob([jsonString], { type: "application/json" });
                          const jsonBlobFile = [ new File([jsonBlob], 'metadata.json',  { type: 'application/json' }) ];
                          const client = makeStorageClient();
                          try { CID =  await client.put(jsonBlobFile, { wrapWithDirectory:false })}
                          catch (error) { console.log(error.message); return }
                          
                          // SAVE TO LOCALSTORAGE
                          localStorage.setItem('metadata', CID);
                          let ipfsLink = `${ipfsGateway}${CID}`
                          console.log('stored file :', ipfsLink )
      
                            
                        // SUCCESS ...CONTINUE
                        document.getElementById('step1Spinner').style.display= 'none'
                        document.getElementById('step1Check').style.visibility= 'visible'
                        let printCIDMessage = `<div class="alert alert-success alert-dismissible fade show" role="alert"> CID:  <a href="${ipfsLink}"  target="_blank" style="word-break: break-all;">${ipfsLink}</a> </div>`;
                        step1.innerHTML+= printCIDMessage


                              

                        // ------------------------------------
                      // STEP 2  - SELECT CHAIN
                        // // - UPLOAD TO IPFS
                        // step1.innerHTML= `<h5>2- Uploading Metadata to IPFS  <span id="step1Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="step1Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>`;
    
                      step2.innerHTML = `<h5>3- Select network:<span id="step2Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="step2Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>
                     <div id="chainSelector">
                      <select id="tokenContractAddress"> </select><br /> (<span id="tcaddr">Contract Address</span>) <br>
                      <span id="timer"></span> 
                      </div>`

                      addTCAddressesToUI();
                     
                      var remainingSeconds = 5;
                      var timer = setInterval( function() {
                        console.log(remainingSeconds + " seconds remaining...");
                        document.getElementById('timer').innerHTML = `${remainingSeconds} seconds remaining...`
                        remainingSeconds--;

                        if (remainingSeconds < 0) {
                          clearInterval(timer);
                          selectedChain = tokenContractAddress.value;
                        document.getElementById('step2Spinner').style.display= 'none'
                        document.getElementById('step2Check').style.visibility= 'visible'
                        
                        let contractAddressLink = selectedChain.split(',')[4] +'address/' + selectedChain.split(',')[1];
                        console.log('contractAddressLink: ', contractAddressLink)
                        chainSelector.innerHTML+= `<code>${selectedChain.split(',')[3]} selected.  <a href="${contractAddressLink}" target="_blank" rel="noopener noreferrer">view</a></code>`;
                        console.log('SELECTED INDEX: ',tokenContractAddress.selectedIndex)
                        document.getElementById("tokenContractAddress").disabled = true;

                           // // PREPARE TX LINK
                          console.log("Timer done!");
                        }
                      }, 1000);
                   
                      

                   
  // STEP 3
  // Wait for 6 seconds before continuing execution
  setTimeout(async () => {
    console.log('Execution resumed after waiting...')

                      
                      step3.innerHTML= `<h5>4- MINTING: Make the Transaction!  <span id="step3Spinner" style="" class="spinner-grow spinner-grow-sm"></span>   <svg id="step3Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"  style="fill:#00ff00"/></svg> </h5>`;
                          setTimeout(() => { step3.classList.add('visible') }, 400);
    
                 //   -------------------------------------------------------------
                  // 0- CHECK OWNERSHIP (check if is no owner already)
                  let chain  =   tokenContractAddress.options[tokenContractAddress.selectedIndex].value.split(',')[3];
                  let uAddress =  userAddress;
                  let tAddress = tokenContractAddress.options[tokenContractAddress.selectedIndex].value.split(',')[1];
                  let tAbi = ABIs[tokenContractAddress.options[tokenContractAddress.selectedIndex].value.split(',')[2]];
                  console.log('mintUPT:', chain, uAddress, tAddress)


              // GET NETWORK
                  let provider = await new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`);
                  console.log('PROVIDER:', provider);

                    try{ network = await provider.getNetwork(); }
                    catch (error) { console.log(error.message); fixedToast.fire( 'Error',error.message, "error"); 
                    mode.innerHTML = 'OFFCHAIN'; mode.style.border = '1px solid red'; mode.style.color = 'red'; }
                    console.log('Chain ID:', network.chainId);
  
  
                    //   -------------------------------------------------------------
                    // CHECK IF OWNER OWNS AN NFT ALREADY
                    contract = new ethers.Contract(tAddress, tAbi, provider)
                    console.log('CONTRACT: ', contract)
                    try { tokenIdbyAddr = await contract.TIds(uAddress) }
                    catch (error) { console.log('error:', error); return; }
                    console.log('tokenIdbyAddr', tokenIdbyAddr)
                    let  tid = parseInt( tokenIdbyAddr, 16)
                    console.log('tid', tid)
                    
                    console.log('OWNER?: tokenIdbyAddr: ',tokenIdbyAddr )
                    // A- IF USER DOESNT OWN A TOKEN
                    if(tid == 0) {
                      console.log('YOU DONT HAVE A UNIVERSAL PASS ')
                    } else {
                      console.log('YOUR ARE OWNER OF UP TOKEN',tid )
                      Toastnoclose.fire('', `YOUR ARE OWNER OF UP TOKEN ${tid}`, "info");
                      return
                    }


                    //   -------------------------------------------------------------
               // MAKE THE TRANSACTION
                console.log('we start minting process',tAddress, tAbi, provider,ipfsLink)
                //  mintUniversalPass(ipfsLink,localWallet)
                const signer = localWallet.connect(provider)
                const address = await signer.getAddress();
                balance = await signer.getBalance();
                console.log('address and balance:', address,  parseInt( balance, 16))

                const contractWithSigner = contract.connect(signer);
                const gasLimit = await contractWithSigner.estimateGas.mintUniversalPass(ipfsLink);
                // console.log('gasLimit: ', parseInt( gasLimit.hex, 16))
                console.log('gasLimit:', parseInt( gasLimit, 16))



            //   NEXT STEP
              step3Check.style.visibility= 'visible';
              step3Check.innerHTML= '<i class="fa-regular fa-circle-check"  style="color:#00ff00"></i>';
              document.getElementById('step3Spinner').style.display= 'none'

            //TRANSACION PASSED: WAITING FOR CONFIRMATIONS
              step4.innerHTML+= `<h5>Waiting for confirmations!  <span id="step2SpinnerConfirmation" style="" class="spinner-grow spinner-grow-sm"></span>   <svg id="step2CheckConfirmation"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"  style="fill:#00ff00"/></svg> </h5>`;




              // const tx = await contractWithSigner.mintUniversalPass(ipfsLink, { gasLimit: gasLimit });
              try { tx = await contractWithSigner.mintUniversalPass(ipfsLink, { gasLimit: gasLimit })}
                catch (error) { 
                  console.log('error:', error); 
                    Toast.fire('Mint error!',error.message, "error"); 
                    step4.innerHTML= error.message;
                  return; }

              const receipt = await tx.wait();
              console.log(`Transaction confirmed with ${receipt.gasUsed} gas`);
              console.log(`receipt ${receipt} `);

              // delete IPFSdistributions
            localStorage.removeItem('IPFSdistributions')
            localStorage.removeItem('lastIpfsDistroCID')


              
                step4.classList.add('visible')
                let printMintSuccessMessage = `
                <div class="container">
                <div class="row">
                <div class="col">
                <img src="undraw_winners_re_wr1l.svg" alt="" style="width: 100%;">

                </div>
                <div class="col text-center d-flex align-items-center">
                GREAT! You minted your UP token .
                <svg id="step3Check"    width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"  style="fill:#00ff00"/></svg>

                </div>
                </div>
                </div>
                `
                step4.innerHTML= printMintSuccessMessage

                //  ALLOW CLOSING MODAL
                cancelMinting.classList.remove('btn-danger') 
                cancelMinting.classList.add('btn-secondary') 
                cancelMinting.innerHTML='close'
                cancelMinting.disabled = false;//ENABLE CANCEL




            }, 6000)

        //   FIN
            });

// ---
                      } catch (error) {
                        console.log('ERROR AT LOCALWALLET DECRYPTING:', error);
                         Toast.fire({ icon: 'error', title: 'Password incorrect' })
                        return;
                        }


                    

                      }
                      else if (result.isDismissed	) { console.log('password cancelled:'); return false }

                      })

         

  
  // FIN MINT CON LOCALWALLET
                  }
                } else {
                    console.log('NO WALLET CHOICE available')
                  return
                }

}



    /*********************************************************************************************
    .) PREPARE METADATA
              // MODELO DE METADATA OPENSEA
              // {
              //   "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.", 
              //   "external_url": "https://openseacreatures.io/3", 
              //   "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png", 
              //   "name": "Dave Starbelly",
              //   "attributes": [ ... ], 
              // }

              // example;
              // {"name":"IAM-chm-04181980",
              "description":"Iuris Naturalis NFT",
              "external_url":"https://w3s.link/ipfs/bafkreigfyowhdf6wf4ww2owys4behu53nj3cwzr2w5iih67pwk2byg6epi","attributes":""}
    **********************************************************************************************/
              async function prepareMetadata(){

                let name = localStorage.getItem('iamcode')
                // let image= localStorage.getItem('image');
                // let image= `iam_logo.jpg`;
              // ---------
              // description
              let description = `Iuris Naturalis NFT`
              let cid = localStorage.getItem('lastIpfsDistroCID')
              let exturl = `${cid}`;
              // let exturl = `${ipfsGateway}${cid}`;
              let attr = '';
              
                const preURIMetadata = { 
                name: name, 
                description: description, 
                external_url: exturl, 
                // image: image, 
                attributes: attr }; 
                  
                  return preURIMetadata
              }
              

                 

   
  function addTCAddressesToUI (){
  
    const sel = document.getElementById("tokenContractAddress");
      for (var i = 0; i < optionsList.length; i++){
        var obj = optionsList[i];
        let tn = optionsList[i].TOKEN_NAME;
        let ta = optionsList[i].TOKEN_ADDRESS;
        let tb = optionsList[i].TOKEN_ABI;
        let tch = optionsList[i].TOKEN_CHAINID;
        let exp = optionsList[i].EXPLORER;
        
    
        const opt = document.createElement("option");
        opt.value = `${tch},${ta},${tb},${tn},${exp}`;
        opt.text = `${tn}`;
        sel.add(opt, null);
    
      }
    
      tcaddr.innerHTML= tokenContractAddress.options[0].value.split(',')[1];//display contract address on page load
      
      
      tokenContractAddress.onchange = function(e) {
        console.log('select changed!',this.value)
        // console.log('select !',this.option)
        tcaddr.innerHTML= this.value.split(',')[1];
      }
    }


    
        /*********************************************************************************************
    .) BURN NFT
    **********************************************************************************************/
    async function burnNFT(tid){
      console.log('you are going to burn your universal pass token')

      // GET PARAMS
      let UPJSON = JSON.parse(localStorage.getItem('Up_JSON'))

      if(!UPJSON){
        // console.log('there is no UPJSON')

             let prefIndex = 0;
            let tAddr = optionsList[prefIndex].TOKEN_ADDRESS;
            let tAbi =ABIs[optionsList[prefIndex].TOKEN_ABI]
            let tChain =ABIs[optionsList[prefIndex].TOKEN_CHAINID]
            console.log('there is no UPJSON: ',tid,tAddr, tChain,tAbi)

      } else {
        console.log('there is UPJSON:' , UPJSON)

        // let tid = UPJSON.tId
        let  tid = parseInt( UPJSON.tId.hex, 16)
        let tAddr = UPJSON.tAddr
        let tChain = UPJSON.tChain

        console.log('UP_JSON INFO: ',tid,tAddr, tChain)

        // USAGE: filterValuePart(optionsList, "0xafA14234a25c1f051cB620c561462Da78D52e4B9");
            let tAbiSearch =filterValuePart(optionsList, tAddr);
            let tAbi = tAbiSearch[0].TOKEN_ABI
            console.log('TOKEN ABI FROM SEARCH: ', tAbi)
            console.log('tChain: ',tChain)
            console.log('tAbi: ',tAbi)
            console.log('tAddr: ',tAddr)
      }
      
    // ASK USER TO BURN TOKEN
  await Swal.fire({
  title: 'You will burn your Universal Pass token',
  text: 'would you like to continue?',
  icon: 'info',
  showCancelButton: true,
  confirmButtonText:'<i class="fa-solid fa-fire"></i> Oui, Burn!',
  confirmButtonAriaLabel: 'Changer!',
  showLoaderOnConfirm: true,
  footer: '<a target="_blank" href="/docs/index.html#/?id=signatures">What is a this?</a>',
  allowOutsideClick: () => {
  const popup = Swal.getPopup()
  popup.classList.remove('swal2-show')
  setTimeout(() => { popup.classList.add('animate__animated', 'animate__headShake') })
  setTimeout(() => { popup.classList.remove('animate__animated', 'animate__headShake') }, 500)
  }
  })
  .then( async (result) => {
  if (result.isConfirmed) {

              // ---
await Swal.fire({ title: 'Unlock your LOCALWALLET', input: 'password', inputAttributes: { autocapitalize: 'off' }, showCancelButton: true, confirmButtonText: 'Enter', showLoaderOnConfirm: true, backdrop: true, preConfirm: (login) => { }, allowOutsideClick: () => { const popup = Swal.getPopup(); popup.classList.remove('swal2-show'); setTimeout(() => { popup.classList.add('animate__animated', 'animate__headShake') }); setTimeout(() => { popup.classList.remove('animate__animated', 'animate__headShake') }, 500); return false }, })
.then((result) => {
if (result.isConfirmed) {
console.log('password entered!')
  
let encryptedjson = localStorage.getItem('jsonWallet')
let ew = JSON.parse( encryptedjson)
console.log('pub key of wallet in localstorage:', ew.address)

openModalId('#walletBurn')
burnstep0.innerHTML= `<h5>1- Decrypt wallet  <span id="burnstep0Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="burnstep0Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>
<div id="burnstep0Progress"></div>`;

let wallet;
try { 
wallet =  ethers.Wallet.fromEncryptedJson(encryptedjson, result.value, burndecryptProgress)
.then(async (localWallet) => {

  // STEP 0
  // w=localWallet;
  console.log('WALLET DECRYPTED: ', localWallet.address)

  // console.log('WALLET DECRYPTED: ', wallet.address)
  document.getElementById('burnstep0Spinner').style.display= 'none'
  document.getElementById('burnstep0Check').style.visibility= 'visible'
  document.getElementById('burnstep0Progress').innerText= ''

// STEP 2 . get aproximated gas for the tx
  burnstep1.innerHTML= `<h5>2- Aproximated gas for transaction:   <span id="burnstep1Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="burnstep1Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>
  <div id="burnstep1Progress"></div>`;
    // cancel button
    cancelburnbutton.disabled = true;
    cancelburnbutton.classList.add('cancel-burn');
 
    let provider;
    try{ provider = await new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`); }
    catch (error) { console.log('error:', error); return; }

    

  let prefIndex = 0;
  let tAddr = optionsList[prefIndex].TOKEN_ADDRESS;
  let tAbi =ABIs[optionsList[prefIndex].TOKEN_ABI]
  let tChain =ABIs[optionsList[prefIndex].TOKEN_CHAINID]
  // let tId =  parseInt( tokenIdbyAddr, 16)

  // let tId = tId.toString()
  contract = new ethers.Contract(tAddr, tAbi, provider)
  console.log('tAddr, tAbi, provider: ',tAddr, tAbi, provider)

  try { tokenIdbyAddr = await contract.TIds(localWallet.address) }
  catch (error) { console.log('error:', error); return; }
  console.log('tokenIdbyAddr', tokenIdbyAddr)
  // let  tId = parseInt( tokenIdbyAddr, 16)
  const tId = tokenIdbyAddr.toString(10);

  console.log('tId', tId)
    
     
     const signer = localWallet.connect(provider)
          console.log('signer:', signer)
          const address = await signer.getAddress();
          balance = await signer.getBalance();
          console.log('address and balance:', address,  parseInt( balance, 16))
          const contractWithSigner = contract.connect(signer);
          console.log( 'contractWithSigner: ',contractWithSigner)
          cws = contractWithSigner;

          console.log(`burnUniversalPass("${tId}")`);
          const gasLimit = await contractWithSigner.estimateGas.burnUniversalPass(tId);
          console.log('gasLimit:', parseInt( gasLimit, 16));
          // gas:
          document.getElementById('burnstep1Progress').innerHTML = `${parseInt( gasLimit, 16)}`
          document.getElementById('burnstep1Spinner').style.display= 'none'
          document.getElementById('burnstep1Check').style.visibility= 'visible'
          document.getElementById('burnstep1Progress').innerText= ''
 
//  STEP 3 MAKING THE TX (AWAITING FOR CONFIRMATION)         

document.getElementById('burnstep2').innerHTML= `<h5>3- Making the transaction...   <span id="burnstep2Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="burnstep2Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5> `


          try { tx = await contractWithSigner.burnUniversalPass(tId, { gasLimit: gasLimit })}
            catch (error) { console.log('error:', error); Toast.fire('Mint error!',error.message, "error"); return; }

          const receipt = await tx.wait();
          console.log(`Transaction confirmed with ${receipt.gasUsed} gas`);
          
          success_messagewalletBurn.style.display = 'block'
          success_messagewalletBurn.innerHTML = `Transaction confirmed with ${receipt.gasUsed} gas`
          
          cancelburnbutton.disabled = false;



    // RELOAD UI
    console.log('RELOAD UI')
    init()






})
}
catch (error) {
  console.log('ERROR AT LOCALWALLET DECRYPTING:', error);
   Toast.fire({ icon: 'error', title: 'Password incorrect' })
  return;
  }

}})


    // ------------------------------------

  } else if (result.isDismissed) {
    Toast.fire('', 'Burn canceled!', "info");
    console.log('Burn canceled!');
  return;
  }
  })

}






  // *********************************
  // nftIpfsDistro()
  // *********************************
  async function nftIpfsDistro(ipfsjson,tid,universalPassData,uplink,img){

    console.log("nftIpfsDistro",ipfsjson,tid,universalPassData,uplink,img)
    
    let index = 0 ;
    let ipfsDistros = ipfsjson;
    if(!ipfsDistros){
        console.log('THERE IS NO ipfsDistros')
        return
    }

    // document.getElementById('mint').style.display ='none'
     ipfsdist =  JSON.parse(signed);
    let iamcode = ipfsdist.iamCode
    const targetTimestamp = parseInt(universalPassData.dateCreated,16)*100; // Replace with your own target timestamp
    console.log('targetTimestamp:',targetTimestamp)
    

    let docs = ipfsdist.iamDocuments;
    console.log('DOCS LENGTH: ', docs.length)
    console.log('DOCS : ', docs)
    await localStorage.setItem('mintedDocuments', JSON.stringify(docs));

    
    // LINKIPFS
    let linkIPFS = universalPassData.uri;// dejar el espacio para poder cambiar el link ipfs desde la UI en caso de update
    
    // ADD IMG
    let photo =  ipfsdist.iamPhoto
    // console.log('IMG: ', JSON.parse(photo))

  // GET CONFIG 
  let preferedOption = localStorage.getItem('preferedOption');
  if(!preferedOption){
      console.log('THEREs NO CONFIG SETTED');
  preferedOption = 0;

  }
  let tokenExplorer =  optionsList[preferedOption].EXPLORER;
  let tokenContract =  optionsList[preferedOption].TOKEN_ADDRESS;

  let contractLink =`${tokenExplorer}address/${tokenContract}`;
  var shortTokenContract = tokenContract.substring(0, 6) + "..."+ tokenContract.substring(38, 42);

//   let contractLink =`${tokenExplorer}/address/${tokenContract}`;
  console.log('CONTRACT LINK:', contractLink)
  document.getElementById('soveraindocs').setAttribute('style', 'display:inline!important');

    soveraindocs.innerHTML = ` 
<div class="container">
  <div class="row">
    <div class="col-md-6 center">
      <div class="card flex-row mb-4">
        <div class="card-body">
        <div id="canvas"></div>
      
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card flex-row mb-4">
        <div class="card-body">
          <h5 class="card-title">ACTIONS</h5>
          <p class="card-text">NFT Id:<code> ${tid}</code></p>

    <p class="card-text published">Public Documents (<code>${docs.length}</code>):
     <code>   <a href="${uplink}" target="_blank" rel="noopener noreferrer" >IPFS link</a>
    <i class="fas fa-trash iconbutton" aria-hidden="true" onclick="event.stopPropagation();deleteIpfsDistro((this.parentElement))"></i> 
    </code></p>

        <p class="card-text">Contract:<code> 
          <a href="${contractLink}" class="actionsLink">${shortTokenContract}</a>
        </code></p>


        <p class="card-text published">Metadata:
        <code>   <a href="${universalPassData.uri}" target="_blank" rel="noopener noreferrer" >${universalPassData.uri}</a>
       </code></p>

          <p class="card-text">Validators: <code>-</code></p>

          <div class="card flex-row mb-4">
          


    <a href="#" class="btn btn-primary" onclick="event.stopPropagation();editIpfsDistro()">+DOCUMENTS</a>

          </div>
          <br>




  <div class="card flex-row mb-4">
  <a href="#" class="btn btn-danger" onclick="event.stopPropagation();receive()" data-bs-toggle="tooltip" title="Receive"><i class="fas fa-satellite-dish"></i> </a>
  <a href="#" class="btn btn-success" onclick="event.stopPropagation();openWalletSend()"  data-bs-toggle="tooltip"  title="Send"><i class="fas fa-paper-plane"></i> </a>
  <button id='amount'> 
    <div id="loader" class="loader">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
  </button>


  </div>
  <br>



  <div class="card flex-row mb-4">


  <a href="#" style='display:none' class="btn btn-secondary" onclick="event.stopPropagation();mintUPT()">UPDATE</a>

  </div>



        </div>
      </div>
    </div>
  </div>
</div>



<div id="content" class="container" style="display:none">

    <div id="head"> 
          <div id="iamInfo"> 
                <h1 id="iamCode">${iamcode}</h1> 
                <h3 id="iamTokenId"></h3> 
          </div>
          <img id="iamImg" src="logoIN6.png" > 
    </div> 
    

<div id="editMintedDocs"></div>

<div id="mintedDocs">
    
    <table class="table" id="myTable" data-card-width="837"> 
          <thead> <tr> <th data-card-title="">Title</th> <th data-card-action-links="">CID</th> <th data-card-footer="">Actions</th> </tr> </thead> <tbody id="tbody"> </tbody> 
    </table>
    
    </div> 

  </div> 
    
    <ol id="footer" class="list-group list-group-numbered container" style="display:none"> 
    <li class="list-group-item">ADDRESS: <br>
          <p id="iamAddress" style="word-wrap:break-word"></p>
          <svg id="addrTrue"  style="display:none" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg">   <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" id="addressIsTrue" style="fill:#00ff00" /> </svg>
          <svg id="addrFalse"  style="display:none"  width="18" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" id="addressIsFalse" style="fill:#ff0000"/></svg>   
    </li> 
    <li class="list-group-item"> HASH:<p id="iamHash" style="word-wrap:break-word"> </p></li> <li class="list-group-item">SIGNATURE <p id="iamSignature" style="word-wrap:break-word"></p></li> 
    </ol>
    
    <div class="card text-center">
    <div class="card-footer text-muted">
      Updated 2 days ago
      <br>
      Last checked: Today  07:52:42 resyncIcon
    </div>
  </div>
`
    

//QR
const qrCode = new QRCodeStyling({ width: 300, height: 300, type: "png", data: uplink, image: `logoIN6.png`, 
dotsOptions: { color: "#1568B0", type: "extra-rounded" }, 
backgroundOptions: { color: "var(--qrbackground)", }, 
imageOptions: { crossOrigin: "anonymous", margin: 0 } });
qrCode.append(document.getElementById("canvas"));
console.log('qr code APPENDED')


// ADD DOCS
    docs.forEach((e => {
        let t = e.title,
            n = e.cid,
            i = e.courtesy_translations;
        var s = [];
        i.forEach(((e, t) => {
            let n = e.lang,
                i = `<button type="button" class="btn btn-outline-info px-3 waves-effect" onclick="event.stopPropagation(); viewItem('${e.cid}')"> \n                    <span>${n} </span><svg width="18" height="16" class="svg-inline--fa fa-language" aria-hidden="true" data-prefix="fas" data-icon="language" role="img" viewBox="0 0 640 512"> <path fill="currentColor" d="M0 128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm320 0v256h256V128H320zm-141.7 47.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1.1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2l19 42.8h-38l19-42.8zM448 164c11 0 20 9 20 20v4h60c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4.9.6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9L467 333.8c-4.5-2.7-8.8-5.5-13.1-8.5-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8L410 286.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6.5.5c12.4-13.1 22.5-28.3 29.8-45H376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" /> </svg> \n                </button> `;
            s.push(i)
        }));
        let o = ` <tr> <td>${t} </td> <td> <p class='card-link' onclick="event.stopPropagation();copyItem('${n}')"> ${n}</p> </td> <td> <button type="button" class="btn btn-outline-info px-3 waves-effect" onclick="event.stopPropagation();viewItem('${n}')"> <svg width="18" height="16" class="svg-inline--fa fa-eye" aria-hidden="true" data-prefix="fas" data-icon="eye" role="img" viewBox="0 0 576 512"> <path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm144 224c0 79.5-64.5 144-144 144s-144-64.5-144-144 64.5-144 144-144 144 64.5 144 144zm-144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.6-8.4-.2 2.8-.4 5.5-.4 8.4 0 53 43 96 96 96s96-43 96-96-43-96-96-96c-2.8 0-5.6.1-8.4.4 5.3 9.3 8.4 20.1 8.4 31.6z" /> </svg> </button> ${s.join("")} </td> </tr>`;
        tbody.innerHTML += o

        console.log('docs.forEach EXECUTED')
    }));
    
    
    content.style.display= 'block'

// SHOW ADDRESS BALANCE
 getAddressBalance(userAddress)
  .then(balance => {
        console.log(`Balance of ${userAddress}: ${balance} ETH`);  
        document.getElementById('amount').innerHTML= ` ${balance} ETH`
  })
  .catch(error => {
    console.error('Error:', error);
  });


    // HIDE LOADER loader
    // customLoader.style.display = "none"
    document.getElementById('loader').style.display='none'
    console.log('LOADER DELETED!')
            // document.getElementById('splash').style.display='none'
            document.getElementById('splash').setAttribute('style', 'display:none');
    



  // TOOLTIPS
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

  }




  // *********************************
  // makeOnchain()
  // *********************************
  async function makeOnchain(){
    console.log('Making onchain attestation')
    
  }

    // *********************************
  // makeIAMOnchain()
  // *********************************
  async function makeIAMOnchain(){
    console.log('Making IAM code onchain attestation')
    
  }