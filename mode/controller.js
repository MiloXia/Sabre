exports.action = function() {
	var args = Array.prototype.slice.call(arguments),
		callback = args.pop(),//最后一个参数为回调
		modes = (args[0] && typeof args[0] === "string") ? args : args[0];
	return {
		'callback': callback,
		'modes': modes
	}
}
