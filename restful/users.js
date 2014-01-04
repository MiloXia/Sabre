/*url:GET /users */
exports.getUsers = rest('res', function(res) {

}).api('/users');

/*url:GET /users/:id */
exports.getUser = rest('res', function(res, id) {
	
}).api('/users/:id');

/*url:POST /users/:id */
exports.updateUser = rest(['req','res'], function(req, res, id) {
	
}).api('/users/:id');

/*url:PUT /users */
exports.createUser = rest(['req','res'], function(req, res) {
	
}).api('/users');

/*url:DELETE /users/:id */
exports.createUser = rest('res', function(res, id) {
	
}).api('/users/:id');

/*url:GET /users/:id/messages */ //子资源 用委托的方式
exports.createUserMessages = rest('req','res', function(res, id) {
	var messages = require("./messages");
	res.write(messages.getMessages());
	res.end();
}).api('/users/:id/messages');