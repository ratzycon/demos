
var webgl = document.getElementById("rendertarget");

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
//renderer.setSize( webgl.style.getPropertyValue("width"), webgl.style.getPropertyValue("height"));
//renderer.setSize( webgl.width, webgl.height);

webgl.appendChild(renderer.domElement);

renderer.setClearColor("black", 0);

var near = .01, far = 10000, fov = 70, aspect = renderer.domElement.width/renderer.domElement.height;

var camera = new THREE.Camera(fov, aspect, near, far);

var scene = new THREE.Scene();

window.addEventListener('resize', onResize, false)

function onResize(){

	camera.aspect = renderer.domElement.width/renderer.domElement.height;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.setSize( webgl.style.getPropertyValue("width"), webgl.style.getPropertyValue("height"));
	//renderer.setSize( webgl.width, webgl.height);
}

function animate()
{
	window.requestAnimationFrame(animate, renderer.domElement);
	renderer.clear();
}

animate();