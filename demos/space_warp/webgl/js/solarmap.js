console.log("solarmap included");

// eon-star.com


// solar mass
var M0 = 1.98855e31; //kg
// solar radii
var SR = 6.955e8; //m
//var SR = 6955;
// max solar size : 1700*SR = 1.19e12m

// electronvolt, mass & energy
// mass unit: eV/c^2

// gravitational constant
var G = 6.67384e-12; // N*(m/kg)^2

var km = 1000;

// planet sizes : max 220000 km radius min 1800 km
// mercury dist: 58.000.000km, earth: 150.000.000km,  pluto: 6.000.000.000 km

function solarmap(){

	cradius = 1e11*30; // cam orbit radius
	//cradius = 1*ly;

	var trailobjects = [];

	var star = gameobject("star1");
	var star_info = starinfo();
	star.add(starmesh(star_info));
	star.add(halo(star_info, 1.1, 'atmos', .777, "white"));
	star.add(halo(star_info, 1.3, 'atmos', .3, "cyan"));

	star.add(halo(star_info, 7, 'tinyStar', 1, "blue"));
	//star.add(halo(star_info, 7, 'shockwave', .1, "cyan"));
	trailobjects.push(star);

	var starorbit = new THREE.Object3D();
	var info2 = starinfo();
	starorbit.add(starmesh(info2));
	starorbit.add(halo(star_info, 1.1, 'atmos', .777, "white"));
	starorbit.add(halo(star_info, 1.3, 'atmos', .3, "cyan"));

	var orbitvector = new THREE.Vector3(randomRange(-10,10), randomRange(-10,10), randomRange(-10,10));
	
	starorbit.update = function(gametime){ 
		//object.rotateOnAxis(up, object.orbitspeed*0.005/i);

		starorbit.rotation.z += .000001 * orbitvector.x;//* randomRange(0,2);
		starorbit.rotation.y += .000001 * orbitvector.y;//* randomRange(0,2);
		starorbit.rotation.z += .000001 * orbitvector.z;//* randomRange(0,2);
		}; 
		gameObjects.push(starorbit);

	scene.add(starorbit);
	starorbit.add(star);
	star.position.set(SR*10000, SR*10000, SR*10000);

	target = star;

	var maxorbits = 9;
	var numorbits =  randomRange(0,maxorbits);// 1 + Math.floor(Math.random()*maxorbits);

	var lasto, systemRadius = SR;
	

	for(var n = 1; n <= numorbits; n++)
	{
		//var r =  SR * 50 * Math.sin(Math.sqrt(10*n))*(10/n);
		//.017(x^1.5*(.1/1.9x))
		//var distFunc = .017*(Math.pow(n,1.5)*(.1/1.9*n));//Math.exp(n);// Math.pow(n, 3);
		// .013+.0003(x^3.3*(.07/0.33x))
		var distFunc = 0.007 + .00037*(Math.pow(n,3.3)*(.07/0.33*n));
		console.log(distFunc);
		//var r =  SR * 50 * Math.sin(Math.sqrt(numorbits*n))*(numorbits/n);

		//var r = 1000 * SR * distFunc; // relate to mass     Math.log(n);1000* SR randomRange(33000, 7000000000)*km
		var r = 7000000000*km * distFunc; // relate to mass     Math.log(n);1000* SR randomRange(33000, 7000000000)*km

		console.log("radius " + n + ": " + r/km + "km");
		
		//var r = n * 40 * SR;
		var o = orbitindicator(r, "blue");

		var p = planet(randomRange(1800, 220000)*km, 1); 
		p.name = "Planet " + n;
		labelObject(p);
		o.add(p);
		p.position.y = r;
		trailobjects.push(p);
		//label(vectors[v], getStarName());

		o.rotation.x = ((Math.random()-.5)/numorbits)*(1/n);
		o.rotation.y = ((Math.random()-.5)/numorbits)*(1/n);
		o.rotation.z = Math.radians(360) * Math.random();//-.5;
		
		o.orbitspeed = randomRange(.3, 1.7);// 3*(Math.random()+.5);
		
		star.add(o);

		o.update = createUpdate(o, n);
		gameObjects.push(o);
		lasto = o;
		systemRadius = r;

		//o.visible = false;
	}

	var up = new THREE.Vector3(0,0,1);

	function createUpdate(object, i){
		return function(gametime){ 
		//object.rotateOnAxis(up, object.orbitspeed*0.005/i);

		//object.rotation.z += .03;
		//object.rotation.y += .03;
		object.rotation.z += object.orbitspeed * 0.003/i;
		}; //*gametime.getDelta())
	}

	//starmesh.geometry.computeBoundingSphere();
	//lasto.geometry.computeBoundingSphere();
	//var bounds = lasto.geometry.boundingSphere.radius;
	//var bounds = star.geometry.boundingSphere.radius;
	cradius = systemRadius*1.7;
		
	var traillength = 128;
	var trails = createTrails(trailobjects, traillength, new THREE.Color(.1,.3,.7));
	scene.add(trails);
	var timer = 0;

	updateTrails(trailobjects, trails, traillength);

	trails.update = function(gametime){
			updateTrails(trailobjects, trails, traillength);
	}
	gameObjects.push(trails);
		

	star.update = function(gametime){
	
	}
	gameObjects.push(star);
	

}

