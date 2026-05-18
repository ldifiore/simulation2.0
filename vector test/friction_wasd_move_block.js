const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 20
canvas.height = innerHeight - 20

c.fillRect(0, 0, canvas.width, canvas.height)

const centerX = canvas.width/2
const centerY = canvas.height/2
const block_height = 50
const block_width = 50
const acc = 300 /(block_height*block_height)
const max_speed = 7
const friction = .05

var grav = 0
var speed = -1
var vel_unit_x = 1
var vel_unit_y = 1


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
    }

    update(){

        this.draw() 
        
        player.acceleration.x = 0
        player.acceleration.y = 0

        if (keys.a.pressed && lastkey_x === 'a'){
            player.acceleration.x = - acc
        }else if (keys.d.pressed && lastkey_x === 'd'){
            player.acceleration.x = acc
        }

        if (keys.w.pressed && lastkey_y === 'w'){
            player.acceleration.y = -acc
        }else if (keys.s.pressed && lastkey_y === 's'){
            player.acceleration.y = acc
        }

        if (this.position.x + block_width + this.velocity.x >= canvas.width) {
            this.velocity.x = -this.velocity.x
            this.position.x = canvas.width-block_width
        }
        if (this.position.y + block_height >= canvas.height) {
            this.velocity.y = -this.velocity.y
            this.position.y = canvas.height-block_height
        }
        if (this.position.x + this.velocity.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.position.x = 0
        }
        if (this.position.y <= 0) {
            this.velocity.y = -this.velocity.y
            this.position.y = 0
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

        if (this.acceleration.x + this.acceleration.y <= 0 && speed > .001 ) {

           this.velocity.x += (-friction*vel_unit_x)
           this.velocity.y += (-friction*vel_unit_y)


        }

        if (speed < .002){

            this.velocity.x = 0
            this.velocity.y = 0

        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //magnitude_acc = Math.sqrt(this.acceleration.x*this.acceleration.x + this.acceleration.y*this.acceleration.y)
        //console.log('x: '+this.position.x+'   y: '+ this.position.y ); 
        
        if (this.position.y + this.height > canvas.height){
            grav = 0
           // this.position.y = canvas.height - this.height
        }else {
            grav = 0
        }
        
        console.log('unit x: '+vel_unit_x+' x velocity: '+ this.velocity.x)

        
    }
}

const player = new sprite({
    position: {
    x:centerX,
    y: canvas.height - block_height
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

/*
const player2 = new sprite({
    position: {
    x:0,
    y:0
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
*/



console.log(player);
//console.log(player2);


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
    //player2.update()

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