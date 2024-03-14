
//var webgl = document.getElementById("webgl");

var renderer = new THREE.WebGLRenderer();
//var renderer = new THREE.WebGLRenderer({canvas:webgl});

//var _width = webgl.width;
//var _height = webgl.height;
var _width = window.innerWidth;
var _height = window.innerHeight;
var _aspect = _width/_height;
var _fov = 70;
var _near = 0.1;
var _far = 10000;

renderer.setSize(_width, _height);

document.body.appendChild( renderer.domElement );

window.onresize = function(){
    
    //var _width = webgl.width;
    //var _height = webgl.height;
    _width = window.innerWidth;
    _height = window.innerHeight;

    _aspect = _width/_height;

    renderer.setSize(_width, _height);
    
    camera.aspect = _aspect
    camera.updateProjectionMatrix();
}

var camera = new THREE.PerspectiveCamera(_fov, _aspect, _near, _far);

var scene = new THREE.Scene();

var objects = [];
var updates = [];
var lights = [];

loop();

function loop(){
    
    requestAnimationFrame(loop);
    
    update();
    render();
}

var currentFrame = 0;

function render() {
    
    //document.getElementById("framecount").innerHTML = currentFrame++;
    renderer.render( scene, camera );
}

function update(){
    for(var i = 0; i<updates.length;i++){
        updates[i].update();
    }
}
