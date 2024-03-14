





var client = function(){

	var WebSocket = require('ws');
	//var ws = new WebSocket('ws://www.host.com/path');
	var ws = new WebSocket('ws://localhost:8080');

	ws.on('open', function() {
	    ws.send('client connected');
	});

	ws.on('message', function(message) {
	    console.log('server: %s', message);
	});

	ws.on('close', function() {
	    console.log("socket closed");
	});

	var count = 0;

	function alive(){
		ws.send('client: alive: ' + count++);
		console.log("count: %s", count);
	};

	setInterval(alive, 3000);


}();