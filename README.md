A high-performance single cluster Nodejs MVC framework
======================================================
一个高性能的Nodejs单机集群MVC框架
=================================
Why is it high-performance?
--------------------------
为何高性能？
-----------
### No route traverses
Just use the natural mapping, Conventions more than the configuration.<br/>
eg:<br/>
http://localhost:8888/say/hello/would  means: http://localhost:8888/controller/action/args<br/>
Corresponding controller/say.js and the 'hello' method: <br/>
```
exports.hello = action(['req', 'res'], function(req, res, a) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>hello '+a+'</h1>');
    res.end();
});
```
### 没有路由遍历
只用自然映射的方式处理路由，约定大于配置。<br/>
例如:<br/>
http://localhost:8888/say/hello/would  意为: http://localhost:8888/控制器/动作/参数...<br/>
对应的控制器为controller目录下的say.js里的hello方法：<br/>
```
exports.hello = action(['req', 'res'], function(req, res, a) {
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>hello '+a+'</h1>');
    res.end();
});
```
### Cache
Use the native node caching mechanism : require() method, the controller just need require once, then will be cached, the next request comes will without reloading.<br/>
The action method also be compiled when load the controller, and just need hanlder request once, the other action method will be compiled and cached. The above code will be compiled like this:<br/>
```
{
    modes:['req', 'res'],// the modes need be injected
    callback:function(){...}// the total hanlder method
}
```
### 缓存
采用node原生的require缓存机制，controller被一次require后，就被缓存下来，下次请求到来时，无需再加载。<br/>
action方法也是在require的时候被编译的，只要处理一次请求，所有action方法都会被编译好，并被缓存，上面的code将会被编译成一个action对象：<br/>
```
{
    modes:['req', 'res'],// 需要被注入的模块
    callback:function(){...}// 正真的处理动作
}
```
Why need single cluster?
------------------------
### Node is a single-threaded
The JS side of Node is a single-threaded, shared context; Unlike PHP (also single-threaded) has a separate context; Node may cause avalanche problems and can not take advantage of multi-core CPU, so the introduction of a multi-process cluster architecture, you can a view of the cluster under the cluster catalog code. The design process will generate the default number of equivalent CPU, and share the same socket descriptor, listening to the same port, to maximize savings and improve utilization of system resources, and the child process will restart automatically when it encounters an error exit (in fact, create a new child process), add a simple restart strategy, will not fall into excess restart. The default is the operating system process scheduling preemptive scheduling, pretty fair, but also can be customized to suit different scheduling strategies production environment.
为何需要单机集群？
-----------------
### Node 是单线程的
Node的Js端是单线程的，共用上下文；不像PHP（也是单线程）都有独立的上下文；Node可能会导致雪崩问题，以及无法利用多核CPU，所以引入了多进程集群的架构，可以在cluster目录下查看有关集群的代码。该设计会默认生成CPU个数等值的进程，并且共享同一个socket文件描述符，监听同一端口，达到最大限度的节省系统资源并提高利用率，而且子进程在遇到错误退出时会自动重启（其实是创建了一个新的子进程），添加了简单的重启策略，不会陷入过量重启。进程调度默认是操作系统的抢占式调度，还算公平，也可自定义调度策略以适应不同的生产环境。

Notice of the single cluster
----------------------------
### Session must be distributed
This framework provides a default implementation Node Session (currently under development), the Session maximum shielding characteristics of distributed, fully transparent use, but with the Node memory is not a good practice to do Session recommended third party the product (Redis / Memcache), they have matured expiration policies, better memory management. Of course, I also recommend not to use session, but realize their strategy session, most of the system sites are doing.

引入单机集群的注意点
--------------------
### Session 必须为分布式
本框架默认提供Node实现的Session（目前还在开发中），该Session最大限度的屏蔽了分布式的特点，完全透明的使用，但是用Node内存去做Session不是很好的实践，建议采用第三方的产品（Redis/Memcache）,它们有成熟的过期策略，更好的内存管理等。当然本人更建议不要用session，而是实现自己的session策略，大部分系统网站都是这么做的。

The framework for the Node pure application server, not a static server
-----------------------------------------------------------------------
Please use efficient static server just like Nginx, or other CDN strategy, Node suitable for application servers, not suitable for static file server, but in order to facilitate test development, I also added a static CDN server in the directory.

本框架纯为Node应用服务器，不做静态服务器
----------------------------------------
静态服务器请用高效的Nginx服务器,或者其他的CDN策略,Node适合做应用服务器,不适合做静态文件服务器,不过为了测试开发方便,我也加入了一个静态的server在CDN目录下。

