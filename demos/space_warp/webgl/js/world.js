var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });//logarithmicDepthBuffer: logDepthBuf }
//var renderer = new THREE.CanvasRenderer({antialias: false});

renderer.setSize(window.innerWidth, window.innerHeight);

var webgl = document.getElementById("webgl_surface");
webgl.appendChild(renderer.domElement);


renderer.setClearColor(0x000000, 0);
//renderer.setClearColor("black", 0.0);
renderer.shadowCameraFov = 50;
renderer.shadowMapEnabled = false;
renderer.shadowMapWidth = 1024;;
renderer.shadowMapHeight = 1024;

var fov = 50;
var width = renderer.domElement.width;
var height = renderer.domElement.height;
var aspect = width / height; 
var near = 0.1; 
var far = 10000; 
var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

var scene = new THREE.Scene();

var controls = null;

//scene.fog = new THREE.Fog("black", 1, 100);

/*renderer.domElement.style.width = window.innerWidth +"px";
renderer.domElement.style.height = window.innerHeight +"px";*/


var projector = new THREE.Projector();
var objects = [];

var mouse = new THREE.Vector2(), INTERSECTED, SELECTED;

var selectColor = "lime", intersectColor =  "lime";


var system = new THREE.Object3D();

// stars
var particleCount = 128,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({color:"blue", size:0.4});

for(var p = 0; p<particleCount; p++) {

  var px = (Math.random()-0.5) ,
      py = (Math.random()-0.5) ,
      pz = (Math.random()-0.5) ,
      pv = new THREE.Vector3(px, py, pz).normalize().multiplyScalar(Math.random()*100);//.multiply(new THREE.Vector3(1,1,1));

  particles.vertices.push(pv);
}

var particleSystem = new THREE.ParticleSystem(particles, pMaterial);

//system.add(particleSystem);
scene.add(particleSystem);

var planet = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 1),
    new THREE.MeshBasicMaterial({wireframe:true, color:"green", side:THREE.FrontSide})
    //new THREE.ParticleBasicMaterial({color:"green", size:0.01})
);
objects.push(planet);
//system.add(planet);
scene.add(planet);


function grid(size, step){

  var geo = new THREE.Geometry();
  //var mat = new THREE.LineBasicMaterial({color:"green"});
  var mat = new THREE.LineDashedMaterial( { color: "green", dashSize: 3.3, gapSize: 13.3} );

  for(var i = -size; i <= size; i += step){
    geo.vertices.push(new THREE.Vector3(-size, 0, i));
    geo.vertices.push(new THREE.Vector3(size, 0, i));

    geo.vertices.push(new THREE.Vector3(i , 0 , -size));
    geo.vertices.push(new THREE.Vector3(i , 0 , size));
  }
  geo.computeLineDistances();
  return new THREE.Line(geo, mat, THREE.LinePieces);
}

//var grid1 = grid(128, 8);
//scene.add(grid1);

function hexgrid(hexSize, size){

  var radius = size;

  var posx = 0;
  var posy = 0;

  var a = 2 * Math.PI / 6;

  var geo = new THREE.Geometry();


  for (var y = -radius; y <= radius; y++)
  {
      posy = y * hexSize;
      posx += Math.sqrt(3/4) * hexSize;


      for (var x = -radius; x <= radius; x++)
      {
          var h = -(x + y);

          if (h >= -radius && h <= radius)
          {
            for(var i = 0; i<6;i++)
            {
              var angle = a * (i + 0.5);
              var x_i = posx + hexSize * Math.cos(angle);
              var y_i = posy + hexSize * Math.sin(angle);

              geo.vertices.push(new THREE.Vector3(x_i, y_i,0));
              geo.colors.push(new THREE.Color("green"));
            }
          }
          posy += 2* hexSize;
      }
  }
  //var mat = new THREE.LineDashedMaterial( { color: "green", dashSize: 0.1, gapSize: 0.1} );
  var mat = new THREE.LineBasicMaterial({color:"green"});
  
  geo.computeLineDistances();
  return new THREE.Line(geo, mat, THREE.LinePieces);
  //return new THREE.Line(geo, mat);
 
}

