

var mouseOrbit = function(cam_node, target_node){

    this.target = target_node;
    this.camera_node = cam_node;

    this.speedX = 1;
    this.speedY = 1;
    this.orbitDamping = 0.97;

    this.yLimitMin = -20;
    this.yLimitMax = 80;

    this.zoomEnabled = true;
    this.useZoomSteps = true;
    this.zoomMin = 1;
    this.zoomMax = 100000;
    this.zoomSteps = [];
    this.zoomTime = 1;
    this.zoomSensitivity = 0.2;
        
    this.x =0.0;
    this.y = 0.0;

    this.distance = 20;

    this.euler = new THREE.Euler( 0, 0, 0, 'XYZ' );

    this.update = function(gametime){

        if (this.target!=='undefined') {

            var delta = gametime.getDelta();

            this.x += mouse.deltaX * this.speedX * this.distance * delta;
            this.y -= mouse.deltaY * this.speedY * delta;

            //console.log( this.distance);

            this.y = ClampAngle(this.y, this.yLimitMin, this.yLimitMax);
     
            //this.euler.set(this.y,this.x, 0, 'XYZ' );
            this.euler.set(this.x, 0, this.y, 'XYZ' );
            var rotation = new THREE.Quaternion();
            rotation.setFromEuler(this.euler);
     
            //this.distance = Math.clamp(this.distance - mouse.wheel * this.zoomSensitivity , this.distanceMin, this.distanceMax);
     
            //var position = rotation * new THREE.Vector3(0.0, 0.0, -this.distance) + this.target.position;
            var position = new THREE.Vector3(0.0, -this.distance, 0);
          
            position.applyQuaternion(rotation);
            position.add(this.target.position);
     
            this.camera_node.rotation = rotation;
            this.camera_node.position = position;

            this.x *= this.orbitDamping; 
            this.y *= this.orbitDamping;

            
        }

        //console.log( this.camera_node.position);
        
    };
}

































/*var target : Transform;
var distance = 10.0;
 
var xSpeed = 250.0;
var ySpeed = 120.0;
 
var yMinLimit = -20;
var yMaxLimit = 80;
 
var distanceMin = 3;
var distanceMax = 15;
 
private var x = 0.0;
private var y = 0.0;
 
 
function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;
}
 
function LateUpdate () {
    if (target) {
        x += Input.GetAxis("Mouse X") * xSpeed * distance* 0.02;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
 
 		y = ClampAngle(y, yMinLimit, yMaxLimit);
 
		var rotation = Quaternion.Euler(y, x, 0);
 
		distance = Mathf.Clamp(distance - Input.GetAxis("Mouse ScrollWheel")*5, distanceMin, distanceMax);
 
        var position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
 
        transform.rotation = rotation;
        transform.position = position;
 
	}
 
}
 
 
static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}*/