function gameobject(name){
	return new THREE.Object3D();
}


// starinfo.prototype.starhalos = [] ?

function starinfo(radius, mass, age){

	var starinfo = {
		radius : radius || SR,
		mass : mass || M0,
		age : age,
		temperature : 0, // calculate from mass/age
		color : "blue"
	};

	return starinfo;
}

function starmesh(starinfo, resolution){

	resolution = resolution || 3;
	var geo = new THREE.IcosahedronGeometry(1, resolution);
	var mat = new THREE.MeshBasicMaterial({color:starinfo.color});
	var mesh = new THREE.Mesh(geo, mat);
	mesh.scale.multiplyScalar(starinfo.radius);
	/*object.starmesh = mesh;
	object.add(mesh);*/
	return mesh;
}

function halo(starinfo, size, texture, opacity, color){

	texture = texture || 'radial';
	size = size || 1.1;
	opacity = opacity || 1;
	color = color || starinfo.color;

	var geo = new THREE.Geometry();
	var	mat = new THREE.ParticleBasicMaterial({
		color:color, 
		map: textures[texture],
		//size:5,
		size:starinfo.radius*5*size,
		opacity:opacity, 
		fog:false,
		blending: THREE.AdditiveBlending,
		//sizeAttenuation:false,
		depthCheck:true,
		depthWrite: true,
		transparent:true
		//, alphaTest: 0.5
		 });

	geo.vertices.push(new THREE.Vector3(0,0,0));
	//geo.colors.push(starinfo.color);
	
	/*if(typeof object.halos == 'undefined'){ object.halos = []; }	*/

	return new THREE.ParticleSystem(geo, mat);
}


/*var trail = {
	object:null,
	segments:64
}*/

function createTrails(objects, segments, color){

	color = color || new THREE.Color(0,0,1);

	var geo = new THREE.Geometry();
	var mat = new THREE.LineBasicMaterial({
		//color:color, 
		vertexColors:true, 
		transparent: true,
		opacity:0.3,
		blending: THREE.AdditiveBlending
	});

	var le = objects.length;
	for (var o = 0; o < le; o++) 
	{
		objects[o].updateMatrixWorld();
		for(var s=0;s<segments;s++){

			geo.vertices.push(new THREE.Vector3(0,0,0).setFromMatrixPosition( objects[o].matrixWorld ));
			geo.vertices.push(new THREE.Vector3(0,0,0).setFromMatrixPosition( objects[o].matrixWorld ));
			var c = new THREE.Color(1,0,0);
			c.copy(color);
			var cl = 1-(s/segments);
			c.multiplyScalar(cl);
			geo.colors.push(c);
			geo.colors.push(c);
	
		}
	}

	geo.computeLineDistances();
	var mesh = new THREE.Line(geo, mat, THREE.LinePieces);
	return mesh;

}


