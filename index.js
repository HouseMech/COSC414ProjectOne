var vertexShaderText = [
	'precision mediump float;',
	
	'attribute vec2 vertPosition;',
	'attribute vec3 vertColor;',
	
	'varying vec3 fragColor;',
	
	'void main()',
	'{',
	'	fragColor = vertColor;',
	'	gl_Position = vec4(vertPosition,0.0,1.0);',
	'}'
	].join('\n');
	
var fragmentShaderText =
	[
	'precision mediump float;',
	
	'varying vec3 fragColor;',
	
	'void main()',
	'{',
		
	'	gl_FragColor = vec4(fragColor,1.0);',
	'}',
	].join('\n')

var InitDemo = function() {
	
    console.log('this is working');

    var canvas = document.getElementById('game-surface');
	var gl = canvas.getContext('webgl');

    if (!gl){
		console.log('webgl not supported, falling back on experimental-webgl');
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl){
		alert('your browser does not support webgl');
	}

    canvas.width = 800;
	canvas.height = 800;
	gl.viewport(0,0,canvas.width,canvas.height);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader,vertexShaderText);
	gl.shaderSource(fragmentShader,fragmentShaderText);

    gl.compileShader(vertexShader);
	if(!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
		console.error('Error compiling vertex shader!', gl.getShaderInfoLog(vertexShader))
		return;
	}
	gl.compileShader(fragmentShader);
		if(!gl.getShaderParameter(fragmentShader,gl.COMPILE_STATUS)){
		console.error('Error compiling vertex shader!', gl.getShaderInfoLog(fragmentShader))
		return;
	}

    var program = gl.createProgram();
	gl.attachShader(program,vertexShader);
	gl.attachShader(program,fragmentShader);

	gl.linkProgram(program);
	if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
		console.error('Error linking program!', gl.getProgramInfo(program));
		return;
	}

	var bacteriaArray = [];

	var numOfBacteria = 5

	for (let i = 0; i < numOfBacteria; i++) {
		bacteriaArray.push(createBacteria()) ;
		renderToCanvas(gl, program, bacteriaArray[i].vertices)

		gl.drawArrays(gl.TRIANGLE_FAN,0,bacteriaArray[i].vertices.length/5);
	}
	var circleVerts = createCircle();
	
	var loop = function(){
		
		renderToCanvas(gl, program, circleVerts);

		gl.drawArrays(gl.TRIANGLE_FAN,0,circleVerts.length/5);

		for (let i = 0; i < bacteriaArray.length; i++) {
			bacteriaArray[i] = increaseBacteriaSize(bacteriaArray[i])
		}

		for (let i = 0; i < bacteriaArray.length; i++) {
			renderToCanvas(gl, program, bacteriaArray[i].vertices)

			gl.drawArrays(gl.TRIANGLE_FAN,0,bacteriaArray[i].vertices.length/5);
		}

		//call loop function whenever a frame is ready for drawing, usually it is 60fps.
		//Also, if the tab is not focused loop function will not be called
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
}