/*def app mod*/
//var qs = require('./middleware/querystring');
var path = require('./route');

exports.run = function(req, res, modes) {
	//qs.querystring(req); //middleware 1
	//console.log(req.query);
	console.log('worker id: '+process.pid);
	if(path.isRestful(req.url)) {
		_handlerRESTful(path.rest(req), [req, res], modes);
	} else { //web //路由分发
		_handler(path.route(req.url), [req, res], modes);
	}
}
exports.run2 = function(req, res) {
	//其它的路由分发方式：自定义
}

var CTRL_DIR = '../controller/';
function _handler(handle, args, _modes) {
	var res = args[1];
	try {
		//require 是同步的可以try
		var controller = require(CTRL_DIR + handle.controller);
		var	action_name = handle.action;
		var	action = null;
		if(controller[action_name]) {
			//第一个参数为null意味着controller无状态，靠 又不是OOP
			//controller[action].apply(null, args.concat(handle.args));
			action = controller[action_name];//exports对象为object，并且与controller模块一起被缓存
			action.callback.apply(null, _inject(action.modes, _modes).concat(handle.args));
		} else {
			handler404(res);
		}
	} catch(err) {//只可抓住同步方法的异常，以及一些解析错误，不过在这里足够了
		if(err.code === "MODULE_NOT_FOUND") {
			handler404(res);
		} else {
			handler500(res, err);
		}
	} finally {
		res.end();
	}
}

function _inject(keys, module) {
	var len = keys.length, modes = [];
	for(var i = 0; i < len; i++) {
		modes.push(module.get(keys[i]));
	}
	return modes;
}

/* http error hanlder */
function handler404(res) {
	console.log('404');
	res.writeHead(404, {'Content-Type':'text/html'});
	res.end("<h1>404</h1>");
	//TODO handle 404 by user config
}
function handler500(res, err) {
	console.log(err);
	res.writeHead(500,  {'Content-Type':'text/html'});
	res.end("<h1>500</h1>");
	//TODO handle 500 by user config
}

var RESOURCE_DIR = '../resource/';
function _handlerRESTful(handle, args, _modes) {
	var res = args[1];
	var req = args[0];
	try {
		var resource = require(RESOURCE_DIR + handle.resource);
		var	api = handle.api;
		var rest = null
		var isHandled = false;
		for(var key in resource) {
			rest = 	resource[key];
			//console.log(rest.api);
			//console.log((new RegExp(rest.api)).test(api));
			if((new RegExp(rest.api)).test(api) && rest.method == req.method) {
				console.log(key);
				isHandled = true;
				var regexp = /\/\d+/g;
				var match = api.match(regexp);
				var args = [];
				if(match) {
					var args = match.join('').split('/');
					args.shift();
				}
				console.log(args);
				rest.callback.apply(null, _inject(rest.modes, _modes).concat(args));
			} 
		}
		if(!isHandled) {
			handler404(res);
		}
	} catch(err) {
		if(err.code === "MODULE_NOT_FOUND") {
			handler404(res);
		} else {
			handler500(res, err);
		}
	} finally {
		res.end();
	}
} 