function updateTrails(objects, line, segments){
	var vertices = line.geometry.vertices;
	var vl = vertices.length;

	var index = 0;
	var le = objects.length;

	for (var obj = 0; obj < le; obj++) 	{
		
		var first = index;
		var last = index + 2*segments -1; // last vertex in this trail

		for(var v = 0; v < (segments*2-2); v+=2)
		{
			vertices[last-v].copy(vertices[last-v-1]);
			vertices[last-v-1].copy(vertices[last-v-3]);
		}
		// now set the new first vertex in this trail
		vertices[first+1].copy(vertices[first+2]);
		vertices[first].setFromMatrixPosition( objects[obj].matrixWorld );
		
		index += (segments*2);
	}
	line.geometry.verticesNeedUpdate = true;
}



//// orbits

/*
All orbits can be understood by Newtons Gravitational Force Law
Orbital characteristics depend only on the distance from the sun, not the mass of the object
Relation between orbital Period and Distance from The Sun

Mercury: A = 0.39 AU P = 0.24 yr
Venus: A = 0.72 P = 0.61
Mars: A = 1.52 P = 1.88
Jupiter: A = 5.2 P = 11.87
Saturn: A = 9.55 P = 29.48

Verification: Multiply A by itself 3 times (e.g. Jupiter: 5.2 x 5.2 x 5.2 = 140.61;
take the square root of this quantity and it should be very close to P; square root of 140.61 = 11.86)



amplitude = (units.decodevalue "15.0cm")
waveLength = (units.decodevalue "10.0cm")
boxsize = [1,1,1]*(units.decodevalue "1cm")

num = 20
step = waveLength/num

for n=0 to 9 do
(
for x=0 to num-1 do
(
z = abs(sin(180.0*x/num))*amplitude
obj = dummy pos:[(n*num + x)*step,0,z] boxsize:boxsize wirecolor:red 
)
)

20sin(sqrt(10x))*(10/x)


*/

function calculateStableOrbitCircular(central_mass, orbit_mass ){

}

function getRandomOrbits(){
	var o = [];
	var num = Math.floor(Math.random()*10);
	for(var n=0;n<num;n++ )
	{
		o.push(
			{
				radius:Math.random()
			}
		);
	}
	

}

var orbits =
{
	near:
	[
		{radius:0},
		{},
		{}
	],

	far:
	[
		{radius:0},
		{},
		{}
	]
}

function orbitindicator(radius, color){

	var geo = new THREE.Geometry();
 
  	/*var ringwidth = radius/rings;
  	for(var r = 1; r<=rings;r++){*/

  		for(var c=0;c<2;c++)
  		{
	  		var ring = new THREE.CircleGeometry(radius, 128);
	  		ring.vertices.shift();
	  		geo.merge(ring);
	  		/*var rmesh = new THREE.Mesh(ring);
	  		geo.merge(rmesh.geometry, rmesh.matrix);*/
	  		//rmesh.rotation.z = (360/rings)* r * Math.PI / 180;
			//rmesh.updateMatrix();
  		}
  	//}
  	geo.computeLineDistances();

  	return new THREE.Line(geo, new THREE.LineBasicMaterial({color:color, vertexColors:false, transparent: true, opacity:0.3, blending: THREE.AdditiveBlending}), THREE.LinePieces);

}




/*

700sin(sqrt(10x))*(1/x);
-700sin(sqrt(10x))*(1/x);



console.log("7e2:" + 7e2 + "  7*10e2:" + 7*10e2 + "  70e2:" + 70e2 + "  7e3:" + 7e3);
var s = object;
	s.radius = radius;
	s.mass = mass;
	s.age = age;
	s.temperature = 0; // calculate from mass/age
	s.color = "white";
	s.model = starmesh(radius, mass, age);
*/