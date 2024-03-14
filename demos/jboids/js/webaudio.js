
var actx = new (window.AudioContext || window.webkitAudioContext)();

var request = new XMLHttpRequest();
request.open('GET', 'mp3/sound.mp3', true);
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

	updateAudio();
}

function stopSound(){
	source.stop();
	playing = false;
}

//loadSound();


var analyser = actx.createAnalyser();
analyser.fftSize = 32;
analyser.smoothingTimeConstant = .7;

var freqData = new Uint8Array(analyser.frequencyBinCount);
var freqDataFloat = new Float32Array(analyser.frequencyBinCount);
analyser.connect(actx.destination);
analyser.minDecibels = -50;
analyser.maxDecibels = -10;

window.onclick = function(){
	if(playing)
		stopSound();
	else playSound();
}

var audioUpdateCallback = function(){};

function updateAudio(){

	if(!playing)
		return;

	requestAnimationFrame(updateAudio);
        
	analyser.getByteFrequencyData(freqData);
	analyser.getFloatFrequencyData(freqDataFloat);
	
	audioUpdateCallback();
}



// analyser

// fftSize - power of 2
// getFloatFrequencyData
// getByteFrequencyData
// getByteTimeDomainData
