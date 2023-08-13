
  /*********************************************************************************************
  .) INITv3
  **********************************************************************************************/
  
  // let user;
  // let provider;
  // let signer;

  let init = async () => {
    console.log('initv3 ')

    reloadTranslations()

    //  CHECK WEB3/METAMASK CAPABLE? ********************************************************
    if (typeof window.ethereum !== 'undefined') {
        console.log("web3 provider detected (maybe METAMASK or BRAVE WALLET)")
        metamaskBtn.style.display= 'block'
        // loader.style.display='none'

    } else {
        console.log("NOT WEB3 BROWSER")
        metamaskBtn.style.display= 'none'
        // loader.style.display='none'
        // return
    }


    // NOW CHECK IF LOCALWALLET IS PRESENT********************************************************
  let jsonWallet = localStorage.getItem('jsonWallet')
  if(!jsonWallet){
      // if true, there is no json wallet
      console.log('there is NO json wallet')
} else{
    // if false, there is alreade a wallet
    console.log('YES, there is json wallet')

    let xw= localStorage.getItem('jsonWallet')
    let w =  JSON.parse(xw)
    let addr = '0x'+w.address.toUpperCase();
    var shortAddr = addr.substring(0, 6) + "..."+ addr.substring(38, 42);

    console.log('Localwallet address:', addr ,shortAddr)

    //  DISPLAY BUTTONS
    localwalletBtn.style.display= 'block'
    createWalletBtn.style.display= 'none'
    restoreWalletBtn.style.display= 'none'

    deleteLocalwallet.disabled= false;
}


    //  CHECK WALLET CHOICE (CONNECTED-DISCONNECTED) ********************************************************
    let walletChoice = localStorage.getItem('wallet');
    if (walletChoice) {
        console.log('THERE IS WALLET  CHOICE SAVED IN LOCALSTORAGE')

        if(walletChoice == "METAMASK"){
            console.log('METAMASK IS ACTIVE')
            useMetamaskWallet()
            reloadTranslations()
      document.getElementById('loader').style.display='none'


        }
            if(walletChoice =="LOCALWALLET"&& !jsonWallet==false){
            console.log('LOCALWALLET IS ACTIVE')
            useLocalWallet()
            // reloadTranslations()
            // document.getElementById('loader').style.display='none'

        }
    } else {
      console.log('NO WALLET CHOICE o available IN Initv3')
      document.getElementById('loader').style.display='none'
        document.getElementById('splash').setAttribute('style', 'display:flex !important');

    // reloadTranslations()
    //   document.getElementById('splash').setAttribute('style', 'display:flex !important');
  
      //   document.getElementById('edit').setAttribute('style', 'display:none !important');
    //   document.getElementById('soveraindocs').setAttribute('style', 'display:none !important');

    //   SEARCH FUNCTION
    //   await prepareSearch ()

    }


  }
  
  init();