How run it?
-----------
Just run the app.js, there just one line code:
```
require('./mode/cluster/master').start(8888);
//or like this
var master = require('./mode/cluster/master');
master.start();
```
如何启动?
--------
只需要运行目录下的app.js即可，它只需要一行代码：
```
require('./mode/cluster/master').start(8888);
//或者像这样子
var master = require('./mode/cluster/master');
master.start();
```
![Test XIB](http://milostar.cwsurf.de/wf/hello.png)

RESTful api support
-------------------
Support RESTful api's already been developed, although somewhat superficial, but already you can use (use of each other with the Web), support for RESTful api semi-configured in the form of semi-mapping, mapping part is locating resources, such as URL: / rest/v1.0/users/1, go find users.js resource directory, load in, as to which method calls, to see how users are defined inside the method, let's take a look.
### How to use
```
var rest = require('../mode/restful').rest;

/*url:GET /users */
exports.getUsers = rest('res', function(res) {

}).api(rest.GET,'/users');

/*url:GET /users/:id */
exports.getUser = rest('res', function(res, id) {

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
```
You have noticed that the 'rest' function is the same way as the 'action' function, it will return an object and call the 'api' method definition http method and path of the object on the line. It's very simple.
RESTful api支持
---------------
RESTful api的支持已经开发完毕，虽然略显粗浅，但是已经可以使用（与Web一起使用互不影响），对于RESTful api的支持是半配置半映射的形式，映射部分在于资源的定位，比如URL：/rest/v1.0/users/1，会去寻找resource目录下的users.js，load进来，至于调用哪个方法，就看users里面的方法怎么定义了，让我们来看看。
### 如何使用
```
var rest = require('../mode/restful').rest;

//定义资源，当然这里是hack的
var users = [{name:'milo',id:1}, {name:'milo',id:2}, {name:'milo',id:3}]
/*url:GET /users 获得所有用户*/
exports.getUsers = rest('res', function(res) {
	res.writeHead(200,  {'Content-Type':'application/json'});
	res.write(JSON.stringify(users));
}).api(rest.GET,'/users'); //请求方法和path在这里定义

/*url:GET /users/:id 获得一个用户*/
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

/*url:POST /users/:id 更新一个用户*/
exports.updateUser = rest(['req','res'], function(req, res, id) {
	
}).api(rest.POST, '/users/:id');

/*url:PUT /users 创建一个用户*/
exports.createUser = rest(['req','res'], function(req, res) {
	
}).api(rest.PUT, '/users');

/*url:DELETE /users/:id 删除一个用户*/
exports.deleteUser = rest('res', function(res, id) {
	
}).api(rest.DELETE, '/users/:id');
```
你已经注意到了和action方法一样的一个rest函数，它会返回一个对象并调用该对象的api方法定义method和path就行了，很简单。
### Notice
Before use, you must go to the config / cpnfig file defines the prefixes and api version, the content is free but must have. A good framework can help you to improve standardization, which is to put out a normative, followed also for distinguish Web intersection. Similarly, use name 'users', does not distinguish between singular and plural are the normative order not to fall into the definition of storm somehow.
```
var config = {
	rest: {
		prefix:"rest",
		version:"v1.0"
	}
};
```
### 注意
在使用前必须到config/cpnfig文件下面定义好rest api的前缀以及api版本，内容随意但是必须得有，好的框架会帮助你提高规范性，这就是为了提搞规范性，其次也是为了区分与Web的路口，同样的使用users，不区分单复数都是为了规范性，不要陷入莫名其妙的定义风波中。
```
var config = {
	rest: {
		prefix:"rest",
		version:"v1.0"
	}
};
```

![Test XIB](http://milostar.cwsurf.de/wf/rest.png)

Why no ORM?
-----------
I think that in really large projects, ORM is not necessarily a good thing. This framework only for people who know SQL and simple design, not for lazy people, and secondly it does not necessarily agile ORM contrary, what we need is to bring SQL decomposition, and the project is built on the basis of a distributed database cluster ability on. The framework for distributed.
为何没有ORM？
-----------
本人认为在真正大型的项目里面，ORM不见得是好东西，本框架只为懂SQL与简洁的人而设计，而不是为偷懒的人，其次没有ORM不见得就与敏捷背道而驰，我们需要的是能将SQL分解，并将项目构建在分布式数据库集群的基础上的能力，本框架为分布式而生。

What's TODO list
--------------------
#### 1. session
#### 2. parse request body middleware and other middleware
#### 3. render view template (very important)
#### 4. Performance Optimization





