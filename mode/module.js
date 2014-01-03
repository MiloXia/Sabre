var module = {};//存在

exports.put = function(key, mode){
	module[key] = mode;
}

exports.get = function(key, mode){
	return module[key];
}