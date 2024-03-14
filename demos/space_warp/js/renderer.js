
var webgl = document.getElementById("webgl");

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);

webgl.appendChild(renderer.domElement);

renderer.setClearColor(new THREE.Color(1,1,1), 0);
renderer.clear();

var near = .001, far = 10000, fov = 70, aspect = renderer.domElement.width/renderer.domElement.height;
var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
var scene = new THREE.Scene();
scene.add(camera);

window.addEventListener('resize', onResize, false)

function onResize(){
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = renderer.domElement.width/renderer.domElement.height;
	camera.updateProjectionMatrix();
	
}

var clock = new THREE.Clock(true);
clock.start();
var time, delta;

function animate()
{
	delta = clock.getDelta();
	time = clock.elapsedTime;

	update();
	render();
	window.requestAnimationFrame(animate, renderer.domElement);
}

animate();

function render(){
	renderer.clear();
	renderer.render(scene, camera);
}

var updateList = [];

function update(){

  TWEEN.update(); 

  for(var g in updateList)
    if(updateList[g].hasOwnProperty('update'))
      updateList[g].update(time, delta);
    
  for(var g in updateList)
    if(updateList[g].hasOwnProperty('lateUpdate'))
      updateList[g].lateUpdate(time, delta);
}