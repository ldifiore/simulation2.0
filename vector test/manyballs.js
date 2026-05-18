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

var grav = 1
var speed = -1

var cursor_x = -1;
var cursor_y = -1;


document.onmousemove = function(event)
{

cursor_x = event.pageX
cursor_y = event.pageY

}

function detectLeftButton(event) {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
        return false;
    } else if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return (event.button == 1 || event.type == 'click');
    }
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

    }

    update(){
        
        check_cursor
        function check_cursor(){}
        function detectLeftButton(){}
        
        player.acceleration.x = 0
        player.acceleration.y = 0

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
        this.velocity.y += this.acceleration.y + grav
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        console.log('x: '+this.position.x+'   y: '+ this.position.y ); 
        
        

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