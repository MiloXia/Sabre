var http = require('http');
var handler = require('../handler');
var modes = require('../module');

var server = http.createServer(function(req, res){
	init_modes(res, req);
	handler.run(req, res, modes);
	//throw new Error('error'); //just test error
});

var worker;
process.on('message', function(m, net) {//接收消息后还原句柄对象
	worker = net;
	if(m === 'server') {
		worker.on('connection', function(socket) {
			server.emit('connection', socket);
		});
	}
});

process.on('uncaughtException', function(err) {
	//logger.log(err);
	console.log(err);
	process.send({act:'suicide'});//在推出前发送一个自杀信号:群发
	worker.close(function() {//断开连接 长连接时执行回调的时间会比较久，需要设置超时
		process.exit(1);
	});
	setTimeout(function(){// 5s内上面的回调还没执行，就强制结束进程
		process.exit(1);
	}, 2000);
});

function init_modes(res, req) {
	modes.put('res', res);
	modes.put('req', req);
}