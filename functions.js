const texto = document.getElementById('text');
const imagen = document.getElementById('imagen');
const resultado = document.getElementById('resultado');
const copiar = document.getElementById('copiar');
const error = document.getElementById('error');
const acentos = /[ÁÉÍÓÚáéíóúñ]/;
const encriptacion = (texto) => {
    return texto
        .replace(/a/g, 'ai')
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat')
        .replace(/h/g, 'hi')
        .replace(/1/g, 'one')
        .replace(/2/g, 'two')
        .replace(/3/g, 'three')
        .replace(/4/g, 'four')
        .replace(/5/g, 'five')
        .replace(/6/g, 'six')
        .replace(/7/g, 'seven')
        .replace(/8/g, 'eigth')
        .replace(/9/g, 'nine')
        .replace(/0/g, 'zero');
};
const desencriptacion = (texto) => {
    return texto
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u')
        .replace(/hi/g, 'h')
        .replace(/one/g, '1')
        .replace(/two/g, '2')
        .replace(/three/g, '3')
        .replace(/four/g, '4')
        .replace(/five/g, '5')
        .replace(/six/g, '6')
        .replace(/seven/g, '7')
        .replace(/eight/g, '8')
        .replace(/nine/g, '9')
        .replace(/zero/g, '0');
};

let textoFinal = '';

function varAcentos(texto) {
    let resultado = acentos.test(texto);
    if (resultado !== false) {
        error.classList.add('error');
    } else {
        error.classList.remove('error');
    }
    return resultado;
}

function encriptar() {
    textoFinal = '';
    let textoInicial = texto.value.toLowerCase();
    let acento = varAcentos(textoInicial);
    if (textoInicial.trim() === '') {
        window.location.reload();
    }
    if (textoInicial !== '' && acento !== true) {
        textoFinal = encriptacion(textoInicial);
        imagen.classList.add('ocultarImagen');
        resultado.textContent = textoFinal;
        copiar.removeAttribute('hidden');
    }
}


function desencriptar() {
    textoFinal = '';
    let textoInicial = texto.value.toLowerCase();
    let acento = varAcentos(textoInicial);
    if (textoInicial.trim() === '') {
        window.location.reload();
    }
    if (textoInicial !== '' && acento !== true) {
        textoFinal = desencriptacion(textoInicial);
        imagen.classList.add('ocultarImagen');
        resultado.textContent = textoFinal;
        copiar.removeAttribute('hidden');
    }
}

copiar.addEventListener('click', () => {
    navigator.clipboard.writeText(textoFinal);
});
