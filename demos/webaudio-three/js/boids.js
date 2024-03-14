

var boids = [];

function boid(){
    
    var b = {
        id:0,
        speed : .03,
        boidrange : 15,
        seperation: 1,
        targetrange : 1,
        target : new THREE.Vector3(0,0,0),
        velocity : new THREE.Vector3(0,0,0),
        position: new THREE.Vector3(0,0,0),
        steering: new THREE.Vector3(0,0,0)
    };
    
    boids.push(b);
    
    return b;
}

function updateBoids(){
    
    for(var i = 0; i<boids.length; i++){
        
        var b = boids[i];
        b.steering.set(0,0,0);
        var count = 0;
  
        for(var n = 0; n<boids.length;n++)
        {
            var b2 = boids[n];
            if (b.id != b2.id) {
                var dist = b.position.distanceTo(b2.position);
                if (dist<b.boidrange) {
                    
                    var bvector = b.position.clone().sub(b2.position);

                    if (dist>0 && dist<b.seperation) {
                        bvector.multiplyScalar(1/dist);
                        b.steering.add(bvector);
                         count++;
                    } 
                }
            } 
        } 
        
        var targetvector = b.target.clone().sub(b.position);
        var tdist = targetvector.length();

        if (tdist>b.targetrange) {
            
            b.steering.add( targetvector.normalize());
            count++;
        }
        
        if (count>0) {
            b.steering.divideScalar(count);
        }
        
        b.steering.normalize();
        
        b.velocity.add( b.steering.multiplyScalar(b.speed));
        
        b.velocity.multiplyScalar(0.93);
        b.position.add(b.velocity);
        
        //if (b.position.y<0) {
        //    b.position.y = 0;
        //    b.velocity.y *= -0.7;
        //}
    }
}


function createBoids(num, spread, target){
    
    for(var n = 0; n<num;n++){
        
        var b = boid();
        b.id = n;
        b.target = target;
        b.position = new THREE.Vector3(Math.random()-0.5, Math.random()-.5, Math.random()-.5).normalize().multiplyScalar(Math.random()* spread);
       // b.position = new THREE.Vector3(Math.random()-0.5, 0, Math.random()-.5).normalize().multiplyScalar(Math.random()* spread);
    }
    
    var geo = new THREE.Geometry();
   // var geo = new THREE.BufferGeometry();
    var mat = new THREE.PointCloudMaterial({color:'black', size:.1, sizeAttenuation:true});
    
    for(var i = 0; i<boids.length;i++){
        geo.vertices.push(boids[i].position);
    }
    
    geo.dynamic = true;
    return new THREE.PointCloud(geo, mat);
}

// geometry buffer cannot be expanded at runtime without recreating geometry
function addBoids(_cloud, _target, _spread, num, _lines){
    
    var geo = _cloud.geometry;
    var linegeo = _lines.geometry;
    
    var currentId = boids.length;
    
    for(var n = 0; n<num;n++){
        
        var b = boid();
        b.id = currentId + n;
   
        b.target = _target;
        b.position = new THREE.Vector3(
                                       Math.random()-0.5,
                                       Math.random()-.5,
                                       Math.random()-.5
                                       ).normalize().multiplyScalar(Math.random() * _spread);
        
        geo.vertices.push(b.position);
        geo.colors.push(new THREE.Color(0,0,0));
        
        linegeo.vertices.push(_target);
        linegeo.vertices.push(b.position);
        
        linegeo.colors.push(new THREE.Color(1,1,1));
        linegeo.colors.push(new THREE.Color(0,0,0));
        
        console.log("boid added");
    }
    
    _cloud.geometry.verticesNeedUpdate=true;
    _cloud.geometry.colorsNeedUpdate=true;
    
    _lines.geometry.verticesNeedUpdate=true;
    _lines.geometry.colorsNeedUpdate=true;
}


function createBoidGroup(boids, lines){
    var boidgroup = {
        boids:[],
        update:function(){
            
        }
    }
}


function createBoidLines(_boidmesh, _target) {
    
    var geo = new THREE.Geometry();
    var mat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors});
    
   // console.log(_boidmesh);
    var num = _boidmesh.geometry.vertices.length;
    
    //console.log(num);
    
    for(var i = 0; i<num; i++){
        
        geo.vertices.push(_target);
        geo.vertices.push(_boidmesh.geometry.vertices[i]);
        
        geo.colors.push(new THREE.Color(1,1,1));
        geo.colors.push(new THREE.Color(0,0,0));
        
    }
    geo.dynamic = true;
    return new THREE.Line(geo, mat, THREE.LinePieces);
}

function createSphere(_radius, _divs, _color){
    var geo = new THREE.IcosahedronGeometry(_radius, _divs);
    var mat = new THREE.MeshBasicMaterial({color:_color});
    
    return new THREE.Mesh(geo, mat);
}