//var hexes = hexgrid(4, 1);
//scene.add(hexes);

function hexgrid2(hexSize, radius){

  var posx = 0;
  var posy = 0;

  var a = 2 * Math.PI / 6;

  var geo = new THREE.Geometry();
  var mat = new THREE.MeshBasicMaterial({color:"blue", wireframe:true});
  //var mesh = new THREE.Mesh(geo, mat);
  //var mesh = new THREE.Line(geo, mat);

  var height = Math.sqrt(3/4)* hexSize;

var i = 0;
  for (var x = -radius; x <= radius; x++)
  {
    posx += 1.5 * hexSize;
    posy = x * height;

    for (var y = -radius; y <= radius; y++)
    {
        var h = -(x + y);
        if (h >= -radius && h <= radius) 
        {
          for(var i = 0; i<2;i++) // ERROR!!!
          {
            var hexgeo = new THREE.CircleGeometry(hexSize, 6);
            hexgeo.vertices.shift();
            var hexmesh = new THREE.Mesh(hexgeo);
            hexmesh.position.x = posx;
            hexmesh.position.y = posy;
            hexmesh.updateMatrix();
            geo.merge(hexmesh.geometry, hexmesh.matrix);
          }
        }
      posy += 2 * height;
    }
  }
  //var mat = new THREE.MeshBasicMaterial({color:"green", wireframe:true});
  geo.computeLineDistances();
  //geo.mergeVertices();
  //return mesh;
  
  return new THREE.Line(geo, new THREE.LineBasicMaterial({color:"blue"}), THREE.LinePieces);
}

var hxgrid2 = hexgrid2(5, 15);
scene.add(hxgrid2);


function hex(size, center){

  var geo = new THREE.Geometry();
  var mat = new THREE.LineBasicMaterial({color:"blue"});
  //var a = 2 * Math.PI / 6;
  
  for(var i = 0; i<6;i++){

    var angle = 2 * Math.PI / 6 * i;
    var x_i = center.x + size * Math.cos(angle);
    var y_i = center.y + size * Math.sin(angle);

    geo.vertices.push(new THREE.Vector3(x_i, y_i,0));
    geo.colors.push(new THREE.Color("blue"));
  }
  var geo = new THREE.CircleGeometry(size, 6);
  //geo.vertices.shift();
  geo.computeLineDistances();
 // return new THREE.Line(geo, mat, THREE.LinePieces);
  return new THREE.Mesh(geo, mat);
}

//var h = hex(8, {x:0,y:0});
//scene.add(h);

function ngon(sides, radius){

  var geo = new THREE.CircleGeometry(radius, sides);
  var mat = new THREE.LineBasicMaterial({color:"blue"});
  
  geo.vertices.shift();
  geo.computeLineDistances();
 // return new THREE.Line(geo, mat, THREE.LinePieces);
  return new THREE.Line(geo, mat);
}

//var hex2 = ngon(6, 13);
//scene.add(hex2);

function dotgrid(cellsize, radius){

  var posx = cellsize * -radius;
  var posy = cellsize * -radius;
  var height = cellsize * Math.sqrt(3/4);
  
  var geo = new THREE.Geometry();

  var i=0;
  for (var y = -radius; y <= radius; y++)
  {
      
      posy = y * height;

      for (var x = -radius; x <= radius; x++)
      {
          var h = -(x + y);
          posx = x * cellsize + cellsize/2 * i -radius*cellsize/2;
          
          if (h >= -radius && h <= radius)
              geo.vertices.push(new THREE.Vector3(posx, posy,0));
          
          //posx += cellsize;
      }
      //posy += height;
      //posx = cellsize * -radius + i*cellsize/2;
      i++;
  }

  var mat = new THREE.ParticleBasicMaterial({color:"green", size:0.4});
  return new THREE.ParticleSystem(geo, mat);
}

//var dots = dotgrid(8, 19);
//scene.add(dots);


