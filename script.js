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
let diccionario = ["LIMON", "MELON", "MANGO", "FRESA"];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];



let intentos = 6;
//let palabra = "APPLE";
window.addEventListener("load", init);

function init() {
  console.log("Esto se ejecuta solo cuando se carga la pagina web");
}

function intentar() {
    console.log(palabra)
  const INTENTO = leerIntento();
  historial.innerHTML = "Intentos";
  rendirse.style.display = "inline-block";
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";
  if (estado == true) {
    terminar("<h1>La fruta era " + palabra + "</h1>");
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
  if (INTENTO === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
    console.log("GANASTE!");
    return;
  }
  GRID.appendChild(ROW);
  console.log(intentos);
  intentos--;
  if (intentos == 0) {
    console.log("PERDISTE!");
    terminar("<h1>PERDISTE!! La fruta era " + palabra + "😖</h1>");
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
