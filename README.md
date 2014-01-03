A high-performance single cluster Nodejs MVC framework
======================================================
一个高性能的Nodejs单机集群MVC框架
=================================
Why is it high-performance?
--------------------------
为何高性能？
-----------
###No route traverses
Just use the natural mapping, Conventions more than the configuration.
eg:
    http://localhost:8888/say/hello/would
                         |    |     |
                         |    |     |args
                         |    |action
                         |controller
###没有路由遍历
只用自然映射的方式处理路由，约定大于配置。
例如:
    http://localhost:8888/say/hello/would
                         |    |     |
                         |    |     |参数
                         |    |动作
                         |控制器
