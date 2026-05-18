class ZoomTest {

    static drawSim(){

        c.fillStyle = 'rgba(0, 0, 0, 1)';
        c.fillRect(0,0,canvas.width,canvas.height);

        DrawUtillsMeter.drawPoint(new Vector2(mousePosition[0]*pixelSize,mousePosition[1]*pixelSize),wheelPos*.00001,'rgb(225, 225, 225,1)');
        //DrawUtillsMeter.drawText(new Vector2((mousePosition[0]*pixelSize)+.001,(mousePosition[1]*pixelSize)-.001),12,'rgb(225, 225, 225)','('+(mousePosition[0]*pixelSize)*100+', '+(mousePosition[1]*pixelSize)*100+')');
        //DrawUtillsMeter.drawText(new Vector2(.01,-.01),12,'rgb(225, 225, 225)','('+wheelPos+')');
        console.log(wheelPos);
    }

    static updateSim(){
        ZoomTest.drawSim();
    }

}