console.log("including: extensions.js")

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

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

function geoCentroid(geo){
    var centroid = new THREE.Vector3();
    for (var i = 0, l = geo.vertices.length; i < l; i++) {
        centroid.addSelf(geo.vertices[i]);
    }
    return centroid.divideScalar(geom.vertices.length);
}

function rotateVectors(vectors, axis, angle){
    for(var v in vectors)
    {
        var vector = vectors[v];
        //var angle = (360/rings)* r * Math.PI / 180;;
        var matrix = new THREE.Matrix4().makeRotationAxis(axis, angle);
        vector.applyMatrix4(matrix);
    }
}

// Returns a random number between min and max
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/*var simplex = new SimplexNoise(),
    canvas = document.getElementById('c'),
    ctx = canvas.getContext('2d'),
    imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
    data = imgdata.data,
    t = 0;

window.setInterval(function(){
for (var x = 0; x < 256; x++) {
    for (var y = 0; y < 256; y++) {
        var r = simplex.noise3D(x / 16, y / 16, t/16) * 0.5 + 0.5;
        var g = simplex.noise3D(x / 8, y / 8, t/16) * 0.5 + 0.5;
        data[(x + y * 256) * 4 + 0] = r * 255;
        data[(x + y * 256) * 4 + 1] = (r + g) * 200;
        data[(x + y * 256) * 4 + 2] = 0;
        data[(x + y * 256) * 4 + 3] = 255;
    }
}
                   t++;
ctx.putImageData(imgdata, 0, 0);
}, 1000/60);*/