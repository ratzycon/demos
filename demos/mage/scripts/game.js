
var gCanvas ;

var ranInt = Math.floor(Math.random()*100);

function load(){}
function initialize(){}
function update(){}
function lateUpdate(){}
function render(){}

function startgame()
{
	log("game started");
}

function log(msg)
{
	document.getElementById('log').innerHTML += '<div>' +msg+'</div>';
	document.getElementById('log').scrollTop = 10000;
}

function setupgame(){
	document.addEventListener('keydown', checkKeyDown, false);
	document.addEventListener('keyup', checkKeyUp, false);
	gCanvas = new GameCanvas(document.getElementById('canvas'));
}

function loadImg(file){
	var img = new Image();
	img.src = file;
}

function checkKeyDown(e){
	var keyID = e.keyCode || e.which; // or var keyID = (e.keyCode) ? e.keyCode: e.which; for multiple borwser support
	if(keyID=== 38 || keyID===87){ //up arrow or W
		e.preventDefault();
	}
	if(keyID=== 39 || keyID===68){ //right arrow or D
		e.preventDefault();
	}
	if(keyID=== 40 || keyID===83){ //down arrow or S
		e.preventDefault();
	}
	if(keyID=== 37 || keyID===65){ //lef arrow or A
		e.preventDefault();
	}
}

function checkKeyUp(e){
	var keyID = (e.keyCode) ? e.keyCode: e.which;
	if(keyID=== 38 || keyID===87){ //up arrow or W
		e.preventDefault();
	}
	if(keyID=== 39 || keyID===68){ //right arrow or D
		e.preventDefault();
	}
	if(keyID=== 40 || keyID===83){ //down arrow or S
		e.preventDefault();
	}
	if(keyID=== 37 || keyID===65){ //lef arrow or A
		e.preventDefault();
	}
}
