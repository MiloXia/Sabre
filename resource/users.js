var rest = require('../mode/restful').rest;

//defines resource
var users = [{name:'milo',id:1}, {name:'milo',id:2}, {name:'milo',id:3}]
/*url:GET /users */
exports.getUsers = rest('res', function(res) {
	res.writeHead(200,  {'Content-Type':'application/json'});
	res.write(JSON.stringify(users));
}).api(rest.GET,'/users');

/*url:GET /users/:id */
exports.getUser = rest('res', function(res, id) {
	res.writeHead(200,  {'Content-Type':'application/json'});
	var user = null;
	for(var i = 0, len = users.length; i < len; i++) {
		if(users[i].id == id) {
			user = users[i];
			break;
		}
	}
	res.write(JSON.stringify(user));
}).api(rest.GET, '/users/:id');

/*url:POST /users/:id */
exports.updateUser = rest(['req','res'], function(req, res, id) {
	
}).api(rest.POST, '/users/:id');

/*url:PUT /users */
exports.createUser = rest(['req','res'], function(req, res) {
	
}).api(rest.PUT, '/users');

/*url:DELETE /users/:id */
exports.deleteUser = rest('res', function(res, id) {
	
}).api(rest.DELETE, '/users/:id');

/*url:GET /users/:id/messages */ //子资源 用委托的方式
exports.createUserMessages = rest('req','res', function(res, id, id2) {
	//var messages = require("./messages");
	//res.write(messages.getMessages());
	//res.end();
}).api(rest.GET, '/users/:id/messages/:id');
//test
/*console.log(exports.getUsers);
console.log(exports.getUser.api);
console.log(exports.updateUser);
console.log(exports.createUser);
console.log(exports.deleteUser);*/