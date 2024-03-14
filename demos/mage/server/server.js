var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {

  /*res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('count' + count);*/

   var path = url.parse(req.url).pathname;
  if (path == '/') { path = '../index.html'}

	fs.readFileSync(__dirname + path, function(err, data){
	  res.writeHead(200, {'Content-Type': contentType(path)});
	  res.write(data, 'utf8');
	  res.end();
	});




  
}).listen(1337, '127.0.0.1');

function contentType(path) {
  if (path.match('.js$')) {
    return "text/javascript";
  } else if (path.match('.css$')) {
    return  "text/css";
  }  else {
    return "text/html";
  }
}



var count = 0;
function loop(){
	console.log('count: ' + count++);

}

console.log('Server running at http://127.0.0.1:1337/');

setInterval(loop, 1000);


