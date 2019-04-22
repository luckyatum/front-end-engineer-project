# [HTTP协议详解](https://blog.csdn.net/gueter/article/details/1524447)

1. URL
   格式: <http://host[":"port][abs_path]>
   其中http表示传输协议,host表示合法的internet主机域名或者ip地址,port指定端口号,缺省80端口,abs_path指定请求资源的url,缺省为'/'
2. 请求
   http请求由三部分组成:请求行,消息报头,请求正文
   * 请求行以一个方法符号开头,后面跟着请求的url和协议版本;如 Method Request-URL HTTP-Version  CRLF
   * 请求方法(Method)有多种,常用的有GET,POST,HEAD,OPTIONS,PUT...
   * 消息报头后述
   * 请求正文省略
3. 响应
   接收到请求消息后,服务器返回一个HTTP响应消息
   http响应由状态行,消息报头,响应正文
   * 状态行格式如下: HTTP-Version Status-Code Reason-Phrase CRLF
   * 分别为服务器http协议版本,响应状态代码,状态代码的文本描述,回车换行符
   * 响应状态码:
       * 1xx--指示信息,请求已接受,继续处理
       * 2xx--成功,请求已被成功处理
       * 3xx--重定向,要完成请求必须更进一步地处理
       * 4xx--客户端错误,请求有语法错误
       * 5xx--服务端错误,服务端未能实现合法的请求
   * 消息报头后述
   * 请求正文省略
4. 消息报头
   消息报头包括普通报头,请求报头,响应报头,实体报头
   * 普通报头,少数报头域用于所有的请求和响应消息,并不用于被传输的实体,只用于传输的消息
     * eg: Cache-Control 指定缓存指令(详细指令看[指令博客](http://www.baidu.com))
     * Date 表示消息产生的日期和时间
     * Connection 指定连接的选项,如 keep-alive close等
   * 请求报头,允许客户端向服务端传递请求的附加信息以及客户端自身信息
     * eg: Accept 指定客户端接受哪些类型的信息,如 Accept: image/gif 表明客户端希望接受GIF图象格式的资源,Accept: text/html 表明客户端希望接受html文本
     * Accept-Charset 指定客户端接受的字符集,如 Accept-Charset: iso-8859-1 gb2312 GBK utf-8 缺省是任何字符集都可以接受
     * Accept-Encoding 指定可接受的内容编码(一般服务器会将文件进行压缩后返回,可以指定接受压缩后的文件),如 Accept-Encoding: gzip 缺省任何编码都可以接受
     * Accept-Language 指定接受的自然语言,如 Accept-Language: zh-cn,缺省任何语言都可以接受
     * Authorization 用于证明客户端有权查看某个资源,如果服务器响应401(未授权),可以发送一个包含Authorization请求报头域的请求,要求服务器对其进行验证
     * Host (该报头域是必须的) 指定被请求资源的internet主机和端口号,通常从URL中提取出来
     * User-Agent 记录了操作系统的名称和版本的信息,非必需
   * 响应报头,允许服务端传递不能放在状态行中的附加信息
     * Location 用于重定向接受者到一个新的位置
     * Server 包含了服务器用来处理请求的软件信息,和User-Agent相对应
     * WWW-Authenticate 响应消息为401(未授权)的话必须包含该报头域,服务端会先解析数据中是否包含Authorization请求报头域字段,没有的话返回报头中添加 WWW-Authenticate 用于要求客户端发送合法的用户名和密码到服务端(这种验证方式明码传输,使用Base-64加密,容易被解码,不安全)
   * 实体报头,请求和响应消息都可以传递一个实体,实体由实体报头域和实体正文(非必需)组成,实体报头定义了关于实体正文有无和请求所标识的资源的元信息
     * Content-Encoding 指示了实体正文的附加内容的编码,因此要获得Content-Type报头域中所引用的媒体类型,必须采用相应地解码机制,
     * Content-Language 描述了资源所用的自然语言,缺省则提供给所有的语言阅读者
     * Content-Length 指明实体正文的长度,十进制数字
     * Content-Type 指明发送给接收者的实体正文的媒体类型
     * Last-Modified 指示资源最后修改日期和时间
     * Expires 响应过期的日期和时间,用于浏览器在一段时间后更新缓存,详情参考[浏览器缓存机制](http://www.baidu.com)