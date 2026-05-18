// CONFIG
SimTools.Config()

// INITIAL CONDITIONS
SimTools.Init()

// MAIN LOOP   
function MainLoop(){

// UPDATES
    SimTools.UpdateSimSpace();
    /*     if(controllerID !== null){
        RemoteTest.readRemoteInputs();
        RemoteTest.drawJoysticks();
    } */

// COMPUTE
    if(!pause){
        SimTools.Computes();
    }

// DRAW
        SimTools.Draw();

        window.requestAnimationFrame(MainLoop);
}

MainLoop();