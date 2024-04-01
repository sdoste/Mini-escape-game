
function startNewGame(){
    //esconde botón, muestra inventario y carga fondo y clickables
    document.getElementById("buttonContainer").innerHTML = "";
    document.getElementById("inventory").style.display = "grid";
    loadAssets();
}

//posición de las 4 paredes
let counter = 0;

function left(){
    if (counter == 0){
        counter = 3
    } else {
        counter--;
    }
    loadAssets();
}

function right(){
    if (counter == 3){
        counter = 0
    } else {
        counter++;
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
            displayDoorAndMailbox();
            break;
        case 1:
            displayClockAndProjection();
            break;
        case 2:
            displayDesk();
            break;
        case 3:
            displayPaintingOrMirror();
            break;
     }
       
}

////////////////////////////////////
//       FUNCIONES DISPLAY        //
////////////////////////////////////

//PARED PUERTA Y BUZÓN
let mailLidOpen = false;
let mailBoxOpen = false;
function displayDoorAndMailbox(){
    playArea.style.backgroundImage = "url(Images/door_wall.jpg)";
    document.getElementById("door").style.display = "block";
    let mailbox = document.getElementById("mailbox");
    mailbox.style.display = "block";
    if (mailBoxOpen){
        if (hasKey){
            mailbox.style.backgroundImage = "url(Images/mailboxOpenEmpty.png)";
        } else{
            console.log("but does it get here");
            document.getElementById("smallKey").style.display = "block"; 
            mailbox.style.backgroundImage = "url(Images/mailboxOpenWithKey.png)";
        }
    } else if (mailLidOpen){
        mailbox.style.backgroundImage = "url(Images/mailboxLidOpen.png)";
    } else  {
        mailbox.style.backgroundImage = "url(Images/mailbox.png)";
    }
}
//PARED CUADRO
let cuadroPuesto = true;
let brokenHandsPut = false;
function displayPaintingOrMirror(){
    if (cuadroPuesto){
        playArea.style.backgroundImage = "url(Images/PaintingWall.jpg)";
        document.getElementById("esquinaCuadro").style.display = "block";
    } else {
        //espejo
        playArea.style.backgroundImage = "url(Images/MirrorWall.JPG)";
        let clockReflection = document.getElementById("reflectedClock");
        clockReflection.style.display = "block";
        switch (clockHands){
            case "normal":
                clockReflection.style.backgroundImage = "url(Images/reflectionClockNormal.GIF)";
            break;
            case "empty":
                clockReflection.style.backgroundImage = "url(Images/reflectionClockNoHands.GIF)";
            break;
            case "broken":
                clockReflection.style.backgroundImage = "url(Images/reflectionClockBroken.png)";
            break;
        }
        console.log("gets here");
        if (projectorPlaced){
            console.log("but does not get here");
            document.getElementById("reflectedProjection").style.display = "block";
        }
    }
}
//PARED ESCRITORIO
let pcUsed = false;
let printerUsed = false;
let phoneUsed = false;
function displayDesk(){
    playArea.style.backgroundImage = "url(Images/Desk_wall.jpg)";
    //cajones displayed siempre
    let cajones = document.getElementsByClassName("drawer");
    for (i= 0; i < cajones.length; i++){
        cajones[i].style.display = "block";
    }
    document.getElementById("pc").style.display = "block";
    if (pcUsed){
        document.getElementById("pc").onclick = "null";
        document.getElementById("pc").style.cursor = "auto";
    }
    document.getElementById("printer").style.display = "block";
    if (printerUsed){
        document.getElementById("printer").onclick = "null";
        document.getElementById("printer").style.cursor = "auto";
    }
    document.getElementById("phone").style.display = "block";
    if (phoneUsed){
        document.getElementById("phone").onclick = "null";
        document.getElementById("phone").style.cursor = "auto";
    }
}
//PARED RELOJ PROYECCION
let projectorPlaced = false;
let clockHands = "normal";
function displayClockAndProjection(){
    playArea.style.backgroundImage = "url(Images/clockWall.png)";
    let clock = document.getElementById("clock");
    //Reloj
    clock.style.display = "block";
    switch (clockHands){
        case "normal":
            clock.style.backgroundImage = "url(Images/clock.png)";
        break;
        case "empty":
            clock.style.backgroundImage = "url(Images/clockNoHands.png)";
        break;
        case "broken":
            clock.style.backgroundImage = "url(Images/clockBroken.png)";
        break;
    }
    //Pedestal
    if (projectorPlaced){
        document.getElementById("pedestal").style.display = "block";
        document.getElementById("placedProjector").style.display = "block";
        document.getElementById("projection").style.display = "block";
    } else{
            document.getElementById("pedestal").style.display = "block";
    }

}

