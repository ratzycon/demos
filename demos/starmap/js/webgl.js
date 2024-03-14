console.log("including: webgl.js")

var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, logarithmicDepthBuffer: THREE.logDepthBuf});//, logarithmicDepthBuffer: logDepthBuf
//var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

renderer.setSize(window.innerWidth, window.innerHeight);

var webgl = document.getElementById("webgl_surface");
webgl.appendChild(renderer.domElement);

renderer.setClearColor("black", 0.0);

var oculusEffect;
var oculusRiftEnabled = false;

var fov = 50;
var width = renderer.domElement.width;
var height = renderer.domElement.height;
var aspect = width / height; 
var near = 1e-5;// 0.1; 1e-6
var far = 1e27;//10000; 1e27

var near = 0.01;
//var far =  1e5;

var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

var scene = new THREE.Scene();
scene.add(camera);

// postprocessing
var postProcessEnabled = true;
setupPostProcessing(renderer, scene, camera);

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.bottom = '0px';

document.body.appendChild( stats.domElement );

var clock = new THREE.Clock(true);
clock.start();

var gameObjects = [];

if(oculusRiftEnabled)
  oculusRift();

function animate() {
  window.requestAnimationFrame(animate, renderer.domElement);

  stats.begin();

  clock.getDelta();
  
  update(clock);
  render(clock);
  
  stats.end();
};

animate();

function update(gametime){

  TWEEN.update(); 

  for(var g in gameObjects)
    if(gameObjects[g].hasOwnProperty('update')){

      gameObjects[g].update(gametime);
      //console.log(g);
    }

  for(var g in gameObjects)
    if(gameObjects[g].hasOwnProperty('lateUpdate'))
      gameObjects[g].lateUpdate(gametime);
}


function render(gametime){
  renderer.clear();
 
 if(postProcessEnabled)
    composer.render(gametime.getDelta());
  else if(oculusRiftEnabled)
    oculusEffect.render(scene, camera);
  else renderer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  width = renderer.domElement.width;
  height = renderer.domElement.height;
  aspect = width / height; 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  if(postProcessEnabled)
    composer.reset();
  if(oculusRiftEnabled)
  {
    oculusEffect.setSize( window.innerWidth, window.innerHeight );
    console.log("oculus resize");
  }
  else renderer.setSize( window.innerWidth, window.innerHeight );
}

function oculusRift(){
  // Here is the effect for the Oculus Rift
  // worldScale 100 means that 100 Units == 1m
  oculusEffect = new THREE.OculusRiftEffect( renderer, {worldScale: 100000} );
  oculusEffect.setSize( window.innerWidth, window.innerHeight );
}



