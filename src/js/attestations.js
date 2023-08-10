
function addAttestIAMcode(){
  console.log('adding add attesttation for IAM code ')

  let attestUI = `

<section id="makeAttests" class="container">

<p data-translate="addAttests" class="heading">1- MAKE ATESTATION</p>
<p></p>

  <button type="button" class="btn btn-warning" onclick="event.stopPropagation();attest();">ATTEST</button>
  
</section>


`
// attesttionUI
document.getElementById('attesttionUI').innerHTML = attestUI
// document.getElementById('soveraindocspremint').innerHTML = attestUI
document.getElementById('attesttionUI').style.display='flex'
document.getElementById('soveraindocs').style.display='none'
document.getElementById('splash').style.display='none'
document.getElementById('soveraindocspremint').style.display='none'

}




async function attest() {

    const EASContractAddress = "0x4200000000000000000000000000000000000021"; // Optimism Goerli v1.0.1
    const provider = new ethers.providers.JsonRpcProvider("https://goerli.optimism.io");

    console.log('provider:',provider);
  const uid = "0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e";
  const attestation = await eas.getAttestation(uid);
  console.log(attestation);
}