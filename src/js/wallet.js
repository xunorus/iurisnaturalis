
async function createWallet(pwd){
    
    try{ wallet = ethers.Wallet.createRandom()}
catch (error) { console.log(error.message); fixedToast.fire( 'Error',error.message, "error"); }

    console.log('address:', wallet.address)
    console.log('mnemonic:', wallet.mnemonic.phrase)
  

    // WRITE YOUR MNEMONIC PHRASE
      displayMnemonic.innerHTML = ` <h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height='40px' width='40px' fill="currentColor"> <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>Write down your mnemonic phrase to access your wallet in the future! :</h3> <div class="alert alert-warning alert-dismissible fade show"> <strong>${wallet.mnemonic.phrase}</strong> </div> `


    // CREATING ENCRYPTED LOCAL WALLET
      displayMnemonic.innerHTML += ` <div  id="loaderCW"  > <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> creating encrypted wallet ... </div> `

    // SAVE TO LOCALSTORAGE (encrypted?)
    console.log('password: ',pwd)
    const promisseJSON = wallet.encrypt( pwd);
    promisseJSON.then((jsonWallet) => {
    console.log(jsonWallet)
    console.log('WALLET ENCRYPTED')

    // loaderCW
    document.getElementById('loaderCW').innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

    <div class="alert alert-success d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
  <div>
    Wallet encrypted and saved into localstorage
  </div>
</div>
    `


    localStorage.setItem('jsonWallet', jsonWallet)
    console.log(' SAVED INTO LOCALSTORAGE')
    walletOptCreate.style.display = 'none';// boton CONNECT
    document.getElementById('walletDisconnect').style.display = 'block';
    document.getElementById('loader').style.display='block'
 
          // SET WALLET CHOICE TO LOCALSTORAGE
  localStorage.setItem('wallet', 'LOCALWALLET');

   init();

  



setTimeout(() => {
    
const checkbox = document.getElementById('mnemonicBackedup');
const button = document.getElementById('closeWalletBkp');

// Add an event listener to the checkbox to track its state
checkbox.addEventListener('change', function() {
// If the checkbox is checked, enable the button; otherwise, disable it
button.disabled = !this.checked;
});
//   document.getElementById("mnemonicBackedup")
//   document.getElementById("closeWalletBkp").disabled = false;
  document.getElementById('loader').style.display='none'
init();
}, 5000);
        

    });


    setTimeout(() => {
    openModalId('#walletHidden')

    }, 50);



    }
function writepassword (f){
        
        //OPEN WALLET
        if(f=='open'){ 
          console.log('write password to open wallet')
          Swal.fire({
              title: 'Decrypt your wallet',
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
            walletOptCreate.style.display = 'none'
            document.getElementById('loader').style.display='block'
            headMessages.innerHTML = '';
            if(result.value ==''){
              console.log('IS EMPTY');
               Toast.fire({ icon: 'error', title: 'Password cannot be empty' });
              return;
            }
            decryptWallet(result.value)
            return result.value
        } 
        })
          return
        }

    
    
          //////////////////////
        // CREATE WALLET
     
    
        Swal.fire({
        title: dictionary[globalLang]["createpasswordtoencryptwallet"],
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'create',
        showLoaderOnConfirm: true,
      
      inputValidator: (value) => {
        if (!value) {
          return 'You need to set a password to create your wallet!'
        }
      },
    
        allowOutsideClick: () => {
            const popup = Swal.getPopup()
            popup.classList.remove('swal2-show')
            setTimeout(() => { popup.classList.add('animate__animated', 'animate__headShake') })
            setTimeout(() => { popup.classList.remove('animate__animated', 'animate__headShake') }, 500)
            return false
        },
    
        })
        .then(async(result)   => {
        if (result.isConfirmed) {
            // console.log('PASSWORD RESULT:',result.value)
            
           await  createWallet(result.value)
            return result.value
        } 
        })
    
    
    }


        
  /*********************************************************************************************
    .) USE WALLET
    **********************************************************************************************/
    // CONNECT LOCALWALLET
    async function useLocalWallet(){
        console.log('USE LOCALWALLET:')
        let encryptedjson = localStorage.getItem('jsonWallet')
  
        //   GET NETWORK
       let provider = new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`);
       console.log('JsonRpcProvider', optionsList[0].API);
       
      try{ network = await provider.getNetwork(); }
      catch (error) { console.log(error.message); 
        fixedToast.fire( 'Error',error.message, "error"); 
        mode.innerHTML = 'OFFCHAIN';
        mode.style.border = '1px solid red';
        mode.style.color = 'red';
      }
  
        console.log('Chain ID:', network.chainId);
  
  
          // SET GLOBAL ADDRESS
          const parsedJson = JSON.parse(encryptedjson);
          const hexAddress = parsedJson.address;
          const formattedAddress = ethers.utils.getAddress(hexAddress);
          console.log(formattedAddress);
          userAddress  = formattedAddress;
  
  
  
        // SWEETALERT SUCCESS
        Toast.fire({ icon: 'success', title: 'Logged in!' })
  
        // SUCCESS ALERT
        //SET ADDRESS
        var shortAddr = userAddress.substring(0, 6) + "..."+ userAddress.substring(38, 42);
        // document.getElementById('usrAddr').innerHTML = `<div id="" onclick="event.stopPropagation();copyItem(event,'${userAddress}')">${shortAddr}</div>`;
    console.log('ADDED ADDRESS')
        // FIX TEXTEFFECT
        if (/Mobi|Android/i.test(navigator.userAgent)) {
          // User is accessing the website from a mobile device
          // Don't run the script
          console.log('textEffect avoided')
        } else {
          // User is not accessing the website from a mobile device
          // Run the script
          $("#usrAddr").textEffect();
  
          setTimeout(() => {
            document.getElementById('usrAddr').innerHTML = `<div id="" onclick="event.stopPropagation();copy2clipboard('${userAddress}')">${shortAddr}</div>`;
          }, 900);
        }
        document.getElementById('usrAddr').classList.add("glow");
         
        // REORGANICE CONNECT BUTTONS
          walletOptCreate.style.display = 'none';// boton CONNECT
          document.getElementById('walletDisconnect').style.display = 'block';
  
          // SHOW ACTION BUTTONS AND UPDATE UI
          // document.getElementById('createUP').style.visibility ='visible';
          document.getElementById('main').style.display = 'block';
  
  
        // SET WALLET CHOICE TO LOCALSTORAGE
        localStorage.setItem('wallet', 'LOCALWALLET');
  
  
            //   -------------------------------------------------------------
                 //   -------------------------------------------------------------
                    // 0- CHECK OWNERSHIP (check if is no owner already)
                    let prefIndex = 0;
                    let tAddress = optionsList[prefIndex].TOKEN_ADDRESS;
                    let tAbi =ABIs[optionsList[prefIndex].TOKEN_ABI]
  
                    // console.log('call contract for TIds:', tAddress, tAbi, provider)
  
                      contract = new ethers.Contract(tAddress, tAbi, provider)
                      // console.log('CONTRACT IN INITV3: ', contract)
                      // console.log('uAddress: ', userAddress)
                     
                      
                      // CALL TIds
                      try { tokenIdbyAddr = await contract.TIds(userAddress) }
                      catch (error) { console.log('error:', error); return; }
                      // console.log('tokenIdbyAddr', tokenIdbyAddr)
                      tid = parseInt( tokenIdbyAddr, 16)
                      // let  tid = parseInt( tokenIdbyAddr, 16)
                      // console.log('tid', tid)
                      
                      // console.log('OWNER?: tokenIdbyAddr: ',tokenIdbyAddr )
                      // A- IF USER DOESNT OWN A TOKEN
                      if(tid == 0) {
                        console.log('YOU DONT HAVE A UNIVERSAL PASS ')
                      } else {
                        console.log('YOUR ARE OWNER OF UP TOKEN',tid )
                        // Toastnoclose.fire('', `YOUR ARE OWNER OF UP TOKEN ${tid}`, "info");
                        headMessages.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" > <span data-translate="youareowneroftoken">YOUR ARE OWNER OF UP TOKEN </span><strong>${tid}</strong> </div>`
  
                        // <button type="button" class="btn-trash" onclick="event.stopPropagation();editIAMcode()" >
                        // </button> 
                        console.log('CARGAR MANUALMENTE LA PRIMER VEZ con tokenid + version y recibe ipfs link,desde blockchain. guarda todo en localstorage para no cargar todo cada vez.')
                        console.log('PRIMERO seriallamar al contracto para obtener la ultima version de ipfs para este token (public)')
  
                        // reloadTranslations()
                        // CALL universalPass(tokid)
                        try { universalPassData = await contract.universalPass(tid) }
                        catch (error) { console.log('error:', error); return; }
  
  
  
                        console.log('universalPassData', universalPassData)
                        console.log('URI: ', universalPassData.uri)
                        console.log('LAST UPDATED' ,parseInt(universalPassData.dateUpdated,16))
                        console.log('SEGUNDO cargar solo el json de la uri')
                        // fetch("https://api.example.com/data")
  
  
  
                       let cidcid =  await fetch(universalPassData.uri)
                        .then(function(response) { if (response.ok) { return response.json(); } else { throw new Error("Error: " + response.status); } })
                        .then(async function(data) { 
                          // console.log('Processed data',data);
                          // console.log('Processed image',data);
                        // return [data.external_url ,data.image ]
                      //   return data.external_url 
  
                      return { url: data.external_url, img: data.image };
  
                      })
                        .catch(function(error) { console.log(error); });
                        // console.log('CID RESULT:', cidcid)
                        // console.log('CID URL:', cidcid.url)
                        // console.log('CID IMG:', cidcid.img)
  
  
                        // GET LAST UPDATED
                        let lastUpdated = parseInt(universalPassData.dateUpdated,16);
  
                        // FORM LINK
                      let link = `${ipfsGateway}${cidcid.url}`;
                      // console.log('link:',link)
                      // console.log('6493 cidcid:',cidcid.url)
                      // FETCH CIDCID
                      fetch(cidcid.url)
                      .then(response => response.text())
                      .then(async  html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                         signed = doc.getElementById('signed').innerText;
                        // console.log('signed:', JSON.parse(signed)); 
                        // console.log('RUNNING nftIpfsDistro:' ,signed,tid,universalPassData)
                        let uplink = cidcid.url;
                        let img= cidcid.img;
                       await nftIpfsDistro(signed,tid,universalPassData,uplink,img)
                        
  
                      })
                      .catch(error => {
                        console.error('Error:', error);
                      });
  
  
  
  
  
  
  
                        return
                      }
  
  
  
  
  
          //1. CHECK IF USER HAS PUBLISHED ON IPFS (signedJson)
          let ipfsDistros = JSON.parse(window.localStorage.getItem('IPFSdistributions'));
          if(!ipfsDistros){
              console.log('THERE ARE NO ipfsDistros')
              console.log('NO, THERE IS NOT A SIGNED JSON, WE CONTINUE TO LOAD IAM CODE AND DOCS')
              
              // 2.  CHECK IF THERE IS IAMCODE , then check documents
          // let ipfsDistros = JSON.parse(window.localStorage.getItem('IPFSdistributions'));
  
          let loadIAM = localStorage.getItem('iamcode')
              
          if(!loadIAM){
              console.log('THERE IS NO IAMCODE')
              
              // UPDATE UI
              document.getElementById('main').setAttribute('style', 'display:block !important');
  
            //   document.getElementById('edit').setAttribute('style', 'display:flex !important');
            //   document.getElementById('soveraindocs').setAttribute('style', 'display:none !important');
            //   document.getElementById('mint').setAttribute('style', 'display:none !important');
  
          }  else{
              
              console.log('THERE IS IAM CODE')
              document.getElementById('edit').setAttribute('style', 'display:flex !important');
              document.getElementById('loader').style.display='none'
  
  
              // createIAMCODE()
  
  
              // let loadIAM =  localStorage.getItem('iamcode')
              let loadIAMIMG =  localStorage.getItem('image')
              // iamCode.innerHTML= loadIAM;
             iamCode.innerHTML= `IAM-<span id="iamCodeNom">n</span><span id="iamCodePrenom">p</span>-<span id="iamCodemmjjaaaa">mmjjaaaa</span><div id="editButtons">  </div>`;
  
              // iamImg.src = JSON.parse(loadIAMIMG);
              headMessages.innerHTML = `<div class="alert alert-primary alert-dismissible fade show"> 
              <img src="${JSON.parse(loadIAMIMG)}" alt="Rounded circle Image" class="rounded rounded-circle img-thumbnail" width='40px'>
              <strong>${loadIAM}</strong> 
              <button type="button" class="btn-edit" onclick="event.stopPropagation();editIAMcode()" >
              </button> 
              </div>`
  
              document.getElementById('soveraindocs').setAttribute('style', 'display:block !important');
              document.getElementById('edit').setAttribute('style', 'display:none !important');
              document.getElementById('mint').setAttribute('style', 'display:none !important');
  
              // LOAD TABLE WITH SOVERAIN DOCS
              addProtomintDOCSTEMPLATE()
              loadDocs()
              reloadTranslations()
  
  
  
      }
              
  
           
              // 1. NOW check if there are documents
              // edit.style.display = 'block'
              // main.style.display = 'none'
  
  
              
  
  
  
              // INIT
              console.log('CALLING loadIAMinfo ')
            loadIAMinfo()
            loadOnchangeEvents()
  
          //   checkIfIAMCode()
  return
            
            } else {
        
              console.log('YES THERE IS A SIGNED JSON')
              console.log('COMPARE ADDRESS:', userAddress, ipfsDistros[0].address)
              // document.getElementById('mint').style.display ='none'
              // if
              await reloadIpfsDistros()
      
      
            }
  
            
  
   
      }
  
      // CONNECT METAMASK
        async function useMetamaskWallet(){
            console.log('TRYING TO USE METAMASK WALLET:')
  
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            let psend = await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            const account = await signer.getAddress()
            userAddress = account;//set global
            console.log(account)
  
  
  
          //   return
                 // INIT
        loadIAMinfo()
        loadOnchangeEvents()
        checkIfIAMCode()
  
        // SWEETALERT SUCCESS
        Toast.fire({ icon: 'success', title: 'Logged in!' })
  
  
            // SET ADDRESS
            var shortAddr = account.substring(0, 6) + "..."+ account.substring(38, 42);
            if (/Mobi|Android/i.test(navigator.userAgent)) {
              // User is accessing the website from a mobile device
              // Don't run the script
              console.log('textEffect avoided')
            } else {
              // User is not accessing the website from a mobile device
              // Run the script
              $("#usrAddr").textEffect();
            }
            document.getElementById('usrAddr').classList.add("glow");
            
            
            setTimeout(() => {
              document.getElementById('usrAddr').innerHTML = `<div id="" onclick="event.stopPropagation();copy2clipboard('${account}')">${shortAddr}</div>`;
              
            }, 900);
  
              // REORGANICE CONNECT BUTTONS
              walletOptCreate.style.display = 'none';// boton CONNECT
              document.getElementById('walletDisconnect').style.display = 'block';
  
              // SHOW ACTION BUTTONS
              document.getElementById('createUP').style.visibility ='visible'
              
              // SET GLOBAL ADDRESS
              userAddres = account;
  
              // SET WALLET CHOICE TO LOCALSTORAGE
              localStorage.setItem('wallet', 'METAMASK');
  
  
              // LISTEN TO CHANGES
              ethereum.on("accountsChanged", function(accounts) { console.log("ethereum account changed to: ", accounts); walletDisconnect(); });
              ethereum.on("chainChanged", function(accounts) { console.log("ethereum account changed to: ", accounts); walletDisconnect(); });
              ethereum.on("disconnect", function(accounts) { console.log("ethereum account changed to: ", accounts); walletDisconnect(); });
  
              // return signer
              let chainId= await signer.getChainId()
              console.log('chainId:', chainId)
  }
  


/*********************************************************************************************
.) CONNECT DISCONNECT FUNCTIONS
**********************************************************************************************/
    
// DISCONNECT
async function walletDisconnect(){
    console.log('Disconnect account')
  
    // CHANGE BUTTON
    walletOptCreate.style.display = 'block';// boton CONNECT
    document.getElementById('walletDisconnect').style.display = 'none';

    // DELETE WALLET CHOICE FROM LOCALSTORAGE
    localStorage.removeItem('wallet');

    // hide main
    document.getElementById('main').style.display = 'none';

    // DELETE ADDRESS RESTORE  BANNER
    usrAddr.innerHTML = 'IURIS-NATURALIS'
    // $("#usrAddr").textEffect();
  
      // UNSET GLOBAL ADDRESS
      userAddres = '';

      // HIDE ACTION BUTTONS
    //   document.getElementById('createUP').style.visibility ='hidden'

      // SHOW SPLASHSCREEN
    //   document.getElementById('mint').setAttribute('style', 'display:flex !important');
    //   document.getElementById('edit').setAttribute('style', 'display:none !important');
    //   document.getElementById('soveraindocs').setAttribute('style', 'display:none !important');

    
          headMessages.innerHTML=''    
  
  }
  
    