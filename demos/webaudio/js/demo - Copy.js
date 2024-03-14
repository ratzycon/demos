
console.log("demo loading..");

//var AudioContext = AudioContext || webkitAudioContext;

// var actx;
// if (window.webkitAudioContext) {
//     console.log("webkit");
//     actx = new webkitAudioContext();
// } else if (window.AudioContext) {
//     console.log("standard");
//     actx = new AudioContext();
// }

var actx = new (window.AudioContext || window.webkitAudioContext)();

//var actx = new AudioContext();

// createBufferSource
// createMediaElementSource
// createMediaStreamSource
// createOscillator


var request = new XMLHttpRequest();
request.open('GET', 'sound3.mp3', true);
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
	//document.getElementById("data").innerHTML = freqData;

	update();
}

function stopSound(){
	source.stop();
	playing = false;
}

loadSound();


// analyser

// context.createAnalyser()

// fftSize - power of 2
// getFloatFrequencyData
// getByteFrequencyData
// getByteTimeDomainData


var analyser = actx.createAnalyser();
analyser.fftSize = 64;
analyser.smoothingTimeConstant = .7;

var freqData = new Uint8Array(analyser.frequencyBinCount);
//var freqData = new Float32Array(analyser.frequencyBinCount);
analyser.connect(actx.destination);
analyser.minDecibels = -120;
analyser.maxDecibels = -20;

window.onresize = function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log("canvas size:" + canvas.width + " : " + canvas.height);
}

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log("canvas size:" + canvas.width + " : " + canvas.height);

//canvas.style.border = '1px solid grey';
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
	ctx.fillStyle="#FF0000";

	var val = 0;
	for(var i = 0, n = freqData.length;  i<n; i++){
		//val = freqData[i] * canvas.height/canvas.height;
		val = freqData[i]/255 * canvas.height;
		ctx.fillStyle = "rgb( 0, " + freqData[i] + ",0)";
		ctx.fillRect(i*(canvas.width/n), 0, (canvas.width/n)-3, val);
		//ctx.fillRect(i*(canvas.width/n), canvas.height, canvas.width/n,-freqData[i] * canvas.height/512);//255);
		//ctx.fillRect(i*(canvas.width/n), canvas.height, canvas.width/n,-50);
	}

	//console.log(freqData[64]);
}





// freq * vertex distance from 0,0,0 ^2