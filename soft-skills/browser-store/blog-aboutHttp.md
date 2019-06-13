# [关于HTTP协议，一篇就够了](https://www.cnblogs.com/ranyonsue/p/5984001.html)

* http是服务器传输超文本到浏览器的传送协议
* http基于[TCP/IP通信协议](http://www.baidu.com)来传递数据
* http属于应用层的面向对象的协议
* uri与url区别,包含关系,uri除了有url,还有urn表现方式,uri是url的抽象表述
* 请求消息包含:请求行(Method URL Http-Version) 请求报头 请求正文
* 响应消息包含:响应行(Http-Version Status-Code Reason-Phrase) 如 HTTP/2.0 200 ok
* 请求方法
  * GET--请求指定的页面信息,并返回实体
  * HEAD--类似GET请求,但是不返回实体,只返回消息报头,常用于测试连接的可访问性和缓存是否过期
  * POST--向指定资源提交数据,可能会导致新的资源的建立或者已有资源的修改
  * PUT--从客户端向服务器传送的数据取代指定的文档的内容
  * DELETE--请求服务器删除指定的页面
  * CONNECT--HTTP/1.1预留给能够将连接改为管道方式的代理服务器
  * OPTIONS--允许客户端查看服务器的性能
  * TRACE--回显服务器收到的请求,主要用于测试或诊断
* http请求/响应过程
  * 浏览器与服务器的http端口(默认80)建立一个TCP套接字连接
  * 通过TCP套接字,客户端向web服务器发送一个文本的请求报文
  * 服务器接受请求,解析并定位请求资源,服务器将资源副本写到TCP套接字,有客户端读取
  * 释放连接TCP连接,如果connection为close,则有服务器主动关闭连接,客户端被动关闭连接,释放TCP连接,若connection为keepalive,则会保持一段时间,在该时间内可再次接受请求;
  * 浏览器解析html内容
* GET/POST
  * GET请求的参数在地址栏附加过去,HTTP协议对URL的长度没有限制,但是浏览器会限制url的长度,也有的浏览器长度限制取决于操作系统的支持
  * POST请求数据不受限,但是WEB服务器会对post提交数据的大小进行限制
  * POST请求比GET请求安全性高,因为GET请求的数据出现在URL上,可能会被浏览器缓存,查看历史纪录也可以获取到链接数据,也有可能造成[CSRF攻击(跨域请求伪造)](https://www.cnblogs.com/liuqingzheng/p/9505044.html)
