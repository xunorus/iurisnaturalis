function addAttestIAMcode() {
    console.log("adding add attesttation for IAM code ");
    let attestUI = `

<section id="makeAttests" class="container">

<p data-translate="addAttests" class="heading">1- MAKE ATESTATION</p>
<p></p>

  <button type="button" class="btn btn-warning" onclick="event.stopPropagation();attest();">ATTEST</button>
  
</section>


`;
    // attesttionUI
    document.getElementById("attesttionUI").innerHTML = attestUI;
    // document.getElementById('soveraindocspremint').innerHTML = attestUI
    document.getElementById("attesttionUI").style.display = "flex";
    document.getElementById("soveraindocs").style.display = "none";
    document.getElementById("splash").style.display = "none";
    document.getElementById("soveraindocspremint").style.display = "none";
}
// const provider = new ethers.providers.JsonRpcProvider("https://goerli.optimism.io");
// console.log('provider:',provider);
// const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Optimism Goerli v1.0.1
function stringToBytes32(inputString) {
    // Ensure the input string is not longer than 32 bytes
    if (inputString.length > 32) throw new Error("Input string is too long for bytes32");
    // Create a new Uint8Array with a length of 32 bytes (bytes32)
    const bytes32 = new Uint8Array(32);
    // Convert the input string to UTF-8 bytes
    const utf8Bytes = new TextEncoder().encode(inputString);
    // Copy the UTF-8 bytes to the bytes32 array
    bytes32.set(utf8Bytes);
    return bytes32;
}
// ATTEST IAM code
async function attest() {
    // ---------------------------------------------
    //  CHECK WALLET CHOICE (CONNECTED-DISCONNECTED)
    let walletChoice = localStorage.getItem("wallet");
    if (walletChoice) {
        console.log("THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE");
        if (walletChoice == "METAMASK") console.log("USE METAMASK ");
        if (walletChoice == "LOCALWALLET") {
            console.log("USE LOCALWALLET:");
            //   -------------------------------------------------------------
            //STEP 0 -  DECRYPT WALLET TO MAKE THE TRANSACTION
            await Swal.fire({
                title: "Unlock your LOCALWALLET",
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
                    console.log("password entered!");
                    if (result.value == "") {
                        console.log("IS EMPTY");
                        Toast.fire({
                            icon: "error",
                            title: "Password cannot be empty"
                        });
                        return;
                    }
                    // cancelMinting.disabled = true;//DISABLE CANCEL
                    openModalId("#attestingModal");
                    // step0.innerHTML= `<h5>1- Decrypting wallet  <span id="step0Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="step0Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/></svg> </h5>
                    document.getElementById("stepAttest0").innerHTML = `<h5>1- Decrypting wallet 
                           <span id="stepAttest0Spinner" style="" class="spinner-grow spinner-grow-sm"></span>
                           <svg id="stepAttest0Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/>
                           </svg> </h5>
                          <div id="stepAttest0Progress"></div>`;
                    let encryptedjson = localStorage.getItem("jsonWallet");
                    let ew = JSON.parse(encryptedjson);
                    console.log("pub key of wallet in localstorage:", ew.address);
                    let wallet;
                    try {
                        wallet = ethers.Wallet.fromEncryptedJson(encryptedjson, result.value, decryptAttestProgress).then(async (localWallet)=>{
                            // w=localWallet;
                            console.log("WALLET DECRYPTED: ", localWallet.address);
                            // DO SOMETHING HERE... -------------------------------------------------------------
                            //   GET PROVIDER
                            let provider = new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`);
                            console.log("JsonRpcProvider", optionsList[0].API);
                            //   GET NETWORK
                            try {
                                network = await provider.getNetwork();
                            } catch (error) {
                                console.log(error.message);
                                fixedToast.fire("Error", error.message, "error");
                                mode.innerHTML = "OFFCHAIN";
                                mode.style.border = "1px solid red";
                                mode.style.color = "red";
                            }
                            // GET SIGNER
                            const signer = localWallet.connect(provider);
                            const address = await signer.getAddress();
                            balance = await signer.getBalance();
                            console.log("address and balance:", address, parseInt(balance, 16));
                            // ATTEST
                            console.log("ATTEST IAM code is controlled by IAM address");
                            const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia Testnet v0.26
                            let eas = new EAS(EASContractAddress);
                            console.log("provider: ", provider);
                            eas.connect(provider);
                            console.log("offchainIAM");
                            let inputString = localStorage.getItem("iamcode");
                            const bytes32Value = stringToBytes32(inputString);
                            console.log(bytes32Value);
                            const offchain = await eas.getOffchain();
                            // get timestamp
                            const timestamp = Math.floor(new Date().getTime() / 1000);
                            console.log(timestamp);
                            const schemaEncoder = new SchemaEncoder("bytes32 IAMcode,address IAMaddress");
                            const encodedData = schemaEncoder.encodeData([
                                {
                                    name: "IAMcode",
                                    value: bytes32Value,
                                    type: "bytes32"
                                },
                                {
                                    name: "IAMaddress",
                                    value: address,
                                    type: "address"
                                }
                            ]);
                            try {
                                offchainAttestation = await offchain.signOffchainAttestation({
                                    recipient: signer.address,
                                    expirationTime: 0,
                                    time: timestamp,
                                    revocable: true,
                                    version: 1,
                                    nonce: 0,
                                    schema: "0x555f3e615bdcbc8af0b83820b451e4bde6ca57cb74b6307ae16ec83d29486b1e",
                                    refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
                                    data: encodedData
                                }, signer);
                            } catch (error) {
                                console.log("error:", error);
                                return;
                            }
                            console.log("offchainAttestation:", offchainAttestation);
                            localStorage.setItem("iamcodeUID", offchainAttestation.uid);
                            // localStorage.setItem('iamcode', iamCode);
                            let offchainobject = {
                                sig: offchainAttestation,
                                signer: signer.address
                            };
                            const url = createOffchainURL(offchainobject);
                            const fullOffchainAttestLink = "https://sepolia.easscan.org" + url;
                            console.log("FULL URL:", fullOffchainAttestLink);
                            // localStorage.setItem('iamcodeUID',offchainAttestation)
                            // END... -------------------------------------------------------------
                            // SUCCESS
                            // 0. close modal id
                            closeModalId("#attestingModal");
                            // 1. save attestation link in localstorage
                            localStorage.setItem("iamAttestation", fullOffchainAttestLink);
                            // 2. modify header
                            setAttestedIamcode(fullOffchainAttestLink);
                            // SUCCESS
                            document.getElementById("iam").style.display = "none";
                            // Toastcenter.fire( 'Success','IAM code created and Attested!', "success");
                            Toast.fire("Success", "IAM code created and Attested!", "success");
                            addEditDocumentsUI();
                            loadDocs();
                            reloadTranslations();
                        // --- END --------------------------------------------------------------------------
                        });
                    } catch (error) {
                        console.log("ERROR AT LOCALWALLET DECRYPTING:", error);
                        Toast.fire({
                            icon: "error",
                            title: "Password incorrect"
                        });
                        return;
                    }
                } else if (result.isDenied) {
                    console.log("NOT DECRYPTED");
                    return;
                }
            });
        }
    }
}
async function revokeOffchain(uid) {
    console.log("REVOKING: ", uid);
    // ---------------------------------------------
    //  CHECK WALLET CHOICE (CONNECTED-DISCONNECTED)
    let walletChoice = localStorage.getItem("wallet");
    if (walletChoice) {
        console.log("THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE");
        if (walletChoice == "METAMASK") console.log("USE METAMASK ");
        if (walletChoice == "LOCALWALLET") {
            console.log("USE LOCALWALLET:");
            //   -------------------------------------------------------------
            //STEP 0 -  DECRYPT WALLET TO MAKE THE TRANSACTION
            await Swal.fire({
                title: "Unlock your LOCALWALLET",
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
                    console.log("password entered!");
                    if (result.value == "") {
                        console.log("IS EMPTY");
                        Toast.fire({
                            icon: "error",
                            title: "Password cannot be empty"
                        });
                        return;
                    }
                    openModalId("#attestingModal");
                    // START STEP 0
                    document.getElementById("stepAttest0").innerHTML = `<h5>1- Decrypting wallet 
                           <span id="stepAttest0Spinner" style="" class="spinner-grow spinner-grow-sm"></span>
                           <svg id="stepAttest0Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/>
                           </svg> </h5>
                          <div id="stepAttest0Progress"></div>`;
                    let encryptedjson = localStorage.getItem("jsonWallet");
                    let ew = JSON.parse(encryptedjson);
                    console.log("pub key of wallet in localstorage:", ew.address);
                    ethers.Wallet.fromEncryptedJson(encryptedjson, result.value, decryptAttestProgress).then(async (localWallet)=>{
                        try {
                            // DO SOMETHING HERE with 'localWallet'... ----------------------------------------------
                            // DO SOMETHING HERE... -------------------------------------------------------------
                            console.log("WALLET DECRYPTED: ", localWallet.address);
                            //   GET PROVIDER
                            let provider = new ethers.providers.JsonRpcProvider(`${optionsList[0].API}`);
                            console.log("JsonRpcProvider", optionsList[0].API);
                            //   GET NETWORK
                            try {
                                network = await provider.getNetwork();
                            } catch (error) {
                                console.log(error.message);
                                fixedToast.fire("Error", error.message, "error");
                                mode.innerHTML = "OFFCHAIN";
                                mode.style.border = "1px solid red";
                                mode.style.color = "red";
                            }
                            // GET SIGNER
                            const signer = localWallet.connect(provider);
                            const address = await signer.getAddress();
                            balance = await signer.getBalance();
                            console.log("address and balance:", address, parseInt(balance, 16));
                            if (parseInt(balance, 16) === 0) {
                                console.log("balance is zero");
                                document.getElementById("stepAttest1").innerHTML = `<h5>You dont have enough balance to pay for the transaction <svg id="stepAttest1Error"  style="visibility:hidden" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#fa0000}</style><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg> </h5>`;
                                document.getElementById("stepAttest1Error").style.visibility = "visible";
                                document.getElementById("cancelAttesting").disabled = false;
                                return;
                            } else console.log("balance is not zero");
                            // START STEP 2
                            // document.getElementById('stepAttest1').innerHTML= `<h5>2- Revoking attestation <span id="stepAttest1Spinner" style="" class="spinner-grow spinner-grow-sm"></span> <svg id="stepAttest1Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/> </svg> </h5>`;
                            document.getElementById("stepAttest1").innerHTML = `<h5>2- Revoking attestation 
  <span id="stepAttest1Spinner" style="" class="spinner-grow spinner-grow-sm"></span>
  <svg id="stepAttest1Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/>
  </svg> 
  <svg id="stepAttest1Error"  style="visibility:hidden" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#fa0000}</style><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>
  
  </h5>`;
                            document.getElementById("cancelAttesting").disabled = true;
                            // ATTEST
                            console.log("REVOKE ATTEST IAM code is controlled by IAM address");
                            const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia Testnet v0.26
                            let eas = new EAS(EASContractAddress);
                            console.log("provider: ", provider);
                            eas.connect(provider);
                            eas.connect(signer);
                            console.log("formatBytes32String:", uid);
                            const transaction = await eas.revokeOffchain(uid);
                            await transaction.wait();
                            console.log("revokeOffchain TX:", transaction);
                            // SUCESS, REVOKED
                            document.getElementById("iam").setAttribute("style", "display:flex !important");
                            document.getElementById("splash").setAttribute("style", "display:none !important");
                            document.getElementById("attesttionUI").setAttribute("style", "display:none !important");
                            document.getElementById("soveraindocs").setAttribute("style", "display:none !important");
                            document.getElementById("soveraindocspremint").setAttribute("style", "display:none !important");
                            headMessages.innerHTML = "";
                            localStorage.removeItem("iamcode");
                            console.log("iamcode REMOVED!");
                            localStorage.removeItem("iamAttestation");
                            console.log("iamAttestation removed from localstorage !");
                            localStorage.removeItem("iamcodeUID");
                            console.log("iamcodeUID removed from localstorage !");
                            console.log("iamAttestation REVOKED!");
                            Toast.fire({
                                icon: "error",
                                title: "iam code and attetation deleted!"
                            });
                            // DELETE STEP 2
                            document.getElementById("stepAttest1Spinner").style.display = "none";
                            document.getElementById("stepAttest1Check").style.visibility = "visible";
                            document.getElementById("cancelAttesting").disabled = false;
                            document.getElementById("cancelAttesting").innerText = "close";
                        // FIN DO SOMETHING HERE... -------------------------------------------------------------
                        } catch (error) {
                            console.log("ERROR AT LOCALWALLET PROCESSING:", error);
                            document.getElementById("stepAttest1Spinner").style.display = "none";
                            document.getElementById("stepAttest1Check").style.display = "none";
                            document.getElementById("stepAttest1Error").style.visibility = "visible";
                            document.getElementById("cancelAttesting").disabled = false;
                        // document.getElementById('stepAttest1Check').innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg{fill:#fa0000}</style><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`
                        }
                    }).catch((error)=>{
                        console.log("ERROR AT LOCALWALLET DECRYPTING:", error);
                        Toast.fire({
                            icon: "error",
                            title: error
                        });
                    });
                } else if (result.isDenied) {
                    console.log("NOT DECRYPTED");
                    return;
                }
            });
        }
    }
}
// https://sepolia.easscan.org/schema/view/0x5e9a817ef4acf13c8e2dba0944586660292e02e169a2da473530e6709c502338
async function attestDocument(cid) {
    console.log("ATTEST for document  controlled by IAM address");
    const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia Testnet v0.26
    const provider = new ethers.providers.JsonRpcProvider("https://endpoints.omniatech.io/v1/eth/sepolia/public");
    const privateKey = "0xeddb270797ba825b0e911b0fd9d203e50d753f61691d1172c9fd9bd9c10f520d";
    const signer = new ethers.Wallet(privateKey, provider);
    console.log("signer:", signer);
    let eas = new EAS(EASContractAddress);
    console.log("provider: ", provider);
    eas.connect(provider);
    console.log("offchainIAM");
    const inputString = "IAM-chm-04181980";
    const bytes32Value = stringToBytes32(inputString);
    console.log(bytes32Value);
    const offchain = await eas.getOffchain();
    const timestamp = Math.floor(new Date().getTime() / 1000);
    console.log(timestamp);
    const schemaEncoder = new SchemaEncoder("bytes32 IAMcode,string IAMdocument");
    const encodedData = schemaEncoder.encodeData([
        {
            name: "IAMcode",
            value: bytes32Value,
            type: "bytes32"
        },
        {
            name: "IAMdocument",
            value: signer.address,
            type: "string"
        }
    ]);
    const offchainAttestation1 = await offchain.signOffchainAttestation({
        recipient: signer.address,
        expirationTime: 0,
        time: timestamp,
        revocable: true,
        version: 1,
        nonce: 0,
        schema: "0x5e9a817ef4acf13c8e2dba0944586660292e02e169a2da473530e6709c502338",
        refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
        data: encodedData
    }, signer);
    console.log("offchainAttestation:", offchainAttestation1);
    let offchainobject = {
        sig: offchainAttestation1,
        signer: signer.address
    };
    const url = createOffchainURL(offchainobject);
    console.log("URL:", "https://sepolia.easscan.org" + url);
}
async function attestAtesttation(uid) {
    console.log("attestAtesttation: ", uid);
    // }
    // function viewItem(cid) {
    // let ipfsGateway = 'https://w3s.link/ipfs/';
    // let ipfslink = ipfsGateway+cid;
    let attLink = `${uid}`;
    console.log("attLink:", attLink);
    window.open(attLink, "_blank", "fullscreen=yes");
    return false;
}

//# sourceMappingURL=index.4c8bdd12.js.map