function quadgrid(celsize, gridsize, centered){

  var geo = new THREE.Geometry();

  var center = 0;
  if(centered)
    var center = -celsize * (gridsize+1)/2 +celsize/2;

  geo.lineDistances = [];

  //var color1 = new THREE.Color("blue"), color2 = new THREE.Color("transparent");
  var color1 = new THREE.Color("transparent"), color2 = new THREE.Color("blue");
    
  for(var y=0; y<=gridsize; y++)
    for(var x=0; x<gridsize; x++)
    {
      geo.vertices.push(new THREE.Vector3(center + x*celsize, center +  y*celsize));
      geo.vertices.push(new THREE.Vector3(center + (x+.5)*celsize, center + y*celsize));
      geo.vertices.push(new THREE.Vector3(center + (x+.5)*celsize, center + y*celsize));
      geo.vertices.push(new THREE.Vector3(center + (x+1)*celsize, center + y*celsize));

      geo.colors.push(color2);
      geo.colors.push(color1);
      geo.colors.push(color1);
      geo.colors.push(color2);

      geo.lineDistances.push(0);
      geo.lineDistances.push(1);
      geo.lineDistances.push(1);
      geo.lineDistances.push(0);

    }
  
  for(var x=0; x<=gridsize; x++)
    for(var y=0; y<gridsize; y++)
    {
      geo.vertices.push(new THREE.Vector3(center + x*celsize, center + y*celsize));
      geo.vertices.push(new THREE.Vector3(center + x*celsize, center + (y+.5)*celsize));
      geo.vertices.push(new THREE.Vector3(center + x*celsize, center + (y+.5)*celsize));
      geo.vertices.push(new THREE.Vector3(center + x*celsize, center + (y+1)*celsize));

      geo.colors.push(color2);
      geo.colors.push(color1);
      geo.colors.push(color1);
      geo.colors.push(color2);

      geo.lineDistances.push(0);
      geo.lineDistances.push(1);
      geo.lineDistances.push(1);
      geo.lineDistances.push(0);
    }
  
  var mat = new THREE.LineBasicMaterial({color:"white",vertexColors: true, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending});
  return new THREE.Line(geo, mat, THREE.LinePieces);
}

var qgrid = quadgrid(8, 65, true);
scene.add(qgrid);

camera.rotation.x = 0.7;
var cameraFocus = new THREE.Object3D(),
    cameraTrack = new THREE.Object3D();

cameraTrack.position.set( 0, -33, 33 );
cameraFocus.add(cameraTrack);


/*var map = THREE.ImageUtils.loadTexture( "img/sprite.png" );
var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
var sprite = new THREE.Sprite( material );
sprite.scale.set(5,8,5);
sprite.position.z +=2;*/
//cameraFocus.add( sprite );

//cameraTrack.rotation.x = 0.7;
scene.add(cameraFocus);


renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

//camera.position.set( 100, 100, 100 );
//var pos_end = {x:0, y:10, z:0};
//var tween = new TWEEN.Tween(pos).to(pos_end, 4000);
/*var tween = new TWEEN.Tween(camera.position)
  .to(pos_end, 4000)
  //.easing(TWEEN.Easing.Quintic.InOut)
  .easing(TWEEN.Easing.Quartic.Out)
  //.repeat(Infinity)
  //.yoyo(true)
  ;*/


//tween.start();

/*tween.onUpdate(function(){
    camera.position.x = pos.x;
    camera.position.y = pos.y;
    camera.position.z = pos.z;

});*/

/*tween.onComplete(function(){
  console.log("ready");
});*/

function playerModel(){

  //var geo = new THREE.TetrahedronGeometry(3, 0);
  var mat = new THREE.MeshBasicMaterial({color:"white", vertexColors:true, wireframe:true});
  var mat = new THREE.LineBasicMaterial({color:"white", vertexColors:true, wireframe:true});

  var geo = new THREE.Geometry();
 
  geo.vertices.push(new THREE.Vector3(0,3,0));
  geo.vertices.push(new THREE.Vector3(-3,-3,0));
  geo.vertices.push(new THREE.Vector3(3,-3,0));
  geo.vertices.push(new THREE.Vector3(0,3,0));

  geo.colors.push(new THREE.Color("lime"));
  geo.colors.push(new THREE.Color("red"));
  geo.colors.push(new THREE.Color("red"));
  geo.colors.push(new THREE.Color("lime"));
    
  geo.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geo.computeFaceNormals();
    
  return new THREE.Line( geo, mat );
}
var pModel = playerModel();
cameraFocus.add(pModel);

