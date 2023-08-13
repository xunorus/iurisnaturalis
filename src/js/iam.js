// async function createIAMCODE_old(){
//     console.log(' called createIAMCODE!')
    
//     let checkFIELDS =  checkIamFields()
//     console.log(' called checkIamFields to =>iamcode REMOVED!')

//     console.log(checkFIELDS)

//     if(checkFIELDS ==false){ // if FALSE
//         console.log('(FALSE) FILL ALL FIELDS FIRST TO CREATE IAM CODE')
//         return
//     }

//     let name =localStorage.getItem("name") 
//     let surname = localStorage.getItem("surname") 
//     let dateOfBirth = localStorage.getItem("dateofbirth") 

//     // human readable nom prenom
//     let nom = name.toLowerCase();
//     let prenom = surname.toLowerCase();
//     let n = nom.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
//     var p = prenom.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS


//     let iamCode = 'IAM-'+[n,p,'-',dateOfBirth].join("").toLocaleLowerCase()

//     localStorage.setItem('iamcode', iamCode);

//     let loadIAM =  localStorage.getItem('iamcode')
//     let loadIAMIMG =  localStorage.getItem('image')

//     iamCode.innerHTML=  `IAM-<span id="iamCodeNom">${n}</span><span id="iamCodePrenom">${n}</span>-<span id="iamCodemmjjaaaa">${dateOfBirth}</span>
//     <div id="editButtons">
//     </div>`;


//     // iamImg.src = JSON.parse(loadIAMIMG);
//     headMessages.innerHTML = `<div class="alert alert-primary alert-dismissible fade show"> 
//     <img src="${JSON.parse(loadIAMIMG)}" alt="Rounded circle Image" class="rounded rounded-circle img-thumbnail" width='40px'>
//     <strong>${loadIAM}</strong> 
//     <button type="button" class="btn-edit" onclick="event.stopPropagation();editIAMcode()" >
//     </button> 
//     </div>`
    
    
    
//     // SUCCESS
//     document.getElementById('iam').style.display = 'none';
//     Toastcenter.fire( 'Success','IAM code created and Attested!', "success");

    
// }




