class Vector2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    Normalize(){
        length = this.length();
        this.x /= length;
        this.y /= length;
    }

    getNormalize(){
        length = this.length();
        return new Vector2(this.x / length, this.y / length)
    }

    sqLength(){
        return this.x*this.x + this.y*this.y;
    }

    length(){
        return Math.sqrt(this.sqLength());
    }

    getNormal(){
        return new Vector2(this.y, -this.x);
    }

    dot(vec){
        return this.x*vec.x + this.y*vec.y;
    }

    copy(){
        return new Vector2(this.x,this.y);
    }

    add(vec){
        this.x += vec.x;
        this.y += vec.y;
    }

    sub(vec){
        this.x += vec.x;
        this.y -= vec.y;
    }

    scale(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }

    cross(vec){
        return this.x*vec.y - this.y*vec.x;
    }

    log(){
        console.log('x: ' + this.x + '  y: ' + this.y)
    }

    toString(){
        return `[${this.x}, ${this.y}]`;
    }



}

function ADD(vecA, vecB){
    return new Vector2(vecA.x + vecB.x, vecA.y + vecB.y);
}

function SUB(vecA, vecB){
    return new Vector2(vecA.x - vecB.x, vecA.y - vecB.y);
}

function SCALE(vecA, scale){
    return new Vector2(vecA.x * scale, vecA.y * scale);
}   

function DOT(vec1, vec2) {
    return vec1.x * vec2.x + vec1.y * vec2.y;
}