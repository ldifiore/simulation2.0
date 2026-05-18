class gravityInit{

    static gravityInit(){

    
        Sim.particles.push(new Particle('custom',new Vector2(0,0),new Vector2(0,0),Math.PI * .01 * .01 ,0,.01,`rgb(255, 255, 153)`));


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
                Sim.particles.push(new Particle('custom',new Vector2(x,y),new Vector2((y*y*y)*-10e-8 ,(x*x*x)*10e-8),mass,0,size,`rgb(28, 89, 98)`));
            }


    }
}