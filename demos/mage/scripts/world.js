var camera, scene, renderer;
var geometry, material, mesh, grid, gridmesh;


function initWorld() {

	log("world init...");
	//var webgl = $('webgl_surface');
	var webgl = document.getElementById('webgl_surface');

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	scene = new THREE.Scene();

	geometry = new THREE.CubeGeometry( 1200, 400, 1200 );
	grid = new THREE.PlaneGeometry( 2000, 2000, 40, 40 );
	material = new THREE.MeshBasicMaterial( { color: 0x66dd99, wireframe: true } );

	mesh = new THREE.Mesh( geometry, material );
	gridmesh = new THREE.Mesh(grid, material);

	gridmesh.rotation.x = 1.6;

	scene.add( mesh );
	scene.add(gridmesh);


	//var loader = new THREE.OBJMTLLoader();
	//loader.load( "/res/models/test/test.obj", function ( object ) { scene.add( object ); } );



	//renderer = new THREE.CanvasRenderer();
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	webgl.appendChild( renderer.domElement );

	THREEx.WindowResize(renderer, camera);

}

function animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( animate );

	//mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.0077;

	renderer.render( scene, camera );

}