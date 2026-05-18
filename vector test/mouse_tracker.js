const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

var cursor_x = -1;
var cursor_y = -1;
var mouseclicked = -1;

/*document.onmousemove = function(event)
    {
     cursor_x = event.pageX;
     cursor_y = event.pageY;
     console.log('Cursor at: '+cursor_x+', '+cursor_y);
    } 
*/



function update(){
    document.onmousedown = function(event)
    {
        mouseclicked = event.button
    }
    document.onmouseup = function(event)
    {
        mouseclicked = event.button
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    update()
    console.log('cousor: '+ mouseclicked)
    //console.log('Cursor at: '+cursor_x+', '+cursor_y);
    
}


animate()

