class GravityCollision extends Particle{

    constructor(position,velocity,mass,size,color,compressibility){
        super(position,velocity,mass,size,color);
        this.compressibility = compressibility;
    }
    


    static Init(){

        for (let i  = 0 ; i < 500 ; i++ ){

            let theta = Math.random()*Math.PI*2;
            let radiusRand = Math.sqrt(Math.random()) + .0;
        //POSITION DISTRUBUTION FUNCTION
            radiusRand = radiusRand;  

            let x = Math.cos(theta)*radiusRand;
            let y = Math.sin(theta)*radiusRand;
        //POSITION RADIUS
            x *= .1;
            y *= .1;

        //VELOCITY 

            let vScale = 0.0005

            let vx = -y * vScale;
            let vy = x * vScale;

        //SIZE 
            let size = (Math.random() * .001) + .001;
            let mass =  Math.PI * size * size * 100000 ;
            //console.log("diameter: " + (size*2) + "mass: " + mass);

        //COLOR
            
            let color = Math.random() * 360

        //NEW PARTICLE
            ParticleSim.particles.push(new GravityCollision(new Vector2(x,y),new Vector2( -.006 * y , .006 * x ),mass,size,`hsl(${color}, 100.00%, 64.30%)`, .1))
        }  

        //ParticleSim.particles.push(new GravityCollision(new Vector2(0,0)),new Vector2( 0 , 0 ),100,10,`rgba(255, 88, 73, 1)`, .1);

        //ParticleSim.particles.push(new GravityCollision(new Vector2(-.03,0),new Vector2(0,.0001),10,.01,`rgba(255, 88, 73, 1)`))
        //ParticleSim.particles.push(new GravityCollision(new Vector2(0,0),new Vector2(0,0),10,.02,`rgba(255, 88, 73, 1)`))
        //ParticleSim.particles.push(new GravityCollision(new Vector2(.03,0),new Vector2(0,-.0001),10,.01,`rgba(255, 88, 73, 1)`))



        //ParticleSim.particles.push(new GravityCollision(new Vector2(-.03,0),new Vector2(0,0),10,.01,`rgba(255, 88, 73, 1)`))
        //ParticleSim.particles.push(new GravityCollision(new Vector2(.03,0),new Vector2(0,0),10,.01,`rgb(73, 209, 255)`))
        //ParticleSim.particles.push(new GravityCollision(new Vector2(0,.1),new Vector2(0,0),10,.01,`rgb(255, 73, 197)`))


                                //constructor(position,velocity,mass,charge,size,color){

        /* ParticleSim.particles.push(new GravityCollision(new Vector2(-.04,0),new Vector2(0,-4e-5),10,.01,`rgba(255, 88, 73, 1)`))
        ParticleSim.particles.push(new GravityCollision(new Vector2(.04,0),new Vector2(0,4e-5),15,.015,`rgb(73, 209, 255)`))
        ParticleSim.particles.push(new GravityCollision(new Vector2(0,-.04),new Vector2(4e-5,0),20,.02,`rgb(255, 179, 73)`))
        ParticleSim.particles.push(new GravityCollision(new Vector2(0,.04),new Vector2(-4e-5,0),5,.005,`rgb(255, 73, 243)`))
        ParticleSim.particles.push(new GravityCollision(new Vector2(-.06,-.04),new Vector2(4e-5,0),2.5,.0025,`rgb(73, 255, 118)`))
        ParticleSim.particles.push(new GravityCollision(new Vector2(.06,.04),new Vector2(-4e-5,0),25,.025,`rgb(255, 240, 73)`))
*/
        //ParticleSim.particles.push(new GravityCollision(new Vector2(0,0),new Vector2(0,0),50,.01,`rgb(250, 255, 154)`))



/*     
        particles.push(new GravityCollision('custom',new Vector2(0,0),new Vector2(0,0),Math.PI * .01 * .01 ,.01,`rgb(255, 255, 153)`));


            for (let i  = 0 ; i < 500 ; i++ ){

                let theta = Math.random()*Math.PI*2;
                let radiusRand = Math.sqrt(Math.random());
            //DISTRUBUTION FUNCTION
                radiusRand = radiusRand;  

                let x = Math.cos(theta)*radiusRand;
                let y = Math.sin(theta)*radiusRand;
            //RADIUS
                x *= .1;
                y *= .1;

            //SIZE 
                let size = (Math.random() * .0002) + .0002;
                let mass = Math.PI * size * size ;
                console.log("diameter: " + (size*2) + "mass: " + mass);

            //COLOR
                
                

            //NEW PARTICLE
                particles.push(new GravityCollision('custom',new Vector2(x,y),new Vector2((y*y*y)*-10e-8 ,(x*x*x)*10e-8),mass,size,`rgb(28, 89, 98)`));
            } */
    }

        static Config(){
        InitTimsecale = -2;

        activateMove = true;

        ticks = true;
        tickColor = "white";
        backgroundColor = "black";
        axes = true;
        axisColor = "rgba(255,255,255,.3)";
        grid = false; 
        gridtype = "point";
        gridColor = "rgba(255,255,255,.3)";
        boarder = true;
        xBorder = 35;
        yBorder = 20;
        tickNum = true;
        tickNumColor = "white"
    }

    static Calcs(num_particles){
        for(let p1 = 0; p1 < num_particles; p1++){

            let particle1 = ParticleSim.particles[p1];

            for(let p2 = p1+1; p2 < num_particles; p2++){
                let particle2 = ParticleSim.particles[p2];
                GravityCollision.RunCalc(particle1, particle2);
            }
        }
    }

    static RunCalc(particle1, particle2){
        
        let xyDifference = SUB(particle1.position,particle2.position);

        let distanceBetween = xyDifference.length();

        let unitVector = xyDifference.getNormalize();

        let forceMagnitude = (6.6743e-11*(particle1.mass)*(particle2.mass))/(distanceBetween*distanceBetween);

        let forceVector = SCALE(unitVector,forceMagnitude);

        let collisionDistance = particle1.size + particle2.size;

        //let collistionconst = .1

        if(distanceBetween <= collisionDistance){
            forceVector = ADD(SCALE(unitVector,-1 * Math.min(particle1.compressibility,particle2.compressibility) * (collisionDistance - distanceBetween)),forceVector);
        }
        
        particle1.force_calcs.x -= forceVector.x;
        particle1.force_calcs.y -= forceVector.y;
        particle2.force_calcs.x += forceVector.x;
        particle2.force_calcs.y += forceVector.y;


    }

    
}