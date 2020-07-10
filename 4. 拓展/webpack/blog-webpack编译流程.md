# [webpack编译流程](https://juejin.im/post/5d70b186f265da03e1689864)

![webpack编译流程图](https://user-gold-cdn.xitu.io/2019/9/5/16d00393b89a5d42?imageslim)

## webpack流程

webpack的运行是一个串行过程，从启动到结束依次执行以下流程：

* 初始化：启动构建，读取与合并配置参数，加载plugin，实例化complier;
* 编译：从Entry发出，针对每个Module串行调用对应loader去翻译文件内容，再找到该module依赖的Module，递归进行编译处理；
* 输出：对编译后的Module组合成Chunk，把Chunk转换成文件，输出到文件系统；

如果只执行一次构建，那么以上阶段只执行一次，如果是开启了监听模式，流程将会循环从编译->输出；

### 初始化阶段

* 合并shell和配置文件的参数并且实例化complier对象；
* 加载插件；
* 处理入口：
