

var demo = function demo(){
	demo.setup();
}

demo.setup = function(){
	camera.position.set(0,0,-1);
	demo.axis = 
	{
		xmin:-100, 
		xmax:100,
		ymin:-100,
		ymax:100,
		zmin:-100,
		zmax:100
	};
	demo.curves = [];
	demo.divisions = 4;
}

demo.drawgraph = function(){

}

demo.drawCurve = function(func, color, divisions){
	
	color = color || "lime";
	
	var geo = new THREE.Geometry();
	var mat = new THREE.LineBasicMaterial({color:color});
	var axis = demo.axis;
	var l = (Math.abs(axis.zmin) + axis.zmax);
	var start = axis.zmin;
	var interval = 1/divisions;
	for(var n = 0; n<l;n++)
	{
		var v = new THREE.Vector3(0,0,);
		var result = func(v);
	}
	

}

demo();
