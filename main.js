
function startNewGame(){
    //esconde botón, muestra inventario y carga fondo y clickables
    document.getElementById("buttonContainer").innerHTML = "";
    document.getElementById("inventory").style.display = "grid";
    loadAssets()
}

//posición de las 4 paredes
let counter = 0;

function left(){
    if (counter == 0){
        counter = 3
    } else {
        counter--
    }
    loadAssets();
}

function right(){
    if (counter == 3){
        counter = 0
    } else {
        counter++
    }
    loadAssets();
}

//FONDO = playArea
let playArea = document.getElementById("playArea");

function loadAssets(){
    //vaciar clickable elements
    let clickableAssets = document.getElementsByClassName("clickable");
    for (i= 0; i < clickableAssets.length; i++){
        clickableAssets[i].style.display = "none"; 
    }
     switch (counter) {
        case 0:
            playArea.style.backgroundImage = "url(Images/door_wall.jpg)";
            document.getElementById("door").style.display = "block";
            break;
        case 1:
            playArea.style.backgroundImage = "url(Images/emptywall.png)";
            break;
        case 2:
            displayDesk();
            break;
        case 3:
            displayPaintingOrMirror();
            break;
     }
       
}

//FUNCIONES PARA DISPLAY

//Pared cuadro
function displayPaintingOrMirror(){
    if (cuadroPuesto){
        playArea.style.backgroundImage = "url(Images/PaintingWall.jpg)";
        document.getElementById("esquinaCuadro").style.display = "block";
    } else {
        //espejo
        if (proyectorOn){
            playArea.style.backgroundImage = "url(Images/PaintingWall.jpg)";
        } else{
            playArea.style.backgroundImage = "url(Images/MirrorWall.JPG)";
        }
    }
}
//Pared Desk
let pcNotUsed = true;
let phoneNotUsed = true;
let printerNotUsed = true;

function displayDesk(){
    playArea.style.backgroundImage = "url(Images/Desk_wall.jpg)";
    //cajones displayed siempre
    let cajones = document.getElementsByClassName("drawer");
    for (i= 0; i < cajones.length; i++){
        cajones[i].style.display = "block";
    }
    if (pcNotUsed) document.getElementById("pc").style.display = "block";
    if (phoneNotUsed) document.getElementById("phone").style.display = "block";
    if (printerNotUsed) document.getElementById("printer").style.display = "block";
}

////////////////////////////////////
//             PUERTA             //
////////////////////////////////////
function salir(){
    if (hasKey){
        document.getElementById("playArea").innerHTML = "";
        document.getElementById("inventory").innerHTML = "";
        window.alert("¡Enhorabuena! ¡Has salido de la habitación!")
    } else {
        alert("Está cerrada con llave.")
    }
}

////////////////////////////////////
//        PAINTING/MIRROR         //
////////////////////////////////////
function despegar(){
    let userResponse = confirm("Una esquina parece estar despegada. ¿Quieres quitarla?");
    if (userResponse){
        cuadroPuesto = false;
        playArea.style.backgroundImage = "url(Images/MirrorWall.JPG)"
        window.alert("Retiras el papel del cuadro. Debajo hay un espejo.");
    } else {
        window.alert("El cuadro te parece muy bonito y decides no quitarlo. Tu sabrás.")
    }
}
////////////////////////////////////
//              DESK              //
////////////////////////////////////
//de un solo uso, if true -> display block, if false, clickable div is not displayed.


function despegar(){
    let userResponse = confirm("Una esquina parece estar despegada. ¿Quieres estirar de ella?");
    if (userResponse){
        cuadroPuesto = false;
        playArea.style.backgroundImage = "url(Images/MirrorWall.JPG)"
        window.alert("Retiras el papel del cuadro. Debajo hay un espejo.");
    } else {
        window.alert("El cuadro te parece muy bonito y decides no quitarlo. Tu sabrás.")
    }
}

let hasProyector = false;
let hasNote = false;
function cajonArriba(){
    if (hasNote){
        window.alert("Esta vacío");
    } else {
        if (hasSmallKey){
            window.alert("Abres el cajón con la llave pequeña. Dentro, encuentras una nota que dice: hackerman123");
         
        } else {
            window.alert("Está cerrado con llave.")
        }
    }
      
}
function cajonMedio(){
    if (hasSmallKey){
        window.alert("Está vacío.")
    } else {
        window.alert("Encuentras una llave.");
        hasSmallKey = true;
    }
}

