
let controllerID = null;
let leftStick = new Vector2(0,0);
let rightStick = new Vector2(0,0);


window.addEventListener("gamepadconnected", (event) =>{

    controllerID = event.gamepad.index; 
    console.log("connected");

});

window.addEventListener("gamepaddisconnected", (event) =>{

    controllerID = null; 
    console.log("disconnected");

});


class RemoteTest {

    static readRemoteInputs(){

        if(controllerID !== null){
            const gamepad = navigator.getGamepads()[controllerID];
            const joysticks = gamepad.axes;
            leftStick.x = joysticks[0] * .01;
            leftStick.y = joysticks[1] * .01;
            rightStick.x = joysticks[2] * .02;
            rightStick.y = joysticks[3] * .02;


        }

    }

    static drawJoysticks (){
        Draws.drawSimPoint(leftStick,.001,"white");
        Draws.drawSimPoint(rightStick,.001,"red");
    }

}