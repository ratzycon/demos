
var target;
var boidmesh;
var boidlines;

function setup(){
    
    renderer.setClearColor('white', 1);
    renderer.autoClear = true;
    
    target = createTarget();
    boidmesh = createBoids(13, 10, target);
    scene.add(boidmesh);
    
    boidlines = createBoidLines(boidmesh, target);
    scene.add(boidlines);
    
   // randomBoidTarget();
    
    var box = createBox();
    
    box.update = function(){
        box.rotation.x += .02;
        box.rotation.y += .02;
        box.rotation.z += .02;
    };
    
    //updates.push(box);
    //objects.push(box);
    
   // scene.add(box);
   
   // for(var i = 0; i<boids.length;i++){
   //   var sphere = createSphere(.1, 1, "blue");
   //   scene.add(sphere);
   //   sphere.position = boids[i].position;
   // }
   
    var l1 = new THREE.DirectionalLight('blue', 0.77);
    l1.position.set(1,1,1);
    l1.lookAt(scene.position);
    lights.push(l1);
    scene.add(l1);
    
    var l2 = new THREE.DirectionalLight('green', 0.77);
    l2.position.set(-1,-1,-1);
    l2.lookAt(scene.position);
    lights.push(l2);
    scene.add(l2);
    
    camera.position.set(0,5,5);
    camera.lookAt(box.position);
}

setup();

function createBox(){
    var geo = new THREE.BoxGeometry(2,2,2);
    var mat = new THREE.MeshLambertMaterial({color:'white', wireframe:true});
    return mesh = new THREE.Mesh(geo, mat);
}


function randomBoidTarget(){
    for(var b=0;b<boids.length;b++){
        boids[b].target = boids[getRandomInt(0, boids.length-1)].position;
    }
}

var mouse = {x:0, y:0, dX:0, dY:0, worldPos:new THREE.Vector3(0,0,0)};

window.onmousemove = function(e){
    
    mouse.dx = mouse.x - e.x;
    mouse.dy = mouse.y - e.y;
    mouse.x = e.x;
    mouse.y = e.y;
    
    mouse.worldPos = mouseToWorld(e, camera);
}

window.onclick = function(){
    console.log("click");
    //_cloud, _target, _spread, num, _lines
    //addBoids(boidmesh, target, 10, 1, boidlines );
}

function createTarget() {
    var t = new THREE.Vector3(0,0,0);
    t.update = function(){
        
        t.x = mouse.worldPos.x;
        t.y = mouse.worldPos.y;
        t.z = mouse.worldPos.z;
    }
    
    updates.push(t);
    
    return t;
}

var projector = new THREE.Projector();

function mouseToWorld( _mouse, _camera){
    
    var vector = new THREE.Vector3(
    ( _mouse.clientX / window.innerWidth ) * 2 - 1,
    - ( _mouse.clientY / window.innerHeight ) * 2 + 1,
    0.5 );

    projector.unprojectVector( vector, _camera );

    var dir = vector.sub( _camera.position ).normalize();
    var distance = - _camera.position.z / dir.z;

    return _camera.position.clone().add( dir.multiplyScalar( distance ) );
}

var boidupdater = {
    update: function(){
        updateBoids();  
        boidmesh.geometry.verticesNeedUpdate=true;
        boidlines.geometry.verticesNeedUpdate=true;
    }
}

updates.push(boidupdater);


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}