createParticle = function(bacteria){

    let particle = new Object();
    particle.vertices = [bacteria.center[0], bacteria.center[1],
                            bacteria.rColor, bacteria.gColor, bacteria.bColor];
    let xSign = Math.round(Math.random()) > 0.5 ? 1 : -1;
    let ySign = Math.round(Math.random()) > 0.5 ? 1 : -1;
    particle.velocityX = xSign*(Math.random() * (0.005-0.001) + 0.001);
    particle.velocityY = ySign*(Math.random() * (0.005-0.001) + 0.001);
    particle.life = 500;

    return(particle);
}

moveParticle = function(particle){
    particle.life--;
    let newPosX = particle.vertices[0]+particle.velocityX;
    let newPosY = particle.vertices[1]+particle.velocityY;
    let rColor = particle.vertices[2];
    let gColor = particle.vertices[3];
    let bColor = particle.vertices[4];
    if(newPosX > 1 || newPosX < -1){
        particle.velocityX = -particle.velocityX;
    }
    if(newPosY > 1 || newPosY < -1){
        particle.velocityY = -particle.velocityY;
    }


    particle.vertices = [particle.vertices[0]+particle.velocityX, 
                        particle.vertices[1]+particle.velocityY,
                        rColor, gColor, bColor];
    return(particle);
}