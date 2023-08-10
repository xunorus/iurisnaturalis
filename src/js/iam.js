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
    itemImgMINT.src ='512x512.svg'
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