////////////////////////////////////
//             PUERTA             //
////////////////////////////////////
function salir(){
    if (hasKey){
        document.getElementById("inventory").innerHTML = "";
        window.alert("¡Enhorabuena! ¡Has salido de la habitación!");
        playArea.innerHTML = '<div class="clickable" id="mailbox"></div><div id="outdoors"></div>';
        let mailbox =   document.getElementById("mailbox");
        mailbox.style.display = "block";
        mailbox.style.top = "139px";
        mailbox.style.backgroundImage = "url(Images/mailboxOpenEmpty.png)";
        playArea.style.backgroundImage = ("url(Images/exit.png)");
        let outdoors = document.getElementById("outdoors");
        outdoors.style.width = "115px";
        outdoors.style.height = "280px";
        outdoors.style.position = "relative";
        outdoors.style.left = "539px";
        outdoors.style.bottom = "35px";
        outdoors.style.backgroundSize = "100% 100%";
        outdoors.style.backgroundImage = "url(Images/outdoors.gif)";
        outdoors.style.zIndex = "-1";
    } else {
        window.alert("Está cerrada con llave.")
    }
}
function buzon(){
    if (mailLidOpen){
        if (clockHands == "empty"){
            if (hasSmallKey){
                window.alert("El buzón sigue cerrado. Quizás hay algo más dentro.")
            } else{
                let userAccepts = confirm("Ves algo por la rendija. ¿Quieres intentar cogerlo con las manecillas del reloj?");
                if (userAccepts){
                    window.alert("Consigues coger una llave pequeña, aunque se te ha roto una manecilla.");
                    hasSmallKey = true;
                    removeItem('url("Images/hands.GIF")');
                    addItem("url(Images/handsBroken.GIF)");
                    addItem("url(Images/smallKey.png)");
                } else {
                    window.alert("Decides no hacerlo, aunque a estas alturas igual deberías.");
                }
            }
           
        } else{
            window.alert("La tapa está abierta. Ves algo por la rendija, pero no te cabe la mano para cojerlo.");
        }
    } else {
        let userResponse = confirm("Un buzón cerrado, de apertura a distancia. Sin embargo, tiene una tapa, ¿quieres abrirla?");
        if (userResponse){
            mailLidOpen = true;
            displayDoorAndMailbox();
        } else{
            window.alert("Por algún motivo, no quieres abrir la tapa. Allá tú.");
        }
    }
}
function getKey(){
    addItem("url(Images/doorKey.png");
    hasKey = true;
    loadAssets();
}

////////////////////////////////////
//          PROYECTOR             //
////////////////////////////////////

function reloj(){
    switch (clockHands){
        case "normal":
            let userConfirms = confirm("Un reloj de pared normal y corriente. ¿Quieres quitarle las manetas?");
            if (userConfirms){
                window.alert("Le quitas las manecillas más largas al reloj.");
                clockHands = "empty";
                displayClockAndProjection();
                addItem("url(Images/hands.GIF)");
            } else {
                window.alert("Decides no toquetear el reloj. Cualquiera diría.");
            }
        break;
        case "empty":
            if (hasSmallKey){
                let userAccepts = confirm("¿Quieres volver a poner las manecillas al reloj?");
                if (userAccepts){
                    window.alert("Le vuelves a poner las manecillas al reloj. Más o menos.");
                    clockHands = "broken";
                    displayClockAndProjection();
                    removeItem('url("Images/handsBroken.GIF")');
                } else {
                    window.alert("Decides no toquetear el reloj. Pobrecito, sin manecillas.");
                } 
            } else{
                window.alert("Te da penita. Deberías devolverle las manecillas cuando las hayas utilizado para algo.");
            }
        break;
        case "broken":
            window.alert("Hmmm. No dará muy bien la hora, pero igual la forma de las manetas me dice algo.");
        break;
    }
}

