const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const pixelSize = 8;

canvas.width = innerWidth - 16  - (innerWidth % pixelSize);
canvas.height = innerHeight - 16 - (innerHeight % pixelSize);

const pixelWidth = canvas.width / pixelSize;
const pixelHeight = canvas.height / pixelSize;

const cellArray = [];
const holderArray = [];

var surounddingCells = 0;

var mouse_x = -1;
var mouse_y = -1;
var mousePixel_x = -1;
var mousePixel_y = -1;
var mouseCell = -1;
var mouseClicked = false;

var lastDrawnCell = -1;
var eraser = false;

let intervalID;

for (let j=0 ; j<pixelHeight ; j++){
    for(let i=0 ; i<pixelWidth ; i++){

        cellArray[(j*pixelWidth)+i] = 0;

    }
}
for (let j=0 ; j<pixelHeight ; j++){
    for(let i=0 ; i<pixelWidth ; i++){ 

        holderArray[(j*pixelWidth)+i] = 0;

    }
}

let startStop = false;


/*

cellArray[30*pixelWidth+60]= 1;
cellArray[30*pixelWidth+61]= 1;
cellArray[30*pixelWidth+62]= 1;


cellArray[20*pixelWidth+42]= 1;
cellArray[21*pixelWidth+40]= 1;
cellArray[21*pixelWidth+43]= 1;
cellArray[22*pixelWidth+40]= 1;
cellArray[22*pixelWidth+43]= 1;
cellArray[23*pixelWidth+41]= 1;





cellArray[50*pixelWidth+60]= 1;
cellArray[50*pixelWidth+61]= 1;
cellArray[50*pixelWidth+62]= 1;
cellArray[51*pixelWidth+60]= 1;
cellArray[51*pixelWidth+61]= 1;
cellArray[51*pixelWidth+62]= 1;
cellArray[52*pixelWidth+60]= 1;
cellArray[52*pixelWidth+61]= 1;
cellArray[52*pixelWidth+62]= 1;
cellArray[53*pixelWidth+63]= 1;
cellArray[53*pixelWidth+64]= 1;
cellArray[53*pixelWidth+65]= 1;
cellArray[54*pixelWidth+63]= 1;
cellArray[54*pixelWidth+64]= 1;
cellArray[54*pixelWidth+65]= 1;
cellArray[55*pixelWidth+63]= 1;
cellArray[55*pixelWidth+64]= 1;
cellArray[55*pixelWidth+65]= 1;

*/

//console.log('innerwidth = '+innerWidth+'  modulo = '+ innerWidth % 4 +'  canvas width = '+ canvas.width + ' pixel width = '+pixelWidth + '  pixel height = '+pixelHeight)


/*function checkSurounding (currentCell){
    //console.log('checkpoint checkSurounding');

    if (cellArray[currentCell-pixelWidth-1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell-pixelWidth] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell-pixelWidth+1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell-1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+pixelWidth-1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+pixelWidth] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+pixelWidth+1] == 1){
        surounddingCells++;
    }

    if(surounddingCells>0){
        //console.log('surrounded by = '+ surounddingCells + ' cells   at cell: ' + currentCell);
    }

}*/

function LiamsRules (currentCell){
    //console.log('checkpoint booleRules');

    if (cellArray[currentCell] == 1){
        if (cellArray[currentCell+pixelWidth] == 0){
            holderArray[currentCell+pixelWidth] = 1;
            holderArray[currentCell] = 0;
        }else if (cellArray[currentCell+pixelWidth-1] == 0){
            holderArray[currentCell+pixelWidth-1] = 1;
            holderArray[currentCell] = 0;
        }else if (cellArray[currentCell+pixelWidth+1] == 0){
            holderArray[currentCell+pixelWidth+1] = 1;
            holderArray[currentCell] = 0;
        }/*else if (cellArray[currentCell+pixelWidth-1] == 0){
            holderArray[currentCell-1] = 1;
            holderArray[currentCell] = 0;
        }else if (cellArray[currentCell+1] == 0){
            holderArray[currentCell+1] = 1;
            holderArray[currentCell] = 0;
        }
        */
    }

}

function ConwaysRules (currentCell){
    //console.log('checkpoint booleRules');
    
    surounddingCells=0;

    if (cellArray[currentCell-pixelWidth-1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell-pixelWidth] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell-pixelWidth+1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell-1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+pixelWidth-1] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+pixelWidth] == 1){
        surounddingCells++;
    }
    if (cellArray[currentCell+pixelWidth+1] == 1){
        surounddingCells++;
    }


    if(surounddingCells>0){
        //console.log('surrounded by = '+ surounddingCells + ' cells   at cell: ' + currentCell);
    }
    if (cellArray[currentCell] == 0 && surounddingCells == 3 ){
        holderArray[currentCell] = 1;
        //console.log('surrounded by = '+ surounddingCells + ' cells   at cell: ' + currentCell + '   action: born');
    }
    else if(cellArray[currentCell] == 1 && surounddingCells <= 1){
        holderArray[currentCell] = 0;
        //console.log('surrounded by = '+ surounddingCells + ' cells   at cell: ' + currentCell + '   action: die');
    }
    else if (cellArray[currentCell] == 1 && surounddingCells >= 2 && surounddingCells <= 3){
        holderArray[currentCell] = 1;
        //console.log('surrounded by = '+ surounddingCells + ' cells   at cell: ' + currentCell + '   action: live');
    }
    else if (cellArray[currentCell] == 1 && surounddingCells >= 4){
        holderArray[currentCell] = 0;
        //console.log('surrounded by = '+ surounddingCells + ' cells   at cell: ' + currentCell + '   action: die');
    }

    /*  
    if(Math.random() * 2 >= 1){
        holderArray[currentCell] = 1;
    }else{
        holderArray[currentCell] = 0;
    }*/

}

