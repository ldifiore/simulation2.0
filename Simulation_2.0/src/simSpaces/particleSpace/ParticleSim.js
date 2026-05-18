class ParticleSim {

// SIM CONFIG
    static Config(){
        switch(currentSimSubSpace){
            case "Gravity Collision":
                GravityCollision.Config();
            break;
            case "Rope":
                Rope.Config();
            break;
        }
    }

//  SYSTEM INTIAL CONDITIONS
    static Init(){

        ParticleSim.particles = [];

        switch(currentSimSubSpace){
            case "Gravity Collision":
                GravityCollision.Init();
            break;
            case "Rope":
                Rope.Init();
            break;
        }
    } 




//  UPDATE ParticleSimulation
    static Update(){

        let num_particles = ParticleSim.particles.length;

        for(let p = 0; p < num_particles; p++){
            ParticleSim.particles[p].PrepForCalcs();
        }
        


    // CALCULATIONS
        switch(currentSimSubSpace){
            case "Gravity Collision":
                GravityCollision.Calcs(num_particles);
            break;
            case "Rope":
                Rope.Calcs(num_particles);
            break;
        }
        



        for(let p = 0; p < num_particles; p++){
            ParticleSim.particles[p].ApplyCalcs();
        }


        for(let p = 0; p < num_particles; p++){
            ParticleSim.particles[p].Update(deltaTime);
        }
    }
    

//  DRAW ParticleSimULATION FRAME
    static Draw(){
        let num_particles = ParticleSim.particles.length;
        for(let p = 0; p < num_particles; p++){
            let particle = ParticleSim.particles[p];
            particle.Draw();
            
        }
        //console.log("draw")
    }
}