let hasSimon = false;
function cajonAbajo(){
    if (hasSimon){
        window.alert("Esta vacío.")
    } else {
        window.alert("Encuentras un juego de Simon.");
        itemCounter++;
        let newItem = document.getElementById("item" + itemCounter);
        newItem.style.background = "url(Images/simon.png)";
        newItem.style.cursor = "pointer";
        hasSimon = true;
    }
}
let contraseña = "hackerman123"
function portatil(){
    if (pcNotUsed) {
        userTry = prompt("Introduzca la contraseña para conectar con la impresora:");
        if (userTry == contraseña){
            //contraseña correcta
            pcNotUsed = false;
            window.alert("Conexión realizada con éxito. Imprimiendo...");
            impresoraConectada = true;
        } else {
            window.alert("Contraseña incorrecta");
        }
    }0
}

function telefono(){
    window.alert("Mostrar teclas");

}
let impresoraConectada = false;
function impresora(){
    window.alert("Luego lo abro.");

}

//objects
let itemCounter = 0;
let cuadroPuesto = true;
let hasKey = false;
let hasSmallKey = false;
let proyectorOn = false;

currentItem = ""
function usarObjeto(itemNumber){
   let itemBackground = document.getElementById("item" + itemNumber).style.backgroundImage;
   console.log(itemBackground);
   switch (itemBackground){
    case 'url("Images/simon.png")':
        document.getElementById("menu").style.display = "block";
        document.getElementById("exitMenu").style.display = "block";
        document.getElementById("simon").style.display = "block";
        itemNumber = currentItem;
        playSimon();
        break;
   }
}

let secretSimon = "";
let simonDiv = document.getElementById("simon");
function clickRed() {
    simonDiv.style.backgroundImage = "url(Images/playSimonRed.png)";
    secretSimon += "red";
    simonSolve(currentItem);
}
function clickGreen() {
    simonDiv.style.backgroundImage = "url(Images/playSimonGreen.png)";
    secretSimon += "green";
    simonSolve(currentItem);
}
function clickBlue() {
    simonDiv.style.backgroundImage = "url(Images/playSimonBlue.png)";
    secretSimon += "blue";
    simonSolve(currentItem);
}
function clickYellow() {
    simonDiv.style.backgroundImage = "url(Images/playSimonYellow.png)";
    secretSimon += "yellow";
    simonSolve(currentItem);
}


function playSimon(){
    let allSimonButton = document.getElementsByClassName("simonButton");
    for (let i=0; i < allSimonButton.length; i++){
        allSimonButton[i].style.display = "block";
    }
}

function simonSolve(){
    setTimeout(() => {  document.getElementById("simon").style.backgroundImage = "url(Images/playSimon.png)"; }, 500);
    //comprobación solución a cada click
    simonSolution = "redyellowredgreenredyellowredbluegreenblue"
    console.log(secretSimon);
    if (secretSimon == simonSolution){
        window.alert("Suena una melodía y se abre un compartimento en el Simon. Encuentras un par de pilas.")
        document.getElementById("item" + itemNumber).style.backgroundImage = "";
        document.getElementById("item" + itemNumber).style.cursor = "auto";
    }
}

function closeMenu(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("exitMenu").style.display = "none";
    secretSimon = "";
} 


// POZO
// Caperucita Roja: "Tengo la extraña sensación de que ya no estamos en Fondo de Bikini."
// Bob Esponja: "¿Qué quieres decir con 'ya no estamos Fondo de Bikini? ¿Dónde estamos?"
// Caperucita Roja: "¡No lo sé!"
// Shrek: "Quién eres tú? ¿Y cómo llegaste aquí?"
// Caperucita Roja: "¡Oh, no tengo ni idea! ¡Solo estaba tratando de volver a casa!"
// Bob Esponja: "¿Y cómo planeas hacer eso?"
// Caperucita Roja: "¡Bueno, yendo a por el Hada Azul, por supuesto! Dice que puede ayudarme."
// Shrek: "¿El Hada Azul? ¡Eso está muy lejos de aquí!"
