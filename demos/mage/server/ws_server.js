


var server = function(){

	var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});


	var count = 0;

	var clients = [];

	wss.on('connection', function(ws) {
	    ws.on('message', function(message) {
	        console.log('received: %s', message);
	    });
	    ws.send('connected to server');
	    clients.push(ws);
	    console.log('clients: %s', clients.length );
	});

	function loop(){

		console.log('clients: %s', clients.length );

		for(var i = 0; i<clients.length; i++)
		{
			clients[i].send('server: count' + count++);
		}
	};

	setInterval(loop, 2000);

}();