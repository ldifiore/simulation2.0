// GLOBALS
    let mouseButtons = [0,0,0,0,0];

    let wheelPosition = Math.log(startingZoom)/Math.log(10);
    let deltaWheel = 0;

    let mousePosition = new Vector2(0,0);
    let lastMousePosition = new Vector2(0,0);
    let mouseDelta = new Vector2(0,0);
    let mouseDeltaSim = new Vector2(0,0);
    let mousePositionSim = new Vector2(0,0);
    let mousePositionSim_beforeZoom = new Vector2(0,0);
    let mousePositionSim_afterZoom = new Vector2(0,0);
    let mouseMoved = false; 

    let dragOffset = new Vector2(0,0);

    let tickSpacing;
    let tickStartingOffset = new Vector2(0,0);
    
// UPDATE WINDOW PAN & ZOOM
    function updateWindow(){

        canvas.width = document.getElementById('simSpace').clientWidth ;
        canvas.height = document.getElementById('simSpace').clientHeight ;

        windowPx.x = canvas.width;
        windowPx.y = canvas.height;
        windowSim.x = canvas.width * pixelSize;
        windowSim.y = canvas.height * pixelSize;


        centerWindow.x = windowPx.x / 2;
        centerWindow.y = windowPx.y / 2;
        centerSim.x = windowSim.x / 2;
        centerSim.y = windowSim.y / 2;

        
        if (mouseButtons[1] && mouseMoved){
            offset.x -= (mouseDelta.x / zoom)*pixelSize;
            offset.y -= (mouseDelta.y / zoom)*pixelSize; 
            //console.log("dragOffset : " + dragOffset.toString());
            mouseMoved = false;
        }

        windowTOSim(mousePosition,mousePositionSim_beforeZoom);
        zoom = Math.pow(10,wheelPosition);
        windowTOSim(mousePosition,mousePositionSim_afterZoom);

        offset.x += (mousePositionSim_beforeZoom.x - mousePositionSim_afterZoom.x);
        offset.y += (mousePositionSim_beforeZoom.y - mousePositionSim_afterZoom.y);
        //console.log(wheelPosition);

    }




// TRANSFORMS 
        // SIMULATION TO WINDOW SPACE
        function simToWindow(simPosition , windowPosition){
            windowPosition.x = (((simPosition.x - offset.x  )/pixelSize) * zoom )+ centerWindow.x ;
            windowPosition.y = (((simPosition.y - offset.y  )/pixelSize) * zoom )+ centerWindow.y ; 
        }
        function simToWindowX(simPosition){
            return (((simPosition - offset.x )/pixelSize) * zoom )+ centerWindow.x ;
        }
        function simToWindowY(simPosition){
            return (((simPosition - offset.y  )/pixelSize) * zoom )+ centerWindow.y ; 
        }

        // WINDOW TO SIMULATION SPACE
        function windowTOSim(windowPosition , simPosition){
            simPosition.x = (((windowPosition.x - centerWindow.x ) / zoom ) * pixelSize ) + offset.x ;
            simPosition.y = (((windowPosition.y - centerWindow.y) / zoom ) * pixelSize ) + offset.y ;
        }
        function windowTOSimX(windowPosition){
            return (((windowPosition - centerWindow.x ) / zoom ) * pixelSize ) + offset.x ;
        }
        function windowTOSimY(windowPosition){
            return (((windowPosition - centerWindow.y) / zoom ) * pixelSize ) + offset.y ;
        }

        // SCALE TO WINDOW SPACE 
        function scaleSimToWindow(){

        }

        // SCALE TO SIMULATION SPACE



// TIME SLIDER
    function timeSliderChange(value){
        timeSlider = ((value/50)-1)*3;
    }


// PAUSE
    function pauseSim(){
        if(pause){
            pause = false
        }else{
            pause = true;
        }
    }


// RESET
    function resetSim(){
        SimTools.Init();
        totSimTime = 0;
        currentTime = 0;
    }


// REPEAT
    function repeatSim(){
        repeat = true;
        repeat = false;
    }


//  GET WHEEL POSITION
    canvas.addEventListener("wheel" , function(event){
        event.preventDefault();
        deltaWheel = event.deltaY/2000;
        wheelPosition += deltaWheel;


    })


//  GET MOUSE BOTTONS
    //  MOUSE BOTTON DOWN
        canvas.addEventListener('mousedown',function(event){

            event.preventDefault();

            mouseButtons[event.button] = 1;

            

        });

    //  MOUSE BOTTON UP
        canvas.addEventListener('mouseup',function(event){

            event.preventDefault();

            mouseButtons[event.button] = 0;

        });


//  GET MOUSE POSITION / MOUSE DELTA
    canvas.addEventListener('mousemove',function(event){
        var rect = canvas.getBoundingClientRect();
        mousePosition.x = event.clientX - rect.left;
        mousePosition.y = event.clientY - rect.top + 1;

        mouseMoved = true;

        mouseDelta.x = mousePosition.x - lastMousePosition.x;
        mouseDelta.y = mousePosition.y - lastMousePosition.y;

        lastMousePosition.x = mousePosition.x;
        lastMousePosition.y = mousePosition.y;
        
        windowTOSim(mousePosition,mousePositionSim);
        windowTOSim(mouseDelta,mouseDeltaSim);
        });


// SIM SELECTOR

    document.querySelectorAll('.dropdown-item > button').forEach(btn => {
    btn.addEventListener('click', () => {
        const subMenu = btn.nextElementSibling;

        // close any other open submenus
        document.querySelectorAll('.sub-dropdown').forEach(menu => {
        if (menu !== subMenu) {
            menu.style.display = "none";
        }
        });

        // toggle this one
        subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
    });
    });


    document.querySelectorAll('.sub-dropdown button').forEach(btn => {
    btn.addEventListener('click', () => {
        currentSimSubSpace = btn.dataset.space;

        document.getElementById("currentSimTitle").textContent = currentSimSubSpace;

        SimTools.Config();
        resetSim();

        //console.log("Current sim space set to:", currentSimSpace);
    });
    });