function createIAMcode(){
    console.log('creating IAM CODE')
    document.getElementById('splash').setAttribute('style', 'display:none ');
    document.getElementById('iam').setAttribute('style', 'display:flex');

}
function loadIAMinfo(){
  
  let iamName = localStorage.getItem("name");
  if (!iamName) {
    console.log('NO IAM NAME')
    // return
  }else{
    // if (iamName) {
    iamname.value=iamName; 
      var n =iamName.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
      iamCodeNom.innerHTML = n
      iamname.classList.remove("is-invalid");
      iamname.classList.add("is-valid");
  }
  
  let iamSurname = localStorage.getItem("surname");
  if (!iamSurname) {
        console.log('NO IAM SURNAME')
        // return
      }else{
      iamsurname.value =iamSurname 
    let p =iamSurname.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
      iamCodePrenom.innerHTML = p
      iamsurname.classList.remove("is-invalid");
      iamsurname.classList.add("is-valid");
  }
  
  let iamDate = localStorage.getItem("dateofbirth");
  if (!iamDate)  {
    console.log('NO IAM DATE')
    // return
  }else{
      iamdate.value = iamDate 
      let year = iamDate.split("").splice(4,4).join("")
      let day = iamDate.split("").splice(2,2).join("")
      let month = iamDate.split("").splice(0,2).join("")
      let dateArr = [year,month,day].join("-") 
      var xnow = new Date(dateArr)
      iamdate.value = dateArr 
      iamCodemmjjaaaa.innerHTML = iamDate
      iamdate.classList.remove("is-invalid");
      iamdate.classList.add("is-valid");
  }
  
  
  
  let loadImg = window.localStorage.getItem('image')
  if (!loadImg)  {
    console.log('NO IAM IMG')
    // itemImgMINT.src ='512x512.svg'
    fileCreateItemFile.value = null
    // return
  }else{
      itemImgMINT.src = JSON.parse(loadImg);
    itemImgMINT.style.display='block'
  }  
   
  


  return true 
  }// fin loadIAMinfo
  

  function loadOnchangeEvents(){
  
  
    iamname.onchange = function(e){
      console.log('iamname' ,e)
    if( !iamname.value){
      console.log('detelet iamname')
      localStorage.removeItem('name');
      Toast.fire( 'name deleted','', "error");
      checkIamCode()
      this.blur();
      iamname.classList.add("is-invalid");
        iamname.classList.remove("is-valid");
      return
    }
      let name = iamname.value;
      var n =name.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
    
      console.log('nom: ',n)
      iamCodeNom.innerHTML = n;
      localStorage.setItem('name', name);
      Toast.fire( 'name updated','', "success");
      checkIamCode()
      iamname.classList.remove("is-invalid");
        iamname.classList.add("is-valid");
      this.blur();
    
    }
    
    
    iamsurname.onchange = function(e){
      console.log('iamsurname' ,e)
    if( !iamsurname.value){
      localStorage.removeItem('surname');
      Toast.fire( 'surname deleted','', "error");
      checkIamCode()
      this.blur();
      iamsurname.classList.add("is-invalid");
        iamsurname.classList.remove("is-valid");
      return
    }
      let surname = iamsurname.value;
      var s =surname.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
    
      console.log('surname: ',s)
      iamCodePrenom.innerHTML = s;
      localStorage.setItem('surname', surname);
      Toast.fire( 'surname updated','', "success");
      checkIamCode()
      iamsurname.classList.remove("is-invalid");
        iamsurname.classList.add("is-valid");
      this.blur();
    }
    
    
    iamdate.onblur = function(e){
      console.log('iamdate' ,e)
      if( !iamdate.value){
        localStorage.removeItem('dateofbirth');
        Toast.fire( 'dateofbirth deleted','', "error");
        checkIamCode()
        iamdate.classList.add("is-invalid");
        iamdate.classList.remove("is-valid");
        return
      }
      let dateofbirth = iamdate.value;
      let yyyy = dateofbirth.split('-').slice(1);
      yyyy.push(dateofbirth.split('-').reverse().slice(2));//ok 
      let fDate=yyyy.join('');
          console.log('fDate:', fDate)
          iamCodemmjjaaaa.innerHTML = fDate
          localStorage.setItem('dateofbirth', fDate);
          Toast.fire( 'date of birth info updated','', "success");
          checkIamCode()
          iamdate.classList.remove("is-invalid");
          iamdate.classList.add("is-valid");
    
    }
    
    
    itemImgMINT.onclick = function(e){ 
      console.log('img clicked')
    e.preventDefault()
  
 
  
      if(typeof userAddress === 'undefined'){
      Swal.fire({
        title: "Connect first",
             imageUrl: 'undraw_login_re_4vu2.svg', 
             imageWidth: 400, 
             imageHeight: 200, 
             imageAlt: 'Connect!',
          showCancelButton: true,
          confirmButtonText: 'Connect',
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
          //   walletConnect();
        openModal('#walletOptions')
            return
          } 
        })
    
      return
      }
  if(typeof userAddress != 'undefined'){
      console.log('user:' , userAddress)
      // userKey = user.id;
      fileCreateItemFile.click();
      } 
    
    };
    
  
  
    function encodeImageFileAsURL() {
  
      var filesSelected = document.getElementById("inputFileToLoad").files;
      if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];
  
        var fileReader = new FileReader();
  
        fileReader.onload = function(fileLoadedEvent) {
          var srcData = fileLoadedEvent.target.result; // <--- data: base64
  
          var newImage = document.createElement('img');
          newImage.src = srcData;
  
          document.getElementById("imgTest").innerHTML = newImage.outerHTML;
          alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
          console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        }
        fileReader.readAsDataURL(fileToLoad);
      }
    }
  
    fileCreateItemFile.onchange = async function() {
    console.log("img changed");
     
    if (fileCreateItemFile.files.length == 1) {
      itemImgMINT.src =''
      iamImgLoader.style.display='flex'
  
      
  
    const data = this.files[0]
    let name = data.name;// funciona...
  
    console.log('name: ',name);
  
      const files = [
        // new File(fileParts, fileName, [options])
        new File([data], name,  { type: 'application/pdf' })
      ]
    console.log('FILES: ',files)
    
    // var fileReader = new FileReader();
    let reader = new FileReader();
  
    reader.readAsDataURL(data);
  
    reader.onload = await function() {
      // console.log(reader.result);
      itemImgMINT.src = reader.result;
      // FALTARIA COMPRIMIR LA IMAGEN ANTES
      let b64 = JSON.stringify(reader.result)
    //   console.log(b64);
    localStorage.setItem('image', b64);
    };  
        iamImgLoader.style.display='none'
        itemImgMINT.style.display='block'
        Toast.fire( 'Image added','', "success");
      alertMessage.innerHTML = '';
    }
    
    
    };
    }


    function checkIamCode(){
        if(!iamname.value || !iamsurname.value || !iamdate.value ){
      
          console.log('delete iamcode')
          localStorage.removeItem('iamcode');
          console.log('iamcode REMOVED!')
    
      
        }else{
          console.log('add iamcode to localstorage')
          createIAMCODE()
        //   document.getElementById('edit').setAttribute('style', 'display:none !important');
        }
      
      }


      function checkIamFields(){
        console.log('CALLED checkIamFields!')
    
    
        let iamname = document.getElementById('iamname')
        if (iamname.value=='') { 
            console.log('vacio')  
            iamname.classList.add("is-invalid");
            iamname.classList.remove("is-valid");
            localStorage.removeItem('iamcode');
            console.log('iamcode REMOVED!')
    
            return false
        }   
     
      
        let iamsurname = document.getElementById('iamsurname')
    
        if (iamsurname.value=='') { 
          iamsurname.classList.add("is-invalid");
          iamsurname.classList.remove("is-valid");
        localStorage.removeItem('iamcode');
        console.log('iamcode REMOVED!')
    
        return false  
        }
    
        let iamdate = document.getElementById('iamdate')
    
        if (iamdate.value=='') { 
          iamdate.classList.add("is-invalid");
          iamdate.classList.remove("is-valid");
        localStorage.removeItem('iamcode');
        console.log('iamcode REMOVED!')
    
        return false
        }
    
    
        let loadImg = window.localStorage.getItem('image')
        if (loadImg) {
          itemImgMINT.src =JSON.parse(loadImg);
          itemImgMINT.style.display='block'
          alertMessage.innerHTML = '';
        } else {
            itemImgMINT.src ='512x512.svg'
            fileCreateItemFile.value = null
            let alertelem = `<div  id='imgalert' class="alert alert-danger d-flex align-items-center" role="alert"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:"> <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg> <div> Add an image please... </div> </div>`
            alertMessage.innerHTML = alertelem;
        }
    
        if (!iamname || !iamsurname || !iamdate ||!loadImg ) {
            // document.getElementById('edit').setAttribute('style', 'display:flex !important');
            return false
        }
        return true
      }

      function editIAMcode(){
        console.log('EDIT IAM CODE')
        document.getElementById('iam').setAttribute('style', 'display:flex !important');
        document.getElementById('splash').setAttribute('style', 'display:none !important');
        document.getElementById('attesttionUI').setAttribute('style', 'display:none !important');
        document.getElementById('soveraindocs').setAttribute('style', 'display:none !important');
        document.getElementById('soveraindocspremint').setAttribute('style', 'display:none !important');

        headMessages.innerHTML = ''
        localStorage.removeItem('iamcode');
            console.log('iamcode REMOVED!')

        localStorage.removeItem('iamAttestation');
        console.log('iamAttestation REVOKED!')

        Toast.fire({ icon: 'error', title: 'iam code and attetation deleted!' })



      }
    

      function  checkIfIAMCode(){
        console.log('CHECKING IF checkIfIAMCode')

        let loadIAM = localStorage.getItem('iamcode')
        if(!loadIAM){
            
            console.log('THERE IS NO IAM CODE')
            
            // UPDATE UI
            document.getElementById('iam').setAttribute('style', 'display:flex !important');
            document.getElementById('splash').setAttribute('style', 'display:none !important');
            document.getElementById('soveraindocs').setAttribute('style', 'display:none !important');
            // document.getElementById('mint').setAttribute('style', 'display:none !important');
    
        } else{
            
            console.log('THERE IS IAM CODE')
            // createIAMCODE()
        // document.getElementById('edit').setAttribute('style', 'display:none !important');
      }
    }

    function setAttestedIamcode(offchainAttestation){
      let loadIAMIMG =  localStorage.getItem('image')
      let loadIAM =  localStorage.getItem('iamcode')

      headMessages.innerHTML = `<div class="alert alert-primary alert-dismissible fade show"> 
      <img src="${JSON.parse(loadIAMIMG)}" alt="Rounded circle Image" class="rounded rounded-circle img-thumbnail" width='40px'>
      <strong>${loadIAM}</strong> 

      <a href="${offchainAttestation}" target="_blank" rel="noopener noreferrer">offchain attestation</a>

      <button type="button" class="btn-edit" onclick="event.stopPropagation();editIAMcode()" >
      </button> 

      </div>`
    }





    async function createIAMCODE(){
      console.log(' called createIAMCODE!')
      
      let checkFIELDS =  checkIamFields()
      console.log(' called checkIamFields to =>iamcode REMOVED!')
  
      console.log(checkFIELDS)
  
      if(checkFIELDS ==false){ // if FALSE
          console.log('(FALSE) FILL ALL FIELDS FIRST TO CREATE IAM CODE')
          return
      }
  
      let name =localStorage.getItem("name") 
      let surname = localStorage.getItem("surname") 
      let dateOfBirth = localStorage.getItem("dateofbirth") 
  
      // human readable nom prenom
      let nom = name.toLowerCase();
      let prenom = surname.toLowerCase();
      let n = nom.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
      var p = prenom.match(/(?:\s|^)(\S)/g).join('').replace(/ /g,'').toLowerCase();//FIXB BUG1 ACENTOS
  
  
      let iamCode = 'IAM-'+[n,p,'-',dateOfBirth].join("").toLocaleLowerCase()
  
      localStorage.setItem('iamcode', iamCode);
  
      let loadIAM =  localStorage.getItem('iamcode')
      let loadIAMIMG =  localStorage.getItem('image')
  
      iamCode.innerHTML=  `IAM-<span id="iamCodeNom">${n}</span><span id="iamCodePrenom">${n}</span>-<span id="iamCodemmjjaaaa">${dateOfBirth}</span>
      <div id="editButtons">
      </div>`;
  

      await attest()
      
  
      
  }
  
  
  