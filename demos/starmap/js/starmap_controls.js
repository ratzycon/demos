console.log("including: starmap_controls.js")

/*(function GameFunction(GAME){

}(GAME));*/

var StarMapControls = function(renderer, camera){ // and game object

	this.renderer = renderer;
	this.camera = camera;

	renderer.domElement.addEventListener( 'mousemove', this.onMouseMove, false );
	renderer.domElement.addEventListener( 'mousedown', this.onMouseDown, false );
	renderer.domElement.addEventListener( 'mouseup', this.onMouseUp, false );

	this.INTERSECTED;
	this.SELECTED;

	this.projector = new THREE.Projector();
	this.raycaster = new THREE.Raycaster();

	this.objects = [];
	
	this.onMouseDown = function( event ) {

		event.preventDefault();

		var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
		var objs = intersect(this.vector, this.camera, this.objects, this.projector, this.raycaster);
		if(objs.length>0) // and is selectable
			this.SELECTED = objs[0].object;
		else this.SELECTED = null;
	}

	this.onMouseUp = function( event ) {
	 
		event.preventDefault();
		//if (this.INTERSECTED) { this.SELECTED = null;}
	}

	this.onMouseMove = function( event ) {

		event.preventDefault();

		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		var intersects = intersectNearest(this.vector, this.camera, this.objects, this.projector, this.raycaster);

		if (intersects.length > 0) 
		{
			if (this.INTERSECTED != intersects[0].object) 
			  this.INTERSECTED = intersects[0].object;
		} else { this.INTERSECTED = null; }
	}
}

function intersect(vector, camera, objects, projector, raycaster){

	projector = projector || new THREE.Projector();
	projector.unprojectVector( vector, camera );

	raycaster = raycaster.set(camera.position, vector.sub(camera.position).normalize()) || new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize() );
	var intersects = raycaster.intersectObjects(objects);

	return intersects;
}

function intersectNearest(vector, camera, object, projector, raycaster){

	projector = projector || new THREE.Projector();
	projector.unprojectVector( vector, camera );

	raycaster = raycaster.set(camera.position, vector.sub(camera.position).normalize()) || new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize() );
	var intersects = raycaster.intersectObject(objects);

	return intersects;
}

function ClampAngle (angle, min, max) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Math.clamp (angle, min, max);
}

(function(){
	Math.clamp=function(a,b,c){
		return Math.max(b,Math.min(c,a));
	}
})();