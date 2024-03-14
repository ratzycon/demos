
var db;// = indexedDB

console.log("including: starmap.js")

var ui = document.getElementById("world_ui");

//var textures = {};

// light year in meters
var ly = 9.4605284e16;
//var ly = 1000;



var StarMap = 
{
	init: function(){

		console.log("starmap init");

		//scene.fog = new THREE.Fog(new THREE.Color(0,0,0.2), 4, 80);

		postProcessEnabled= false;
		//renderer.setClearColor(new THREE.Color(0.01,0.04,0.2), 1.0);
		renderer.setClearColor(new THREE.Color(0.04*Math.random()+0.01,0.08*Math.random()+0.02,0.4*Math.random()+0.04), 1.0);

		//oculusRiftEnabled = true;

		window.addEventListener('keydown', function(event) {

		  	switch (event.keyCode) {
		   	 case 65: // a
		   	 if(!hexes.animating)
		   	 	if(!hexes.visible)
		   	 	{
		   	 		hexes.animating = true;
		   	 		pclick();
		   	 		hexes.visible = true;
		   	 		var anim = {opacity:0};
		   	 		
			   	 	var hexanim = new TWEEN.Tween(anim)
			   	 	.to({opacity:.7}, 333)
			   	 	.easing(TWEEN.Easing.Quartic.In)
			   	 	//.easing(TWEEN.Easing.Exponential.In)
	        		;
	        		hexanim.onUpdate(function(){
	        			hexes.material.opacity = anim.opacity;
	        		});
				  	hexanim.onComplete(
				  		function(){
						hexes.animating = false;
				  	});

				  	hexanim.start();
				}
				else{
					hexes.animating = true;
					pclick();
					var anim = {opacity:.7};
			   	 	var hexanim = new TWEEN.Tween(anim)
			   	 	.to({opacity:0}, 777)
	        		.easing(TWEEN.Easing.Exponential.Out)
	        		;
	        		hexanim.onUpdate(function(){
	        			hexes.material.opacity = anim.opacity;
	        		});

				  	hexanim.onComplete(
				  		function(){
						hexes.visible = false;
						hexes.animating = false;
						//console.log("hexes fade out complete");
				  	});

				  	hexanim.start();
				}
		   	 			//newTestAction();
		    	break;
		  	}
		}, false);

		renderer.domElement.addEventListener( 'mousemove', this.starmapMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', this.starmapMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', this.starmapMouseUp, false );
		renderer.domElement.addEventListener( 'mousewheel', this.starmapMouseWheel, false);

		//document.getElementById('interface').remove();

	/*	var planeZ = new THREE.Plane(new THREE.Vector3(0,0,1), 0);
		scene.add(new line(new THREE.Vector3(0,0,0), planeZ.normal.multiplyScalar(10*ly), "red"));*/


		solarmap();
		createShips(7);
		// THREE.Gyroscope()
	},

	starmapMouseDown:function(event) {

	/*	var pick = mousePickZPlane();
	
		if(pick!==null)
		{
		  setbeacon(pick);
		}*/

	},

	 starmapMouseUp: function(event) {
	 // event.preventDefault();
	},

	starmapMouseWheel: function(event){
		cradius += mouse.wheelDir * cradius * .333;
		 //zoom += mouse.wheelDelta = 
		// camera_track.position.z += mouse.wheelDelta * 1*ly;
		 /*console.log("zoom");
		 console.log(camera.position.z);*/
	},


	starmapMouseMove:function(event) {
	 // event.preventDefault();
	},

	update: function(gametime){
		//console.log("update");
	}

}

function newTestAction(content){
	var actions = document.getElementById('actions');
	var a = document.createElement('li');
	
		a.className = "action";
		a.classList.add("collapse_y");
		a.classList.add("darkpanel");
		/*a.classList.add("action_minimal");*/
		a.innerHTML = content;
		actions.insertBefore(a,actions.childNodes[0]);
		/*actions.appendChild(a);*/
	
		/*a.classList.add("show");*/
		//console.log("new action");
		
		a.onclick = function(){
			/*this.classList.toggle('collapse_y');*/
			/*this.classList.toggle('expand');*/
		};

		setTimeout(function(){a.classList.remove("collapse_y"); pclick();//a.classList.add("expand");
			setTimeout(function(){;a.classList.add("action_minimal");//a.classList.remove("expand")
				setTimeout(function(){a.classList.add("collapse_y");//a.classList.add("fade");
			setTimeout(function(){actions.removeChild(a);},
			 3000);
		}, 7000);
		}, 17000);
	}, 10);
		
		
		


	/*var b = document.createElement('div');
	b.innerHTML = "close";
	a.appendChild(b);
	b.onclick = function(){

			a.classList.add("fade");
			setTimeout(function(){
				actions.removeChild(a);
			}, 1500);
	};*/
}

generateTextures();

var canvasPrograms = {};

canvasPrograms.atmos = function(context){
	var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
	gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
	gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
	gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
	gradient.addColorStop( 1, 'rgba(0,0,0,1)' );
	
	context.fillStyle = gradient;
	context.fillRect( 0, 0, canvas.width, canvas.height );
}

gameObjects.push(StarMap);


//------------------------------------------------------------------------
// ROOT
var nebula = {
	//97.85 to 114.16 light years
};
var supernova = {
	radius:{min:1, average:10, remnant:50000000}
};

