
  /******************************************************************************************************************************************************************************************
  .) DICTIONARY
  ********************************************************************************************************************************************************************************************/
  var userLang = navigator.language || navigator.userLanguage;
  var lang = navigator.language || navigator.userLanguage; //no ?s necessary
  
  const langs = document.querySelectorAll("[lang]");
  const langen = document.querySelectorAll('[lang="en"]');
  const langfr = document.querySelectorAll('[lang="fr"]');
  const langes = document.querySelectorAll('[lang="es"]');
  var dictionary = {
  en: {
    IAMDescription:'IAM-(Your Names initials )-(Your date of birth )',
    names:'Name/s',
    surnames:'Surname/s',
    name:'Name and surname initials',
    placeofbirth:'place of birth',
    address:'address',
    createIAM:'0 -Create IAM code',
    addDocs:'Documents',
    title: "Upload to IPFS",
    upload: "Upload",
    adddoc: "Add document",
    addcourtesytranslation: "Add courtesy translation",
    preview: "preview",
    delete: "delete",
    selPDFfirst: "you have to select a PDF first!",
    setTitlefirst:" Give this upload a title first...",
    bravo: "Bravo!",
    uploadtoipfs: "upload your documents to InterPlanetary File System!",
    desc:'Built on top of the InterPlanetary File System (IPFS), a distributed and content-addressed file system designed to be reliable, resilient and future-proof.',
    signThisToLogin: "Welcome to IURIS NATURALIS! Sign this message to prove you have access to this wallet and we'll log you in. This won't cost you any Ether.",
    back:'back',
    nft_name: "Title",
    enterDescription:'Description',
    enterDate:'Date of birth',
    pricePerItem: 'price',
    address:'address',
    econtact: 'electronic contact',
    wallet: 'Wallet',
    uploadcourtesytranslations:"upload courtesy translations of this document",
    addanother:" Add another",
    close:"Close",
    connect:"CONNECT",
    setpassword:"Set password",
    createwallet: "CREATE WALLET",
    restorewallet: "RESTORE WALLET",
    walletCreation:"CREATING WALLET",
    createpasswordtoencryptwallet:'Create a password to encrypt your local wallet',
    yourkeysyourdata:"Your keys, your data",
    utilsfortheautodetermined:"Publish your self-determination documents according to the OPPT mechanism",
    config:"Config",
    burntoken:"Burn UP token",
    filloutfield:"Please fill out this field",
    publicipfs: "Publish to IPFS",
    decryptingwallet: "Decrypting wallet ...",
    restore: "Restore",
    walletrestore: "Restore wallet",
    start: "Tutorial",
    actions:"Actions",
    youareowneroftoken: "YOUR ARE OWNER OF TOKEN ",
    send: "send",
    cancel: "Cancel",
    updatenft:"Update NFT",
    addAttests:"MAKE ATESTATION",
    attestations:"Attestations",
    log1:"You are revoking your IAMcode attestation as you delete it!. Would you like to continue?(you need gas to pay for the transaction)",
    quest1:"Delete IAM attestation?",
    yes:"Yes",
    connected:"Connected!",
    revoke:  "Yes, revoke it!",
    attestation:"Attestation",
    documentdeleted:"document deleted!",
    orderupdated:"Order updated",
    wontbeabletorevertthis: "You won't be able to revert this!",
    sure:"Are you sure?",
    fileuploaded: "File uploaded to IPFS",
    attestationsigned:"Attestation signed! ",
    uploadandattest:"Processus de téléchargement et d’attestation"
  },
  fr: {
    IAMDescription:'IAM-(Les initiales de vos noms )-(Votre date de naissance )',
    names:'Prenom/s',
    surnames:'Nome/s',
    name:'initials de votre Nom et prenom',
    placeofbirth:'lieu de naissance',
    address:'address',
    createIAM:'0 -Créer le code IAM',
    addDocs:'Documents',
    title: "Télécharger sur IPFS",
    upload: "Télécharger",
    adddoc: "Ajouter document",
    addcourtesytranslation: "Ajouter une traduction de courtoisie",
    preview: "prévisualisation",
    delete: "effacer",
    selPDFfirst: "vous devez d'abord sélectionner un PDF!",
    setTitlefirst:" Donnez d'abord un titre à ce téléchargement...",
    bravo: "Bravo!",
    uploadtoipfs: "TÉLÉCHARGER tes fichiers PDF sur le système de fichiers interplanétaire!",
    desc:`Construit sur le système de fichiers interplanétaire (IPFS), un système de fichiers contenu-adressable et distribué conçu pour être fiable, résilient et à l'épreuve du temps.`,
    signThisToLogin: "Bienvenue sur IURIS-NATURALIS! Signez ce message pour montrer que vous avez accès à votre clé privée pour vous connecter. Cela ne vous coûtera aucun Ether.",
    back:'retour',
    nft_name: "Titre",
    enterDescription: "Description",
    enterDate:'Date de naisance',
    pricePerItem: "Prix",
    address:'adresse',
    econtact: 'contact électronique',
    wallet: 'Portefeuille',
    uploadcourtesytranslations:"télécharger des traductions de courtoisie de ce document",
    addanother:"Ajouter un autre",
    close:"Fermer",
    connect:"CONNECTER",
    setpassword:"Définir le mot de passe",
    createwallet: "CRÉER LE WALLET",
    restorewallet: "RESTAURER WALLET",
    walletCreation:"CRÉATION DU PORTEFEUILLE",
    createpasswordtoencryptwallet:'Créer un mot de passe pour chiffrer votre portefeuille local',
    yourkeysyourdata:"Vos clés, vos données",
    utilsfortheautodetermined:"Publiez vos documents d'autodétermination selon le mécanisme OPPT",
    config:"Paramètres",
    burntoken:"Brûler UP token",
    filloutfield:"Veuillez remplir ce champ",
    publicipfs: "Publiquer sur IPFS",
    decryptingwallet: "Décryptage du portefeuille...",
    restore: "Restaurer",
    walletrestore: "Restaurer wallet",
    start: "Tutorial",
    actions:"Actions",
    youareowneroftoken: "VOUS ÊTES PROPRIÉTAIRE DU JETON ",
    send: "Envoyer",
    cancel: "Annuler",
    updatenft:"Mettre à jour NFT",
    addAttests:"FAIRE L'ATTESTATION",
    attestations:"Attestations",
    log1:"Vous révoquez votre attestation IAMcode en la supprimant!. Voulez-vous continuer? (vous devez payer la transaction) ",
    quest1:"Supprimer l'attestation IAMcode?",
    yes:"Oui",
    connected:"Connected!",
    revoke:  "Oui, révoque-le",
    attestation:"Attestation",
    documentdeleted:"document supprimé!",
    orderupdated:"Order updated",
    wontbeabletorevertthis: "Vous ne pourrez pas revenir en arrière!",
    sure:"Êtes-vous sûr?",
    fileuploaded: "Fichier téléchargé sur IPFS",
    attestationsigned:"Attestation signée! ",
    uploadandattest:"Subir y attestar"
  },
  es: {
    IAMDescription:'IAM-(Las iniciales de su nombre )-(fecha de nacimiento )',
    names:'Nombre/s',
    surnames:'Apellido/s',
    name:'Iniciales de su nombre y apellido',
    placeofbirth:'lugar de nacimiento',
    address:'direccion',
    createIAM:'0 -Crear el código IAM',
    addDocs:'Documentos',
    title: "Sube tus documentos a IPFS",
    upload: "Cargar documento",
    adddoc: "Agregar documento",
    addcourtesytranslation: "Agregar traducción de cortesía",
    preview: "Previsualizar",
    delete: "Borrar",
    selPDFfirst: "¡Tienes que seleccionar un PDF primero!",
    setTitlefirst:" Dale un título a antes de subir el documento...",
    bravo: "¡Bravo!",
    uploadtoipfs: "¡Sube tus documentos al sistema de archivos interplanetario!",
    desc:'Construido sobre el Sistema de archivos interplanetarios (IPFS), un sistema de archivos distribuido y dirigido por contenido diseñado para ser confiable, resistente a la censura y de prueba futura.',
    signThisToLogin: "¡Bienvenido a IURIS-NATURALIS! Firme este mensaje para demostrar que tiene acceso a su llave privada para ingresar. Esto no le costará ningún Ether.",
    back:'volver',
    nft_name: "titulo",
    enterDescription:'Descripcion',
    enterDate:'Fecha de nacimiento',
    pricePerItem: 'precio',
    address:'Direccion',
    econtact: 'contacto electronico',
    wallet: 'Billetera',
    uploadcourtesytranslations:"subir traducciones de cortesía de este documento",
    addanother:"Agrega otro",
    close:"Cerrar",
    connect:"Conectarse",
    setpassword:"Configurar la Contraseña",
    createwallet: "CREAR LA WALLET",
    restorewallet: "RESTAURAR LA WALLET",
    walletCreation:"CREANDO WALLET",
    createpasswordtoencryptwallet:'cree una contraseña para encriptar su wallet local',
    yourkeysyourdata:"Tus llaves, tus datos",
    utilsfortheautodetermined:"Publique sus documentos de autodeterminacion segun el mecanismo OPPT",
    config:"Configuración",
    burntoken:"Quemar UP token",
    filloutfield:"Por favor rellene este campo",
    publicipfs: "Publicar en IPFS",
    decryptingwallet: "Descifrando billetera ...",
    restore: "Restaurar",
    walletrestore: "Restaurar wallet",
    start: "Tutorial",
    actions:"Acciones",
    youareowneroftoken: "ERES CREADOR DEL TOKEN ",
    send: "Enviar",
    cancel: "Cancelar",
    updatenft:"Actualizar NFT",
    addAttests:"DAR TESTIMONIO",
    attestations:"Atestaciones",
    log1:"Estás revocando tu certificación de IAMcode al eliminarla!. Deseas continuar? (debes para pagar por la transacción)",
    quest1:"¿Eliminar la atestacion del codigo IAM?",
    yes:"Sí",
    connected:"Conectado!",
    revoke:  "Si, revócalo!",
    attestation:"Atestación",
    documentdeleted:"Documento borrado",
    orderupdated:"Orden actualizado",
    wontbeabletorevertthis: "¡No podrás revertir esto!",
    sure:"¿Está seguro?",
    fileuploaded: "Archivo subido a IPFS",
    attestationsigned:"¡Atestación firmada! ",
    uploadandattest:"Subir y attestar"
  }
  };
  
  function set_lang(dictionary) {
  
  document.querySelectorAll("[data-translate]").forEach(function(element) {
    if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
      // element.placeholder = dictionary[element.dataset.translate];
      console.log('setlang found a Textarea');
    } else {
      element.innerHTML = dictionary[element.dataset.translate];
    //   console.log('setlant didnt found a Textarea');  
  
    }
  });
  
  
  }
  
  function selectText(lang) {
  switch (lang) {
    case "en":
      set_lang(dictionary.en);
      globalLang = "en";
      break;
    case "fr":
      set_lang(dictionary.fr);
      globalLang = "fr";
      break;
    case "es":
      set_lang(dictionary.es);
      globalLang = "es";
      break;
    default:
      set_lang(dictionary.en);
      globalLang = "en";
  }
  }
  
  // STORAGE
  
  // Swap languages when menu changes
  let langswitch = document.getElementById("langswitch");
  langswitch.onchange = function() {
  var lang = this.value;
  localStorage.setItem("lang", lang);
  selectText(lang);
  };
  

  function reloadTranslations(){
  
    let savedLang = localStorage.getItem("lang");
    if (savedLang) {
    let element = document.querySelector(`option[value='${savedLang}']`);
    element.selected = true;
    selectText(savedLang);
    } else {
    console.log("NO hay LANG GUARDADO, muestra default lang: en ");
    set_lang(dictionary.en);
    globalLang = "en";
    }
    }//fin reloadTranslations
    
  