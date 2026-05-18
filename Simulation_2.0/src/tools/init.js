
    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');
    const pixelSize = 0.00020101509747341603;
    const buttonNames = ["left", "wheel", "right", "back", "forward"];
    const currentSimTitle = document.getElementById('currentSimTitle')


    canvas.width = document.getElementById('simSpace').clientWidth ;
    canvas.height = document.getElementById('simSpace').clientHeight ;

    var windowPx = new Vector2(canvas.width,canvas.height);
    var windowSim = new Vector2(canvas.width * pixelSize , canvas.height * pixelSize);

    var centerWindow = new Vector2(windowPx.x / 2 , windowPx.y / 2);
    var centerSim = new Vector2(windowSim.x / 2 , windowSim.y / 2);

    console.log('window width: '+windowPx.x +'px    window height: '+windowPx.y+'px');

    console.log('window width: '+windowSim.x * 100  +'cm     window height: '+windowSim.y * 100 +'cm');

    console.log('center width: '+centerWindow.x +'px    center height: '+centerWindow.y+'px');

    console.log('center width: '+centerSim.x * 100  +'cm     center height: '+centerSim.y * 100 +'cm');
    /* let num = 1.15;
    console.log(num + "  ->  " + parseInt(num*10)/10 + "  ->  " + (num - (parseInt(num*10)/10)) )  */

    c.fillStyle = 'rgba(255, 0, 0, .5)';
    c.fillRect(0,0,canvas.width,canvas.height);


// GLOBALS

    // SIM SPACE/SUB SPACE 
        let currentSimSpace = "Particle";
        let currentSimSubSpace = "Gravity Collision";


    // USER INPUT
        let startingZoom = 1;
        let zoom = startingZoom;
        let offset = new Vector2(0,0);
        let pause = false;
        let reset = false;
        let repeat = false;

    // TIME
        let currentTime = 0;
        let deltaTime = 0;
        let Fps = 0;
        let lastTime = 0 ;
        let timsecale = 1;
        let InitTimsecale = 100;
        let totSimTime = 0;
        let timeSlider = 0;

    // SIM CONFIG
        let activateMove = true;

        let ticks = true;
        let tickColor = "white";
        let backgroundColor = "black";
        let axes = true;
        let axisColor = "rgba(255,255,255,.3)";
        let grid = false; 
        let gridtype = "point";
        let gridColor = "rgba(255,255,255,.3)";
        let boarder = true;
        let xBorder = 35;
        let yBorder = 20;
        let tickNum = true;
        let tickNumColor = "white"

    
currentSimTitle.textContent = `${currentSimSubSpace}`;