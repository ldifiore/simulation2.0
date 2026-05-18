const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 20
canvas.height = innerHeight - 20

c.fillRect(0, 0, canvas.width, canvas.height)

const centerX = canvas.width/2
const centerY = canvas.height/2

var cursor_x = -1;
var cursor_y = -1;
var fromCenter_x = -1
var fromCenter_y = -1
var magnitude = -1
var unit_x = -1
var unit_y = -1

document.onmousemove = function(event)
{
cursor_x = event.pageX
cursor_y = event.pageY
fromCenter_x = cursor_x - centerX
fromCenter_y = -1 * (cursor_y - centerY)
magnitude = Math.sqrt((fromCenter_x*fromCenter_x)+(fromCenter_y*fromCenter_y))
unit_x = 50*(fromCenter_x/magnitude)
unit_y = 50*(fromCenter_y/magnitude)  

}


class sprite {

    draw() {
        
        c.beginPath();
        c.strokeStyle = 'white';
        c.moveTo(centerX, centerY);
        c.lineTo(cursor_x,cursor_y);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'red';
        c.moveTo(centerX, centerY);
        c.lineTo(centerX+unit_x, -unit_y+centerY);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'green';
        c.moveTo(centerX, centerY);
        c.lineTo(unit_y+centerX, centerY+unit_x);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'blue';
        c.moveTo(centerX, centerY);
        c.lineTo(-unit_y+centerX, centerY-unit_x);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'yellow ';
        c.moveTo(centerX, centerY);
        c.lineTo(centerX-unit_x, unit_y+centerY);
        c.stroke();
    
    
    }

    update(){
        this.draw() 
        check_cursor
        function check_cursor(){}
        console.log ('x '+fromCenter_x+', y '+fromCenter_y+'   unit x '+unit_x+ ' unit y '+unit_y);

        
    }
}

const vector1 = new sprite ({
    positon: {
        x: 0,
        y: 0
    }
})



function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    vector1.update()
}


animate()