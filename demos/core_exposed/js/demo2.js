
var grid;

var demo = function demo(){
	demo.setup();
}

demo.setup = function(){

	scene.fog = new THREE.Fog(new THREE.Color(1,1,1), 1, 400);
	renderer.setClearColor(new THREE.Color(0,0,0), 0);


	grid = pointField(33,33,33,10);
	scene.add(grid);
	createAttractors(1);
	
	grid.update = function(time, delta){

		uniforms.time.value += delta * .1;
		//uniforms.attractPower.value = 3.3 + Math.sin(time) * .3;
		//uniforms.attractDirection.value = Math.sin(time * .1);
	};
	updateList.push(grid);
}

var target = scene, cradius = 200, cspeed = .077;
var target_world_pos = new THREE.Vector3(0,0,0);

camera.lateUpdate = function(time, delta){

	target_world_pos.setFromMatrixPosition( target.matrixWorld );

	camera.position.x = target_world_pos.x + cradius * Math.cos( cspeed * time );      
	camera.position.y = target_world_pos.y + cradius * Math.sin( cspeed * time ) *.4;
	camera.position.z = target_world_pos.z + cradius * Math.sin( cspeed * time );

	//camera.rotation.y += .001;

	camera.lookAt( target_world_pos );
}
updateList.push(camera);

var attractors = [];
function createAttractors(num){

	for(var i = 0; i<num;i++){
		var a = new THREE.Object3D();
		scene.add(a);
		var rv = new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5 );
		rv.normalize();
		a.position = rv.multiplyScalar(Math.random()*200);

		a.mass =  Math.random() * 200000;
		a.attractPower = 3.0;
		a.attractDirection = 1.0;// * (Math.random()-.5)*2;
		uniforms.attractors.value.push(a.position);
		uniforms.attractorMass.value.push(a.mass);
		uniforms.attractPower.value.push(a.attractPower);
		uniforms.attractDirection.value.push(a.attractDirection);
		attractors.push(a);
		updateList.push(a);

		a.update = createUpdate(a, i);
	}

	function createUpdate(object, i){
		var ra = 200 * Math.random(), sp = (Math.random()-.5)*2, offset = Math.random()*100, raxis = new THREE.Vector3(Math.random(),Math.random(),Math.random());
		var rot = 0;
		return function(time, delta){ 
			//var m = Math.sin(time)*2000;
			//uniforms.attractorMass.value[i] += m;
			//uniforms.attractDirection.value[i] = Math.sin(time);
		
			object.position.x = ra * Math.cos(time * raxis.x * sp);
			object.position.y = ra * Math.sin(time * raxis.y * sp)*.4;
			object.position.z = ra * Math.sin(time * raxis.z * sp);
		};
	}

	//uniforms.numAttractors.value = num;
	//console.log("num : " + uniforms.numAttractors.value);


	//console.log(uniforms.attractors.value);
	//console.log(uniforms.attractorMass.value);
}

var uniforms = {
	time: { type: "f", value: 0.0 },
	//numAttractors: {type: "i", value:8},
	attractors: {type:"v3v", value:[]},
	attractorMass: {type:"fv1", value:[]},
	attractPower: {type:"fv1", value:[]},
	attractDirection: {type:"fv1", value:[]}
};

var gridmat = new THREE.ShaderMaterial( {
	uniforms: uniforms,
	vertexShader: document.getElementById( 'vertexshader' ).textContent,
	fragmentShader: document.getElementById(  'fragmentshader' ).textContent,
	fog: false,
	/*transparent: true,
  	blending: THREE.AdditiveBlending */
  	//blending: THREE.MultiplyBlending 
});

/*var blendings = [ "NoBlending", "NormalBlending", "AdditiveBlending", "SubtractiveBlending", "MultiplyBlending", "AdditiveAlphaBlending" ];

				var src = [ "ZeroFactor", "OneFactor", "SrcAlphaFactor", "OneMinusSrcAlphaFactor", "DstAlphaFactor", "OneMinusDstAlphaFactor", "DstColorFactor", "OneMinusDstColorFactor", "SrcAlphaSaturateFactor" ];
				var dst = [ "ZeroFactor", "OneFactor", "SrcColorFactor", "OneMinusSrcColorFactor", "SrcAlphaFactor", "OneMinusSrcAlphaFactor", "DstAlphaFactor", "OneMinusDstAlphaFactor" ];*/

function pointField(width, height, depth, spacing){

	var geo = new THREE.Geometry();
	/*var mat = new THREE.ParticleBasicMaterial({
		color: new THREE.Color(.88,.88,.88),
		size:3,
		sizeAttenuation:false
		});*/


	for(var z = -depth; z <= depth; z++)
		for(var y = -height; y <= height; y++)
			for(var x = -width; x <= width; x++){
				geo.vertices.push(new THREE.Vector3(x*spacing, y*spacing, z*spacing));
			}

	//return new THREE.ParticleSystem(geo, mat);
	return new THREE.ParticleSystem(geo, gridmat);
}



demo();