function pedestal(){
    if (hasProyector){
        if (proyectorOn){
            let userConfirms = confirm("Parece tener la misma forma que el proyector. ¿Quieres ponerlo?");
            if (userConfirms){
                window.alert("Pones el proyector en la columna y lo enciendes.");
                projectorPlaced = true; 
                removeItem('url("Images/projector.png")');
                document.getElementById("pedestal").onclick = null;
                document.getElementById("pedestal").style.cursor = "auto";
                document.getElementById("mailbox").onclick = null;
                document.getElementById("mailbox").style.cursor = "auto";
                loadAssets();
            } else {
                window.alert("No pones el proyector. Tu verás...");
            } 
        } else{
            window.alert("Parece que el proyector encajaría, pero no está encendido. Le faltan las pilas.");
        }
    } else {
        window.alert("Una columna. Tiene una especie de receptáculo cuadrado en la parte de arriba.");
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
        displayPaintingOrMirror();
    } else {
        window.alert("El cuadro te parece muy bonito y decides no quitarlo. Tu sabrás.")
    }
}
////////////////////////////////////
//              DESK              //
////////////////////////////////////
//de un solo uso, if true -> display block, if false, clickable div is not displayed.

let hasProyector = false;
let hasNote = false;
function cajonArriba(){
    if (hasProyector){
        window.alert("Esta vacío.");
    } else {
        if (hasSmallKey){
            if (hasProyector){
                window.alert("Está vacío.");
            }else{
                window.alert("Abres el cajón con la llave pequeña. Dentro, encuentras un mini proyector portátil.");
                removeItem('url("Images/smallKey.png")');
                addItem("url(Images/projector.png)");
                hasProyector = true;
            }
        } else {
            window.alert("Está cerrado con llave.")
        }
    }   
}

function cajonMedio(){
    if (pcUsed){
        window.alert("Ya has utilizado este código para encender el ordenador.")
    } else {
        let userConfirms = confirm("Hay un código QR grabado en el cajón. ¿Quieres escanearlo?");
        if (userConfirms){
            window.open("https://mywordle.strivemath.com/?word=yfzqri&lang=es"); 
        }
    }
}

let hasSimon = false;
function cajonAbajo(){
    if (hasSimon){
        window.alert("Esta vacío.")
    } else {
        window.alert("Encuentras un juego de Simon.");
        addItem("url(Images/playSimon.png)");
        hasSimon = true;
    }
}
let contraseña = "cringe"
function portatil(){
    let userTry = prompt("Introduzca la contraseña para conectar con la impresora:");
    if (userTry == contraseña){
        //contraseña correcta
        window.alert("Impresora conectada. Parece que está imprimiendo algo.");
        impresoraConectada = true;
        pcUsed = true;
        loadAssets();
    } else {
        window.alert("Contraseña incorrecta");
    }

}

let impresoraConectada = false;
function impresora(){
    if (impresoraConectada){
        window.alert("Ha imprimido una página. La coges.");
        addItem("url(Images/printedPage.gif)");
        hasPage = true;
        printerUsed = true;
        loadAssets();
    } else (
        window.alert("Está encendida.")
    )

}
let phoneNumber = "+2168650823";
function telefono(){
    let userTry = prompt("Marca el número al que quieres llamar:");
    if (userTry == phoneNumber){
        //numero correcto
        window.alert("Oyes un click metálico. Parece que se ha abierto algo.");
        phoneUsed = true;
        mailBoxOpen = true;
        loadAssets();
    } else {
        window.alert("No pasa nada.");
    }

}

//objects
//
let itemCounter = 0;
let hasKey = false;
let hasSmallKey = false;
let hasPage = false;
let proyectorOn = false;
let usandoPilas = false;
let usandoProyector = false;

