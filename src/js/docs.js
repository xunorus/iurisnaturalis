

function addEditDocumentsUI(){
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

    `

  document.getElementById('soveraindocspremint').innerHTML = editDocsUI
  document.getElementById('soveraindocs').style.display='none'
  document.getElementById('soveraindocspremint').style.display='block'
  }




  async function loadDocs(){
    console.log('DOCS FUNCTION')
    let LoadDocs = JSON.parse(window.localStorage.getItem('documents'));
    if (LoadDocs) {
    $('#table').bootstrapTable('destroy'); //Destroy bootstrap table
    $('#table').bootstrapTable();
     
  
  
  //  LISTEN TO REORDER
  $('#table').on('reorder-row.bs.table',async function (e, order) {
      console.log(order)
      await updateArray()
      Toast.fire( 'order Updated','', "success");
  
  });
  
    LoadDocs.forEach((el) => {
    let t = el.title 
    let c = el.cid.trim()
    // console.log('cid FIX HERE!:', c)
    let ct = el.courtesy_translations
    
    var intrarows = []
    let b =  ct.forEach((x) => {
    let l = x.lang 
    let cid = x.cid.trim()
    
    
    intrarows.push(` <button style="display:block" type="button" data-lang="${l}" data-cid="${cid}" class="btn btn-outline-primary" onclick="event.stopPropagation();viewItem('${cid}')" ><i class="fa-solid fa-language"></i> <span>${l}</span></button> `)
    })
    
    var rows = []
    rows.push({
      title:`${t} <i class="fa-solid fa-pen edittitle"  onclick="event.stopPropagation();editTitle('${t}',event)"></i>`,
      cid:`<p> ${c}</p>`,
      translations:`${intrarows.join("")} `,
      actions: `
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();viewItem('${c}')"><i class="fa-solid fa-eye" aria-hidden="true"></i></button>
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();copyItem('${c}')"><i class="fas fa-clipboard" aria-hidden="true"></i></button> 
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();deleteItem((this.parentElement))"><i class="fas fa-trash" aria-hidden="true"></i></button>
      <button type="button" class="btn btn-outline-info waves-effect px-3" onclick="event.stopPropagation();showCIDQR('${c}','${t} ')"><i class="fas fa-qrcode" aria-hidden="true"></i></button>
      <button type="button" class="btn btn-outline-primary" onclick="event.stopPropagation();uploadCourtesyTranslation(this.parentElement)" ><i class="fa-solid fa-plus" aria-hidden="true"></i> <span  data-translate="addcourtesytranslation" >Add</span></button>
      `
    })
      $('#table').bootstrapTable('append', rows)
    
      reloadTranslations();
    
    })
    
    // activate envoi button
    console.log('ACTIVA BOTON ENVOI')
    document.getElementById('createIPFSDelivery').disabled = false;// DESACTIVAR BOTON createIPFSDelivery
    
    } else {
    $('#table').bootstrapTable();
    }
    return true
    }// fin loadDocs
    

  // *********************************
  // ADD DOC
  // *********************************
   function addDoc(obj) {
    console.log('ADDING DOC',obj)
    openModal(obj)
    document.getElementById('input_image').onchange = function(e) {
      let name =input_image.files[0].name
     let title=  name.substring(0, name.lastIndexOf('.')) || name;
      taskInput.value = title
    }
   }


   function openModal(id,event){
    console.log('openingModal', id,event)
    if (!user) { 
  
      Swal.fire({
        title: "Connect first",
           imageUrl: 'undraw_login_re_4vu2.svg', 
           imageWidth: 400, 
           imageHeight: 200, 
           imageAlt: 'Login!',
        showCancelButton: true,
        confirmButtonText: 'Connect',
        // showLoaderOnConfirm: true,
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
    //   login();
    openModal('#walletOptions')
          return
        } 

      })
  
    return
    }
  
    setTimeout(() => {
      var myModal = new bootstrap.Modal(document.querySelector(`${id}`))
      myModal.show(event)
    }, 50);
  }