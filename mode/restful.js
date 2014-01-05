var rest = function() {
	var args = Array.prototype.slice.call(arguments),
		callback = args.pop(),//最后一个参数为回调
		modes = (args[0] && typeof args[0] === "string") ? args : args[0];
	var api = function(method, path) {
		var _api = path.replace(/\/:([a-zA-Z])+\/?/g,"/\\d+\/?");
		return {
			'callback': callback,
			'modes': modes,
			'api': '^'+_api+'$',
			'method': method
		};
	};
	var _rest = {};
	Object.defineProperty( _rest, "api", {
        value: api,
        writable: false,
        enumerable: true,
        configurable: true
      });
	return _rest;
};
var method = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE"
};
for(var key in method) {
	Object.defineProperty(rest, key, Object.getOwnPropertyDescriptor(method, key));
}

exports.rest = rest;
exports.method  = method;
