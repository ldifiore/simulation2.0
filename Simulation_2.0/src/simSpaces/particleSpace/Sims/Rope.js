class Rope extends Particle{

    static id = 0; 
    static gravity = 9.81;

    constructor(position,velocity,mass,size,color,springConst,damping,restLength,fixed){
        super(position,velocity,mass,size,color);
        this.springConst = springConst;
        this.damping = damping;
        this.restLength = restLength;
        this.fixed = fixed;
        this.id = Rope.id;
        Rope.id++;

    }

    static Init(){
            ParticleSim.particles.push(new Rope(new Vector2(-.2,.0),new Vector2(0,0),.01,.001,`rgba(120, 174, 225, 1)`, 30, .01 , .02 , true));
        for(let i = -.2 + .02 ; i < .2 - .02  ; i += .02){
            ParticleSim.particles.push(new Rope(new Vector2(  i,.0),new Vector2(0,0),.01,.001,`rgba(255, 255, 255, 1)`, 30, .01 , .02 , false));
            console.log(i)
        }
            ParticleSim.particles.push(new Rope(new Vector2( .2,.0),new Vector2(0,0),.01,.001,`rgba(226,  81,  81, 1)`, 30, .01 , .02 , false));

        /* ParticleSim.particles.push(new Rope(new Vector2(0,.0),new Vector2(0,0),2,.01,`rgba(120, 174, 225, 1)`, 10, .0 , .01 , true));
        ParticleSim.particles.push(new Rope(new Vector2(0,-0.05),new Vector2(0,0),5,.01,`rgba(120, 174, 225, 1)`, 5, .0 , .05 , false));
        ParticleSim.particles.push(new Rope(new Vector2(0.05,-0.05),new Vector2(0,0),5,.01,`rgba(120, 174, 225, 1)`, 5, .0 , .05 , false)); */


    }

    static Config(){
        InitTimsecale = 0;

        activateMove = true;

        ticks = false;
        tickColor = "white";
        backgroundColor = "black";
        axes = true;
        axisColor = "rgba(255,255,255,.3)";
        grid = false; 
        gridtype = "point";
        gridColor = "rgba(255,255,255,.3)";
        boarder = true;
        xBorder = 10;
        yBorder = 10;
        tickNum = false;
        tickNumColor = "white"
    }

    static Calcs(){
        let particles = ParticleSim.particles;
        for (let i = 1; i < particles.length; i++) {
            Rope.RunCalc(particles[i], particles[i - 1]);
        }

        for (let p = 0; p < ParticleSim.particles.length ; p++){
        if (!ParticleSim.particles[p].fixed) {
            ParticleSim.particles[p].force_calcs.y += Rope.gravity * ParticleSim.particles[p].mass;
        }
}
    }

    static RunCalc(p1, p2){
        let radius = SUB(p1.position, p2.position);
        let dist = radius.length();
        if (dist === 0) return;

        let dir = radius.getNormalize();
        let displacement = dist - p1.restLength;

        // Hooke’s law spring force
        let force = SCALE(dir, -p1.springConst * displacement);

        // Add damping (acts like friction)
        let dampingForce = SCALE(p1.velocity, -p1.damping);
        force = ADD(force, dampingForce);

        if (!p1.fixed) {
            p1.force_calcs.x += force.x;
            p1.force_calcs.y += force.y;
        }
        if (!p2.fixed) {
            p2.force_calcs.x -= force.x;
            p2.force_calcs.y -= force.y;
        }
    }

}
    /* static Calcs(){
    let particles = ParticleSim.particles;

    for (let i = 1; i < particles.length; i++) {
        let p1 = particles[i];
        let p2 = particles[i - 1];

        Rope.RunCalc(p1, p2);
        Rope.RunCalc(p2, p1); 
    }
}


    static RunCalc(particle, lastParticle){
        if (!particle.fixed){
            let radius = SUB(particle.position, lastParticle.position);
            let radiusLength = radius.length();
            let dir = radius.getNormalize();

            // Hooke’s law: F = -k(x - L)
            let springForce = SCALE(dir, -1 * particle.springConst * (radiusLength - particle.restLength));

            particle.force_calcs.x += springForce.x;
            particle.force_calcs.y += springForce.y + (Rope.gravity * particle.mass);
        }
    }


    /* static RunCalc(particle,lastParticle){
        
        if (particle.fixed){
        
        }else{
            
            let radius = SUB(particle.position,lastParticle.position);
            let radiusLength = radius.length();
            radius.Normalize();

            let scaled = SCALE(radius,(-1*particle.springConst*(radiusLength - RopeSim.restLength)));
            
            particle.force_calcs.x += scaled.x;
            particle.force_calcs.y += scaled.y + (RopeSim.gravity * this.mass);
        }

    } 

     */