let currentItem = ""
function usarObjeto(itemNumber){
    let currentItem = document.getElementById("item" + itemNumber);
    let itemBackground = currentItem.style.backgroundImage;
    console.log(itemNumber);
    switch (itemBackground){
        case 'url("Images/playSimon.png")':
            usandoPilas = false;
            usandoProyector = false;
            if (currentItem.style.backgroundColor == "orange"){
                closeMenu();
            } else{
            //cerrar menu, deseleccionar items, y seleccionar item
                closeMenu();
                itemsDeselect();
                currentItem.style.backgroundColor = "orange";
                document.getElementById("menu").style.display = "block";
                document.getElementById("exitMenu").style.display = "block";
                document.getElementById("simon").style.display = "block";
                playSimon();
            }
            break;
        case 'url("Images/printedPage.gif")':
            usandoPilas = false;
            usandoProyector = false;
            if (currentItem.style.backgroundColor == "orange"){
                closeMenu();
            } else{
                //cerrar menu, deseleccionar items, y seleccionar item
                closeMenu();
                itemsDeselect();
                currentItem.style.backgroundColor = "orange";
                document.getElementById("menu").style.display = "block";
                document.getElementById("exitMenu").style.display = "block";
                document.getElementById("page").style.display = "block";  
            }
            break;
        case 'url("Images/hands.GIF")':
        case 'url("Images/handsBroken.GIF")':
        case 'url("Images/smallKey.png")':
            usandoPilas = false;
            usandoProyector = false;
            if (currentItem.style.backgroundColor == "orange"){
                closeMenu();
            } else{
                //cerrar menu, deseleccionar items, y seleccionar item
                closeMenu();
                itemsDeselect();
                currentItem.style.backgroundColor = "orange";
            }
            break;
        case 'url("Images/pilas.png")':
            if (currentItem.style.backgroundColor == "orange"){
                closeMenu();
                usandoPilas = false;
            } else{
                 if (usandoProyector){
                    window.alert("Pones las pilas en el proyector.");
                    usandoProyector = false;
                    proyectorOn = true;
                    currentItem.style.backgroundColor == ""
                    removeItem('url("Images/pilas.png")');
                 } else{
                    usandoPilas = true;
                 } true;
                //cerrar menu, deseleccionar items, y seleccionar item
                closeMenu();
                itemsDeselect();
                currentItem.style.backgroundColor = "orange";
            }
            break;
        case 'url("Images/projector.png")':
            if (currentItem.style.backgroundColor == "orange"){
                closeMenu();
                usandoProyector = false;
            } else{
                 if (usandoPilas){
                    window.alert("Pones las pilas en el proyector.");
                    usandoPilas = false;
                    proyectorOn = true;
                    removeItem('url("Images/pilas.png")');
                 } else{
                    usandoProyector = true;
                 } true;
                //cerrar menu, deseleccionar items, y seleccionar item
                closeMenu();
                itemsDeselect();
                currentItem.style.backgroundColor = "orange";
            }
                break;
    }
}

function itemsDeselect(){
    let items = document.getElementsByClassName("item");
    for (let i=0; i < items.length; i++){
        items[i].style.backgroundColor = "";
    }

}
function addItem(url){
    itemCounter++;
    let otherItem = document.getElementById("item" + itemCounter);
    otherItem.style.background = url;
    otherItem.style.cursor = "pointer";
}
function removeItem(url){
    let items = document.getElementsByClassName("item");
    let found = false;
    for (let i=0; i < items.length; i++){  
        items[i].style.backgroundColor = "";    
        if (found){
            //gets here at the next item, so next item -> overwrites previous one
            items[i-1].style.backgroundImage = items[i].style.backgroundImage;
            items[i-1].style.cursor = items[i].style.cursor;
        } else{
            if (items[i].style.backgroundImage == url){
                found = true;
                itemCounter--;
            }
        }
    }
    itemsDeselect();
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
    // simonSolution = "redyellowredgreenredyellowredbluegreenblue"
    simonSolution ="redgreenblueyellow";
    if (secretSimon == simonSolution){
        window.alert("Suena una melodía y se abre un compartimento en el Simon. Encuentras un par de pilas.")
        closeMenu();
        removeItem('url("Images/playSimon.png")');
        removeItem('url("Images/printedPage.gif")');
        addItem("url(Images/pilas.png)");
        hasPilas = true;
        printerUsed = true;
        loadAssets();
    }
}

function closeMenu(){
    document.getElementById("menu").style.display = "none";
    document.getElementById("exitMenu").style.display = "none";
    //closing items
    document.getElementById("simon").style.display = "none";
    document.getElementById("page").style.display = "none";
    secretSimon = "";
    itemsDeselect();
    
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