var galaxy = {
	// dwarf, spiral , elliptical
	// dwarf galaxy - 200 ly diameter, 200M stars
	// eliptical - trilion stars
	// 1 billion ly away IC1101 - 6m ly diameter
	// molecular cloud(stellar nursery) dense gas region  distance from galaxy center: 11 - 24 ly diameter height: 150~240ly
	// planetary nebula - forms around a star before planets are formed

};


var cluster = {
	density:{min:0.13, max:13.7},
	galactic_position:{x:27000*ly, y:27000*ly}
};

var root = new THREE.Object3D();
root.position.set(0,0,0);
root.scale.set(1,1,1);
root.rotation.set(0,0,0);
scene.add(root);
//gameObjects.push(root);

/*root.update = function(gametime){
	root.rotation.z += 0.033 * gametime.getDelta();
}*/

/*var controls = StarMapControls(camera, root);
gameObjects.push(controls);*/

//------------------------------------------------------------------------

function deepspace () {
	var geo = new THREE.SphereGeometry(1000000*ly,16, 16);
	var mat = new THREE.MeshBasicMaterial({color:"blue", depthWrite:false,depthTest:false, map:textures.tinyGradient, side:THREE.BackSide, fog:false, wireframe:false, transparent:true, opacity:0.7, blending:THREE.AdditiveBlending});
	
	var mesh = new THREE.Mesh(geo, mat);
	mesh.rotation.x = 90 * Math.PI / 180;
	mesh.scale.set(1,.4,1);
	/*
	mesh.doubleSided = true;
	mesh.frustumCulled = false;
	mat.needsUpdate=true;*/
	//mesh.geometry.boundingSphere.radius = 1;
	//mesh.flipSided = true;
	mesh.up.set( 0, 0, 1 );
	mesh.needsUpdate = true;
	return mesh;
}

var space = deepspace();
root.add(space);

//------------------------------------------------------------------------

function stargrid(radius, rings, lines, color){

	var geo = new THREE.Geometry();

	// rings
 
  	var ringwidth = radius/rings;
  	for(var r = 1; r<=rings;r++){

  		for(var c=0;c<2;c++)
  		{
	  		var ring = new THREE.CircleGeometry(ringwidth*r, r*128);
	  		ring.vertices.shift();
	  		geo.merge(ring);
	  		/*var rmesh = new THREE.Mesh(ring);
	  		geo.merge(rmesh.geometry, rmesh.matrix);*/
	  		//rmesh.rotation.z = (360/rings)* r * Math.PI / 180;
			//rmesh.updateMatrix();
  		}
  	}

  	// lines

  	var a = (2 * Math.PI)/lines;

  	for(var l = 0; l<lines;l++){

  		var angle = a * l;

		for(var r = 1; r<rings;r++ )
		{
			geo.vertices.push(new THREE.Vector3(ringwidth * r * Math.cos(angle),ringwidth * r * Math.sin(angle),0));
			geo.vertices.push(new THREE.Vector3(ringwidth * (r+1) * Math.cos(angle),ringwidth * (r+1) * Math.sin(angle),0));
		}
    	
    	//geo.colors.push(new THREE.Color("blue"));
    	//geo.colors.push(new THREE.Color("blue"));
    	geo.lineDistances.push(0);
        geo.lineDistances.push(1);
  	}
  
  	geo.computeLineDistances();

  	return new THREE.Line(geo, new THREE.LineBasicMaterial({color:color, vertexColors:false, transparent: true, opacity:0.3, blending: THREE.AdditiveBlending}), THREE.LinePieces);
}	

function gridlines(radius, rings, lines, color){

	var geo = new THREE.Geometry();

	var ringwidth = radius/rings;

	var a = (2 * Math.PI)/lines;

  	for(var l = 0; l<lines;l++){

  		var angle = a * l;
    	//var x =  radius * Math.cos(angle);
    	//var y =  radius * Math.sin(angle);

		for(var r = 1; r<rings;r++ ){
			geo.vertices.push(new THREE.Vector3(ringwidth * r * Math.cos(angle),ringwidth * r * Math.sin(angle),0));
			geo.vertices.push(new THREE.Vector3(ringwidth * (r+1) * Math.cos(angle),ringwidth * (r+1) * Math.sin(angle),0));
		}
    	
    	//geo.vertices.push(new THREE.Vector3(x, y, 0));

    	//geo.colors.push(new THREE.Color("blue"));
    	//geo.colors.push(new THREE.Color("blue"));

    	geo.lineDistances.push(0);
        geo.lineDistances.push(1);

  	}

  	geo.computeLineDistances();
   //return new THREE.Line(geo, new THREE.LineBasicMaterial({color:"blue"}), THREE.LinePieces);
  	return new THREE.Line(geo, new THREE.LineBasicMaterial({color:color, vertexColors:false, transparent: true, opacity:0.3, blending: THREE.AdditiveBlending}), THREE.LinePieces );
}

var stargridSize = 20*ly;
var grid = stargrid(stargridSize, 4, 3, "blue");
root.add(grid);

//var grid_lines = gridlines(20*ly, 4, 4, "blue" );
/*grid_lines.update = function(gametime){
	grid_lines.material.opacity = 0.2-Math.sin(gametime.elapsedTime * 0.3) * 0.2;
}
gameObjects.push(grid_lines);*/

//root.add(grid_lines);

//------------------------------------------------------------------------

