class Draws{

    static updateTicks(){
        tickSpacing = .01;
        tickStartingOffset.x = (windowTOSimX(xBorder) - (parseInt(windowTOSimX(xBorder)*100)/100));
        tickStartingOffset.y = (windowTOSimY(yBorder) - (parseInt(windowTOSimY(yBorder)*100)/100));
    }

    static drawSimPoint(position, radius, color){
        c.beginPath();
        c.arc(simToWindowX(position.x),simToWindowY(position.y),(radius/pixelSize)*zoom,0,Math.PI*2, true);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }

    static drawSimLine(start, end, color){
        c.beginPath();
        c.moveTo(simToWindowX(start.x),simToWindowX(start.y));
        c.lineTo(simToWindowX(end.x),simToWindowX(end.y));
        c.closePath();
    }

    static drawBackgroundGrid(type,color){
        c.lineWidth = 1;

        if(type == "line"){

            c.beginPath();
            for( let x = windowTOSimX(xBorder) ; x <= windowTOSimX(windowPx.x - xBorder) + tickStartingOffset.x ; x+= tickSpacing){
                c.moveTo(simToWindowX(x - tickStartingOffset.x),yBorder);
                c.lineTo(simToWindowX(x - tickStartingOffset.x),windowPx.y-yBorder);
            }
            for( let y = windowTOSimY(yBorder) ; y <= windowTOSimY(windowPx.y - yBorder) + tickStartingOffset.y ; y += tickSpacing){
                c.moveTo(xBorder,simToWindowY(y-tickStartingOffset.y));
                c.lineTo(windowPx.x-xBorder,simToWindowY(y-tickStartingOffset.y))
            }
            c.strokeStyle = color;
            c.stroke();
            c.closePath();

        }else if(type == "point"){

            c.fillStyle = color;
            for( let x = windowTOSimX(xBorder) ; x <= windowTOSimX(windowPx.x - xBorder) + tickStartingOffset.x ; x+= tickSpacing){
                for( let y = windowTOSimY(yBorder) ; y <= windowTOSimY(windowPx.y - yBorder) + tickStartingOffset.y ; y += tickSpacing){
                    c.fillRect( simToWindowX(x - tickStartingOffset.x)-1, simToWindowY(y-tickStartingOffset.y)-1 ,2,2);
                }
            }

        }
    }

    static drawSideTicks(color){
        c.lineWidth = 1;

        c.beginPath();
        for( let x = windowTOSimX(xBorder) ; x <= windowTOSimX(windowPx.x - xBorder) + tickStartingOffset.x ; x+= tickSpacing ){
            c.moveTo(simToWindowX(x - tickStartingOffset.x),windowPx.y-yBorder);
            c.lineTo(simToWindowX(x - tickStartingOffset.x),windowPx.y-yBorder-10);
            c.moveTo(simToWindowX(x - tickStartingOffset.x),yBorder);
            c.lineTo(simToWindowX(x - tickStartingOffset.x),yBorder+10);
        }
        for( let y = windowTOSimY(yBorder) ; y <= windowTOSimY(windowPx.y - yBorder) + tickStartingOffset.y ; y += tickSpacing    ){
            c.moveTo(xBorder,simToWindowY(y-tickStartingOffset.y));
            c.lineTo(xBorder+10,simToWindowY(y-tickStartingOffset.y));
            c.moveTo(windowPx.x - xBorder,simToWindowY(y-tickStartingOffset.y));
            c.lineTo(windowPx.x - xBorder-10,simToWindowY(y-tickStartingOffset.y));
        }
        c.strokeStyle = color;
        c.stroke();
        c.closePath(); 

    }

    static drawAxisTicks(color){
        c.lineWidth = 1;

        c.beginPath();
        for( let x = windowTOSimX(xBorder) ; x <= windowTOSimX(windowPx.x - xBorder) + tickStartingOffset.x ; x+= tickSpacing ){
            c.moveTo(simToWindowX(x - tickStartingOffset.x),simToWindowY(0));
            c.lineTo(simToWindowX(x - tickStartingOffset.x),simToWindowY(0)+5);
        }
        for( let y = windowTOSimY(yBorder) ; y <= windowTOSimY(windowPx.y - yBorder) + tickStartingOffset.y ; y += tickSpacing ){
            c.moveTo(simToWindowX(0),simToWindowY(y-tickStartingOffset.y));
            c.lineTo(simToWindowX(0)-5,simToWindowY(y-tickStartingOffset.y))
        }
        c.strokeStyle = color ;
        c.stroke();
        c.closePath(); 

    }

    static drawTickNum(color){
        c.fillStyle = color;
        c.font = '16px CustomFont';


        c.beginPath();
        for( let x = windowTOSimX(xBorder) ; x <= windowTOSimX(windowPx.x - xBorder) + tickStartingOffset.x ; x+= tickSpacing ){
            c.fillText((x - tickStartingOffset.x).toFixed(2),simToWindowX(x - tickStartingOffset.x)-10,windowPx.y - 5);
        }
        for( let y = windowTOSimY(yBorder) ; y <= windowTOSimY(windowPx.y - yBorder) + tickStartingOffset.y ; y += tickSpacing ){
            c.fillText((y - tickStartingOffset.y).toFixed(2),-1,simToWindowY(y-tickStartingOffset.y)+yBorder-10);
        }
    }

    static drawAxes(color){
        c.lineWidth = 1;

        c.beginPath();
        c.moveTo(simToWindowX(0),0);
        c.lineTo(simToWindowX(0),windowPx.y);
        c.moveTo(0,simToWindowY(0));
        c.lineTo(windowPx.x,simToWindowY(0));
        c.strokeStyle = color;
        c.stroke();
        c.closePath(); 

    }

    static drawBoarder(mainColor, secondaryColor){
        c.lineWidth = 1;

        c.fillStyle = mainColor;
        c.fillRect(0,0,windowPx.x,yBorder);
        c.fillRect(windowPx.x-xBorder,0,windowPx.x,windowPx.y);
        c.fillRect(0,windowPx.y-yBorder,windowPx.x,windowPx.y);
        c.fillRect(0,0,xBorder,windowPx.y);
    
        c.beginPath();
        c.moveTo(xBorder,yBorder);
        c.lineTo(windowPx.x-xBorder,yBorder);
        c.lineTo(windowPx.x-xBorder,windowPx.y-yBorder);
        c.lineTo(xBorder,windowPx.y-yBorder);
        c.lineTo(xBorder,yBorder);
        c.strokeStyle = secondaryColor;
        c.stroke();
        c.closePath(); 

    }

    static background(color){
        c.fillStyle = color;
        c.fillRect(0,0,canvas.width,canvas.height);
    }

}

