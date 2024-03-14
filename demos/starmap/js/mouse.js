console.log("including: mouse.js")


var mouse = {

  down:false, 
  x:0, y:0, 
  deltaX:0, deltaY:0, 
  wheel:0, 
  wheelDelta:0, 
  wheelDir:0,
  lastX:0,
  lastY:0

};

mouse.onMouseWheel = function( event ) {
  mouse.wheel = -event.wheelDeltaY || event.detail;
  mouse.wheelDir = mouse.wheel / Math.abs(mouse.wheel);
  mouse.wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
}

mouse.onDocumentMouseDown = function( event ) {
  event.preventDefault();
  mouse.down = true;
}

mouse.onDocumentMouseUp = function( event ) {
  event.preventDefault();
  mouse.down = false;
}

mouse.onDocumentMouseMove = function( event ) {
  event.preventDefault();

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  mouse.deltaX = mouse.lastX - mouse.x;
  mouse.deltaY = mouse.lastY - mouse.y;

  mouse.lastX = mouse.x;
  mouse.lastY = mouse.y;

}

renderer.domElement.addEventListener( 'mousemove', mouse.onDocumentMouseMove, false );
renderer.domElement.addEventListener( 'mousedown', mouse.onDocumentMouseDown, false );
renderer.domElement.addEventListener( 'mouseup', mouse.onDocumentMouseUp, false );
renderer.domElement.addEventListener('mousewheel', mouse.onMouseWheel, false);