function starfield(amount, radius, color, size){

	var particleCount = amount;
    var	particles = new THREE.Geometry();
    	//mat = new THREE.ParticleBasicMaterial({color:color, size:size, transparent:true, blending: THREE.AdditiveBlending });
    	//mat = new THREE.ParticleBasicMaterial({color:color, size:size, blending: THREE.AdditiveBlending, depthWrite: false, transparent:true, alphaTest: 0.5 });
    var	mat = new THREE.ParticleBasicMaterial({
    	color:color,
    	map: textures['tinyStar'],
    	size:16, 
    	//size:size, 
    	sizeAttenuation:false,
    	fog:false,
     	blending: THREE.AdditiveBlending,
      	depthWrite: true, 
       	depthCheck:true,
      	transparent:true 
      	});//, alphaTest: 0.5

    //var	mat = new THREE.ParticleCanvasMaterial({ program: canvasPrograms.atmos,size:size,blending: THREE.AdditiveBlending});

    	//mat = new THREE.SpriteMaterial({map: new THREE.Texture( generateSprite()), blending: THREE.AdditiveBlending });

	for(var p = 0; p<particleCount; p++) {

  		var px = (Math.random()-0.5) ,
      	py = (Math.random()-0.5) ,
      	pz = (Math.random()-0.5) ,
      	
      	pv = new THREE.Vector3(px, py, pz).normalize().multiplyScalar(Math.random()*radius);//.multiply(new THREE.Vector3(1,1,1));
      	
      	//var magZ = 1/(Math.abs(pv.x) + Math.abs(pv.y));
      	//pv.z +=  (Math.random()-.5) * magZ ;

      	//pv.z *= 3*ly;
	  	particles.vertices.push(pv);
	  	//console.log(magZ);
	}

	return new THREE.ParticleSystem(particles, mat);
}

var stars = starfield(113, 33*ly, "darkblue", 0.2*ly);
root.add(stars);

var unexploredstars = starfield(37, 17*ly , "white", 0.4*ly);
root.add(unexploredstars);

var activestars = starfield(13, 13*ly, "white", 0.7*ly);
root.add(activestars);

//------------------------------------------------------------------------

function stardust(amount, radius, color, size){

	var particleCount = amount;
    var	particles = new THREE.Geometry();
  
    var	mat = new THREE.ParticleBasicMaterial({vertexColors:true,size:size, fog:false, blending: THREE.AdditiveBlending, depthWrite: false,transparent:true });
    //, color:color
	for(var p = 0; p<particleCount; p++) {

  		var px = (Math.random()-0.5) ,
      	py = (Math.random()-0.5) ,
      	pz = (Math.random()-0.5) ,
      	pv = new THREE.Vector3(px, py, pz).normalize().multiplyScalar(Math.random()*radius);

	  	particles.vertices.push(pv);
	  	particles.colors.push(new THREE.Color(0, 0, Math.random()));
	}
	return new THREE.ParticleSystem(particles, mat);
}

//var dust = stardust(333, 77*ly, "darkblue", 0.07*ly);
//root.add(dust);

//------------------------------------------------------------------------


function starIndicators(vectors){

	var geo = new THREE.Geometry();

	for(var v in vectors){
		geo.vertices.push(vectors[v]);
		geo.vertices.push(new THREE.Vector3(vectors[v].x, vectors[v].y, 0));

		var vb = new THREE.Vector3(vectors[v].x, vectors[v].y, 0);
		

		var size = 0.02*ly;

		geo.vertices.push(
			(new THREE.Vector3(-size, size, 0).add(vb)),
			(new THREE.Vector3(size, size, 0).add(vb)),

			(new THREE.Vector3(size, size, 0).add(vb)),
			(new THREE.Vector3(size, -size, 0).add(vb)),

			(new THREE.Vector3(size, -size, 0).add(vb)),
			(new THREE.Vector3(-size, -size, 0).add(vb)),

			(new THREE.Vector3(-size, -size, 0).add(vb)),
			(new THREE.Vector3(-size, size, 0).add(vb))

			);
			
		/*geo.vertices.push(new THREE.Vector3(vectors[v].x, vectors[v].y, 0));
		geo.vertices.push(new THREE.Vector3(0, 0, 0));*/
	}

	return new THREE.Line(geo, new THREE.LineBasicMaterial({color:"blue", vertexColors:false, transparent: true, opacity:0.3, blending: THREE.AdditiveBlending}), THREE.LinePieces); 
}

var interactivestars = activestars.geometry.vertices.concat(unexploredstars.geometry.vertices);
var indicators = starIndicators(interactivestars);
root.add(indicators);

indicators.update = function(gametime){
	indicators.material.opacity = 0.2-Math.sin(gametime.elapsedTime * 0.3) * 0.2;
}
gameObjects.push(indicators);

//------------------------------------------------------------------------

function planet(radius, segments){
	segments = segments || 3;
	var geo = new THREE.IcosahedronGeometry(radius, segments);
    var mat = new THREE.MeshBasicMaterial({
    	wireframe:false,
    	 color:"blue",
    	 transparent:false, 
    	 side:THREE.FrontSide,
    	 depthTest:true,
    	  depthWrite:true
    	});

    return new THREE.Mesh(geo, mat);
}
//var planet1 = planet(3301*ly, 1);
//planet1.position.z = -3300*ly;
//root.add(planet1);

