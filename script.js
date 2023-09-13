const button = document.getElementById("guess-button");
const input = document.getElementById("guess-input");
const valor = input.value;
const historial = document.getElementById("estado");
const rendirse = document.getElementById("rendirse-button");


let estado = false;
button.addEventListener("click", intentar);
rendirse.addEventListener("click", function () {
  // Cambia el estado a true cuando se hace clic en el boton
  estado = true;
  intentar();
});
//codigo anterior 
//let diccionario = ["LIMON", "MELON", "MANGO", "FRESA"];
//const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
let palabra;

//UTILIZACION DEL API
 fetch('https://random-word-api.herokuapp.com/word?length=5&&number=1&&lang=es')
 .then(response=> response.json())
 .then(response=> {
    console.log(response)
    palabra=response[0].toUpperCase()
 })
.catch(err=>console.error(err));

let intentos = 6;

window.addEventListener("load", init);

function init() {
  console.log("Esto se ejecuta solo cuando se carga la pagina web");
}

function intentar() {
    console.log(palabra);

  const INTENTO = leerIntento();
  const mensajeElement = document.getElementById("mensaje");
  mensajeElement.style.display= 'none';
  historial.innerHTML = "Intentos";
  rendirse.style.display = "inline-block";
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";
  if(INTENTO.length !== 5 || !/^[A-Za-z]+$/.test(INTENTO)){

    mensajeElement.textContent = 'Debe tener exactamente 5 letras y no debe contener numeros';
    mensajeElement.style.display = 'block';
}  
  if (estado == true) {
    terminar("<h1>La palabra era " + palabra + "</h1>");
  }
  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#33dc52";
    } else if (palabra.includes(INTENTO[i])) {
      //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#ece868";
    } else {
      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "#b8e6ea85";
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
  if (INTENTO === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
    console.log("GANASTE!");
    return;
  }
  console.log(intentos);
  intentos--;
  if (intentos == 0) {
    console.log("PERDISTE!");
    terminar("<h1>PERDISTE!! La palabra era " + palabra + "😖</h1>");
  }
  
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  INPUT.disabled = true;
  button.disabled = true;
  const contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}