// postprocessing
setupPostProcessing(renderer, scene, camera);


var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.bottom = '0px';

document.body.appendChild( stats.domElement );

var clock = new THREE.Clock(true);

var mouse_v = new THREE.Vector3(0,0,0);

var animating = false;

function animate() {

  stats.begin();

  var delta = clock.getDelta();
  window.requestAnimationFrame(animate, renderer.domElement);
  
  update(clock);

  render(clock);
  
  stats.end();
};

animate();

function update(gametime){

  //cameraFocus.translateZ(Math.sin(gametime.elapsedTime)*0.003);
  pModel.translateZ(Math.sin(gametime.elapsedTime)*0.003);
  planet.translateZ(Math.sin(gametime.elapsedTime)*0.003);

  planet.rotation.z += 0.001;

 // controls.update(gametime.getDelta());
  TWEEN.update();
  updateCamera(gametime.getDelta());
}


function render(gametime){
  renderer.clear();
 // renderer.render(scene, camera);
  composer.render(gametime.getDelta());
}

  
 
function updateCamera(delta){
 
  var scale = 100;


  //cameraFocus.translateX(mouse_v.x * delta * scale);
  //cameraFocus.translateY(mouse_v.y * delta * scale);

  camera.position = cameraTrack.localToWorld(new THREE.Vector3());
  mouse_v.multiplyScalar(0.97);
}

var tilewidth = 8;
var player = {

    node: cameraFocus,
    tilepos:{x:0,y:0},
    
    moveLeft:function()
    {
      pModel.rotation.z = Math.radians(90);
      this.tileMove({x:this.tilepos.x-1, y:this.tilepos.y});
      this.tilepos.x--;
    },
    moveRight:function(){
      pModel.rotation.z = Math.radians(270);
      this.tileMove({x:this.tilepos.x+1, y:this.tilepos.y});
      this.tilepos.x++;
    },
    moveUp:function(){
      pModel.rotation.z = Math.radians(0);
      this.tileMove({x:this.tilepos.x, y:this.tilepos.y+1});
      this.tilepos.y++
    },
    moveDown:function(){
      pModel.rotation.z = Math.radians(180);
      this.tileMove({x:this.tilepos.x, y:this.tilepos.y-1});
      this.tilepos.y--;
    },
    moveNW:function(){
      pModel.rotation.z = Math.radians(45);
      this.tileMove({x:this.tilepos.x-1, y:this.tilepos.y+1});
      this.tilepos.y++; this.tilepos.x--;
    },
    moveNE:function(){
      pModel.rotation.z = Math.radians(315);
      this.tileMove({x:this.tilepos.x+1, y:this.tilepos.y+1});
      this.tilepos.y++; this.tilepos.x++;
    },
    moveSE:function(){
      pModel.rotation.z = Math.radians(225);
      this.tileMove({x:this.tilepos.x+1, y:this.tilepos.y-1});
      this.tilepos.y--; this.tilepos.x++;
    },
    moveSW:function(){
      pModel.rotation.z = Math.radians(125);
      this.tileMove({x:this.tilepos.x-1, y:this.tilepos.y-1});
      this.tilepos.y--; this.tilepos.x--;
    },

    tileMove:function(tpos){
      animating = true;
      moveUnit(
        this.node, 
        {x:tpos.x * tilewidth, y:tpos.y * tilewidth, z:this.node.position.z},
        222,
        function(){
          animating=false;
          //console.log("move complete");
        }
        );
    }
};

