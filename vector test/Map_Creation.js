const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth - 20
canvas.height = innerHeight - 20

c.fillRect(0, 0, canvas.width, canvas.height)


const MapArray = [7,3,3,3,11,15,15,7,3,3,11,15,7,3,3,11,5,0,0,0,2,3,3,1,0,0,2,3,1,0,0,10,5,0,0,0,8,4,8,4,0,0,8,12,4,0,0,10,13,4,8,12,14,5,10,13,12,12,14,15,5,8,12,14,7,1,2,11,7,1,2,3,11,7,3,3,1,2,3,11,5,0,0,10,5,8,12,12,14,5,0,8,4,0,0,10,5,0,0,2,1,2,3,3,3,1,0,10,5,0,0,10,13,12,12,12,12,12,12,12,12,12,12,14,13,12,12,14];

const img = new Image();
  img.onload = () => {
    c.drawImage(img, 0, 0);
};

  img.src = "tiles_0.png";


class sprite {

    constructor({position,velocity,acceleration}) {
        this.position = position
        this.velocity = velocity
        this.acceleration = acceleration
    }


    draw() {
        for(let j = 0; j<8; j++){
            for (let i = 0; i<16; i++){
                c.drawImage(img, (MapArray[j*16+i]) * 128, 0, 128, 128, this.position.x + (i * tileSize),  this.position.y + (j * tileSize), tileSize, tileSize)
            }
        }
        
    }

    update(){
        this.draw() 
    }
}

const tile = new sprite({
    position: {
    x: 0,
    y: 0
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



console.log(tile);

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    tile.update()
}


animate()
