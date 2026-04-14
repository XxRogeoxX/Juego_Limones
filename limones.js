let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=40;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;

let puntaje=0;  
let vidas=3;
let velocidadCaida=200;
let intervalo;

function dibujarSuelo(){
    ctx.fillStyle="black"
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="green"
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);

}
function iniciar(){
    intervalo = setInterval(bajarLimon,velocidadCaida);// es una funcion que recibe otra funcion como parametro y dispara cada medio segundo
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
}
function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanvas();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();

}
function limpiarCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="yellow"
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function bajarLimon(){
    limonY=limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado() {
    if (
        limonX < personajeX + ANCHO_PERSONAJE && 
        limonX + ANCHO_LIMON > personajeX &&     
        limonY < personajeY + ALTURA_PERSONAJE && 
        limonY + ALTURA_LIMON > personajeY         
    ) {
        aparecerLimon();
        puntaje = puntaje + 1;
        mostrarSpam("txtPuntaje", puntaje);

        // RANGOS DE VELOCIDAD DE CAIDA
        
        if (puntaje >= 3 && puntaje <= 5) {
            velocidadCaida = 150;
        } 
        else if (puntaje >= 6 && puntaje <= 9) {
            velocidadCaida = 100;
        } 
        else if (puntaje >= 10) {
            clearInterval(intervalo); // detiene la caida del limon cuanod ganamos
            alert("🍋 ¡TIENES LOS LIMONES! Ahora solo te falta la sal y el tequila. ¡ERES EL GANADOR!");
        }
    }
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON>=canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarSpam("txtVidas",vidas);
    }
    if (vidas === 0) {
            clearInterval(intervalo); // detiene la caida del limon cuanod perdemos 
            alert("GAME OVER");
        }
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}