function moveUnit(node, targetpos, duration, callb){
  
  var tween = new TWEEN.Tween(node.position)
        .to(targetpos, duration)
        //.easing(TWEEN.Easing.Quartic.InOut)
        ;
  tween.onComplete(function(){callb();});
  //tween.onUpdate(function(){console.log("moving");});
  tween.start();
}

var keyActions = {};
var keymapping = {'100':'moveleft', '104':'moveup', '102':'moveright', '98':'movedown'};

for(var k in keymapping){
  keyActions[keymapping[k]]=false;
}

window.addEventListener('keyup', function(event) {
  var kc = event.keyCode.toString();
  if(keymapping.hasOwnProperty(kc)){
    keyActions[keymapping[kc]] = false;
  }

}, false);

window.addEventListener('keydown', function(event) {

  var kc = event.keyCode.toString();
  if(keymapping.hasOwnProperty(kc)){
    keyActions[keymapping[kc]] = true;
  }

  //speed = keyActions.moveup ? 20:0

  if(animating)
    return;

  switch (event.keyCode) {
    case 100: // Left
      player.moveLeft();
    break;

    case 104: // Up
      player.moveUp();
    break;

    case 102: // Right
      player.moveRight();
    break;

    case 98: // Down
      player.moveDown();
    break;

    case 103: // NW
      player.moveNW();
    break;

    case 105: // NE
      player.moveNE();
    break;

    case 99: // SE
      player.moveSE();
    break;

    case 97: // SW
      player.moveSW();
    break;


    case 79: // O
      dissolveVertexes();
    break;

  }



}, false);

function dissolveVertexes(){
      
  scene.updateMatrixWorld();
  planet.updateMatrixWorld();
  var geo = new THREE.Geometry();

  for(var i = 0; i<planet.geometry.vertices.length;i++)
    {
      geo.vertices.push(planet.matrixWorld.multiplyVector3(planet.geometry.vertices[i].clone()));
    
    }

  scene.add(
    new THREE.ParticleSystem(
        geo,
        new THREE.ParticleBasicMaterial({color:"lime"})
      )
    );

  setTimeout(function(){
    dissolveVertexes();
  }, 300);

};

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

 // console.log("resizing");
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  composer.reset();
  //controls.handleResize();
}

var mouse_pressed = false;
function onDocumentMouseDown( event ) {

  mouse_pressed = true;

  event.preventDefault();

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  projector.unprojectVector( vector, camera );

  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize() );
  var intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) { SELECTED = intersects[0].object; }
}

function onDocumentMouseUp( event ) {
  mouse_pressed = false;

  event.preventDefault();
  if (INTERSECTED) {SELECTED = null;}
}

var mdeltaX = 0, mdeltaY = 0, mlastX = 0, mlastY = 0;
function onDocumentMouseMove( event ) {

  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  mdeltaX = mlastX - mouse.x, mdeltaY = mlastY - mouse.y;

  if(mouse_pressed==true){

      mouse_v.x += mdeltaX, mouse_v.y += mdeltaY;
  }

  //console.log(mouse_v);

  mlastX = mouse.x, mlastY = mouse.y;

  var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
  projector.unprojectVector( vector, camera );

  var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  var intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.color.setStyle( INTERSECTED.currentColor );

      INTERSECTED = intersects[0].object;
      INTERSECTED.currentColor = INTERSECTED.material.color.getStyle();
      INTERSECTED.material.color.setStyle(intersectColor);
    }

  } else {

    if (INTERSECTED) INTERSECTED.material.color.setStyle( INTERSECTED.currentColor );

    INTERSECTED = null;
  }
}



function onMouseWheel(ev) {
  var amount = -ev.wheelDeltaY || ev.detail;
  var dir = amount / Math.abs(amount);
  zoomspeed = dir/10;

  // Slow down default zoom speed after user starts zooming, to give them more control
  minzoomspeed = 0.001;
}


