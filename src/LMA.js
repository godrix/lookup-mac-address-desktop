const apiurl = 'https://look-mac-anddrees.herokuapp.com';
const inputFind = document.querySelector('form > input[type=text]')
const buttomFind = document.querySelector('form > button')


document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  buttomFind.disabled = true
  getLookupMacAddress(inputFind.value)
  
  
})


async function getLookupMacAddress(mac) {
  
  if (isInputValue(mac)) {
    inputFind.select()
    notify('Invalid Format')
    buttomFind.disabled = false;
    return
  }
  try {
    
    const response = await fetch(`${apiurl}/${mac}`);
    const { vendor } = await response.json();

    if(vendor){
      inputFind.value = vendor ;
    
      copyValue()
      notify(`${vendor} copied to clipboard`)
    }else{
      inputFind.select()
      notify('The search term did not return any results', 2500)
    }

  } catch (error) {
    inputFind.select()
    notify('An error has occurred', 2500)
    inputFind.select()
  }finally{
    buttomFind.disabled = false;
  }
}

function isInputValue(mac) {
  const ismac = regexMACAddress(mac);
  if (ismac.length < 6) {
    return true;
  }
  return false;
}

function regexMACAddress(mac) {

  const macRegex = String(mac).replace(/[^0-9a-fA-F]/g, '')
  let MACNumbers = "";
  for (let i = 0; i < 6; i++) {
    MACNumbers += macRegex.charAt(i);
  }
  return MACNumbers.toUpperCase();
}

function copyValue(){
  const copyValue = document.querySelector('form > input[type=text]');
  copyValue.select();
  copyValue.setSelectionRange(0, 99999); /*For mobile devices*/
  
  document.execCommand("copy");
 
 
}

function notify(message, time=1000) {
  const divContent = document.getElementById("snackbar");
  divContent.innerHTML = message

  divContent.className = "show";

  setTimeout(function(){ divContent.className = divContent.className.replace("show", ""); }, time);
}
