
function setup(){
    
    renderer.setClearColor('black', 1);
    renderer.autoClear = true;
    
    createLights();
    
    var boxes = [];
    
    var n = analyser.frequencyBinCount;
    console.log(n);
    
    var root = new THREE.Object3D();
    scene.add(root);
    root.update = function(){
      root.rotation.y += .007;  
    };
    updates.push(root);
    
    var offset = new THREE.Vector3(-n/2, 0, -n/2);
    
    for(var w=0; w<n; w++){
        boxes.push([]);
        for(var h=0; h<n; h++)
        {
            var box = createBox();
            boxes[w][h] = box;
            box.position.set(w + offset.x,0,h+offset.z);
            box.scale.set(0.7,Math.random(),0.7);
            root.add(box);
        }
    }
        
    camera.position.set(17,17,17);
    camera.lookAt(scene.position);
    
    loadSound();
    
    var count = 0;
    
    damping = .2;
    
    // pointcloud
    
    
    //updates.push(eq);
    //scene.add(eq);
    
    audioUpdateCallback = function(){
    
        for(var w=0; w<n; w++){
            for(var h=n-1; h>0; h--)
            {
                var box = boxes[w][h];
                box.scale.y = boxes[w][h-1].scale.y;
            }
        }
        
        for(var w=0; w<n; w++){
            var box = boxes[w][0];
            box.scale.y = -freqDataFloat[w]*damping;
        }
        
        for(var w=0; w<n; w++){
            for(var h=0; h<n; h++)
            {
                var box = boxes[w][h];
               // box.material.color = "black";
               //box.material.opacity = box.scale.y;
               
                //box.material.color.r = box.scale.y;
                box.material.color.g = box.scale.y;
                //box.material.color.b = box.scale.y;
            }
        }
    };
}

setup();

function createEQ(){
    var eq = createEqualizer(analyser.frequencyBinCount, 5, 1, "red");
    
    eq.update= function(){
        var index = 0;
        for(var i = 0; i < eq.lines.geometry.vertices.length; i += 2){
            
            // static
            var v1 = eq.lines.geometry.vertices[i];
            
            // animated
            var v2 = eq.lines.geometry.vertices[i+1];
            
            
            var nv = v1.clone();
            
            nv.multiplyScalar(-freqDataFloat[index] * 0.01); // should not use every second i
            
            v2.set(nv.x, nv.y, nv.z);
            
            //console.log(v2);
            index++;
            
            //eq.lines.geometry.vertices[i].set(eq.lines.geometry.vertices[i-1])
            //eq.points.geometry.vertices[i].multiplyScalar(-freqDataFloat[i]*0.001);
            //eq.points.geometry.vertices[i] = (eq.points.defaultPositions[i].copy()).multiplyScalar(-freqDataFloat[i]*0.01);
        }
        
        
        eq.points.geometry.vertices.needsUpdate=true;
        eq.lines.geometry.vertices.needsUpdate=true;
       // console.log(eq.points.geometry.vertices[0]);
        //console.log(-freqDataFloat[0]*.1);
        
    };

    return eq;
}

function createLights() {
    
    var l1 = new THREE.DirectionalLight('blue', 0.11);
    l1.position.set(1,1,1);
    l1.lookAt(scene.position);
    lights.push(l1);
    scene.add(l1);
    
    //var l2 = new THREE.DirectionalLight('red', 0.11);
    //l2.position.set(-1,-1,-1);
    //l2.lookAt(scene.position);
    //lights.push(l2);
    //scene.add(l2);
    
    var l3 = new THREE.DirectionalLight('white', 0.77);
    l3.position.set(0,1,0);
    l3.lookAt(scene.position);
    lights.push(l3);
    scene.add(l3);
}

function createBox(){
    var geo = new THREE.BoxGeometry(1,1,1);
    //var mat = new THREE.MeshBasicMaterial({color:"blue"});
    var mat = new THREE.MeshLambertMaterial({color:'white', wireframe:false});
    return mesh = new THREE.Mesh(geo, mat);
}

function createPlane(_width, _heigt, _divs){
    //var geo = new THREE.PlaneGeometry();
}

function createEqualizer(_divs, _radius, _pointSize, _color){
    
    var eq = new THREE.Object3D();
    
    // points
    eq.points = createPoints(_divs, _pointSize, _color);
    //eq.points.defaultPositions = eq.points.geometry.vertices.slice();
    alignVectorsSpherical(eq.points.geometry.vertices, _radius);
    eq.points.geometry.vertices.needsUpdate=true;
    
    // lines
    eq.lines = createPointLines(eq.points.geometry.vertices, "red", "red");
    
    eq.add(eq.points);
    eq.add(eq.lines);
    
    return eq;
}

function randomizeVectorsSpherical(_vectorlist, _maxdist) {
    
    for(var v = 0; v < _vectorlist.length ;v++){
        
        v.set(
            Math.random()-.5,
            Math.random()-.5,
            Math.random()-.5
            );
        
        v.normalize();
        v.multiplyScalar(Math.random()*_maxdist);
    }
}

function alignVectorsSpherical(_vectorlist, _radius) {
    
    for(var v = 0; v < _vectorlist.length ;v++){
        
        _vectorlist[v].set(
            Math.random()-.5,
            Math.random()-.5,
            Math.random()-.5
            );
        
        _vectorlist[v].normalize();
        _vectorlist[v].multiplyScalar(_radius);
    }
}

function createPoints(_num, _size, _color){
    
    var geo = new THREE.Geometry();
    var mat = new THREE.PointCloudMaterial({color:_color, size:_size, sizeAttenuation:true});
    geo.dynamic = true;
    
    for(var i = 0; i<_num; i++){
        geo.vertices.push(new THREE.Vector3(0,0,0));
    }
    
    return new THREE.PointCloud(geo, mat);
}

function createPointLines(_vectorlist, _color1, _color2){
    
    var geo = new THREE.Geometry();
    //var mat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors});
    var mat = new THREE.LineBasicMaterial({ color:"red"});
    
    for(var i = 0; i<_vectorlist.length; i++){
        
        geo.vertices.push(_vectorlist[i].clone());
        geo.vertices.push(_vectorlist[i].clone());
        
        geo.colors.push(_color1);
        geo.colors.push(_color2);
        
    }
    geo.dynamic = true;
    return new THREE.Line(geo, mat, THREE.LinePieces);
}