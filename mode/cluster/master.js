var http = require('http');
var cp = require('child_process');
var cpus = require('os').cpus();

var handler = require('../handler');
var modes = require('../module');

exports.start = function(port) {

	var server = http.createServer(function(req, res){
		init_modes(res, req);
		handler.run(req, res, modes);
		throw new Error('error');
	}).listen(port || 8888, function() {//监听端口只用tcp即可
		console.log("master start " + cpus.length + " worker");
		for(var i = 0; i < cpus.length - 1; i++) {//创建cpu等值的子进程
			createWork();
		}
		//server.close();//关闭主进程的监听
	});

	function init_modes(res, req) {
		modes.put('res', res);
		modes.put('req', req);
	}

	// server.on('connection', function(socket){
	// 	console.log('worker id: '+ process.pid);
	// 	for(var worke in workers) {
	// 		worker.send('server', server);
	// 	}
	// 	socket.end();
	// });

	var limit = 10;
	var	during = 60000;
	var	restart = [];

	var isTooFrequently = function() {
		var time = Date.now();
		var length = restart.push(time);
		if(length > limit) {
			restart = restart.slice(limit, -1);
		}
		return restart.length >= limit && restart[restart.length - 1] - restart[0] < during;
	};

	var workers = {};
	function createWork() {
		if(isTooFrequently()) { //重启太频繁
			console.log('isTooFrequently');
			process.emit('giveup', length, during);
			return;
		}

		var worker = cp.fork(__dirname + '/worker.js');
		
		worker.on('message', function(message){
			if(message.act === 'suicide') { //收到自杀信号便重启
				createWork();
			}
		});

		worker.on('exit', function() {
			console.log('worker '+worker.pid + 'exited.');
			delete workers[worker.pid];
			//createWork();
		});
		worker.send('server', server);//序列化句柄发送
		workers[worker.pid] = worker;
		console.log('create worker pid ' + worker.pid);
	}

	process.on('exit', function() {
		for(var pid in workers) {
			workers[pid].kill();//主进程推出时 关闭所有子进程
		}
	});

	process.on('uncaughtException', function(err) {
		 //logger.log(err);
	});
	console.log('master id: '+process.pid)
};
