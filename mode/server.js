/*def http server mod*/
var http = require('http');
var handler = require('./handler');

var port = 8888;

exports.start = function() {
	http.createServer(handler.run).listen(port, '127.0.0.1');
	console.log("server start at http://localhost:"+port);
}