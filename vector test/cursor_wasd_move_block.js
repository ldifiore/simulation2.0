const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 20
canvas.height = innerHeight - 20

c.fillRect(0, 0, canvas.width, canvas.height)

const centerX = canvas.width/2
const centerY = canvas.height/2
const block_height = 50
const block_width = 50
const acc = 100 /(block_height*block_height)

var grav = 0
var speed = -1

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
/*
    constructor({position,velocity,acceleration,height,width,elasticity,density}) {
        this.position = position
        this.velocity = velocity
        this.acceleration = acceleration
        this.height = height
        this.width = width
        this.elasticity = elasticity
        this.density = density
    }
*/

    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, block_width, block_height)

        box_cent_x = this.position.x + block_width/2
        box_cent_y = this.position.y + block_height/2

        c.beginPath();
        c.strokeStyle = 'white';
        c.moveTo(box_cent_x, box_cent_y);
        c.lineTo(cursor_x,cursor_y);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'red';
        c.moveTo(box_cent_x, box_cent_y);
        c.lineTo(box_cent_x+scaled_x, -scaled_y+box_cent_y);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'green';
        c.moveTo(box_cent_x, box_cent_y);
        c.lineTo(scaled_y+box_cent_x, box_cent_y+scaled_x);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'blue';
        c.moveTo(box_cent_x, box_cent_y);
        c.lineTo(-scaled_y+box_cent_x, box_cent_y-scaled_x);
        c.stroke();

        c.beginPath();
        c.strokeStyle = 'yellow ';
        c.moveTo(box_cent_x, box_cent_y);
        c.lineTo(box_cent_x-scaled_x, scaled_y+box_cent_y);
        c.stroke();

    }

    update(){
        
        check_cursor
        function check_cursor(){}

        fromCenter_x = cursor_x - box_cent_x
        fromCenter_y = -1 * (cursor_y - box_cent_y)
        
        magnitude = Math.sqrt((fromCenter_x*fromCenter_x)+(fromCenter_y*fromCenter_y))
        
        unit_x = (fromCenter_x/magnitude)
        unit_y = (fromCenter_y/magnitude) 
        
        scaled_x = 50 * unit_x
        scaled_y = 50 * unit_y

        console.log ('x '+fromCenter_x+', y '+fromCenter_y+'   unit x '+unit_x+ ' unit y '+unit_y);

        
        player.acceleration.x = 0
        player.acceleration.y = 0

        if (keys.a.pressed && lastkey_x === 'a'){
            player.acceleration.x = -unit_y*acc
            player.acceleration.y = -unit_x*acc
        }else if (keys.d.pressed && lastkey_x === 'd'){
            player.acceleration.x = unit_y*acc
            player.acceleration.y = unit_x*acc        }

        if (keys.w.pressed && lastkey_y === 'w'){
            player.acceleration.x = unit_x*acc
            player.acceleration.y = -unit_y*acc
        }else if (keys.s.pressed && lastkey_y === 's'){
            player.acceleration.x = -unit_x*acc
            player.acceleration.y = unit_y*acc        }


        if (this.position.x + block_width + this.velocity.x >= canvas.width) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y + block_height >= canvas.height) {
            this.velocity.y = -this.velocity.y
        }
        if (this.position.x + this.velocity.x <= 0) {
            this.velocity.x = -this.velocity.x
        }
        if (this.position.y <= 0) {
            this.velocity.y = -this.velocity.y
        }

        this.velocity.x += this.acceleration.x
        this.velocity.y += this.acceleration.y 
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //speed = Math.sqrt(this.velocity.x*this.velocity.x + this.velocity.y*this.velocity.y)
        //magnitude_acc = Math.sqrt(this.acceleration.x*this.acceleration.x + this.acceleration.y*this.acceleration.y)
        console.log('x: '+this.position.x+'   y: '+ this.position.y ); 
        
        if (this.position.y + this.height > canvas.height){
            grav = 0
           // this.position.y = canvas.height - this.height
        }else {
            grav = 0
        }
        

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