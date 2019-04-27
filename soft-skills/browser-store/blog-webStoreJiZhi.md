# [你清楚HTTP缓存机制和原理吗？](https://mp.weixin.qq.com/s/HknZ358fEvr4E2FKFQ-ykQ)

1. 仅基于强缓存的情况
![强缓存](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhqVtDasiaFuX5eXIuzGCZQ2CcBmImSScZGrtJHTG05GsvnrOMRI5mO7JIjEJQrpqic4DyMCuZ7oSALw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
2. 仅基于对比缓存（协商缓存）
![协商缓存](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhqVtDasiaFuX5eXIuzGCZQ2CuwNMVyz1WDqJuPwVSey2ATnL7n0Esd0QLuIbHUA21sQ5efQX181PaQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
3. 强制缓存
    * 通过expires和cache-control标识，expires为资源到期时间，其值是:请求时间+max-age,但是由于时间是服务端生成的，客户端时间可能跟服务端有很大差别，所以该标识作用不大；
    * cache-control，用于指定强缓存的规则，取值为:public,private,no-cache,no-store,max-age=xxx;
    * 当cache-control不为no-cache,no-store时候，都是不发起请求并且如果缓存没失效的话都是直接从浏览器缓存读取；
4. 协商缓存
    * 浏览器第一次请求后会把协商缓存标识（last-modified和etag）缓存起来，下次一旦强缓存没有命中，或者cache-control值为no-cache或者no-store，则把缓存值附加在请求头中发送过去；服务端通过比较last-modified和etag决定能否使用缓存，如果可以使用，则返回304和空的正文，如果失败，则返回200和请求内容；
    * last-modified表示资源最后修改时间，浏览器请求时候添加last-modified-since字段，把last-modified作为值传过去，服务端校验；
    * etag优先级高于last-modified，表示资源在服务端的唯一标识（资源修改时间戳的哈希值或者版本号等等），同样，浏览器请求资源时候获取到该值缓存，下次请求添加if-none-match，服务器新生成etag跟请求的etag值对比，如果一致的话，表示缓存可以使用，于是返回304，如果不一致，则返回新的内容和200状态码；
5. 缓存流程总结
![缓存流程](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhqVtDasiaFuX5eXIuzGCZQ2Cwd652rG3h0mJeo2aRAZYHR2423qSW0vyKC3LNzprx59d1ibIB2X9MGw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



