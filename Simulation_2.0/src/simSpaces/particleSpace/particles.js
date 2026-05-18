class Particle{

    constructor(position,velocity,mass,size,color){

        this.position = position;
        this.velocity = velocity;
        this.mass = mass;
        this.size = size;
        this.color = color;
        this.startPosition = new Vector2(this.position.x,this.position.y);
        this.acceleration = new Vector2(0,0);
        this.force = new Vector2(0,0);
        this.force_calcs = new Vector2(0,0);

    }

    PrepForCalcs(){
        this.force_calcs.x = 0;
        this.force_calcs.y = 0;
    }

    ApplyCalcs(){

        this.force.x = this.force_calcs.x  ;
        this.force.y = this.force_calcs.y ; 

    }

    Update(deltatime){
        this.acceleration.x = this.force.x / this.mass;
        this.acceleration.y = this.force.y / this.mass;
        this.velocity.x += deltatime * this.acceleration.x;
        this.velocity.y += deltatime * this.acceleration.y;
        this.position.x += deltatime * this.velocity.x;
        this.position.y += deltatime * this.velocity.y;
    }

    Draw(){
        Draws.drawSimPoint(this.position,this.size,this.color);
        //console.log("particle draw")
    }
}