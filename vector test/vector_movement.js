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
var scaled_x = -1
var scaled_y = -1
var acc = -1

document.onmousemove = function(event)
{
cursor_x = event.pageX
cursor_y = event.pageY
fromCenter_x = cursor_x - centerX
fromCenter_y = -1 * (cursor_y - centerY)
magnitude = Math.sqrt((fromCenter_x*fromCenter_x)+(fromCenter_y*fromCenter_y))
unit_x = (fromCenter_x/magnitude)
unit_y = (fromCenter_y/magnitude)  
scaled_x = 50 * unit_x
scaled_y = 50 * unit_y


}


class sprite {

    constructor({position,velocity,acceleration}) {
        this.position = position
        this.velocity = velocity
        this.acceleration = acceleration
        this.height = 50
        this.width = 50
        acc = 1250 /(this.height*this.width)

    }

    draw() {

        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        
    }

    update(){
        this.draw() 
        check_cursor
        function check_cursor(){}
        console.log ('x '+fromCenter_x+', y '+fromCenter_y+'   unit x '+unit_x+ ' unit y '+unit_y);
        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        
    }
}

const vector1 = new sprite ({
    positon: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    acceleration: {
        x: 0,
        y: 0
    },
})

let lastkey_x
let lastkey_y


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    vector1.update()

    if (keys.a.pressed && lastkey_x === 'a'){
        vector1.acceleration.x = -1
    }else if (keys.d.pressed && lastkey_x === 'd'){
        vector1.acceleration.x = 1
    }

    if (keys.a.pressed && lastkey_y === 'w'){
        vector1.acceleration.y = -1
    }else if (keys.d.pressed && lastkey_y === 'a'){
        vector1.acceleration.y = 1
    }
}


animate()

window.addEventListener('keydown', (event) => {
    switch (event.key){
    case 'd':
        keys.d.pressed = true
        lastkey_x = 'd'
        break
    case 'a':
        keys.a.pressed = true
        lastkey_x = 'a'
        break
    case 'w':
        keys.a.pressed = true
        lastkey_y = 'w'
        break
    case 's':
        keys.a.pressed = true
        lastkey_y = 's'
        break
    }
    console.log(event.key);

})

window.addEventListener('keyup', (event) => {
    switch (event.key){
    case 'd':
        keys.d.pressed = false
        break
    case 'a':
        keys.a.pressed = false
        break
    case 'w':
        keys.w.pressed = false
        break
    case 's':
        keys.w.pressed = false
        break
    }
    console.log(event.key);

})
