
  //  PUBLISH TO IPFS
    
  async function createIPFSDelivery(){
  
    //   if (!user) { 
    
    if(typeof userAddress === 'undefined'){
        Swal.fire({
          title: "Connect first",
             imageUrl: 'undraw_login_re_4vu2.svg', 
             imageWidth: 400, 
             imageHeight: 200, 
             imageAlt: 'Connect!',
          showCancelButton: true,
          confirmButtonText: 'connect',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => {
            const popup = Swal.getPopup()
            popup.classList.remove('swal2-show')
            setTimeout(() => {
              popup.classList.add('animate__animated', 'animate__headShake')
            })
            setTimeout(() => {
              popup.classList.remove('animate__animated', 'animate__headShake')
            }, 500)
            return false
          },
      
        })
        .then((result) => {
          if (result.isConfirmed) {
            console.log('ok pressed',result)
        // login();
        openModal('#walletOptions')
      
            return
          } 
        })
      return
      }
      
    
        let loadIAM = localStorage.getItem('iamcode')
        let loadIAMIMG = localStorage.getItem('image')
        if (!loadIAM || !loadIAMIMG){
          Toast.fire( 'complete IAM code before sending documents','', "error");
          restoreEnvoiButton();
          return
        }
      
      
       
        // DISPLAY LOADER in button
        document.getElementById('createIPFSDelivery').innerHTML = ` <span class="spinner-grow spinner-grow-sm"></span> `;
        document.getElementById('createIPFSDelivery').disabled = true;
        
      
        //GET USER ADDRESS
        // let userAddress = user;
    
    
          // CREATE JSON OBJECT WITH DATA
            let iamCode2Sign = localStorage.getItem('iamcode')
            let iamPhoto2Sign = ' '
            let documents = JSON.parse(localStorage.getItem('documents')) || [];
            JSON2SIGN= {iamDocuments: documents,iamCode: iamCode2Sign,iamPhoto: iamPhoto2Sign,iamAddress: userAddress,iamDocuments: documents};
      
      
            // HASH JSON
            // var json = JSON.stringify(JSON2SIGN);
            // let hashedJson = ethers.utils.solidityKeccak256( [ "string"], [ json] );
    
            // FIX PROBLEMA DE VERIFICACION DE KEY
            let hashedJson = ethers.utils.solidityKeccak256( [ "string"], [ JSON2SIGN] );
    
            // console.log('json:',json)
            console.log('hashedJson:',hashedJson)
      
            
             // ASK USER TO SIGN
             await Swal.fire({
              title: 'SIGN THIS HASH TO CONTINUE',
              icon: 'info',
              html:hashedJson,
              showCancelButton: true,
              confirmButtonText:'<i class="fa-solid fa-signature"></i> Sign!',
              confirmButtonAriaLabel: 'Sign!',
              showLoaderOnConfirm: true,
              footer: '<a target="_blank" href="/docs/index.html#/?id=signatures">What is a signature?</a>',
              allowOutsideClick: () => {
              const popup = Swal.getPopup()
              popup.classList.remove('swal2-show')
              setTimeout(() => { popup.classList.add('animate__animated', 'animate__headShake') })
              setTimeout(() => { popup.classList.remove('animate__animated', 'animate__headShake') }, 500)
              }
              })
              .then( async (result) => {
              if (result.isConfirmed) {
              console.log('ok pressed',result,hashedJson)
              
              // SIGN JSON    
              let walletChoice = localStorage.getItem('wallet');
    
              if (walletChoice) {
    
                console.log('THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE')
                
                // IsMetamask
                if(walletChoice == "METAMASK"){
                  console.log('SIGN WITH METAMASK')
                       // 1- GET SIGNER
                       try { provider = new ethers.providers.Web3Provider(window.ethereum) }
                       catch (error) { console.log(error.message); fixedToast.fire( 'Error',error.message, "error"); }
                   
                       try { signer = provider.getSigner()}
                       catch (error) { console.log(error.message); }
                       
                       // 2- NOW SIGN
                       let toSign = ethers.utils.arrayify(hashedJson)
                       try{ signature = await signer.signMessage( toSign );}
                       catch (error) { console.error("An error occurred:", error); Toast.fire( 'An error occurred','', "error"); return }
                       console.log('signature:', signature ) ;
                    }
                    
                    
            // -------------------------------------------------------
            // IsLocawallet
                if(walletChoice =="LOCALWALLET"){
                    console.log('SIGNING WITH LOCALWALLET')
    
                // GET PASSWORD
                Swal.fire({
                    title: 'Decrypt your wallet to sign this hash',
                    input: 'password',
                    inputAttributes: { autocapitalize: 'off' },
                    showCancelButton: true,
                    confirmButtonText: 'Enter',
                    showLoaderOnConfirm: true,
                    backdrop: true,
                    preConfirm: (login) => { },
                    allowOutsideClick: () => {
                        const popup = Swal.getPopup()
                        popup.classList.remove('swal2-show')
                        setTimeout(() => { popup.classList.add('animate__animated', 'animate__headShake') })
                        setTimeout(() => { popup.classList.remove('animate__animated', 'animate__headShake') }, 500)
                        return false
                    },
                })
            .then((result) => {
                if (result.isConfirmed) {
                    if(result.value ==''){ console.log('IS EMPTY'); Toast.fire({ icon: 'error', title: 'Password cannot be empty' }); return; }
    
                    // Use the Wallet.fromEncryptedJson() method to decrypt the wallet\
                    let encryptedJson = localStorage.getItem('jsonWallet')
    
                    // SHOW DECRYPT PROGRESS 
                    const progressCallback = (percent) => {
                    // Update the progress bar
                    console.log(`Decrypting... `);
                    walletProgressContent.innerHTML =`<div ;class="progress">
                    <div class="progress-bar" role="progressbar" style="width:  ${percent*100}%;" aria-valuenow="${percent*100}" aria-valuemin="0" aria-valuemax="100">${ Math.round(percent * 100)}%</div>
                  </div>`
                    };
    
    
                    // ethers.Wallet.fromEncryptedJson(encryptedJson, result.value)
                    openModalId('#walletProgress')
                    // openModal('#walletProgress')
                    ethers.Wallet.fromEncryptedJson(encryptedJson, result.value, progressCallback)
                        .then(async(wallet) => {
                          console.log("wallet:", wallet);
     
                    // SIGN!
                    // 1- GET SIGNER
                        try { provider = new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`);}
                        catch (error) { console.log(error.message); fixedToast.fire( 'Error',error.message, "error"); }
                        console.log('provider:', provider)
                   
    
                    // try { signer = provider.getSigner()}
                        try { signer = wallet.connect(provider);}
                        catch (error) { console.log(error.message);}
                        console.log('signer:', signer)
    
                    //   // 2- NOW SIGN
                    let toSign = ethers.utils.arrayify(hashedJson)
                        try{ signature = await signer.signMessage(toSign);}
                        catch (error) { console.error("An error occurred:", error); Toast.fire( 'An error occurred','', "error"); closeWalletProgress.disabled= false; return }
    
                        console.log("RESULT:", signature);
                          // ......Queue...Queue...Queue...Queue...Queue..
    
    
                        // PREPARE JSON FOR SIGNED WEBPAGE
                        let jsonforwebsite =JSON.stringify(JSON2SIGN)
                        console.log('JSON2SIGN: ',JSON2SIGN)
                        let sigObject = {iamSignature: signature}
                        let signatureforwebsite =JSON.stringify(sigObject)
                        
                        // error
                        let iamphoto = localStorage.getItem('image');
                        
                        
                        //  CREATE SIGNEDIPFS WEBSITE
                        // signedipfsWebsite (signedjson,signature,iamphoto,ipfsurl){ 
    
                        let signedIpfsWebsite;
                        console.log( 'signedipfsWebsite', jsonforwebsite, signatureforwebsite,iamphoto);
                        try { signedIpfsWebsite =  await signedipfsWebsite( jsonforwebsite, signatureforwebsite,iamphoto); }
                        catch (error) { 
                          console.log(error.message, 'ERROR EN  signedipfsWebsite()'); 
                          closeModalId('#walletProgress');
                          // closeModalId('#walletProgress');
                          reloadTranslations();
                          document.getElementById('createIPFSDelivery').disabled = false;
    
    
                          return }
    
                        console.log('signedIpfsWebsite:',signedIpfsWebsite)
    
    
                        // PREPARE FILE
                        let name = 'ipfspage.html';// funciona...
                        const files = [ new File([signedIpfsWebsite], name) ]
                        console.log('FILES: ',files)
    
                         // UPLOAD TO IPFS
                        const client = makeStorageClient()
                        try { CID =  await client.put(files, { wrapWithDirectory:false })}
                        catch (error) { console.log(error.message); restoreEnvoiButton();return }
    
    
                        let ipfsLink = `${ipfsGateway}${CID}`
                        console.log('IPFS STORED FILE AT :',ipfsLink)
                        console.log('cid:' ,CID);
                        localStorage.setItem('lastIpfsDistroCID', ipfsLink);
    
    
                        // SAVE SIGNED JSON INTOLOCALSTORAGE
                        localStorage.setItem('signedJson',jsonforwebsite )
    
                        //DELETE OLD LOCALSTORAGE
                        localStorage.removeItem('IPFSdistributions')
    
                        //SAVE TO LOCALSTORAGE
                        let timestamp = Date.now();
                        let ipfsDistro = { cid: CID, timestamp: timestamp, signature: signature, address:userAddress, signedJSON: jsonforwebsite }// agregar signedJSON
                        console.log('ipfsDistro: ',ipfsDistro)
                        SaveDataToLocalStorage(ipfsDistro);//save to IPFSdistributions
    
                        
                        setTimeout(() => {
                          // UPDATE UI
                          init();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 400);
    
    
    
      
                        // SUCCESS MESSAGE
                        closeModalId('#walletProgress')
                        Toastcenter.fire( '','VOTRE ENVOI EST TÉLÉCHARGÉ, SIGNÉ, ET PRÊT À ENVOYER!', "success");
    
    
    
                        // FIREFOWKS
                        // startConfetti();
                        setTimeout(() => {
                        // stopConfetti();
                        closeWalletProgress.disabled= false
                        // reloadIpfsDistros(0)
                        document.getElementById('soveraindocspremint').style.display='none'
                        reloadIpfsDistros()
    
    
                        }, 2000);
    
    
    
                    })
                    .catch((error) => {
                    console.log("Error:", error);
                    closeWalletProgress.disabled= false
                    fixedToast.fire( 'Error',error.message, "error");
                    document.getElementById('createIPFSDelivery').innerHTML = `PUBLISH `;
                    document.getElementById('createIPFSDelivery').disabled = false;
                    });
    
    
                    }
                })
            }
    }
       
              
                
            
            }  else if (result.isDismissed) {
              Toast.fire('', 'Signing canceled!', "info");
              restoreEnvoiButton();
              reloadTranslations();
              // return 
            }
      
      
              })
       
        };
      



  /*********************************************************************************************
  .) signedipfsWebsite() 
    CREATE SIGNED IPFS WEBPAGE
    creates JSON, sign it, creates a webpage with json and signature, uploads it to IPFS and returns CID
     <meta http-equiv=”Content-Security-Policy” content=”connect-src 'self' blob: data: https://*.w3s.link https://*.nftstorage.link https://*.dweb.link https://ipfs.io/ipfs/ https://*.web3.storage https://*.nft.storage https://tableland.network https://*.tableland.network" ; default-src ’self’ 'unsafe-inline' 'unsafe-eval' *.w3s.link   ${ipfsGateway} ${ipfsGatewayCID};”>
     <meta http-equiv=”Content-Security-Policy” content=”  data: https://*.w3s.link https://*.nftstorage.link https://*.dweb.link https://ipfs.io/ipfs/ https://*.web3.storage https://*.nft.storage https://tableland.network https://*.tableland.network ; default-src ’self’ 'unsafe-inline' 'unsafe-eval' *.w3s.link   ${ipfsGateway} ${ipfsGatewayCID};”>
  **********************************************************************************************/

      async function signedipfsWebsite (signedjson,signature,iamphoto){ 
        
        let ipfsurl = '*.ipfs.w3s.link';
        let fontsurl  ='fonts.googleapis.com';
         
      
      let verifiedWebpage = `<!doctype html>
      <html><head>      
      <meta http-equiv="Content-Security-Policy" content="
      img-src 'self' data: ${ipfsurl} ;
      style-src-elem 'self'  'unsafe-inline' ${ipfsurl} ${fontsurl};

      ">


      <meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="icon" href="${ipfsGatewayCID}favicon.55e17813.ico" type="image/x-icon"><title></title><link rel="stylesheet" href="${ipfsGatewayCID}jsonVerifyCID.cf7b0304.css"></head><body> <nav class="bg-primary navbar navbar-expand-sm"> <div class="container-fluid justify-content-center"> <a class="navbar-brand" href="#"> <img src="https://bafkreihlte3mt73shm23deyp4toqwa53qt635grfpf7bsvyv2rmynzx2qu.ipfs.w3s.link/" alt="Avatar Logo" style="width:40px" class="rounded-pill"> </a> </div> </nav> <div type="application/json" id="signed">${signedjson}</div> <div type="application/json" id="signature">${signature}</div> 
      <div id="content" class="container" style="display:none"> <div id="head"> <div id="iamInfo"> <h1 id="iamCode"></h1> <h3 id="iamTokenId"></h3> </div>
      <img id="iamTokenImg" src=${iamphoto}></div> 
      <table class="table" id="myTable" data-card-width="837"> <thead> <tr> <th data-card-title="">Title</th> <th data-card-action-links="">CID</th> <th data-card-footer="">Actions</th> </tr> </thead> <tbody id="tbody"> </tbody> </table> </div> <ol id="footer" class="list-group list-group-numbered container" style="display:none"> <li class="list-group-item">ADDRESS: <br> <p id="iamAddress" style="word-wrap:break-word"></p> <svg id="addrTrue"  style="display:none" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg">   <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" id="addressIsTrue" style="fill:#00ff00" /> </svg><svg id="addrFalse"  style="display:none"  width="18" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" id="addressIsFalse" style="fill:#ff0000"/></svg>   </li> <li class="list-group-item"> HASH:<p id="iamHash" style="word-wrap:break-word"> </p></li> <li class="list-group-item">SIGNATURE <p id="iamSignature" style="word-wrap:break-word"></p></li> </ol>
      <script id="INIT">signed.style.display="none",signature.style.display="none",content.style.display="block",footer.style.display="block",ipfsGateway="${ipfsGateway}";</script> 
      <script src="${ipfsGatewayCID}jsonVerifyCID.336889fc.js"></script>
      <script src="${ipfsGatewayCID}jsonVerifyCID.20251b0b.js"> </script>  
      <script src="${ipfsGatewayCID}jsonVerifyCID.20251b0b.js"> </script>  
      <script src="https://bafybeiajps2emmwlgbfd2c3getgjmrczlwpy6k7jsmseiq246uxnyurouq.ipfs.w3s.link/script.min.js"></script> 
      <script src="${ipfsGatewayCID}jsonVerifyCID.98ee8ceb.js"></script> 
      <script src="${ipfsGatewayCID}jsonVerifyCID.73cbde04.js"></script> 
      </body></html>`;
       
      return verifiedWebpage
    }
  


  // *********************************
  // reloadIpfsDistros()
  // *********************************
  async function reloadIpfsDistros(){
    console.log('RELOADIPFSDISTROS ')
    let index = 0 ;
    // ADD IAM
    let ipfsDistros = JSON.parse(window.localStorage.getItem('IPFSdistributions'));
    if(!ipfsDistros){
        console.log('THERE IS NO ipfsDistros')
        return
    }


    let ipfsdist = JSON.parse(ipfsDistros[0].signedJSON)
    let iamcode = ipfsdist.iamCode;
    let cid = ipfsdist.cid;
    console.log('CID: ', ipfsdist)
    
    let lIDC = localStorage.getItem('lastIpfsDistroCID');

    if(!lIDC){
      console.log('CID v2 NOT FOUND',lIDC)
    } else {
      console.log('CID v2: ', lIDC)
    }

    let docs = ipfsdist.iamDocuments;
    console.log('DOCS LENGTH: ', docs.length)
    
    // LINKIPFS
    linkIPFS = `${ipfsGateway}${lIDC}`;// dejar el espacio para poder cambiar el link ipfs desde la UI en caso de update
    console.log('linkIPFS???',linkIPFS)
    // ADD IMG
    let srcimg = await JSON.parse(window.localStorage.getItem('image'));
    if(!srcimg){ console.log('NO SRCIMG'); return}
    let img =  srcimg

    // get offchain attestation
        let offchainAttestation = localStorage.getItem('iamAttestation')


console.log('CLEARING #MAIN')
document.getElementById('soveraindocs').setAttribute('style', 'display:inline!important');
//<button type="button" class="btn btn-secondary " onclick="event.stopPropagation();copyIpfsDistro('${linkIPFS}')"><i class="fas fa-clipboard" aria-hidden="true"></i></button> 

{/* <p class="card-text published">Published:<code onclick="event.stopPropagation();copyIpfsDistro('${lIDC}')"> ${lIDC}</code></p> */}

    // main.innerHTML = ` 
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
    <h5 class="card-title" data-translate="actions">ACTIONS </h5>
    <p class="card-text">IAM attestation: <code>   <a href="${offchainAttestation}" target="_blank" rel="noopener noreferrer">offchain attestation</a>    </code></p>
    <p class="card-text">PoP: <code>-</code></p>
    <p class="card-text published">Published: <code>   <a href="${lIDC}" target="_blank" rel="noopener noreferrer">IPFS link</a>    </code> </p>
    <p class="card-text">Documents:<code> ${docs.length}</code></p>
    <p class="card-text">Signed: <code> -</code></p>
    
    <div class="card flex-row mb-4">
    <button class="btn btn-secondary  " id=""  onclick="event.stopPropagation();deleteIpfsDistro((this.parentElement))"><i class="fas fa-trash" aria-hidden="true"></i> </button>
    <button class="btn btn-secondary "  onclick="event.stopPropagation();viewIpfsDistro('${lIDC}')">
    
    <svg width="18" height="16" class="svg-inline--fa fa-eye" aria-hidden="true" data-prefix="fas" data-icon="eye" role="img" viewBox="0 0 576 512"> <path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm144 224c0 79.5-64.5 144-144 144s-144-64.5-144-144 64.5-144 144-144 144 64.5 144 144zm-144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.6-8.4-.2 2.8-.4 5.5-.4 8.4 0 53 43 96 96 96s96-43 96-96-43-96-96-96c-2.8 0-5.6.1-8.4.4 5.3 9.3 8.4 20.1 8.4 31.6z"></path> </svg>
    
    </button> 
    <button class="btn btn-secondary "  onclick="event.stopPropagation();editIpfsDistro((this.parentElement))"><i class="fas fa-pencil" aria-hidden="true"></i> </button>

          <button id='amount'> 

          <div id="loader" class="loader">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
          </button>


          </div>
          <br>

    <a href="#" class="btn btn-primary" onclick="event.stopPropagation();mintUPT()">ATTEST ONCHAIN</a>


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
          <img id="iamImg" src="${img}" > 
    </div> 
    
    <table class="table" id="myTable" data-card-width="837"> 
          <thead> <tr> <th data-card-title="">Title</th> <th data-card-action-links="">CID</th> <th data-card-footer="">Actions</th> </tr> </thead> <tbody id="tbody"> </tbody> 
    </table> 
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
    </div>
  </div>
`
    

//QR
const qrCode = new QRCodeStyling({ width: 300, height: 300, type: "png", data: lIDC, image: `iurisnaturalis.jpg`, 
dotsOptions: { color: "#1568B0", type: "extra-rounded" }, 
backgroundOptions: { color: "var(--qrbackground)", }, 
imageOptions: { crossOrigin: "anonymous", margin: 0 } });
qrCode.append(document.getElementById("canvas"));
console.log('qr code ADDED')



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
    }));
    
    
    content.style.display= 'block'

    // customLoader.style.display = "none"
    document.getElementById('loader').style.display='none'
    console.log('LOADER DELETED!')

    getAddressBalance(userAddress)
    .then(balance => {
          console.log(`Balance of ${userAddress}: ${balance} ETH`);  
          document.getElementById('amount').innerHTML= ` ${balance} ETH`
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


   // *********************************
  // DELETE
  // *********************************
  function deleteIpfsDistro(obj) {
    console.log("Delete IPFS Distro...",obj);
    let index =obj.children[0].innerText;
    let i = Number(index);
    console.log('index:', i)
     RemoveFromLocalStorage(i);

     localStorage.removeItem('IPFSdistributions')

     setTimeout(() => {
      Toastcenter.fire( '',`ENVOI IPFS deleted!`, "info");
      initv3();
    }, 500);
}

    // *********************************
  // viewIpfsDistro
  // *********************************
  function viewIpfsDistro(url) {
    window.open(url, '_blank').focus();

  }



  function editIpfsDistro(obj) {
    console.log("editIpfsDistro: ",obj);

    // rebuildIAMcode();
    // document.getElementById('edit').style.display ='none'
    addEditDocumentsUI()
    loadDocs()
    restoreEnvoiButton()
    reloadTranslations()

  }



  function restoreEnvoiButton(){
    let IPFSDELIVERY = localStorage.getItem('IPFSdistributions')
if(!localStorage.getItem('IPFSdistributions')){
    console.log('THERE IS NO IPFSdistributions ')

    document.getElementById('addDocsButtons').innerHTML=`  
    <button class="btn btn-warning btn-lg"  onclick="event.stopPropagation();canceleditIpfsDistro((this.parentElement))"><i class="fas fa-pencil" aria-hidden="true"></i> Cancel edit </button>`
    reloadTranslations()

    } else {
        console.log('YES THERE IS a IPFSdistributions ')
        document.getElementById('addDocsButtons').innerHTML=`  <button class="btn btn-primary btn-lg " id="createIPFSDelivery" onclick="event.stopPropagation();createIPFSDelivery((this.parentElement))"  data-translate="publicipfs"> <i class="fa-solid fa-envelope-circle-check"></i> Preparer comme Envoi IPFS</button> <button class="btn btn-warning btn-lg"  onclick="event.stopPropagation();canceleditIpfsDistro((this.parentElement))"><i class="fas fa-pencil" aria-hidden="true"></i> Cancel edit </button>`
        reloadTranslations()
    }
  }
  

  function canceleditIpfsDistro(obj) {
    document.getElementById('soveraindocspremint').style.display='none'
    
    // loadIpfsDistros()
    reloadIpfsDistros()
 
}