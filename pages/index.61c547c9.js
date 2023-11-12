//  PUBLISH TO IPFS
async function createIPFSDelivery() {
    //   if (!user) { 
    if (typeof userAddress === "undefined") {
        Swal.fire({
            title: "Connect first",
            imageUrl: "undraw_login_re_4vu2.svg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Connect!",
            showCancelButton: true,
            confirmButtonText: "connect",
            showLoaderOnConfirm: true,
            allowOutsideClick: ()=>{
                const popup = Swal.getPopup();
                popup.classList.remove("swal2-show");
                setTimeout(()=>{
                    popup.classList.add("animate__animated", "animate__headShake");
                });
                setTimeout(()=>{
                    popup.classList.remove("animate__animated", "animate__headShake");
                }, 500);
                return false;
            }
        }).then((result)=>{
            if (result.isConfirmed) {
                console.log("ok pressed", result);
                // login();
                openModal("#walletOptions");
                return;
            }
        });
        return;
    }
    let loadIAM = localStorage.getItem("iamcode");
    let loadIAMIMG = localStorage.getItem("image");
    if (!loadIAM || !loadIAMIMG) {
        Toast.fire("complete IAM code before sending documents", "", "error");
        restoreEnvoiButton();
        return;
    }
    // DISPLAY LOADER in button
    document.getElementById("createIPFSDelivery").innerHTML = ` <span class="spinner-grow spinner-grow-sm"></span> `;
    document.getElementById("createIPFSDelivery").disabled = true;
    //GET USER ADDRESS
    // CREATE JSON OBJECT WITH DATA
    let iamCode2Sign = localStorage.getItem("iamcode");
    let iamPhoto2Sign = " ";
    let documents = JSON.parse(localStorage.getItem("documents")) || [];
    let attestationLink = localStorage.getItem("iamAttestation");
    JSON2SIGN = {
        iamDocuments: documents,
        iamCode: iamCode2Sign,
        iamPhoto: iamPhoto2Sign,
        iamAddress: userAddress,
        iamDocuments: documents,
        iamAttestationLink: attestationLink
    };
    // JSON2SIGN= {iamDocuments: documents,iamCode: iamCode2Sign,iamPhoto: iamPhoto2Sign,iamAddress: userAddress,iamDocuments: documents};
    // HASH JSON
    // var json = JSON.stringify(JSON2SIGN);
    // let hashedJson = ethers.utils.solidityKeccak256( [ "string"], [ json] );
    // FIX PROBLEMA DE VERIFICACION DE KEY
    let hashedJson = ethers.utils.solidityKeccak256([
        "string"
    ], [
        JSON2SIGN
    ]);
    // console.log('json:',json)
    console.log("hashedJson:", hashedJson);
    // ASK USER TO SIGN
    await Swal.fire({
        title: "SIGN THIS HASH TO CONTINUE",
        icon: "info",
        html: hashedJson,
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-signature"></i> Sign!',
        confirmButtonAriaLabel: "Sign!",
        showLoaderOnConfirm: true,
        footer: '<a target="_blank" href="/docs/index.html#/?id=signatures">What is a signature?</a>',
        allowOutsideClick: ()=>{
            const popup = Swal.getPopup();
            popup.classList.remove("swal2-show");
            setTimeout(()=>{
                popup.classList.add("animate__animated", "animate__headShake");
            });
            setTimeout(()=>{
                popup.classList.remove("animate__animated", "animate__headShake");
            }, 500);
        }
    }).then(async (result)=>{
        if (result.isConfirmed) {
            console.log("ok pressed", result, hashedJson);
            // SIGN JSON    
            let walletChoice = localStorage.getItem("wallet");
            if (walletChoice) {
                console.log("THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE");
                // IsMetamask
                if (walletChoice == "METAMASK") {
                    console.log("SIGN WITH METAMASK");
                    // 1- GET SIGNER
                    try {
                        provider = new ethers.providers.Web3Provider(window.ethereum);
                    } catch (error) {
                        console.log(error.message);
                        fixedToast.fire("Error", error.message, "error");
                    }
                    try {
                        signer = provider.getSigner();
                    } catch (error) {
                        console.log(error.message);
                    }
                    // 2- NOW SIGN
                    let toSign = ethers.utils.arrayify(hashedJson);
                    try {
                        signature = await signer.signMessage(toSign);
                    } catch (error) {
                        console.error("An error occurred:", error);
                        Toast.fire("An error occurred", "", "error");
                        return;
                    }
                    console.log("signature:", signature);
                }
                // -------------------------------------------------------
                // IsLocawallet
                if (walletChoice == "LOCALWALLET") {
                    console.log("SIGNING WITH LOCALWALLET");
                    // GET PASSWORD
                    Swal.fire({
                        title: "Decrypt your wallet to sign this hash",
                        input: "password",
                        inputAttributes: {
                            autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: "Enter",
                        showLoaderOnConfirm: true,
                        backdrop: true,
                        preConfirm: (login)=>{},
                        allowOutsideClick: ()=>{
                            const popup = Swal.getPopup();
                            popup.classList.remove("swal2-show");
                            setTimeout(()=>{
                                popup.classList.add("animate__animated", "animate__headShake");
                            });
                            setTimeout(()=>{
                                popup.classList.remove("animate__animated", "animate__headShake");
                            }, 500);
                            return false;
                        }
                    }).then((result)=>{
                        if (result.isConfirmed) {
                            if (result.value == "") {
                                console.log("IS EMPTY");
                                Toast.fire({
                                    icon: "error",
                                    title: "Password cannot be empty"
                                });
                                return;
                            }
                            // Use the Wallet.fromEncryptedJson() method to decrypt the wallet\
                            let encryptedJson = localStorage.getItem("jsonWallet");
                            // SHOW DECRYPT PROGRESS 
                            const progressCallback = (percent)=>{
                                // Update the progress bar
                                console.log(`Decrypting... `);
                                walletProgressContent.innerHTML = `<div ;class="progress">
                    <div class="progress-bar" role="progressbar" style="width:  ${percent * 100}%;" aria-valuenow="${percent * 100}" aria-valuemin="0" aria-valuemax="100">${Math.round(percent * 100)}%</div>
                  </div>`;
                            };
                            // ethers.Wallet.fromEncryptedJson(encryptedJson, result.value)
                            openModalId("#walletProgress");
                            // openModal('#walletProgress')
                            ethers.Wallet.fromEncryptedJson(encryptedJson, result.value, progressCallback).then(async (wallet)=>{
                                console.log("wallet:", wallet);
                                // SIGN!
                                // 1- GET SIGNER
                                try {
                                    provider = new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`);
                                } catch (error) {
                                    console.log(error.message);
                                    fixedToast.fire("Error", error.message, "error");
                                }
                                console.log("provider:", provider);
                                // try { signer = provider.getSigner()}
                                try {
                                    signer = wallet.connect(provider);
                                } catch (error) {
                                    console.log(error.message);
                                }
                                console.log("signer:", signer);
                                //   // 2- NOW SIGN
                                let toSign = ethers.utils.arrayify(hashedJson);
                                try {
                                    signature = await signer.signMessage(toSign);
                                } catch (error) {
                                    console.error("An error occurred:", error);
                                    Toast.fire("An error occurred", "", "error");
                                    closeWalletProgress.disabled = false;
                                    return;
                                }
                                console.log("RESULT:", signature);
                                // ......Queue...Queue...Queue...Queue...Queue..
                                // PREPARE JSON FOR SIGNED WEBPAGE
                                console.log("JSON2SIGN: ", JSON2SIGN);
                                // USE THIS jsonforwebsite to ATTEST (nope, not here... just cid)
                                let jsonforwebsite = JSON.stringify(JSON2SIGN);
                                console.log("jsonforwebsite: ", jsonforwebsite);
                                let sigObject = {
                                    iamSignature: signature
                                };
                                let signatureforwebsite = JSON.stringify(sigObject);
                                // error
                                let iamphoto = localStorage.getItem("image");
                                //  CREATE SIGNEDIPFS WEBSITE
                                let signedIpfsWebsite;
                                try {
                                    signedIpfsWebsite = await signedipfsWebsite(jsonforwebsite, signatureforwebsite, iamphoto);
                                } catch (error) {
                                    console.log(error.message, "ERROR EN  signedipfsWebsite()");
                                    closeModalId("#walletProgress");
                                    reloadTranslations();
                                    document.getElementById("createIPFSDelivery").disabled = false;
                                    return;
                                }
                                // PREPARE FILE
                                let name = "ipfspage.html"; // funciona...
                                const files = [
                                    new File([
                                        signedIpfsWebsite
                                    ], name)
                                ];
                                console.log("FILES: ", files);
                                // UPLOAD TO IPFS
                                const client = makeStorageClient();
                                try {
                                    CID = await client.put(files, {
                                        wrapWithDirectory: false
                                    });
                                } catch (error) {
                                    console.log(error.message);
                                    restoreEnvoiButton();
                                    return;
                                }
                                let ipfsLink = `${ipfsGateway}${CID}`;
                                console.log("IPFS STORED FILE AT :", ipfsLink);
                                localStorage.setItem("lastIpfsDistroCID", CID);
                                // localStorage.setItem('lastIpfsDistroCID', ipfsLink);
                                // USE THIS CID to ATTEST!!!
                                console.log("cid:", CID);
                                // DO SOMETHING HERE... -------------------------------------------------------------
                                //TIMESTAMP IN UNIXTIME
                                const timestamp = Math.floor(new Date().getTime() / 1000);
                                console.log(timestamp);
                                // GET SIGNER
                                const address = await signer.getAddress();
                                console.log("ADDRESS:", address);
                                const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia Testnet v0.26
                                let eas = new EAS(EASContractAddress);
                                console.log("provider: ", provider);
                                eas.connect(provider);
                                // PREAPARE DATA
                                console.log("offchainIAM");
                                let inputString = localStorage.getItem("iamcode");
                                const bytes32Value = stringToBytes32(inputString);
                                console.log(bytes32Value);
                                const offchain = await eas.getOffchain();
                                // ATTEST FOR PUBLIC DOCUMENTS
                                const schemaEncoder = new SchemaEncoder("bytes32 IAMcode,address IAMaddress,string CID");
                                const encodedData = schemaEncoder.encodeData([
                                    {
                                        name: "IAMcode",
                                        value: bytes32Value,
                                        type: "bytes32"
                                    },
                                    // { name: "IAMattest", value: bytes32iamattest, type: "bytes32" },//prev iam code attest
                                    {
                                        name: "IAMaddress",
                                        value: address,
                                        type: "address"
                                    },
                                    {
                                        name: "CID",
                                        value: CID,
                                        type: "string"
                                    }
                                ]);
                                let referencedUID = localStorage.getItem("iamcodeUID");
                                console.log("referencedUID: ", referencedUID);
                                const offchainAttestation = await offchain.signOffchainAttestation({
                                    recipient: signer.address,
                                    expirationTime: 0,
                                    time: timestamp,
                                    revocable: true,
                                    version: 1,
                                    nonce: 0,
                                    schema: "0xa1c7d32280a93b1d57e811407f74c52b8991ccbe514a2309962831163ad36682",
                                    refUID: referencedUID,
                                    // refUID: '0x0000000000000000000000000000000000000000000000000000000000000000',
                                    data: encodedData
                                }, signer);
                                console.log("offchainAttestation:", offchainAttestation);
                                o = offchainAttestation;
                                y = JSON.stringify(o);
                                let offchainobject = {
                                    sig: offchainAttestation,
                                    signer: signer.address
                                };
                                const url = createOffchainURL(offchainobject);
                                console.log("URL:", "https://sepolia.easscan.org" + url);
                                const fullOffchainAttestLink = "https://sepolia.easscan.org" + url;
                                localStorage.setItem("fullAttestation", fullOffchainAttestLink);
                                // END... -------------------------------------------------------------
                                // SAVE SIGNED JSON INTOLOCALSTORAGE
                                localStorage.setItem("signedJson", jsonforwebsite);
                                //DELETE OLD LOCALSTORAGE
                                localStorage.removeItem("IPFSdistributions");
                                //SAVE TO LOCALSTORAGE
                                let ipfsDistro = {
                                    cid: CID,
                                    timestamp: timestamp,
                                    signature: signature,
                                    address: userAddress,
                                    signedJSON: jsonforwebsite
                                } // agregar signedJSON
                                ;
                                // let ipfsDistro = { cid: CID, timestamp: timestamp, iamattestation: fullOffchainAttestLink,signature: signature, address:userAddress, signedJSON: jsonforwebsite }// agregar signedJSON
                                console.log("ipfsDistro: ", ipfsDistro);
                                SaveDataToLocalStorage(ipfsDistro); //save to IPFSdistributions
                                setTimeout(()=>{
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    });
                                    Toastcenter.fire("", "Done!", "success");
                                }, 400);
                                // SUCCESS MESSAGE
                                closeModalId("#walletProgress");
                                // FIREFOWKS
                                // startConfetti();
                                setTimeout(()=>{
                                    // stopConfetti();
                                    closeWalletProgress.disabled = false;
                                    // reloadIpfsDistros(0)
                                    document.getElementById("soveraindocspremint").style.display = "none";
                                    reloadIpfsDistros();
                                }, 2000);
                            }).catch((error)=>{
                                console.log("Error:", error);
                                closeWalletProgress.disabled = false;
                                fixedToast.fire("Error", error.message, "error");
                                document.getElementById("createIPFSDelivery").innerHTML = `PUBLISH `;
                                document.getElementById("createIPFSDelivery").disabled = false;
                            });
                        }
                    });
                }
            }
        } else if (result.isDismissed) {
            Toast.fire("", "Signing canceled!", "info");
            restoreEnvoiButton();
            reloadTranslations();
        // return 
        }
    });
}
/*********************************************************************************************
  .) signedipfsWebsite() 
    CREATE SIGNED IPFS WEBPAGE
    creates JSON, sign it, creates a webpage with json and signature, uploads it to IPFS and returns CID
     <meta http-equiv=”Content-Security-Policy” content=”connect-src 'self' blob: data: https://*.w3s.link https://*.nftstorage.link https://*.dweb.link https://ipfs.io/ipfs/ https://*.web3.storage https://*.nft.storage https://tableland.network https://*.tableland.network" ; default-src ’self’ 'unsafe-inline' 'unsafe-eval' *.w3s.link   ${ipfsGateway} ${ipfsGatewayCID};”>
     <meta http-equiv=”Content-Security-Policy” content=”  data: https://*.w3s.link https://*.nftstorage.link https://*.dweb.link https://ipfs.io/ipfs/ https://*.web3.storage https://*.nft.storage https://tableland.network https://*.tableland.network ; default-src ’self’ 'unsafe-inline' 'unsafe-eval' *.w3s.link   ${ipfsGateway} ${ipfsGatewayCID};”>
  **********************************************************************************************/ async function signedipfsWebsite(signedjson, signature1, iamphoto) {
    let ipfsurl = "*.ipfs.w3s.link";
    let fontsurl = "fonts.googleapis.com";
    let verifiedWebpage = `<!doctype html>
      <html><head>      
      <meta http-equiv="Content-Security-Policy" content="
      img-src 'self' data: ${ipfsurl} ;
      style-src-elem 'self'  'unsafe-inline' ${ipfsurl} ${fontsurl};">
      <meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"><link rel="icon" href="${ipfsGatewayCID}favicon.55e17813.ico" type="image/x-icon"><title></title><link rel="stylesheet" href="${ipfsGatewayCID}jsonVerifyCID.cf7b0304.css"><style> #head{height: 145px;}@media (max-width: 768px) { #head{font-size: 15vw;} } </style></head><body> <nav class=" navbar navbar-expand-sm"> <div class="container-fluid justify-content-center"> <a class="navbar-brand" href="#"> <img src="https://bafkreic75qivovknpkz2sp2nwhxjyhshiuibtgvtjstp4cnxtywxhwgrue.ipfs.w3s.link/" alt="Avatar Logo" style="width:40px" class="rounded-pill"> </a> </div> </nav> <div type="application/json" id="signed">${signedjson}</div> <div type="application/json" id="signature">${signature1}</div> 
      <div id="content" class="container" style="display:none"> <div id="head"> <div id="iamInfo"> <h1 id="iamCode"></h1> 
      <h3 id="iamTokenId" style="font-size: 1.4rem;"> <code><a id="attestationLink" href="" target="_blank" rel="noopener noreferrer"> attestation</a>    </code></h3> </div> <img id="iamTokenImg" src=${iamphoto}></div> 
      <table class="table" id="myTable" data-card-width="837"> <thead> <tr> <th data-card-title="">Title</th> <th data-card-action-links="">CID</th>
       <th data-card-footer="">Attestation</th> </tr> </thead> <tbody id="tbody"> </tbody> </table> </div> <ol id="footer" class="list-group list-group-numbered container" style="display:none"> <li class="list-group-item">ADDRESS: <br> <p id="iamAddress" style="word-wrap:break-word"></p> <svg id="addrTrue"  style="display:none" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg">   <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" id="addressIsTrue" style="fill:#00ff00" /> </svg><svg id="addrFalse"  style="display:none"  width="18" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" id="addressIsFalse" style="fill:#ff0000"/></svg>   </li> <li class="list-group-item"> HASH:<p id="iamHash" style="word-wrap:break-word"> </p></li> <li class="list-group-item">SIGNATURE <p id="iamSignature" style="word-wrap:break-word"></p></li> </ol>
      <script id="INIT">signed.style.display="none",signature.style.display="none",content.style.display="block",footer.style.display="block",ipfsGateway="${ipfsGateway}";</script> 
      <script src="${ipfsGatewayCID}jsonVerifyCID.336889fc.js"></script>
      <script src="${ipfsGatewayCID}jsonVerifyCID.20251b0b.js"> </script>  
      <script src="${ipfsGatewayCID}jsonVerifyCID.20251b0b.js"> </script>  
      <script src="https://bafybeiajps2emmwlgbfd2c3getgjmrczlwpy6k7jsmseiq246uxnyurouq.ipfs.w3s.link/script.min.js"></script> 
      <script>attestationLink.href = signedJson.iamAttestationLink</script> 
      <script src="${ipfsGatewayCID}jsonVerifyCID.98ee8ceb.js"></script> 
      <script src="${ipfsGatewayCID}jsonVerifyCID.73cbde04.js"></script> 
      </body></html>`;
    return verifiedWebpage;
}
// *********************************
// reloadIpfsDistros()
// *********************************
async function reloadIpfsDistros() {
    console.log("RELOADIPFSDISTROS ");
    let index = 0;
    // ADD IAM
    let ipfsDistros = JSON.parse(window.localStorage.getItem("IPFSdistributions"));
    if (!ipfsDistros) {
        console.log("THERE IS NO ipfsDistros");
        return;
    }
    let ipfsdist = JSON.parse(ipfsDistros[0].signedJSON);
    let iamcode = ipfsdist.iamCode;
    let cid = ipfsdist.cid;
    console.log("CID: ", ipfsdist);
    // ----------------
    // CALCULATE TIME PASSED
    function formatTimeComponent(value, unit) {
        return value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;
    }
    // Example Unix timestamp in seconds
    // const unixTimestampInSeconds = 1678771200;
    const unixTimestampInSeconds = ipfsDistros[0].timestamp;
    // Convert the Unix timestamp to milliseconds
    const unixTimestampInMillis = unixTimestampInSeconds * 1000;
    // Get the current time in milliseconds
    const currentTimeInMillis = new Date().getTime();
    // Calculate the time difference in milliseconds
    const timeDifferenceInMillis = currentTimeInMillis - unixTimestampInMillis;
    // Convert the time difference to days, hours, minutes, and seconds
    const daysPassed = Math.floor(timeDifferenceInMillis / 86400000);
    const hoursPassed = Math.floor(timeDifferenceInMillis % 86400000 / 3600000);
    const minutesPassed = Math.floor(timeDifferenceInMillis % 3600000 / 60000);
    const secondsPassed = Math.floor(timeDifferenceInMillis % 60000 / 1000);
    // Build the output string
    let output = "Updated ";
    if (daysPassed > 0) output += formatTimeComponent(daysPassed, "day");
    if (hoursPassed > 0) output += formatTimeComponent(hoursPassed, "hour");
    if (minutesPassed > 0) output += formatTimeComponent(minutesPassed, "minute");
    if (daysPassed === 0 && hoursPassed === 0 && minutesPassed === 0) output += formatTimeComponent(secondsPassed, "second");
    console.log(output + " ago");
    // -------------
    let lIDC = localStorage.getItem("lastIpfsDistroCID");
    if (!lIDC) console.log("CID v2 NOT FOUND", lIDC);
    else {
        console.log("CID v3: ", lIDC);
        fulllinkfromCID = `${ipfsGateway}${lIDC}`;
        console.log("fulllinkfromCID: ", fulllinkfromCID);
    }
    let docs = ipfsdist.iamDocuments;
    console.log("DOCS LENGTH: ", docs.length);
    linkIPFS = `${ipfsGateway}${lIDC}`; // dejar el espacio para poder cambiar el link ipfs desde la UI en caso de update
    console.log("linkIPFS???", linkIPFS);
    let srcimg = await JSON.parse(window.localStorage.getItem("image"));
    if (!srcimg) {
        console.log("NO SRCIMG");
        return;
    }
    let img = srcimg;
    // get offchain attestation
    let offchainAttestation = localStorage.getItem("iamAttestation");
    let fulloffchainAttestation = localStorage.getItem("fullAttestation");
    let UID = localStorage.getItem("iamcodeUID");
    let fulliamAttestation = localStorage.getItem("iamAttestation");
    console.log("CLEARING #MAIN");
    document.getElementById("soveraindocs").setAttribute("style", "display:inline!important");
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
    <p class="card-text published">Public Documents (<code>${docs.length}</code>): <code>   
    <a href="${fulllinkfromCID}" style='display:none' target="_blank" rel="noopener noreferrer">${lIDC}</a>
    <i class="fas fa-eye cursor" aria-hidden="true" onclick="event.stopPropagation();viewItem('${lIDC}')"></i> 
    
    <i class="fas fa-trash cursor" aria-hidden="true" onclick="event.stopPropagation();deleteIpfsDistro((this.parentElement))"></i> 
    
    </code></p>

    <p class="card-text">Public Documents Attestation: <code>
    <i class="fas fa-eye cursor" aria-hidden="true" onclick="event.stopPropagation();openLink('${fulloffchainAttestation}')"></i> 
    <a href="${fulloffchainAttestation}" style='display:none'  target="_blank" rel="noopener noreferrer">
    <i class="fas fa-eye cursor" aria-hidden="true" ></i> 
    </a>
    <button class='linktypebuton' onclick="event.stopPropagation();makeOnchain()">make public</button>
    </code></p>

    <p class="card-text">IAM code Attestation: <code>
    <i class="fas fa-eye cursor" aria-hidden="true" onclick="event.stopPropagation();openLink('${fulliamAttestation}')"></i> 
    <button class='linktypebuton' onclick="event.stopPropagation();makeIAMOnchain()">make public</button>
    </code></p>




    <p class="card-text">NFT: 
    <code>  
     <button class='linktypebuton' onclick="event.stopPropagation();mint()">mint(onchain)</button>
    
    <i class="fas fa-trash" style="display:none" aria-hidden="true" onclick="event.stopPropagation();burnNFT((this.parentElement))"></i> 
    
    </code>

    </p>
    
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

    <a href="#"  style="display:none" class="btn btn-primary" onclick="event.stopPropagation();mintUPT()">+ATTEST</a>
    <a href="#" class="btn btn-primary" onclick="event.stopPropagation();editIpfsDistro()">+DOCUMENTS</a>


        </div>
      </div>
    </div>
  </div>
</div>

<div id="content" class="container" style="display:none">

    <div id="head"> 
          <div id="iamInfo"> 
                <h1 id="iamCode">
                <a class="iamlink" href="${offchainAttestation}" target="_blank" rel="noopener noreferrer">${iamcode}</a>   
                </h1> 
                <h3 id="iamTokenId"></h3> 
          </div>
          <img id="iamImg" src="${img}" > 
    </div> 
    
    <table class="table" id="myTable" data-card-width="837"> 
          <thead> <tr> 
          <th data-card-title="">Title</th> 
          <th data-card-action-links="">CID</th> 
       <th data-card-footer="">Actions</th> 
       
          
          </tr> </thead> <tbody id="tbody"> </tbody> 
    </table> 
    </div> 
    
    <ol id="footer" class="list-group list-group-numbered container" style="display:none"> 
    <li class="list-group-item">ADDRESS: <br>
          <p id="iamAddress" style="word-wrap:break-word"></p>
          <svg id="addrTrue"  style="display:none" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg">   <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" id="addressIsTrue" style="fill:#00ff00" /> </svg>
          <svg id="addrFalse"  style="display:none"  width="18" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" id="addressIsFalse" style="fill:#ff0000"/></svg>   
    </li> 
    <li class="list-group-item"> HASH:<p id="iamHash" style="word-wrap:break-word"> </p></li> 
    <li class="list-group-item">SIGNATURE <p id="iamSignature" style="word-wrap:break-word"></p></li> 
    </ol>
    
    <div class="card text-center">
    <div class="card-footer text-muted">
      ${output + " ago"}
      <a style="display:none" href="ethereum:0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d?value=50000000000000000&gas=21000&gasPrice=5000000000">Donate ETH to 0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d</a>
    </div>
  </div>
`;
    //QR
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "png",
        data: fulllinkfromCID,
        image: `logoIN6.png`,
        dotsOptions: {
            color: "#1568B0",
            type: "extra-rounded"
        },
        backgroundOptions: {
            color: "var(--qrbackground)"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0
        }
    });
    qrCode.append(document.getElementById("canvas"));
    console.log("qr code ADDED");
    // ADD DOCS
    docs.forEach((e)=>{
        let t = e.title, n = e.cid, i = e.courtesy_translations;
        var s = [];
        i.forEach((e, t)=>{
            let n = e.lang, i = `<button type="button" class="btn btn-outline-info px-3 waves-effect" onclick="event.stopPropagation(); viewItem('${e.cid}')"> \n                    <span>${n} </span><svg width="18" height="16" class="svg-inline--fa fa-language" aria-hidden="true" data-prefix="fas" data-icon="language" role="img" viewBox="0 0 640 512"> <path fill="currentColor" d="M0 128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm320 0v256h256V128H320zm-141.7 47.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1.1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2l19 42.8h-38l19-42.8zM448 164c11 0 20 9 20 20v4h60c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4.9.6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9L467 333.8c-4.5-2.7-8.8-5.5-13.1-8.5-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8L410 286.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6.5.5c12.4-13.1 22.5-28.3 29.8-45H376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" /> </svg> \n                </button> `;
            s.push(i);
        });
        let o1 = ` <tr> <td>${t} </td> <td> <p class='card-link' onclick="event.stopPropagation();copyItem('${n}')"> ${n}</p> </td> <td> <button type="button" class="btn btn-outline-info px-3 waves-effect" onclick="event.stopPropagation();viewItem('${n}')"> <svg width="18" height="16" class="svg-inline--fa fa-eye" aria-hidden="true" data-prefix="fas" data-icon="eye" role="img" viewBox="0 0 576 512"> <path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm144 224c0 79.5-64.5 144-144 144s-144-64.5-144-144 64.5-144 144-144 144 64.5 144 144zm-144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.6-8.4-.2 2.8-.4 5.5-.4 8.4 0 53 43 96 96 96s96-43 96-96-43-96-96-96c-2.8 0-5.6.1-8.4.4 5.3 9.3 8.4 20.1 8.4 31.6z" /> </svg> </button> ${s.join("")} </td> </tr>`;
        tbody.innerHTML += o1;
    });
    content.style.display = "block";
    // customLoader.style.display = "none"
    document.getElementById("loader").style.display = "none";
    console.log("LOADER DELETED!");
    getAddressBalance(userAddress).then((balance)=>{
        console.log(`Balance of ${userAddress}: ${balance} ETH`);
        document.getElementById("amount").innerHTML = ` ${balance} ETH`;
    }).catch((error)=>{
        console.error("Error:", error);
    });
}
// *********************************
// DELETE /REVOKE ATTESATION IPFS DISTRO
// *********************************
function deleteIpfsDistro(obj) {
    console.log("Delete IPFS Distro...", obj);
    Swal.fire({
        title: "revoke IPFS website attestation?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, revoke it!"
    }).then((result)=>{
        if (result.isConfirmed) {
            let index = obj.children[0].innerText;
            let i = Number(index);
            console.log("index:", i);
            RemoveFromLocalStorage(i);
            localStorage.removeItem("IPFSdistributions");
            setTimeout(()=>{
                Toastcenter.fire("", `revoked!`, "info");
                init();
            }, 500);
        }
    });
}
// *********************************
// viewIpfsDistro
// *********************************
function viewIpfsDistro(url) {
    window.open(url, "_blank").focus();
}
function editIpfsDistro(obj) {
    console.log("editIpfsDistro: ", obj);
    addEditDocumentsUI();
    loadDocs();
    restoreEnvoiButton();
    reloadTranslations();
}
function restoreEnvoiButton() {
    let IPFSDELIVERY = localStorage.getItem("IPFSdistributions");
    if (!localStorage.getItem("IPFSdistributions")) {
        console.log("THERE IS NO IPFSdistributions ");
        document.getElementById("addDocsButtons").innerHTML = `  
    <button class="btn btn-warning btn-lg"  onclick="event.stopPropagation();canceleditIpfsDistro((this.parentElement))"><i class="fas fa-pencil" aria-hidden="true"></i> Cancel edit </button>`;
        reloadTranslations();
    } else {
        console.log("YES THERE IS a IPFSdistributions ");
        document.getElementById("addDocsButtons").innerHTML = `  <button class="btn btn-primary btn-lg " id="createIPFSDelivery" onclick="event.stopPropagation();createIPFSDelivery((this.parentElement))"  data-translate="publicipfs"> <i class="fa-solid fa-envelope-circle-check"></i> Preparer comme Envoi IPFS</button> <button class="btn btn-warning btn-lg"  onclick="event.stopPropagation();canceleditIpfsDistro((this.parentElement))"><i class="fas fa-pencil" aria-hidden="true"></i> Cancel edit </button>`;
        reloadTranslations();
    }
}
function canceleditIpfsDistro(obj) {
    document.getElementById("soveraindocspremint").style.display = "none";
    let nftisMinted = localStorage.getItem("nftisMinted");
    // loadIpfsDistros()
    if (!nftisMinted) {
        console.log("there is not minted NFT");
        reloadIpfsDistros();
    } else {
        console.log("NFT is minted");
        reloadIpfsNFT();
        return;
    }
}
// *********************************
// reloadIpfsNFT()
// *********************************
async function reloadIpfsNFT() {
    console.log("reloadIpfsNFT ");
    let index = 0;
    // ADD IAM
    let ipfsDistros = JSON.parse(window.localStorage.getItem("IPFSdistributions"));
    if (!ipfsDistros) {
        console.log("THERE IS NO ipfsDistros");
        return;
    }
    let ipfsdist = JSON.parse(ipfsDistros[0].signedJSON);
    let iamcode = ipfsdist.iamCode;
    let cid = ipfsdist.cid;
    console.log("CID: ", ipfsdist);
    // ----------------
    // CALCULATE TIME PASSED
    function formatTimeComponent(value, unit) {
        return value === 1 ? `${value} ${unit}` : `${value} ${unit}s`;
    }
    // Example Unix timestamp in seconds
    // const unixTimestampInSeconds = 1678771200;
    const unixTimestampInSeconds = ipfsDistros[0].timestamp;
    // Convert the Unix timestamp to milliseconds
    const unixTimestampInMillis = unixTimestampInSeconds * 1000;
    // Get the current time in milliseconds
    const currentTimeInMillis = new Date().getTime();
    // Calculate the time difference in milliseconds
    const timeDifferenceInMillis = currentTimeInMillis - unixTimestampInMillis;
    // Convert the time difference to days, hours, minutes, and seconds
    const daysPassed = Math.floor(timeDifferenceInMillis / 86400000);
    const hoursPassed = Math.floor(timeDifferenceInMillis % 86400000 / 3600000);
    const minutesPassed = Math.floor(timeDifferenceInMillis % 3600000 / 60000);
    const secondsPassed = Math.floor(timeDifferenceInMillis % 60000 / 1000);
    // Build the output string
    let output = "Updated ";
    if (daysPassed > 0) output += formatTimeComponent(daysPassed, "day");
    if (hoursPassed > 0) output += formatTimeComponent(hoursPassed, "hour");
    if (minutesPassed > 0) output += formatTimeComponent(minutesPassed, "minute");
    if (daysPassed === 0 && hoursPassed === 0 && minutesPassed === 0) output += formatTimeComponent(secondsPassed, "second");
    console.log(output + " ago");
    // -------------
    let lIDC = localStorage.getItem("lastIpfsDistroCID");
    if (!lIDC) console.log("CID v2 NOT FOUND", lIDC);
    else {
        console.log("CID v2: ", lIDC);
        // create link from cid
        // let fulllinkfromCID = lIDC;
        let fulllinkfromCID1 = `${ipfsGateway}${lIDC}`;
        console.log("fulllinkfromCID: ", fulllinkfromCID1);
    }
    let docs = ipfsdist.iamDocuments;
    console.log("DOCS LENGTH: ", docs.length);
    linkIPFS = `${ipfsGateway}${lIDC}`; // dejar el espacio para poder cambiar el link ipfs desde la UI en caso de update
    console.log("linkIPFS???", linkIPFS);
    let srcimg = await JSON.parse(window.localStorage.getItem("image"));
    if (!srcimg) {
        console.log("NO SRCIMG");
        return;
    }
    let img = srcimg;
    // get offchain attestation
    let offchainAttestation = localStorage.getItem("iamAttestation");
    let fulloffchainAttestation = localStorage.getItem("fullAttestation");
    console.log("CLEARING #MAIN");
    document.getElementById("soveraindocs").setAttribute("style", "display:inline!important");
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
    <p class="card-text published">Public Documents (<code>${docs.length}</code>): <code>   
    <a href="${fulllinkfromCID}" target="_blank" rel="noopener noreferrer">lIDC</a>
    
    <i class="fas fa-trash" aria-hidden="true" onclick="event.stopPropagation();deleteIpfsDistro((this.parentElement))"></i> 
    
    </code></p>
    <p class="card-text">Full Attestation: <code>
    <a href="${fulloffchainAttestation}" target="_blank" rel="noopener noreferrer">offchain attestation</a>
    <a href="#" class="btn btn-warning" onclick="event.stopPropagation();editIpfsDistro()">make onchain</a>
    
    </code></p>
    <p class="card-text">NFT: 
    <code>  
     <button class='linktypebuton' onclick="event.stopPropagation();mint()">mint(onchain)</button>
    
    <i class="fas fa-trash" style="display:none" aria-hidden="true" onclick="event.stopPropagation();burnNFT((this.parentElement))"></i> 
    
    </code>

    </p>
    
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

    <a href="#"  style="display:none" class="btn btn-primary" onclick="event.stopPropagation();mintUPT()">+ATTEST</a>
    <a href="#" class="btn btn-primary" onclick="event.stopPropagation();editIpfsDistro()">+DOCUMENTS</a>


        </div>
      </div>
    </div>
  </div>
</div>

<div id="content" class="container" style="display:none">

    <div id="head"> 
          <div id="iamInfo"> 
                <h1 id="iamCode">
                <a class="iamlink" href="${offchainAttestation}" target="_blank" rel="noopener noreferrer">${iamcode}</a>   
                </h1> 
                <h3 id="iamTokenId"></h3> 
          </div>
          <img id="iamImg" src="${img}" > 
    </div> 
    
    <table class="table" id="myTable" data-card-width="837"> 
          <thead> <tr> 
          <th data-card-title="">Title</th> 
          <th data-card-action-links="">CID</th> 
       <th data-card-footer="">Attestation</th> 
       
          
          </tr> </thead> <tbody id="tbody"> </tbody> 
    </table> 
    </div> 
    
    <ol id="footer" class="list-group list-group-numbered container" style="display:none"> 
    <li class="list-group-item">ADDRESS: <br>
          <p id="iamAddress" style="word-wrap:break-word"></p>
          <svg id="addrTrue"  style="display:none" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg">   <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" id="addressIsTrue" style="fill:#00ff00" /> </svg>
          <svg id="addrFalse"  style="display:none"  width="18" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" id="addressIsFalse" style="fill:#ff0000"/></svg>   
    </li> 
    <li class="list-group-item"> HASH:<p id="iamHash" style="word-wrap:break-word"> </p></li> 
    <li class="list-group-item">SIGNATURE <p id="iamSignature" style="word-wrap:break-word"></p></li> 
    </ol>
    
    <div class="card text-center">
    <div class="card-footer text-muted">
      ${output + " ago"}
      <a style="display:none" href="ethereum:0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d?value=50000000000000000&gas=21000&gasPrice=5000000000">Donate ETH to 0x1c87FDF8844cbEe5DC7f0F1681C44bF3c99A0e3d</a>
    </div>
  </div>
`;
    //QR
    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "png",
        data: lIDC,
        image: `logoIN6.png`,
        dotsOptions: {
            color: "#1568B0",
            type: "extra-rounded"
        },
        backgroundOptions: {
            color: "var(--qrbackground)"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0
        }
    });
    qrCode.append(document.getElementById("canvas"));
    console.log("qr code ADDED");
    // ADD DOCS
    docs.forEach((e)=>{
        let t = e.title, n = e.cid, i = e.courtesy_translations;
        var s = [];
        i.forEach((e, t)=>{
            let n = e.lang, i = `<button type="button" class="btn btn-outline-info px-3 waves-effect" onclick="event.stopPropagation(); viewItem('${e.cid}')"> \n                    <span>${n} </span><svg width="18" height="16" class="svg-inline--fa fa-language" aria-hidden="true" data-prefix="fas" data-icon="language" role="img" viewBox="0 0 640 512"> <path fill="currentColor" d="M0 128c0-35.3 28.7-64 64-64h512c35.3 0 64 28.7 64 64v256c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zm320 0v256h256V128H320zm-141.7 47.9c-3.2-7.2-10.4-11.9-18.3-11.9s-15.1 4.7-18.3 11.9l-64 144c-4.5 10.1.1 21.9 10.2 26.4s21.9-.1 26.4-10.2l8.9-20.1h73.6l8.9 20.1c4.5 10.1 16.3 14.6 26.4 10.2s14.6-16.3 10.2-26.4l-64-144zM160 233.2l19 42.8h-38l19-42.8zM448 164c11 0 20 9 20 20v4h60c11 0 20 9 20 20s-9 20-20 20h-2l-1.6 4.5c-8.9 24.4-22.4 46.6-39.6 65.4.9.6 1.8 1.1 2.7 1.6l18.9 11.3c9.5 5.7 12.5 18 6.9 27.4s-18 12.5-27.4 6.9L467 333.8c-4.5-2.7-8.8-5.5-13.1-8.5-10.6 7.5-21.9 14-34 19.4l-3.6 1.6c-10.1 4.5-21.9-.1-26.4-10.2s.1-21.9 10.2-26.4l3.6-1.6c6.4-2.9 12.6-6.1 18.5-9.8L410 286.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0l14.6 14.6.5.5c12.4-13.1 22.5-28.3 29.8-45H376c-11 0-20-9-20-20s9-20 20-20h52v-4c0-11 9-20 20-20z" /> </svg> \n                </button> `;
            s.push(i);
        });
        let o1 = ` <tr> <td>${t} </td> <td> <p class='card-link' onclick="event.stopPropagation();copyItem('${n}')"> ${n}</p> </td> <td> <button type="button" class="btn btn-outline-info px-3 waves-effect" onclick="event.stopPropagation();viewItem('${n}')"> <svg width="18" height="16" class="svg-inline--fa fa-eye" aria-hidden="true" data-prefix="fas" data-icon="eye" role="img" viewBox="0 0 576 512"> <path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4 142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zm144 224c0 79.5-64.5 144-144 144s-144-64.5-144-144 64.5-144 144-144 144 64.5 144 144zm-144-64c0 35.3-28.7 64-64 64-11.5 0-22.3-3-31.6-8.4-.2 2.8-.4 5.5-.4 8.4 0 53 43 96 96 96s96-43 96-96-43-96-96-96c-2.8 0-5.6.1-8.4.4 5.3 9.3 8.4 20.1 8.4 31.6z" /> </svg> </button> ${s.join("")} </td> </tr>`;
        tbody.innerHTML += o1;
    });
    content.style.display = "block";
    // customLoader.style.display = "none"
    document.getElementById("loader").style.display = "none";
    console.log("LOADER DELETED!");
    getAddressBalance(userAddress).then((balance)=>{
        console.log(`Balance of ${userAddress}: ${balance} ETH`);
        document.getElementById("amount").innerHTML = ` ${balance} ETH`;
    }).catch((error)=>{
        console.error("Error:", error);
    });
}

//# sourceMappingURL=index.61c547c9.js.map
