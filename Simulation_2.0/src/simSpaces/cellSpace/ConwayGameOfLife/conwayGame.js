const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const pixelSize = 8;

canvas.width = innerWidth - 16  - (innerWidth % pixelSize);
canvas.height = innerHeight - 16 - (innerHeight % pixelSize);

const pixelWidth = canvas.width / pixelSize;
const pixelHeight = canvas.height / pixelSize;

activateZoomDrag = true;

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
