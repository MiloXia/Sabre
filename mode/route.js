/*def route mode*/
var url = require('url')

/**
 * @param url string exp: /controller/action/a/b/c
 * @return handle obj exp:{controller:'controller', action:'action', args:['a','b','c']}
 */
exports.route = function(_url) {//自然映射
	var handle = {};
	var pathname = url.parse(_url).pathname;
	console.log('url: '+pathname);
	var paths = pathname.split('/');
	handle.controller = paths[1] || 'index';
	handle.action = paths[2] || 'index';
	handle.args = paths.slice(3);
	console.log(handle);
	return handle;
}
/**
 * other route rules
 * @param url string exp: /controller/action/a/b/c
 * @return obj
 */
exports.route2 = function(_url) {//其它映射
	//TODO
}