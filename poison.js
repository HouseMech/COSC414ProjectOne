// Variable used in score/ win calculation
var fullyGrown = false;

var maxRadius = 0.2;

createPoison = function(x, y) {
    let poison = new Object();
    rngGrowthRate = Math.random()*0.002;
    var circleRadius = 0.5;
    let ran = Math.floor(Math.random()*360);
    let temp = ran*Math.PI/180;
    let rColor = 1;
    let gColor = 0;
    let bColor = 0;
    var vertices = [];
    var center = [x,
        y];
    vertices.push(x,
                        y,
                        rColor,
                        gColor,
                        bColor);

    //console.log(vertices);
    var startRadius = 0.05;
    for (let i = 0; i < 360; i+=1.5){ //1.6
        var el = i*Math.PI/180;
        vertices.push(center[0]+startRadius*Math.sin(el), center[1]+ startRadius*Math.cos(el),rColor,gColor,bColor)
    }
    poison.vertices = vertices;
    poison.center = center;
    poison.radius = startRadius;
    poison.rColor = rColor;
    poison.gColor = gColor;
    poison.bColor = bColor;

    return poison;
}

increasePoisonSize = function(poison){
    
    if(poison.radius >= maxRadius){
        return poison;
    }
    poison.radius = poison.radius + 0.0006 ;
    for (let i = 0; i < poison.vertices.length; i += 10){
        var el = i*Math.PI/180;
        var pos = i;
        poison.vertices[pos++] = poison.center[0]+poison.radius*Math.sin(el);
        poison.vertices[pos++] = poison.center[1]+ poison.radius*Math.cos(el);
    }
    return poison;
}

poisonEffect = function(poison,bacteriaArray){
    for (let i = bacteriaArray.length -1; i >= 0; i--) {
        
        let disX = poison.vertices[0] - bacteriaArray[i].vertices[0];
        let disY = poison.vertices[1] - bacteriaArray[i].vertices[1];
        let dis = Math.sqrt(disX*disX + disY*disY) - (poison.radius + bacteriaArray[i].radius);
        
        if(dis <=0){
            for (let k = 0; k < 12; k++) {
                particleArray.push(createParticle(bacteriaArray[i]));
            }
            bacteriaArray.splice(i,1);
            updatePlayerScore(10);
            bacteriaPopped();
            break; 
        }
        }
    
}