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

### 采用node原生的require缓存机制，controller被一次require后，就被缓存下来，下次请求到来时，无需再加载。
