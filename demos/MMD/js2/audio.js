
var AudioContext = AudioContext || webkitAudioContext;
//var actx = new AudioContext();
var actx;

// createBufferSource
// createMediaElementSource
// createMediaStreamSource
// createOscillator


var request = new XMLHttpRequest();
request.open('GET', 'sound.mp3', true);
request.responseType = 'arraybuffer';

var audioBuffer;

function loadSound(){

	request.onload = function(){

		actx.decodeAudioData(request.response, function(buffer){

			audioBuffer = buffer;
			//playSound();

		}, function(){
			console.log('error');
		});
	}
	request.send();
}

function playSound(){
	
	actx = new AudioContext();
	var request = new XMLHttpRequest();
request.open('GET', 'sound.mp3', true);
request.responseType = 'arraybuffer';
	loadSound();

	var source = actx.createBufferSource();
		source.buffer = audioBuffer;
		source.playbackRate.value = 1;
		source.connect(actx.destination);
		source.start( 0 );
		
}








// freq * vertex distance from 0,0,0 ^2