/*def querystring middel mod*/
var url = require('url')

exports.querystring = function(req) {
	req.query = url.parse(req.url, true).query;
	return req.query;
}