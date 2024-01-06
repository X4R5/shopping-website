function turkishToUpperCase(str) {
    const letterMap = {
      'i': 'İ',
      'ç': 'Ç',
      'ö': 'Ö',
      'ü': 'Ü',
      'ğ': 'Ğ',
      'ş': 'Ş'
    };
  
    return str.replace(/[içöüğış]/g, match => letterMap[match]).toUpperCase();
  }


function submitForm(){
    var formData = {
        fname: turkishToUpperCase(document.getElementById('firstName').value),
        lname : turkishToUpperCase(document.getElementById('lastName').value),
        tckimlik : document.getElementById('tckimlik').value,
        birthYear : document.getElementById('birthYear').value
    }

    sendPostRequest('http://localhost:3000/register', formData);
}

function sendPostRequest(url, data){
    fetch(url, {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
            'mode' : 'no-cors'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data));
}

  