function drawArray(){
    //console.log('checkpoint drawArray');
    
    for (let j=0 ; j<pixelHeight ; j++){
        for(let i=0 ; i<pixelWidth ; i++){
            
            if(cellArray[(j*pixelWidth)+i] == 1 ){
                c.fillStyle = 'white';
                c.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
            }else{
                c.fillStyle = 'black';
                c.fillRect(i*pixelSize,j*pixelSize,pixelSize,pixelSize);
            }

        }
    }
    
}

function updateArray(){
    //console.log('checkpoint updateArray');
    

    for (let j=0 ; j<pixelHeight ; j++){
        for(let i=0 ; i<pixelWidth ; i++){

            ConwaysRules((j*pixelWidth)+i);

        }
    }

    for (let j=0 ; j<pixelHeight ; j++){
        for(let i=0 ; i<pixelWidth ; i++){

            cellArray[(j*pixelWidth)+i] = holderArray[(j*pixelWidth)+i];

        }
    }

    for (let j=0 ; j<pixelHeight ; j++){
        for(let i=0 ; i<pixelWidth ; i++){
    
            holderArray[(j*pixelWidth)+i] = 0;
    
        }
    }

    drawArray();
}

function handDraw(){

    check_cursor
    function check_cursor(){}

    mousePixel_x = (Math.floor(mouse_x/pixelSize))-1
    mousePixel_y = (Math.floor(mouse_y/pixelSize))-1

    mouseCell = (mousePixel_y*pixelWidth)+(mousePixel_x);

    //console.log('mousePixel_x: '+mousePixel_x+' mousePixel_y: '+mousePixel_y+ ' mouseCell: '+mouseCell)

    drawArray();

    if (cellArray[mouseCell] == 1){
        c.fillStyle = 'black';
        c.fillRect(mousePixel_x*pixelSize,mousePixel_y*pixelSize,pixelSize,pixelSize);
    }else {
        c.fillStyle = 'white';
        c.fillRect(mousePixel_x*pixelSize,mousePixel_y*pixelSize,pixelSize,pixelSize);
    }

    if(mouseClicked == true && cellArray[mouseCell] == 0){
        cellArray[mouseCell] = 1
    }

/*
    if(mouseClicked == true && cellArray[mouseCell] == 0 && mouseCell != lastDrawnCell){
        cellArray[mouseCell] = 1
        lastDrawnCell = mouseCell
    }else if (mouseClicked == true && cellArray[mouseCell] == 1 && mouseCell != lastDrawnCell){
        cellArray[mouseCell] = 0
        lastDrawnCell = mouseCell
    }
*/
}


function clearArray(){

    for (let j=0 ; j<pixelHeight ; j++){
        for(let i=0 ; i<pixelWidth ; i++){
    
            cellArray[(j*pixelWidth)+i] = 0;
    
        }
    }
    for (let j=0 ; j<pixelHeight ; j++){
        for(let i=0 ; i<pixelWidth ; i++){ 
    
            holderArray[(j*pixelWidth)+i] = 0;
    
        }
    }

    startStop = false;

}


function main() {
    //console.log('checkpoint animate');

    //window.requestAnimationFrame(animate);
    
    if (startStop == true){
        updateArray();
    }
    
    /*else if (startStop == false){
        handDraw();

    }*/

}








window.addEventListener('keydown', (event) => {
    switch (event.key){
    case 's':
        startStop = true;
        break;
    case 'd':
        startStop = false;
        break;
    case 'c':
        clearArray();
        break;
    case 'e':
        if(eraser == false){
            eraser = true;
            //console.log('eraser: '+ eraser);
        }else {
            eraser = false;
            //console.log('eraser: '+ eraser);
        }
        break;
    }
    //console.log(event.key);
    //console.log('startStop = '+ startStop)

})

document.onmousemove = function(event)
{
    if (startStop == false){
    
        mouse_x = event.pageX;
        mouse_y = event.pageY;

        check_cursor
        function check_cursor(){}

        mousePixel_x = (Math.floor(mouse_x/pixelSize))-1
        mousePixel_y = (Math.floor(mouse_y/pixelSize))-1

        mouseCell = (mousePixel_y*pixelWidth)+(mousePixel_x);

        //console.log('mousePixel_x: '+mousePixel_x+' mousePixel_y: '+mousePixel_y+ ' mouseCell: '+mouseCell)

        drawArray();

        if (cellArray[mouseCell] == 1){
            c.fillStyle = 'black';
            c.fillRect(mousePixel_x*pixelSize,mousePixel_y*pixelSize,pixelSize,pixelSize);
        }else {
            c.fillStyle = 'white';
            c.fillRect(mousePixel_x*pixelSize,mousePixel_y*pixelSize,pixelSize,pixelSize);
        }

        if(mouseClicked == true && eraser == false){
            cellArray[mouseCell] = 1
            cellArray[mouseCell-1] = 1
            cellArray[mouseCell-pixelWidth] = 1
            cellArray[mouseCell-pixelWidth-1] = 1
        }

        if(mouseClicked == true && eraser == true){
            cellArray[mouseCell] = 0
            cellArray[mouseCell-1] = 0
            cellArray[mouseCell-pixelWidth] = 0
            cellArray[mouseCell-pixelWidth-1] = 0
        }

    }

}

document.onmousedown = function(event){

    event.button
    mouseClicked = true
    //console.log('mouseClicked: '+mouseClicked)

}

document.onmouseup = function(event){

    event.button
    mouseClicked = false
    //console.log('mouseClicked: '+mouseClicked)


}








function repeatEverySecond() {

    intervalID = setInterval(main, 100);

}

repeatEverySecond();
