
let fpsCount = 0;

class SimTools{

    static updateSimTime(){

        timsecale = Math.pow(10,InitTimsecale - timeSlider);
        
        
        document.getElementById("dataTimeScale").innerHTML = "10e" + (-1*(InitTimsecale-timeSlider)).toFixed(2) ;
        
        currentTime = performance.now() / 1000;

        document.getElementById("dataTotTime").innerHTML = currentTime.toFixed(2);

        deltaTime = currentTime - lastTime;

        if(fpsCount > .2){
            document.getElementById("fpsBar").value = Fps;
            fpsCount = 0
        }else{
            fpsCount += deltaTime;
        }

        Fps = 1/deltaTime;
        deltaTime /= timsecale;
        if(!pause){
            totSimTime += deltaTime;
        }

        document.getElementById("dataTotSimTime").innerHTML = totSimTime.toExponential(3);

        lastTime = currentTime;

    }

    static Config(){
        switch(currentSimSpace){
            case "Particle":
                ParticleSim.Config();
            break;
        }
    }

    static Init(){
        console.log("init")
        switch(currentSimSpace){
            case "Particle":
                ParticleSim.Init();
            break;
        }
    }

    static UpdateSimSpace(){
        SimTools.updateSimTime();

        if (activateMove){
            updateWindow();
        }
    }

    static Computes(){
        switch(currentSimSpace){
            case "Particle":
                ParticleSim.Update();
            break;
        }
    }

    static Draw(){
        
        Draws.updateTicks();

        Draws.background('rgba(0,0,0,1)');

        if(axes){
            Draws.drawAxes(axisColor);
        }

        if(grid){
            Draws.drawBackgroundGrid(gridtype, gridColor);
        }

        switch(currentSimSpace){
            case "Particle":
                ParticleSim.Draw();
            break;
        }


        if(ticks){
            Draws.drawSideTicks(tickColor);
        }

        if(boarder){
            Draws.drawBoarder("black", "white");
        }

        if(tickNum){
            Draws.drawTickNum(tickNumColor);
        }
    }


    static plot(){
        let graphEquation = "x";
        let y = 0 ;

        c.lineWidth = 3;

        c.beginPath();
        c.moveTo(simToWindowX(windowTOSimX(0)),simToWindowY(y));

        let count = new Array;
        for(let x = 10 ; x <= windowPx.x -10 ; x++){
            let simX = windowTOSimX(x);
            let simY = .01 * Math.sin(simX *100);

            c.lineTo(simToWindowX(simX),simToWindowY(simY));
        }

        c.strokeStyle = "red";
        c.stroke();
        c.closePath();

        c.fillStyle = 'white'
        c.fillText(zoom, 100, 100);
    }

}
