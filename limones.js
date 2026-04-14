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


function dibujarSuelo(){
    ctx.fillStyle="black"
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="green"
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);

}
function iniciar(){
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
        limonX < personajeX + ANCHO_PERSONAJE && // El limón no ha pasado el borde derecho
        limonX + ANCHO_LIMON > personajeX &&     // El limón no está antes del borde izquierdo
        limonY < personajeY + ALTURA_PERSONAJE && // El limón no ha pasado el borde inferior
        limonY + ALTURA_LIMON > personajeY          // El limón no está antes del borde superior
    ) {
        //alert("¡ATRAPADO!");
        aparecerLimon();
        puntaje=puntaje+1;
        mostrarSpam("txtPuntaje",puntaje);   
    }
}

function detectarPiso(){
    if(limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostrarSpam("txtVidas",vidas);
    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}