function updateZoom(){
// Put some limits on zooming
  var minzoom = 0.01;// labeldata[0].size * labeldata[0].scale*1;
  var maxzoom = 100000000000000;//labeldata[labeldata.length-1].size * labeldata[labeldata.length-1].scale * 100;
  var damping = (Math.abs(zoomspeed) > minzoomspeed ? .95 : 1.0);

  // Zoom out faster the further out you go
  var zoom = THREE.Math.clamp(Math.pow(Math.E, zoompos), minzoom, maxzoom);
  zoompos = Math.log(zoom);

  // Slow down quickly at the zoom limits
  if ((zoom == minzoom && zoomspeed < 0) || (zoom == maxzoom && zoomspeed > 0)) {
    damping = .85;
  }

  zoompos += zoomspeed;
  zoomspeed *= damping;

  camera.position.x = Math.sin(.5 * Math.PI * (mouse[0] - .5)) * zoom;
  camera.position.y = Math.sin(.25 * Math.PI * (mouse[1] - .5)) * zoom;
  camera.position.z = Math.cos(.5 * Math.PI * (mouse[0] - .5)) * zoom;

  camera.lookAt(scene.position);

}


function setupControls(){
 // controls = new THREE.TrackballControls( camera );
  controls = new THREE.OrbitControls( camera );
  controls.target.set( 0, 0, 0 );

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = false;
  controls.dynamicDampingFactor = 0.15;

  controls.keys = [ 65, 83, 68 ];
}


function geo2line( geo ) {

    var geometry = new THREE.Geometry();
    var vertices = geometry.vertices;

    for ( i = 0; i < geo.faces.length; i++ ) {

        var face = geo.faces[ i ];

        if ( face instanceof THREE.Face3 ) {

                vertices.push( geo.vertices[ face.a ].clone() );
                vertices.push( geo.vertices[ face.b ].clone() );
                vertices.push( geo.vertices[ face.b ].clone() );
                vertices.push( geo.vertices[ face.c ].clone() );
                vertices.push( geo.vertices[ face.c ].clone() );
                vertices.push( geo.vertices[ face.a ].clone() );

        } else if ( face instanceof THREE.Face4 ) {

                vertices.push( geo.vertices[ face.a ].clone() );
                vertices.push( geo.vertices[ face.b ].clone() );
                vertices.push( geo.vertices[ face.b ].clone() );
                vertices.push( geo.vertices[ face.c ].clone() );
                vertices.push( geo.vertices[ face.c ].clone() );
                vertices.push( geo.vertices[ face.d ].clone() );
                vertices.push( geo.vertices[ face.d ].clone() );
                vertices.push( geo.vertices[ face.a ].clone() );

        }

    }

    geometry.computeLineDistances();

    return geometry;

}


Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

/*setInterval( function () {

    stats.begin();

    // your code goes here

    stats.end();

}, 1000 / 60 );
*/

/*var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(500, 500, 20, 20), 
  new THREE.MeshLambertMaterial({color: 0xffffff})
);
plane.receiveShadow = false;*/
//scene.add(plane);
/*var mats = [
  new THREE.MeshBasicMaterial({color:"green", shading: THREE.FlatShading}),
  new THREE.MeshBasicMaterial({wireframe:true, color:"lime", shading: THREE.FlatShading, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1})
];
var geo1 =  new THREE.IcosahedronGeometry(3, 3);
var sphere = THREE.SceneUtils.createMultiMaterialObject(geo1, mats);
*/


//var grid = scene.add( new THREE.GridHelper( 500, 100 ) );




// postprocessing

/*var renderModel = new THREE.RenderPass( scene, camera );
var effectFilm = new THREE.FilmPass( 0.35, 0.75, 2048, false );

effectFilm.renderToScreen = true;

composer = new THREE.EffectComposer( renderer );

composer.addPass( renderModel );
composer.addPass( effectFilm );*/

/*
var light = new THREE.SpotLight();   <script src='libs/three.js/THREEx.WindowResize.js'></script>
light.castShadow = true;
light.position.set( 500, 1000, 500 );
scene.add(light);

var light2 = new THREE.PointLight(0x0000CC);
light2.position.set(500,200,-500);
scene.add(light2);

var light3 = new THREE.PointLight(0xCC0000);
light3.position.set(-500,-200,500);
scene.add(light3);*/