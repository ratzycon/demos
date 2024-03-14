
// ["name":buffer]




var webAudioSupport;
var ac;
if('webkitAudioContext' in window) {
            webAudioSupport = true;
            ac = new webkitAudioContext();
} else if ('AudioContext' in window) {
            webAudioSupport = true;
            ac = new AudioContext();
} else {
            webAudioSupport = false;
}


var audio = {};


// var AudioContext = AudioContext || webkitAudioContext;

// if(AudioContext=='undefined')
// 	console.log("web audio not supported");

// var ac = new AudioContext();

//var ac;// = new (window.AudioContext || window.webkitAudioContext)();

// var context;
// if (typeof AudioContext !== "undefined") {
//     actx = new AudioContext();
// } else if (typeof webkitAudioContext !== "undefined") {
//     actx = new webkitAudioContext();
// } else {
//     throw new Error('AudioContext not supported. :(');
// }

function loadSound( _id,_filename){

	var request = new XMLHttpRequest();
	request.open('GET', _filename, true);
	request.responseType = 'arraybuffer';

	request.onload = function(){

		ac.decodeAudioData(request.response, function(buffer){

			audio[_id] = buffer;

			console.log("audio loaded: " + _id + " : " + _filename);
		
		}, function(){
			console.log('error loading audio');
		});
	}
	request.send();
}

function playSound(_id){

	console.log("playing audio : " + _id);

	source = ac.createBufferSource();
	source.buffer = audio[_id];
	source.playbackRate.value = 1;
	source.connect(ac.destination);
	source.start ? source.start(0) : source.noteOn(0);

}
