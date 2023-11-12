function addEditDocumentsUI() {
    let editDocsUI = `
    <section id="iamcodecreation" class="container">
</section>
  <section id="uploaddocs" class="container">
  
    <p data-translate="addDocs" class="heading">1- ADD DOCUMENTS</p>
  
  
    <div id="documentos">
      <div id="historial">
        <button type="button" class="btn btn-outline-primary"
          onclick="event.stopPropagation();addDoc('#addDocument')"><i class="fa-solid fa-plus" aria-hidden="true"></i>
          <span data-translate="adddoc">Add document</span></button>
  

  <table id="table" class="table" 
  data-pagination="false" 
  data-search="true" 
  data-reorderable-rows="true"
  data-use-row-attr-func="true"  
  data-card-width="837"  >

          <thead>
            <tr>
              <th data-field="title" data-card-title title="document title">Title</th>
              <th data-field="cid" data-card-action-links title="Content ID of the document">CID</th>
              <th data-field="translations" data-card-action-links title="courtesy translations="><i
                  class="fa-solid fa-globe"></i></th>
              <th data-print-ignore="true" data-field="actions" data-card-footer>Actions</th>
  
  
  
            </tr>
          </thead>
          <tbody id="uploadedDocuments"></tbody>
        </table>
  
  
      </div>
    </div>
    <br>
    <div id="addDocsButtons" class="">
      <button class="btn btn-primary btn-lg " id="createIPFSDelivery" onclick="event.stopPropagation();createIPFSDelivery((this.parentElement))" disabled data-translate="publicipfs"> <i
          class="fa-solid fa-envelope-circle-check"></i> Preparer comme Envoi IPFS</button>
      <br>
  
  </section>
  
  
  <section id="createenvoi" class="container">
  
  
    <ul id="IPFSDeliveries">
    
    </ul>
  
  
    <p id="vosenvois"></p>
    <div id="qrcode"></div>
  
    <pre id="sigresult"></pre>
  
    <br />
  
  
  
    </section>

    `;
    document.getElementById("soveraindocspremint").innerHTML = editDocsUI;
    document.getElementById("soveraindocs").style.display = "none";
    document.getElementById("soveraindocspremint").style.display = "block";
}
async function loadDocs() {
    console.log("DOCS FUNCTION");
    let LoadDocs = JSON.parse(window.localStorage.getItem("documents"));
    if (LoadDocs) {
        $("#table").bootstrapTable("destroy"); //Destroy bootstrap table
        $("#table").bootstrapTable();
        //  LISTEN TO REORDER
        $("#table").on("reorder-row.bs.table", async function(e, order) {
            console.log(order);
            await updateArray();
            Toast.fire("order Updated", "", "success");
            Toast.fire(dictionary[globalLang]["orderupdated"], "", "success");
        });
        LoadDocs.forEach((el)=>{
            let t = el.title;
            let c = el.cid.trim();
            let ct = el.courtesy_translations;
            let att = el.attestation;
            // if(!att){
            //   console.log(`this ${el} DOESNT HAVE AN ATTESTATION`)
            //   att = ''
            // }
            var intrarows = [];
            let b = ct.forEach((x)=>{
                let l = x.lang;
                let cid1 = x.cid.trim();
                intrarows.push(` <button style="display:block" type="button" data-lang="${l}" data-cid="${cid1}" class="btn btn-outline-primary" onclick="event.stopPropagation();viewItem('${cid1}')" ><i class="fa-solid fa-language"></i> <span>${l}</span></button> `);
            });
            var rows = [];
            if (!att) {
                console.log(`this ${el} DOESNT HAVE AN ATTESTATION`);
                // att = ''
                rows.push({
                    title: `${t} <i class="fa-solid fa-pen edittitle"  onclick="event.stopPropagation();editTitle('${t}',event)"></i>`,
                    cid: `<p> ${c}</p>`,
                    translations: `${intrarows.join("")} `,
                    actions: `
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();viewItem('${c}')"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();copyItem('${c}')"><i class="fas fa-clipboard" aria-hidden="true"></i></button> 
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();deleteItem((this.parentElement))"><i class="fas fa-trash" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();showCIDQR('${c}','${t} ')"><i class="fas fa-qrcode" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();uploadCourtesyTranslation(this.parentElement)" ><i class="fa-solid fa-plus" aria-hidden="true"></i> <span  data-translate="addcourtesytranslation" >Add</span></button>
        `
                });
            } else {
                console.log(`YES ${el} HAS AN ATTESTATION`);
                rows.push({
                    title: `${t} <i class="fa-solid fa-pen edittitle"  onclick="event.stopPropagation();editTitle('${t}',event)"></i>`,
                    cid: `<p> ${c}</p>`,
                    translations: `${intrarows.join("")} `,
                    actions: `
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();viewItem('${c}')"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();copyItem('${c}')"><i class="fas fa-clipboard" aria-hidden="true"></i></button> 
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();deleteItem((this.parentElement))"><i class="fas fa-trash" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();showCIDQR('${c}','${t} ')"><i class="fas fa-qrcode" aria-hidden="true"></i></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();uploadCourtesyTranslation(this.parentElement)" ><i class="fa-solid fa-plus" aria-hidden="true"></i> <span  data-translate="addcourtesytranslation" >Add</span></button>
        <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();attestAtesttation('${att}')" >
        <i class="fa-solid fa-file-signature"></i>
        <span data-translate="attestation">Attestation</span></button>
        `
                });
            }
            $("#table").bootstrapTable("append", rows);
            reloadTranslations();
        });
        // activate envoi button
        console.log("ACTIVA BOTON ENVOI");
        document.getElementById("createIPFSDelivery").disabled = false; // DESACTIVAR BOTON createIPFSDelivery
    // document.querySelector('#cancelAttesting').disabled=false;
    } else $("#table").bootstrapTable();
    return true;
} // fin loadDocs
// *********************************
// ADD DOC
// *********************************
function addDoc(obj) {
    console.log("ADDING DOC", obj);
    // openModal(obj)
    // openModalId('#addDocument')
    openModalId(`${obj}`);
    document.getElementById("input_image").onchange = function(e) {
        let name = input_image.files[0].name;
        let title = name.substring(0, name.lastIndexOf(".")) || name;
        taskInput.value = title;
        console.log("NEW title", title);
    };
}
function openModal(id, event) {
    console.log("openingModal", id, event);
    // if (!user) { 
    if (!userAddress) {
        Swal.fire({
            title: "Connect first",
            imageUrl: "undraw_login_re_4vu2.svg",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Login!",
            showCancelButton: true,
            confirmButtonText: "Connect",
            // showLoaderOnConfirm: true,
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
                //   login();
                openModal("#walletOptions");
                return;
            }
        });
        return;
    }
    setTimeout(()=>{
        var myModal = new bootstrap.Modal(document.querySelector(`${id}`));
        myModal.show(event);
    }, 50);
}
// TABLE
function getFiles() {
    const fileInput = document.querySelector('input[type="file"]');
    return fileInput.files;
}
function blobToFile(theBlob, fileName) {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
}
var xinput = document.getElementsByTagName("input")[0];
xinput.onchange = function() {
    console.log("UPLOADING PDf?");
    console.log(this.value);
    console.log(this.value.name);
    console.log(input_image.files[0].name);
    taskInput.value = input_image.files[0].name;
};
// ---------------------------------------------
// UPLOAD DOCUMENT
// ---------------------------------------------
document.getElementById("submit_button").addEventListener("click", async (e)=>{
    console.log("uploading to ipfs!");
    // AGREGA EL TITULO AUTOMATICAMENTE A PARTIR DEL ARCHIVO
    if (!taskInput.value) {
        console.log("give this file a title first...");
        taskInput.classList.add("is-invalid");
        Toast.fire("", dictionary[globalLang]["setTitlefirst"], "info");
        return;
    } else {
        taskInput.classList.remove("is-invalid");
        taskInput.classList.add("is-valid");
    }
    if (!input_image.files[0]) {
        console.log("you have to select a pdf first!");
        Toast.fire("", dictionary[globalLang]["selPDFfirst"], "info");
        return;
    }
    // LAUNCH PASSWORD INPUT----------------------------
    //  CHECK WALLET CHOICE (CONNECTED-DISCONNECTED)
    let walletChoice = localStorage.getItem("wallet");
    if (walletChoice) {
        console.log("THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE");
        if (walletChoice == "METAMASK") console.log("USE METAMASK ");
        if (walletChoice == "LOCALWALLET") {
            console.log("USE LOCALWALLET:");
            // FIX modal bug
            closeModalId("#addDocument");
            // openModalId('#addDocument')
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
                    // openModalId('#addDocument')
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
                            console.log("WALLET DECRYPTED: ", localWallet.address);
                            // // START STEP 2
                            document.getElementById("stepAttest1").innerHTML = `<h5>2- UPLOADING FILE 
      <span id="stepAttest1Spinner" style="" class="spinner-grow spinner-grow-sm"></span>
      <svg id="stepAttest1Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/>
      </svg> </h5>`;
                            document.getElementById("cancelAttesting").disabled = true;
                            // add loading
                            console.log("start loading ...");
                            document.querySelector("#submit_button").innerHTML = ` <span class="spinner-grow spinner-grow-sm"></span> Loading.. `;
                            submit_button.disabled = true;
                            // SANITIZER
                            const title = taskInput.value;
                            const data = input_image.files[0];
                            let name = data.name; // funciona...
                            console.log("name: ", name);
                            // let newStr = name.replace(/\s/g, ""); // Removes all spaces
                            let newStr = name.replace(/[\s-]/g, "");
                            console.log("new compresed name: ", newStr);
                            // V2 UPLOAD ..
                            // UPLOAD TO IPFS
                            let ipfsGateway1 = "https://w3s.link/ipfs/";
                            const files = [
                                new File([
                                    data
                                ], name, {
                                    type: "application/pdf"
                                })
                            ];
                            const client = makeStorageClient();
                            const cid1 = await client.put(files, {
                                wrapWithDirectory: false
                            });
                            let ipfsLink = `"${ipfsGateway1}${cid1}/${name}"`;
                            const urlGateway = "https://dweb.link/api/v0";
                            let listLink = `${urlGateway}/ls?arg=${cid1}`;
                            console.log("stored files with cid:", "https://w3s.link/ipfs/" + cid1);
                            console.log("file link:", ipfsLink);
                            console.log("list link:", listLink);
                            // -----------------
                            // UPLOAD TO IPFS'
                            // console.log('UPLOADING TO IPFS...')
                            // console.log('DATA:',data)
                            // console.log('NAME:',name)
                            // const files = [ new File([data], name,  { type: 'application/pdf' }) ]
                            // console.log('files:',files)
                            // f= files;
                            // UPLOAD TO IPFS
                            //  const client = makeStorageClient()
                            //  try { CID =  await client.put(files, { wrapWithDirectory:false })}
                            //  catch (error) { 
                            //   console.log(error.message); 
                            //   return }
                            //  let ipfsLink = `${ipfsGateway}${CID}`
                            //  console.log('IPFS STORED FILE AT :',ipfsLink)
                            //  console.log('cid:' ,CID);
                            //  localStorage.setItem('lastIpfsDistroCID', ipfsLink);
                            // const client = makeStorageClient()
                            // const cid = await client.put(files, { wrapWithDirectory:false })
                            // let ipfsLink = `"${ipfsGateway}${cid}/${name}"`
                            // let listLink  =`${urlGateway}/ls?arg=${cid}`
                            // console.log('stored files with cid:',ipfsGateway+ cid)
                            // console.log('file link:',ipfsLink)
                            // console.log('list link:',listLink)
                            // SUCCESS UPLOAD
                            document.getElementById("stepAttest1Spinner").style.display = "none";
                            document.getElementById("stepAttest1Check").style.visibility = "visible";
                            document.querySelector("#stepAttest2").innerHTML = `File uploaded to IPFS: ${cid1} <br> <a target="_blank" href="${"https://w3s.link/ipfs/" + cid1}">view</a>`;
                            document.getElementById("stepAttest3").innerHTML = `<h5>3- ATTESTING 
    <span id="stepAttest3Spinner" style="" class="spinner-grow spinner-grow-sm"></span>
    <svg id="stepAttest3Check"  style="visibility:hidden" width="18" height="16" viewBox="0 0 512 512"  xmlns:svg="http://www.w3.org/2000/svg"> <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2 275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3 179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8 172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" style="fill:#00ff00"/>
    </svg> </h5>`;
                            // ATTEST STUFF
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
                            //TIMESTAMP IN UNIXTIME
                            const timestamp = Math.floor(new Date().getTime() / 1000);
                            console.log(timestamp);
                            // ATTEST
                            console.log(" ATTEST document");
                            const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia Testnet v0.26
                            let eas = new EAS(EASContractAddress);
                            console.log("provider: ", provider);
                            eas.connect(provider);
                            eas.connect(signer);
                            const offchain = await eas.getOffchain();
                            // PREAPARE DATA
                            console.log("offchainIAM");
                            let inputString = localStorage.getItem("iamcode");
                            const bytes32Value = stringToBytes32(inputString);
                            console.log(bytes32Value);
                            // ATTEST FOR DOCUMENT
                            // https://sepolia.easscan.org/schema/view/0x5e9a817ef4acf13c8e2dba0944586660292e02e169a2da473530e6709c502338
                            const schemaEncoder = new SchemaEncoder("bytes32 IAMcode,string IAMdocument");
                            const encodedData = schemaEncoder.encodeData([
                                {
                                    name: "IAMcode",
                                    value: bytes32Value,
                                    type: "bytes32"
                                },
                                {
                                    name: "IAMdocument",
                                    value: cid1,
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
                                schema: "0x5e9a817ef4acf13c8e2dba0944586660292e02e169a2da473530e6709c502338",
                                refUID: referencedUID,
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
                            const documentAttestLink = "https://sepolia.easscan.org" + url;
                            // SUCCESS ATTESTATION
                            document.getElementById("stepAttest3Spinner").style.display = "none";
                            document.getElementById("stepAttest3Check").style.visibility = "visible";
                            document.querySelector("#stepAttest4").innerHTML = `${dictionary[globalLang]["attestationsigned"]} <br> <a target="_blank" href="${documentAttestLink}">view</a>`;
                            // END... -------------------------------------------------------------
                            // hide file input and title input
                            taskInput.style.display = "none";
                            document.querySelector(".input-group").style.display = "none";
                            // SHOW OPERATION DETAILS;
                            // document.querySelector('#stepAttest2').innerHTML =`File uploaded to IPFS: ${cid} <br> <a target="_blank" href="${'https://w3s.link/ipfs/'+ cid}">view</a>`;
                            // document.querySelector('#success_message').style.display= 'block';
                            // Toast.fire( 'Success','File uploaded to IPFS!', "success");
                            // fileuploaded
                            Toast.fire(dictionary[globalLang]["fileuploaded"], "", "success");
                            // 1-ADD TO UI(table)
                            let cid2ui = addCidToUI(title, cid1);
                            console.log("cid2ui:", cid2ui);
                            var $table = $("#table");
                            $table.bootstrapTable("append", cid2ui);
                            // RELOAD TRANSALATIONS
                            reloadTranslations();
                            // EMPTY AND RESTORE MODAL 
                            taskInput.value = "";
                            document.querySelector("#addAnother_button").style.display = "block";
                            // 2-ADDS TO LOCALSTORAGE (store)
                            let scid = cid1.trim();
                            let ct = [];
                            // let doc = { title: title, cid: scid, courtesy_translations: ct }
                            let doc = {
                                title: title,
                                cid: scid,
                                courtesy_translations: ct,
                                attestation: documentAttestLink
                            } //NEW
                            ;
                            console.log("doc:", doc);
                            SaveDocToLocalStorage(doc);
                            // activate envoi button
                            console.log("ACTIVA BOTON ENVOI");
                            document.getElementById("createIPFSDelivery").disabled = false; // DESACTIVAR BOTON createIPFSDelivery
                            document.querySelector("#cancelAttesting").disabled = false;
                        // FIN DO SOMETHING HERE... -------------------------------------------------------------
                        } catch (error) {
                            console.log("ERROR AT LOCALWALLET PROCESSING:", error);
                            // cancelAttesting // uploading 
                            document.getElementById("cancelAttesting").disabled = false;
                            taskInput.value = "";
                            taskInput.classList.remove("is-valid");
                            document.getElementById("submit_button").disabled = false;
                            document.querySelector("#submit_button").innerHTML = `Upload`;
                            reloadTranslations();
                        // submit_button
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
// FINC LAUNCH PASSWORD INPUT----------------------------
});
async function storeWithProgress(files) {
    // show the root cid as soon as it's ready
    const onRootCidReady = (cid1)=>{
        console.log("uploading files with cid:", cid1);
    };
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map((f)=>f.size).reduce((a, b)=>a + b, 0);
    let uploaded = 0;
    const onStoredChunk = (size)=>{
        uploaded += size;
        const pct = 100 * (uploaded / totalSize);
        console.log(`Uploading... ${pct.toFixed(2)}% complete`);
    };
    // makeStorageClient returns an authorized web3.storage client instance
    const client = makeStorageClient();
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, {
        onRootCidReady,
        onStoredChunk
    });
}
function addCidToUI(title, cid1) {
    var rows = [];
    rows.push({
        title: `${title} <i class="fa-solid fa-pen edittitle"  onclick="event.stopPropagation();editTitle('${title}',event)"></i>`,
        cid: ` ${cid1}`,
        translations: ``,
        actions: `
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();viewItem('${cid1}')"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>

      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();copyItem('${cid1}')"><i class="fas fa-clipboard" aria-hidden="true"></i></button> 
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();deleteItem((this.parentElement))"><i class="fas fa-trash" aria-hidden="true"></i></button>
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();showCIDQR('${cid1}')"><i class="fas fa-qrcode" aria-hidden="true"></i></button>
      <button type="button" class="btn btn-outline-primary" onclick="event.stopPropagation();uploadCourtesyTranslation(this.parentElement)" ><i class="fa-solid fa-plus" aria-hidden="true"></i> <span  data-translate="addcourtesytranslation" >Add</span></button>
      
      `
    });
    return rows;
}
function SaveDocToLocalStorage(data) {
    var a = [];
    a = JSON.parse(localStorage.getItem("documents")) || [];
    a.push(data);
    localStorage.setItem("documents", JSON.stringify(a));
}
function SaveDataToLocalStorage(data) {
    var a = [];
    a = JSON.parse(localStorage.getItem("IPFSdistributions")) || [];
    a.push(data);
    localStorage.setItem("IPFSdistributions", JSON.stringify(a));
    console.log("saved IPFSdistributions to LOCALSTORAGE");
}
function RemoveFromLocalStorage(index) {
    var a = [];
    a = JSON.parse(localStorage.getItem("IPFSdistributions")) || [];
    a = a.filter((item)=>item !== a[index]);
    localStorage.setItem("IPFSdistributions", JSON.stringify(a));
}
/*********************************************************************************************
  .) EDIT TABLE ITEMS
  **********************************************************************************************/ function openLink(link) {
    console.log("openLink:", link);
    window.open(link, "_blank", "fullscreen=yes");
    return false;
}
function viewItem(cid1) {
    // let ipfsGateway = 'https://w3s.link/ipfs/';
    // let ipfslink = ipfsGateway+cid;
    let ipfslink = `${ipfsGateway}${cid1}`;
    console.log("ipfslink:", ipfslink);
    window.open(ipfslink, "_blank", "fullscreen=yes");
    return false;
}
// COPY TO CLIPBOARD
function copyItem(cid1) {
    let text = `${ipfsGateway}${cid1}`;
    let textLink = `<a href="${text}">${text}</a>`;
    if (window.clipboardData && window.clipboardData.setData) {
        Toast.fire("Copied to Clipboard", textLink, "success");
        return window.clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            Toast.fire("Copied to Clipboard", textLink, "success");
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return prompt("Copy to clipboard: Ctrl+C, Enter", text);
        } finally{
            document.body.removeChild(textarea);
        }
    }
}
async function showCIDQR(cid1, title) {
    let linkIPFS = `${ipfsGateway}${cid1}`;
    console.log(cid1, title, linkIPFS);
    const cidqr = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "png",
        data: linkIPFS,
        image: `iurisnaturalis.jpg`,
        dotsOptions: {
            color: "#1568B0",
            type: "extra-rounded"
        },
        backgroundOptions: {
            color: "#fff"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0
        }
    });
    let cidqrRaw = await cidqr.getRawData("png");
    console.log(" WATCH showCIDQR cidqrRaw: ", cidqrRaw);
    let cidqrURL = URL.createObjectURL(cidqrRaw);
    console.log("xqr: ", cidqr);
    Swal.fire({
        text: title,
        imageUrl: cidqrURL,
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: "QR Code image"
    });
}
function editTitle(title, event) {
    console.log(title, event, event.target, event.target.parentNode);
    Swal.fire({
        title: 'Change "' + title + '" title',
        input: "text",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "change",
        showLoaderOnConfirm: true,
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
            console.log("RESULT:", result.value);
            let title = result.value;
            let htmlcontent = `${title} <i class="fa-solid fa-pen edittitle"  onclick="event.stopPropagation();editTitle('${title}',event)"></i>`;
            event.target.parentNode.innerHTML = htmlcontent;
            setTimeout(()=>{
                updateArray();
                console.log(" saved!");
            }, 1000);
            return;
        }
    });
}
async function uploadCourtesyTranslation(event) {
    console.log("adding courtesy translation", event);
    if (!userAddress) Swal.fire({
        title: "Connect first",
        imageUrl: "undraw_login_re_4vu2.svg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Connect!",
        showCancelButton: true,
        confirmButtonText: "connect",
        // showLoaderOnConfirm: true,
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
            openModal("#walletOptions");
            // login();
            return;
        }
    });
    if (userAddress) {
        console.log("user:", userAddress);
        // 1- check if already owns/minted and UP
        //=+++++++++++++++===============
        const { value: name } = await Queue.fire({
            title: "seelect courtesy translation language",
            input: "select",
            inputOptions: {
                en: "English",
                fr: "French",
                es: "Spanish"
            },
            inputValue: "en",
            showCancelButton: true,
            currentProgressStep: 0,
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
            },
            didOpen: ()=>{
                Swal.getInput().addEventListener("change", ()=>{});
            }
        });
        if (name) console.log("title: ", name);
        else {
            console.log("nothing to do here...");
            return;
        }
        //=+++++++++++++++===============
        const { value: file } = await Queue.fire({
            title: "Select courtesy translation File",
            input: "file",
            inputAttributes: {
                "accept": "pdf/*",
                "aria-label": "Upload your profile picture"
            },
            showCancelButton: true,
            confirmButtonText: "add",
            currentProgressStep: 1,
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
            },
            inputValidator: (value)=>{
                if (!value) return "You need to choose something!";
            }
        });
        if (file) console.log("file: ", file);
        else {
            console.log("nothing to do here...");
            return;
        }
        Queue.fire({
            title: "Your  document is being uploaded...",
            html: "data uploading",
            currentProgressStep: 2,
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonText: "close",
            showConfirmButton: false,
            didOpen: ()=>{
                Swal.showLoading();
            }
        });
        console.log("start loading ...");
        // UPLOAD TO IPFS
        const files = [
            new File([
                file
            ], name)
        ];
        console.log("UPLOAD TO IPFS: ", files);
        const client = makeStorageClient();
        try {
            cid = await client.put(files, {
                wrapWithDirectory: false
            });
        } catch (error) {
            console.log(error.message);
            restoreEnvoiButton();
            return;
        }
        let ipfsLink = `${ipfsGateway}${cid}`;
        console.log("stored file :", `${ipfsGateway}${cid}`);
        // ----------------
        console.log("SUCCESS: ", cid, ipfsLink);
        //  add button's courtesy translation to UI
        event.parentNode.childNodes[2].innerHTML += `	
  <button style="display:block" type="button" data-lang="${name}" data-cid="${cid}" class="btn btn-outline-primary" onclick="event.stopPropagation();viewItem('${cid}')" ><i class="fa-solid fa-language"></i> <span>${name}</span></button>
   `;
        //add to localstorage
        updateArray();
        // show success message
        await Queue.fire({
            title: "File uploaded to IPFS!",
            icon: "success",
            html: `CID: ${cid}<br><br> <a target="_blank" href="https://explore.ipld.io/#/explore/${cid}">view </a>`,
            currentProgressStep: 3,
            confirmButtonText: "ok",
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
        });
    }
}
// UPDATE ARRAY
async function updateArray() {
    console.log("updateArray EXECUTED");
    let docs = Array.from(document.getElementById("uploadedDocuments").children); //HECHO GLOBAL TEMPORALMENTE. 
    console.log("docs:", docs);
    let docNames = [];
    docs.forEach(function(docs, index) {
        let t = docs.children[0].innerText; //title
        let c = docs.children[1].innerText.trim(); // cid
        let ctc = docs.children[2].children; // courtesy translations
        let ct = [];
        var newArray = Array.from(ctc).filter(function(item) {
            let x = item.hasAttribute("data-cid");
            if (item.hasAttribute("data-cid")) {
                let y1 = item.dataset.lang; // lang
                let z = item.dataset.cid.trim(); //cid
                let courtesytranslations = {
                    lang: y1,
                    cid: z
                };
                ct.push(courtesytranslations);
            }
        });
        let doc = {
            title: t,
            cid: c,
            courtesy_translations: ct
        };
        docNames.push(doc);
    });
    document.getElementById("createIPFSDelivery").disabled = false; // DESACTIVAR BOTON createIPFSDelivery
    await localStorage.setItem("documents", JSON.stringify(docNames));
}
async function deleteItem(obj) {
    Swal.fire({
        title: dictionary[globalLang]["sure"],
        text: dictionary[globalLang]["wontbeabletorevertthis"],
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: dictionary[globalLang]["yes"]
    }).then((result)=>{
        if (result.isConfirmed) {
            // 1- GET INDEX
            let rowid = obj.parentNode.getAttribute("data-index");
            console.log("riwid: ", rowid);
            // 2- DELETE FROM LOCALSTORAGE
            let docs = Array.from(document.getElementById("uploadedDocuments").children); //HECHO GLOBAL TEMPORALMENTE. 
            let docNames = [];
            docs.forEach(function(docs, index) {
                let t = docs.children[0].innerText; //title
                let c = docs.children[1].innerText.trim(); // cid
                let ctc = docs.children[2].children; // courtesy translations
                let att = docs.children[3].children; // attestation
                let ct = [];
                var newArray = Array.from(ctc).filter(function(item) {
                    let x = item.hasAttribute("data-cid");
                    if (item.hasAttribute("data-cid")) {
                        let y1 = item.dataset.lang; // lang
                        let z = item.dataset.cid.trim(); //cid
                        let courtesytranslations = {
                            lang: y1,
                            cid: z
                        };
                        ct.push(courtesytranslations);
                    }
                });
                let doc = {
                    title: t,
                    cid: c,
                    courtesy_translations: ct
                };
                docNames.push(doc);
            });
            //  let docNames[rowid]
            let updatedDocNames = docNames.filter((item)=>item !== docNames[rowid]);
            localStorage.setItem("documents", JSON.stringify(updatedDocNames));
            // 3- UPDATE TABLE
            $("#table").bootstrapTable("remove", {
                field: "$index",
                values: [
                    Number(rowid)
                ]
            });
            // 4- SEND SWEET MESSAGE 
            // Toast.fire( 'document deleted','', "success");
            Toast.fire(dictionary[globalLang]["documentdeleted"], "", "success");
        // title: dictionary[globalLang]["createpasswordtoencryptwallet"],
        }
    });
}

//# sourceMappingURL=index.ffa5c08e.js.map
