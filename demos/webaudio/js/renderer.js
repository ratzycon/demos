

var renderer = new THREE.WebGLRenderer();

var cfg = {
	height : window.innerHeight,
	width : window.innnerWidth,
	fov: 70,
	aspect: cfg.height/cfg.width,


};

var camera = new THREE.PerspectiveCamera()

window.onresize = function(){

}

function loop(){
	window.requestAnimationFrame(loop);
	update();
	render();
}

function render(){

}

function update(){

}