function dome (radius, segments){
	var geo = new THREE.IcosahedronGeometry(radius, segments);
	//var geo = new THREE.OctahedronGeometry(radius, segments);
	//var geo = new THREE.SphereGeometry(radius, segments, segments);
    var mat = new THREE.MeshBasicMaterial({wireframe:true, color:"blue", side:THREE.BackSide, depthTest:true, depthWrite:true});
    for(var v in geo.vertices){

    	var vec = geo.vertices[v];
    	
    	if(vec.z<0){
    		vec.z = 0;
    	}
    	else{
      	vec.z *=   .5;
      }
    	
    }
	return new THREE.Mesh(geo, mat);
}
//var planetdome = dome(20*ly, 1);//km
//root.add(planetdome);




function starShip(pos){

	var size = 0.03*ly + Math.random() * 0.02*ly;

	var geo = new THREE.Geometry(),
    	mat = new THREE.ParticleBasicMaterial({color:"lime", size:1, fog:false});

    geo.vertices.push(pos);
    s = new THREE.ParticleSystem(geo, mat);

    s.speed = 1+Math.random() * ly;

    s.warp = function(){
    	var dest = activestars.geometry.vertices[getRandomInt(0, activestars.geometry.vertices.length-1)];
    	var dist = this.position.distanceTo(dest);
    	//console.log( m2ly(dist));
    	var t = (dist/this.speed)*2000;
    	//console.log(this.speed);
    	warpTo(this, dest, t);
    } 

    return s;
}

function createShips(num){
	for(var s = 0; s < num; s++)
	{
		var ship = starShip(new THREE.Vector3(0, 0, 0));
		ship.name = "Explorer " + s;
		//labelObject(ship);
		ship.warp();
		scene.add(ship);
	}
}


function warpTo(node, destination, duration){
	
	var tween = new TWEEN.Tween(node.position)
        .to(destination, duration)
        .easing(TWEEN.Easing.Quartic.InOut)
        ;

    tween.node = node;

  	tween.onComplete(
  		function(){
  		this.s = node;
  		this.s.warp();
  	});

  tween.start();
}


//------------------------------------------------------------------------



/*var camera_orbit = new THREE.Object3D();
scene.add(camera_orbit);
camera_orbit.position.set(0,0,0);

var camera_track = new THREE.Object3D();
camera_orbit.add(camera_track);
camera_track.position.set(10*ly,0,10*ly);

var camera_lookat = new THREE.Object3D();
camera_lookat.position.set(0,0,0);
scene.add(camera_lookat);*/

camera.idle = true;



//camera_track.add(camera);
//camera.position.set(0,0,0);





var incspeed = 0.0001*ly;

//camera.position.set(0,-20,8);
var target = root, cradius = 20*ly, constant = 0.033, inc = 0.0001;

var target_world_pos = new THREE.Vector3(0,0,0);

camera.position.set(0,-cradius*ly,cradius*0.4*ly);
camera.up.set( 0, 0, 1 );


camera.lateUpdate = function(gametime){

	target_world_pos.setFromMatrixPosition( target.matrixWorld );

	/*camera.position.x = target.position.x + cradius * Math.cos( constant * gametime.elapsedTime );         
	camera.position.y = target.position.y + cradius * Math.sin( constant * gametime.elapsedTime );
	camera.position.z = Math.sin(gametime.elapsedTime*0.03)*cradius*.4;*/

	//console.log(target_world_pos);

	camera.position.x = target_world_pos.x + cradius * Math.cos( constant * gametime.elapsedTime );         
	camera.position.y = target_world_pos.y + cradius * Math.sin( constant * gametime.elapsedTime );
	camera.position.z = target_world_pos.z + Math.sin(gametime.elapsedTime*0.03)*cradius*.4;


	//camera.lookAt( target.position );
	
	camera.lookAt( target_world_pos );

}
gameObjects.push(camera);






// should probably convert to world space .localToWorld
function interpolateObject(node, target, duration, easetype, callback){
	var tween = new TWEEN.Tween(node.position)
        .to(target.position, duration)
        .easing(easetype)
        ;

  	tween.onComplete(callback);
  	tween.start();
}



//------------------------------------------------------------------------
// LABELS

var starlabels = [];
var objectlabels = [];

var labels = {
	update: function(gametime){
		updateStarLabels(starlabels, activestars.geometry.vertices);
		updateObjectLabels();
	}
};
gameObjects.push(labels);


function createStarLabels(vectors){
	camera.updateMatrix();
	for(var v in vectors)
		starlabel(vectors[v], getStarName());
}

createStarLabels(activestars.geometry.vertices);

function updateStarLabels(_labels, vectors){

	/*scene.updateMatrixWorld(true);
	root.updateMatrixWorld(true);
	activestars.updateMatrixWorld(true);
	camera.updateMatrixWorld(true);*/

	var border = 70;
	var min = new THREE.Vector2(border,border);
	var max = new THREE.Vector2(renderer.domElement.width-border, renderer.domElement.height-border);

	for(var l in _labels)
	{
		//.localToWorld(wpos.clone());
		
		var la = _labels[l];
		var wpos = la.position;
		//la.updateMatrixWorld();
		//var wpos = new THREE.Vector3(0,0,0).setFromMatrixPosition( la.matrixWorld );
	
		var pos = cssPos(wpos, camera, renderer);

		if(pos.x<min.x || pos.x>max.x || pos.y<min.y || pos.y>max.y ){ //
			if(la.hidden == false)
			{
				la.classList.toggle('fade');
				la.hidden = true;
				//la.style.visibility = 'hidden';
			}
			//
			
			
		} else {
			if(la.hidden==true) 
			{
				la.classList.toggle('fade');
				la.hidden = false;
				//la.style.visibility = 'visible';
			}
				//
			//la.style.webkitTransform = "translate("+pos.x +"px,"+pos.y+"px)" ;
			la.style.webkitTransform = "translate3d("+pos.x +"px,"+pos.y+"px , 0px)" ;
		}
		//else if(la.style.visible == false){la.style.visibility = 'visible';}

		//pos.clamp(min, max);

		

		
		//la.style.left = pos.x + "px";
		//la.style.top = pos.y + "px";
	}
}


