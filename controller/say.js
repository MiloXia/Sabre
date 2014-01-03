/*def controller*/
var action = require('../mode/controller').action;

exports.hello = action(['req', 'res'], function(req, res, a) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write('<h1>hello '+a+'</h1>');
	res.end();
});

exports.hey = action('res', function(res, a) { //引入依赖注入是为了实现模块的配置化和自定扩展，而且不是所有action都需要这些对象
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write('<h1>hey '+a+'</h1>');
	res.end();
});

/*also you can do like this
var SayCtrl = {
	hello : action(['req', 'res'], function(req, res, a) {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<h1>hello '+a+'</h1>');
		res.end();
	}),
	hey : action('res', function(res, a) {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.write('<h1>hey '+a+'</h1>');
		res.end();
	})
};
module.exports = SayCtrl;
*/