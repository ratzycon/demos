
console.log("demo loading..");

var actx = new (window.AudioContext || window.webkitAudioContext)();

var request = new XMLHttpRequest();
request.open('GET', 'sound.mp3', true);
request.responseType = 'arraybuffer';

var audioBuffer;
var loaded = false;

function loadSound(){

	request.onload = function(){

		actx.decodeAudioData(request.response, function(buffer){

			audioBuffer = buffer;
			loaded = true;
			console.log("audio loaded!");
			playSound();

		}, function(){
			console.log('error');
		});
	}
	request.send();
}

var source;
var playing = false;

function playSound(){

	if(!loaded){
		console.log("audio no loaded");
		return false;
	}

	console.log("playing audio");

		source = actx.createBufferSource();
		source.buffer = audioBuffer;
		source.playbackRate.value = 1;
		source.connect(analyser);
		source.start( 0 );

	playing = true;
	
	update();
}

function stopSound(){
	source.stop();
	playing = false;
}

loadSound();

var analyser = actx.createAnalyser();
analyser.fftSize = 256;
analyser.smoothingTimeConstant = .7;

var freqData = new Uint8Array(analyser.frequencyBinCount);

analyser.connect(actx.destination);
analyser.minDecibels = -50;
analyser.maxDecibels = -10;

window.onresize = function(){

	canvas.width = 2 * freqData.length;
	canvas.height = 256;

	console.log("canvas size:" + canvas.width + " : " + canvas.height);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;

canvas.width = 2 * freqData.length;
canvas.height = 256;
console.log("canvas size:" + canvas.width + " : " + canvas.height);
canvas.style.height = window.innerHeight + "px";

document.body.appendChild(canvas);

window.onclick = function(){
	if(playing)
		stopSound();
	else playSound();
}

function update(){

	if(!playing)
		return;

	requestAnimationFrame(update);
	analyser.getByteFrequencyData(freqData);
	//analyser.getFloatFrequencyData(freqData);

	ctx.clearRect(0,0,canvas.width, canvas.height);
	ctx.fillStyle="black";

	for(var i = 0, n = freqData.length;  i<n; i++){
		ctx.fillStyle = "rgb( 0, " + freqData[i] + "," + 0 +")"; // Math.floor( 0.5 * freqData[i])
		ctx.fillRect(i*2, canvas.height/2 - freqData[i]/2, 1, freqData[i]);
	}
}