function starlabel(position, name, color){

	color = color||"blue";

	// parent
	var p = document.createElement('div');
	p.className = "starmap_item_parent";
	p.position = position;
	//p.object3D = object3d;

	

	// signature
	if(true)
	{
		var b = document.createElement('div');
		b.className = "beacon";
		//b.onclick = function(){newTestAction("id: " + name + " position: " + position.x + " , " + position.y +" , "+ position.z);};
		b.onclick = function(){newTestAction("id: " + name + "<br>" + "type: star"+ "<br>" + "mass: 000");};
		b.style.borderColor=color;
		p.appendChild(b);
	}
	// label
	if(true)
	{
		var l = document.createElement('div');
		l.className = "starmap_item";
		//l.classList.add("tip");
		l.innerHTML = name;// + "<span>" + name + "</span>";
		p.appendChild(l);
	}

	p.hidden = false;
	starlabels.push(p);
	ui.appendChild(p);
}

function labelObject(object, color){

	color = color||"blue";

	// parent
	var p = document.createElement('div');
	p.className = "starmap_item_parent";
	//p.position = object.position;
	p.object3D = object;
	object.label = p;

	// signature
	if(true)
	{
		var b = document.createElement('div');
		b.className = "beacon";
		//b.onclick = function(){newTestAction("id: " + name + " position: " + position.x + " , " + position.y +" , "+ position.z);};
		b.onclick = function(){newTestAction("object: " + object.name + "<br>" + "generic label");};
		b.style.borderColor=color;
		p.appendChild(b);
	}
	// label
	if(true)
	{
		var l = document.createElement('div');
		l.className = "starmap_item";
		//l.classList.add("tip");
		l.innerHTML = object.name;// + "<span>" + name + "</span>";
		p.appendChild(l);
	}

	p.hidden = false;
	objectlabels.push(object);
	ui.appendChild(p);
}

function updateObjectLabels(){

	if(!showObjectLabels)
	{
		//console.log("hiding");
		for(var h in objectlabels)
		{
			if(objectlabels[h].label.hidden == false)
			{
				//console.log("hiding");
				objectlabels[h].label.classList.toggle('fade');
				objectlabels[h].label.hidden = true;
			}	
		}
		return;
		//console.log("shouldnt run");
	}

	var border = 70;
	var min = new THREE.Vector2(border,border);
	var max = new THREE.Vector2(renderer.domElement.width-border, renderer.domElement.height-border);

	for(var l in objectlabels)
	{
		var obj = objectlabels[l];
		var la = obj.label;
		
		//la.updateMatrixWorld();
		var wpos = new THREE.Vector3(0,0,0).setFromMatrixPosition( obj.matrixWorld );
	
		var pos = cssPos(wpos, camera, renderer);

		if(pos.x<min.x || pos.x>max.x || pos.y<min.y || pos.y>max.y ){ //
			if(la.hidden == false)
			{
				la.classList.toggle('fade');
				la.hidden = true;
				//console.log("hiding normal");
				//la.style.visibility = 'hidden';
			}
		} else {
			if(la.hidden==true) 
			{
				la.classList.toggle('fade');
				la.hidden = false;
				//console.log("unhiding normal");
				//la.style.visibility = 'visible';
			}
			la.style.webkitTransform = "translate3d("+pos.x +"px,"+pos.y+"px, 0px)" ;
			//la.style.webkitTransform = "translate("+pos.x +"px,"+pos.y+"px)" ;
		}
	}
}

var showObjectLabels = true;
setInterval(function(){
	// check dist to target, hide stuff if too far / bounding check etc
	//console.log("check dist to target for hide");
	//var dist = 
	if(cradius > stargridSize/5)
	{
		//console.log("should hide");
		showObjectLabels = false;
	} else showObjectLabels = true;
}, 3000);

/*activestars.update = function(){
	updateStarLabels(starlabels, activestars.geometry.vertices);
};
gameObjects.push(activestars);*/

//------------------------------------------------------------------------


function createCanvasLabels(vectors){
	camera.updateMatrix();
	for(var v in vectors)
		canvasLabel(vectors[v]);
}

//createCanvasLabels(activestars.geometry.vertices);

