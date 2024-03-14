
var shaderSrc = {
	programs:{},
	vs:{
		basic:
		"
			attribute vec4 aPosition;
			void main() {
				gl_position = aPosition;
				gl_PointSize = 10.0;
			}
		"
	},
	fs:{
		basic:
		"
			precision mediump float;
			uniform vec4 uFragColor;
			void main(){
				gl_FragColor = uFragColor;
			}
		"
	}
}

var vs = compile(gl, gl.VERTEX_SHADER, shaderSrc.vs.basic);
var fs = compile(gl, gl.FRAGMENT_SHADER, shaderSrc.fs.basic);
var pg = link(gl, vs, fs);

gl.useProgram(pg);

var aPosition = gl.getAttribLocation(program, 'aPosition');
var uFragColor = gl.getUniformLocation(program, 'uFragColor');

gl.vertexAttrib2f(aPosition, 0.0, 0.0); // 2f = 2 floats
gl.uniform4f(uFragColor, 1.0, 0.0, 0.0, 1.0);

gl.drawArrays(gl.POINTS, 0, 1); // first vert, count

function compile(gl, type, shaderSrc){

	var shader = gl.createShader(type);
	gl.shaderSource(shader, shaderSrc);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		throw new Error(gl.getShaderInfoLog(shader));
	}

	return shader;
}

function link(gl, vertexShader, fragmentShader){
	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	if(!gl.getProgramParameters(program, gl.LINK_STATUS)){
		throw new Error(gl.getProgramInfoLog(program));
	}
	return program;

}