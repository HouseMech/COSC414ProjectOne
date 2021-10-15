// Variable used in score/ win calculation
var fullyGrown = false;

var maxRadius = 0.2;
createBacteria = function() {
    let bacteria = new Object();
    let ran = Math.floor(Math.random()*360);

    var circleRadius = 0.5;
    let temp = ran*Math.PI/180;
    let rColor = Math.round(Math.random()*10)/10;
    let gColor = Math.round(Math.random()*10)/10;
    let bColor = Math.round(Math.random()*10)/10;
    var vertices = [];
    var center = [circleRadius*Math.sin(temp),
        circleRadius*Math.cos(temp)];
    vertices.push(circleRadius*Math.sin(temp),
                        circleRadius*Math.cos(temp),
                        rColor,
                        gColor,
                        bColor);

    //console.log(vertices);
    var startRadius = 0.05;
    for (let i = 0; i < 360; i++) {
        var el = i*Math.PI/180;
        vertices.push(center[0]+startRadius*Math.sin(el), center[1]+ startRadius*Math.cos(el),rColor,gColor,bColor)
    }
    bacteria.vertices = vertices;
    bacteria.center = center;
    bacteria.radius = startRadius;
    bacteria.rColor = rColor;
    bacteria.gColor = gColor;
    bacteria.bColor = bColor;

    return bacteria;
}

increaseBacteriaSize = function(bacteria){
    if(bacteria.radius >= maxRadius){
        return bacteria;
    }
    bacteria.radius = bacteria.radius + 0.0003;
    for (let i = 0; i < bacteria.vertices.length; i += 5) {
        var el = i*Math.PI/180;
        var pos = i;
        bacteria.vertices[pos++] = bacteria.center[0]+bacteria.radius*Math.sin(el);
        bacteria.vertices[pos++] = bacteria.center[1]+ bacteria.radius*Math.cos(el);
    }
    updateBacteriaScore(0.04); //amount updated per size increment
    return bacteria;
}