function canvasLabel(position){

	var canvas1 = document.createElement('canvas');
	var context1 = canvas1.getContext('2d');

	var txt = "star";
	var textSize = 32;
	context1.font = textSize +"px Arial";
	context1.textAlign = 'center';
	var metrics = context1.measureText(txt);
	var size = metrics.width;
	
	context1.canvas.width = size;
	context1.canvas.height = textSize;

	/*canvas1.width = 128;
	canvas1.height = 32;*/
	//console.log(size);
	//context1.clearRect(0,0,size,size);
	/*context1.fillStyle="red";
	context1.fillRect(0,0,canvas1.width,canvas1.height);*/
	
	context1.fillStyle = "white";
    context1.fillText(txt, 0, textSize);
    
	texture1 = new THREE.Texture(canvas1) ;
	texture1.magFilter = THREE.NearestFilter;
	texture1.minFilter = THREE.LinearMipMapLinearFilter;


	texture1.needsUpdate = true;

	//console.log(canvas1.width);
	
	//var spriteMaterial = new THREE.SpriteMaterial( { map: texture1, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.topLeft } );
	var mat = new THREE.SpriteMaterial( { map: texture1, color:"cyan", useScreenCoordinates : true, sizeAttenuation:false} );
	//var spriteMaterial = new THREE.ParticleBasicMaterial( { map: texture1, color:"cyan", useScreenCoordinates : true, sizeAttenuation:false} );
	
	var sprite1 = new THREE.Sprite( mat );
	sprite1.scale.set(1,1,1.0);
	//sprite1.scale.set(4,4,1.0);
	sprite1.position = position.clone();//.set( 50, 50, 0 );
	sprite1.position.z+=0.2;
	//sprite1.position.set( 0, 0, 0 );
	root.add( sprite1 );	

}



function generateTexturesOLD() {

	var canvas = document.createElement( 'canvas' );
	var context = canvas.getContext( '2d' );

	canvas.width = 128;
	canvas.height = 128;

	var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
	gradient.addColorStop( 0, 'rgba(0,0,255,1)' );
	//gradient.addColorStop( 0.3, 'rgba(255,255,255,1)' );
	gradient.addColorStop( 0.7, 'rgba(0,0,255,0.7)' );
	gradient.addColorStop( 1, 'rgba(0,0,255,0)' );

	context.fillStyle = gradient;
	context.fillRect( 0, 0, canvas.width, canvas.height );

	var tex = new THREE.Texture(canvas);
	textures.atmos = tex;
	textures.atmos.needsUpdate = true;


	// TINY GRADIENT

	var c2 = document.createElement( 'canvas' );
	var ctx2 = c2.getContext( '2d' );

	var tsize = 8;
	c2.width = tsize;
	c2.height = tsize;

	var tinyGradient = ctx2.createLinearGradient(0,0,0,tsize);
	/*tinyGradient.addColorStop(0,"transparent");
	tinyGradient.addColorStop(.25,"transparent");
	tinyGradient.addColorStop(0.5,"pink");
	tinyGradient.addColorStop(.75,"transparent");
	tinyGradient.addColorStop(1,"transparent");*/

	tinyGradient.addColorStop(0,"transparent");
	tinyGradient.addColorStop(.23,"pink");
	tinyGradient.addColorStop(0.5,"transparent");
	tinyGradient.addColorStop(.77,"pink");
	tinyGradient.addColorStop(1,"transparent");

	ctx2.fillStyle = tinyGradient;
	ctx2.fillRect( 0, 0, c2.width, c2.height );

	var tex2 = new THREE.Texture(c2);
	textures.tinyGradient = tex2;
	textures.tinyGradient.needsUpdate = true;

	// tinyStar

	var c3 = document.createElement( 'canvas' );
	var ctx3 = c3.getContext( '2d' );

	/*var tsize = 8;
	c3.width = tsize;
	c3.height = tsize;

	ctx3.fillStyle = "white";
	ctx3.fillRect( 2, 3, 4, 2 );
	ctx3.fillRect( 3, 2, 2, 4 );*/

	var tsize = 3;
	c3.width = tsize;
	c3.height = tsize;

	ctx3.fillStyle = "white";
	ctx3.fillRect( 1, 1, 1, 1 );

	var tex3 = new THREE.Texture(c3);
	textures.tinyStar = tex3;
	textures.tinyStar.needsUpdate = true;

}


var projector = new THREE.Projector();

function worldToScreen(worldPosition, camera){
	//var projector	= this.projector || new THREE.Projector();
	//this.projector	= projector
	//var screenPos	= 
	return projector.projectVector(worldPosition.clone(), camera );
}

function cssPos(worldPos, camera, renderer){
	var position	= worldToScreen(worldPos, camera);
	position.x	= (  (position.x/2 + 0.5)) * renderer.domElement.width;
	position.y	= (1-(position.y/2 + 0.5)) * renderer.domElement.height;
	return position;
}


function makeCursor(color) {
    
    var cursor = document.createElement('canvas'),
        ctx = cursor.getContext('2d');

    cursor.width = 16;
    cursor.height = 16;
    
    ctx.strokeStyle = color;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'square';
    
    ctx.moveTo(2, 2);
    ctx.lineTo(16, 8);
    ctx.lineTo(8, 16);
    ctx.lineTo(2, 2)    
    ctx.stroke();
    
    document.body.style.cursor = 'url(' + cursor.toDataURL() + '), auto';
}

makeCursor("rgb(33,77,255)");



function m2ly(m){
	return m/9.4605284e15;
}

function ly2m(ly){
	return ly * 9.4605284e15;
}



function getStarName(){

	var names = [
    "en" , "la" , "can", "be" ,
    "and", "phi", "eth", "ol" ,
    "ve" , "ho" , "a"  , "lia",
    "an" , "ar" , "ur" , "mi" ,
    "in" , "ti" , "qu" , "so" ,
    "ed" , "ess", "ex" , "io" ,
    "ce" , "ze" , "fa" , "ay" ,
    "wa" , "da" , "ack", "gre"
	];
	return (names[Math.floor(Math.random()*names.length)] + names[Math.floor(Math.random()*names.length)]).toUpperCase() ;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}






