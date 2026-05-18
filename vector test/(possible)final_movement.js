const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 20
canvas.height = innerHeight - 20

c.fillRect(0, 0, canvas.width, canvas.height)

const centerX = canvas.width/2
const centerY = canvas.height/2
const block_width = 50
const block_height = 50
const half_block_width = block_width/2
const half_block_height = block_height/2
const block_in_cent_x = centerX - half_block_width
const block_in_cent_y = centerY - half_block_height
const map_width = canvas.width
const map_height = canvas.height
const acc = 250 /(block_height*block_height)
const max_speed = 6
const friction = .05

var grav = 0
var speed = -1
var vel_unit_x = 1
var vel_unit_y = 1

var cursor_x = -1;
var cursor_y = -1;
var fromCenter_x = -1
var fromCenter_y = -1
var magnitude = -1
var unit_x = -1
var unit_y = -1
var scaled_x = -1
var scaled_y =-1
var box_cent_x = -1
var box_cent_y = -1


document.onmousemove = function(event)
{

cursor_x = event.pageX
cursor_y = event.pageY

}

class sprite {

    constructor({position,velocity,acceleration}) {
        this.position = position
        this.velocity = velocity
        this.acceleration = acceleration
    }


    draw() {
        c.fillStyle = 'gray'
        c.fillRect(this.position.x, this.position.y, map_width, map_height)
        c.fillStyle = 'green'
        c.fillRect(block_in_cent_x,block_in_cent_y, block_width, block_height)

        box_cent_x = this.position.x + block_width/2
        box_cent_y = this.position.y + block_height/2

        c.beginPath();
        c.strokeStyle = 'white';
        c.moveTo(centerX, centerY);
        c.lineTo(cursor_x,cursor_y);
        c.stroke();

    }

    update(){
        
        check_cursor
        function check_cursor(){}

        fromCenter_x = cursor_x - centerX
        fromCenter_y = -1 * (cursor_y - centerY)
        
        magnitude = Math.sqrt((fromCenter_x*fromCenter_x)+(fromCenter_y*fromCenter_y))
        
        unit_x = (fromCenter_x/magnitude)
        unit_y = (fromCenter_y/magnitude) 
        
        scaled_x = 50 * unit_x
        scaled_y = 50 * unit_y
        
        this.acceleration.x = 0
        this.acceleration.y = 0

        if (keys.a.pressed && lastkey_x === 'a'){
            this.acceleration.x = -unit_y*acc
            this.acceleration.y = -unit_x*acc
        }else if (keys.d.pressed && lastkey_x === 'd'){
            this.acceleration.x = unit_y*acc
            this.acceleration.y = unit_x*acc        }

        if (keys.w.pressed && lastkey_y === 'w'){
            this.acceleration.x = unit_x*acc
            this.acceleration.y = -unit_y*acc
        }else if (keys.s.pressed && lastkey_y === 's'){
            this.acceleration.x = -unit_x*acc
            this.acceleration.y = unit_y*acc        }


        if (this.position.x + this.velocity.x > centerX - half_block_width) {
            this.velocity.x = -.5*this.velocity.x
            this.position.x = centerX - half_block_width
        }
        if (this.position.y + this.velocity.y > centerY - half_block_height) {
            this.velocity.y = -.5*this.velocity.y
            this.position.y = centerY - half_block_height
        }
        if (this.position.x - this.velocity.x < centerX + half_block_width - map_width) {
            this.velocity.x = -.5*this.velocity.x
            this.position.x = centerX + half_block_width - map_width
        }
        if (this.position.y - this.velocity.y < centerY + half_block_height - map_height) {
            this.velocity.y = -.5*this.velocity.y
            this.position.y = centerY + half_block_height - map_height
        }

        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y 

        speed = Math.sqrt(this.velocity.x*this.velocity.x + this.velocity.y*this.velocity.y)
        vel_unit_x = this.velocity.x/speed
        vel_unit_y = this.velocity.y/speed

        
        if (speed >= max_speed){
            this.velocity.x = vel_unit_x*max_speed
            this.velocity.y = vel_unit_y*max_speed
        }

        if (speed > .001 ) {

           this.velocity.x += (-friction*vel_unit_x)
           this.velocity.y += (-friction*vel_unit_y)


        }

        if (speed < .1){

            this.velocity.x = 0
            this.velocity.y = 0

        }

        /*if ((fromCenter_x*fromCenter_x) + (fromCenter_y*fromCenter_y) < 100 ){

            this.acceleration.x = 0
            this.acceleration.y = 0  

        }*/

        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y
        
        console.log('x: '+this.position.x+'   y: '+ this.position.y + ' speed: '+ speed ); 
        this.draw() 

    }
}

const player = new sprite({
    position: {
    x:centerX,
    y:centerY
},
velocity: {
    x:0,
    y:0
},
acceleration: {
    x:0,
    y:0
}

}) 



console.log(player);


const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
}

let lastkey_x
let lastkey_y

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
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
        keys.w.pressed = true
        lastkey_y = 'w'
        break
    case 's':
        keys.s.pressed = true
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
        keys.s.pressed = false
        break
    }
    console.log(event.key);

})