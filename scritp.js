//?...................................... CAPTURE ELEMENTS ......................................
const textAreaInp = document.querySelector(".input-section__textarea");
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const textAreaOut = document.querySelector(".output-section__textarea");
const btnCopy = document.querySelector(".btn-copy");
const containerNotMessage = document.querySelector(".output-section__container-not-message");


//!...................................... EVENT HANDLERS ......................................
//*Se carga el HTML con el botón 'copiar' oculto
document.addEventListener("DOMContentLoaded", function () {
  btnCopy.style.display = "none";
});

//*Si hay contenido en el textarea, se oculta el contenedor 'not-message' y se visibiliza el botón 'copiar'
textAreaInp.addEventListener("input", function () {
  if (textAreaInp.value != "" || textAreaOut.value != "") {
    containerNotMessage.style.display = "none";
    btnCopy.style.display = "";
  } else {
    containerNotMessage.style.display = "";
    btnCopy.style.display = "none";
  }
});

//*Al hace click en el botón 'encriptar', se encripta el contenido del input-textarea y se visibiliza el texto encriptado en el output-textarea
btnEncrypt.addEventListener("click", function () {

  const textUser = textAreaInp.value.trim();  //captura el valor actual del textarea
  const regex = /^[a-z\s]*$/;  //expresión regular especificada

  if (textUser.length > 0) {  //1era validación: debe haber contenido en el textarea

    if (regex.test(textUser)) {  //2da validación: verifica el valor del textarea con la expresión regular
      let encryptedText = encryptText(textAreaInp.value);
      showMessageOutput(encryptedText);
      textAreaInp.value = "";

    } else {
      myAlert("error", "El texto ingresado no cumple las restricciones indicadas");
      showMessageOutput("");
    }
  } else {
    myAlert("error", "Por favor, ingresa el texto a encriptar");
    showMessageOutput("");
  }

});

//*Al hace click en el botón 'desencriptar', se desencripta el contenido volcado en el input-textarea y se visibiliza el texto desencriptado en el output-textarea
btnDecrypt.addEventListener("click", function () {
  if (textAreaInp.value.trim().length > 0) {
    let decryptedText = decryptText(textAreaInp.value);
    showMessageOutput(decryptedText);
    textAreaInp.value = "";

  } else {
    myAlert("error", "Por favor, ingresa el texto a desencriptar");
    showMessageOutput("");
  }

});

//*Al hace click en el botón 'copiar', se guarda el contenido del output-textarea en el portapapeles
btnCopy.addEventListener("click", function () {
  textAreaOut.select();
  navigator.clipboard.writeText(textAreaOut.value)
    .then(() => { myAlert("success", "Texto copiado al portapapeles"); })
    .catch(error => { myAlert("error", "No se pudo copiar el texto"); });
});


//TODO...................................... FUNCTIONS ......................................
function encryptText(textUser) {

  //Inicializo variable que alojará el texto encriptado
  let encryptedText = "";

  //Cifrado letra por letra hasta encriptar todo el texto
  for (let t = 0; t < textUser.length; t++) {

    let encryptedLetter = false;

    for (let i = 0; i < matrix.length; i++) {
      if (textUser[t] == matrix[i][0]) {
        encryptedText += matrix[i][1];
        encryptedLetter = true;
        break;
      }
    }

    if (!encryptedLetter) {
      encryptedText += textUser[t];
    }
  }
  return encryptedText;
}

function decryptText(textUser) {

  //Descifrado letra por letra y alojarlo en la misma variable
  for (let i = 0; i < matrix.length; i++) {
    if (textUser.includes(matrix[i][1])) {
      textUser = textUser.replaceAll(matrix[i][1], matrix[i][0]);
    }
  }
  return textUser;
}

function showMessageOutput(phrase) {
  textAreaOut.innerText = phrase;
}

function myAlert(icon, message) {
  Swal.fire({
    icon: icon,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    width: '30em'
  });
}

//?...................................... MATRIZ ......................................
//Matriz que contiene las llaves de encriptación
const matrix = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"]
]