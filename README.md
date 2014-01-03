A high-performance single cluster Nodejs MVC framework
======================================================
一个高性能的Nodejs单机集群MVC框架
=================================
Why is it high-performance?
--------------------------
为何高性能？
-----------
### No route traverses
Just use the natural mapping, Conventions more than the configuration.
eg:<br/>
    http://localhost:8888/say/hello/would <br/>
                         |    |     |<br/>
                         |    |     |args<br/>
                         |    |action<br/>
                         |controller<br/>
### 没有路由遍历
只用自然映射的方式处理路由，约定大于配置。
例如:<br/>
    http://localhost:8888/say/hello/would <br/>
                         |    |     |<br/>
                         |    |     |参数<br/>
                         |    |动作<br/>
                         |控制器<br/>