function hexgrid(hexSize, radius, hexScale, hexSegments){

	hexScale = hexScale || 1;
	var height = Math.sqrt(3/4)* hexSize;

	var posx = 0;
	var posy = 0;

	var a = 2 * Math.PI / 6;

	var geo = new THREE.Geometry();
	var mat = new THREE.LineBasicMaterial({
		color:"blue", 
		vertexColors:false, 
		transparent: true,
		opacity:0.7,
		blending: THREE.AdditiveBlending
		});


	for (var c = -radius; c <= radius; c++)
	{
		posx = hexSize* 1.5 * c;
		posy =  -(2*radius-c)*height;

		for (var r = -radius; r <= radius; r++)
		{
		    var h = -(r + c);
		    if (h >= -radius && h <= radius)
		   {
		      for(var i = 0; i<2;i++)
		      {
		        var hexgeo = new THREE.CircleGeometry(hexSize * hexScale, hexSegments);
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
	//geo.mergeVertices();
	geo.computeLineDistances();

	return new THREE.Line(geo, mat, THREE.LinePieces);
}

var hexes = hexgrid(3*ly, 2, 1, 6);
//hexes.position.set(0,0,0);
scene.add(hexes);
hexes.visible = false;
hexes.animating = false;



function logpos(node){
	console.log(node + " pos: x " + node.position.x + "y: " + node.position.y + "z: " + node.position.z);
}


function linesphere(radius, segments, color){

	var geo = new THREE.Geometry();

	// rings
 	var axis = [
 		new THREE.Vector3(1,0,0),
 		new THREE.Vector3(0,2,0),
 		new THREE.Vector3(0,0,3),
 	]

  	for(var r = 0; r<3;r++)
  	{

  		for(var c=0;c<2;c++)
  		{
	  		var ring = new THREE.CircleGeometry(radius, segments);
	  		ring.vertices.shift();
	  		//geo.merge(ring);
	  		var rmesh = new THREE.Mesh(ring);
	  		rmesh.lookAt(axis[r]);
	  		rmesh.updateMatrix();
	  		geo.merge(rmesh.geometry, rmesh.matrix);
	  	
			
  		}
  	}
  	geo.computeLineDistances();
  	var mat = new THREE.LineBasicMaterial({color:color, vertexColors:false, transparent: true, opacity:0.3, blending: THREE.AdditiveBlending});

  	return new THREE.Line(geo, mat, THREE.LinePieces);

}

/*var sphereaxis = new linesphere(10*ly, 128, "blue");
root.add(sphereaxis);*/

var settingbeacon = false;

function setbeacon(vector){
	settingbeacon = true;
	var l = line(vector.clone(), vector.clone(), "blue");
	scene.add(l);

	/*var beacon = linesphere(0.07*ly, 16, "cyan");
	beacon.position = l.geometry.vertices[1];
	scene.add(beacon);*/

	var that = this;

	this.placebeacon = function(e){

			settingbeacon = false;

			label(l.geometry.vertices[1], "BEACON", "cyan");

			/*var tween = new TWEEN.Tween(beacon.rotation)
	        .to({x:Math.radians(360), y:Math.radians(360), z:Math.radians(360)}, 3333)
	        //.easing(TWEEN.Easing.Quartic.InOut)
	        .repeat(Infinity)
	        ;

		  	tween.onComplete(
		  		function(){
		  		
		  	});

		  tween.start();*/

		  	renderer.domElement.removeEventListener('mousemove', that.setbeaconheight, false);
			renderer.domElement.removeEventListener('mouseup', that.placebeacon, false);
		};

	this.setbeaconheight = function(e){
		
		if(settingbeacon==true)
		{
			l.geometry.vertices[1].z += -mouse.deltaY*ly*8;
			l.geometry.verticesNeedUpdate = true;
		}
		else renderer.domElement.removeEventListener('mousemove', that.setbeaconheight, false);

	};
	
	renderer.domElement.addEventListener('mousemove', this.setbeaconheight, false);
	renderer.domElement.addEventListener('mouseup', this.placebeacon, false);
}


/*function placebeacon(e){

	settingbeacon = false;
	var beacon = linesphere(0.03*ly, 4, "cyan");
	beacon.position = l.geometry.vertices[1];
	scene.add(beacon);
	renderer.domElement.removeEventListener('mouseup', placebeacon, false);
};

function setbeaconheight(e){
	
	if(settingbeacon==true)
	{
		l.geometry.vertices[1].z += mouse.deltaY;;
		l.geometry.verticesNeedUpdate = true;
	}
	else renderer.domElement.removeEventListener('mousemove', setbeaconheight, false);

};*/





function getXY(cX, cY){

    var projector = new THREE.Projector();
    var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    var mv = new THREE.Vector3(
        (cX / window.innerWidth) * 2 - 1,
        -(cY / window.innerHeight) * 2 + 1,
        0.5 );
    var raycaster = projector.pickingRay(mv, camera);
    var pos = raycaster.ray.intersectPlane(planeZ);

    return pos;
}

function line(start, end, color){
	color = color||"blue";
	var geo = new THREE.Geometry();
	geo.vertices.push(start, end);
	var mat = new THREE.LineBasicMaterial({color:color, vertexColors:false, transparent: true, opacity:0.7, blending: THREE.AdditiveBlending});
	return new THREE.Line(geo, mat);
}



function mousePickZPlane(){

	camera.updateMatrixWorld();

	var projector = new THREE.Projector();
	var raycaster = new THREE.Raycaster();

    var planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
   
    var mv = new THREE.Vector3(
        mouse.x,
        mouse.y,
        0.5 );

    /*console.log("mousev: " );
    console.log(mv);*/

    var vector = mv.clone();
    projector.unprojectVector( vector, camera );

    console.log("vector unprojected: ");
	console.log(vector);

	raycaster.precision = 0.0000000000000000000000000001;
	//THREE.Raycaster.prototype.precision = 0.0000000000000000000000000001;

	raycaster.ray.set( camera.position, vector.sub( camera.position ).normalize() );

	console.log("ray direction: ");
	console.log(raycaster.ray.direction);

    var pos = raycaster.ray.intersectPlane(planeZ);

    console.log("pick: ");
	console.log(pos);

    /*var raycaster = projector.pickingRay(mv.clone(), camera);
    console.log("ray dir: ");
	console.log(raycaster.ray.direction);

    //raycaster.precision = 0.0000000000000000000000000001;
    
    var test = new Test();
    
    var testray = test.pickingRay(mv.clone(), camera);
    console.log("ray test dir");
    console.log(testray.ray.direction);

    var pos = raycaster.ray.intersectPlane(planeZ);
    var pos2 = testray.ray.intersectPlane(planeZ);

    console.log("pick: ");
	console.log(pos);

	console.log("pick test: ");
	console.log(pos2);*/


    return pos;
}



var Test = function(){

	var _viewMatrix = new THREE.Matrix4(),
		_viewProjectionMatrix = new THREE.Matrix4()
	;


	this.unprojectVector = function () {

		var projectionMatrixInverse = new THREE.Matrix4();

		return function ( vector, camera ) {

			projectionMatrixInverse.getInverse( camera.projectionMatrix );
			_viewProjectionMatrix.multiplyMatrices( camera.matrixWorld, projectionMatrixInverse );

			return vector.applyProjection( _viewProjectionMatrix );
		};
	}();

	this.pickingRay = function ( vector, camera ) {

		// set two vectors with opposing z values
		vector.z = -1.0;
		var end = new THREE.Vector3( vector.x, vector.y, 1.0 );

		this.unprojectVector( vector, camera );
		console.log("unprojected vector, camera ");
		console.log(end);

		this.unprojectVector( end, camera );
		console.log("unprojected end, camera ");
		console.log(end);

		
		// find direction from vector to end
		end.sub( vector ).normalize();

		console.log("end vector normalized: ");
		console.log(end);

		return new THREE.Raycaster( vector, end );

	};





}

// efficiency research can be performed on any stat

var item = {
	efficiencies:{}
}

var probes = [];
function probe(){
	var p = {
		resolution:1.0,  // better chance of detecting weaker signatures  
		scanlevel: 0,    	// scan level increases by 1 with each scan while the probe is stationary
		sensorrange:1,
		activeScanStrength:2,	// probe can send out a strong active scan to boost detection for next turn. this however also makes the probe signature easy to detect by other scanners
		passiveScanStrength:1,		// the scan radius increases each round as the probe catalogues the space around it.
		efficency:1,
		currentScanRadius:1					// the scan strength decreases logarithmically with distance (chance of detection)
										// multiple overlapping probes decrease scan efficiency (to ovoid spamming)..(or use more computing power)
	};									// perhaps probes produces sensor data item that require processing. 
										// better sensors produce more data == better chance to detect and better randoms
	function scan(){

		scanlevel++;
	}
}

function sensorscan(probe){

}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};




StarMap.init();








/*





function hexgrid(hexSize, radius){

	var height = Math.sqrt(3/4)* hexSize;

	//var origin = {x:0, y:0};

	var offsetX = 0;// 2 * radius * hexSize,
	var	offsetY = 0;//height * 1.5 ;

	var posx = 0;
	var posy = 0;

	var a = 2 * Math.PI / 6;

	var geo = new THREE.Geometry();
	var mat = new THREE.MeshBasicMaterial({color:"blue", wireframe:true});

	posx = 1.5 * hexSize * -radius;
	posy = height*-radius;

	for (var x = -radius; x <= radius; x++)
	{
		//posx += 1.5 * hexSize;
		//posy = x * height;

		for (var y = -radius; y <= radius; y++)
		{
		    var h = -(x + y);
		    //if (h >= -radius && h <= radius)
		   // {
		      for(var i = 0; i<2;i++)
		      {
		        var hexgeo = new THREE.CircleGeometry(hexSize, 6);
		        hexgeo.vertices.shift();
		        var hexmesh = new THREE.Mesh(hexgeo);
		        hexmesh.position.x = posx - (offsetX);
		        hexmesh.position.y = posy - (offsetY);
		        hexmesh.updateMatrix();
		        geo.merge(hexmesh.geometry, hexmesh.matrix);
		      }
		   // }
		  posy += 2 * height;
		}
		posy = 0+x*height;
		posx += 1.5 * hexSize;
		//posx += 1.5 * hexSize;
		//posy = x * height;
	}

	geo.computeLineDistances();

	return new THREE.Line(geo, new THREE.LineBasicMaterial({color:"blue"}), THREE.LinePieces);
}
*/