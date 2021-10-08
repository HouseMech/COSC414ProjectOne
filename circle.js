createCircle = function(){
    var vertices = []
    var radius = 0.5
    vertices.push(0,0,0,0,0);
    for (let i = 0; i < 361; i++) {
        var el = i*Math.PI/180;
        vertices.push(radius*Math.sin(el), radius*Math.cos(el),0,0,0);
    }
    return vertices;
}