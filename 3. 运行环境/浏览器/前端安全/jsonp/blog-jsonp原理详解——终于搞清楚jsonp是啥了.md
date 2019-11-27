# [jsonp原理详解——终于搞清楚jsonp是啥了](https://blog.csdn.net/hansexploration/article/details/80314948)

ajax跨域请求普通文件存在跨域无权限访问的问题

拥有src属性的标签基本不受跨域影响，img,script,iframe

所以可以在远程服务器上设法把数据装进js格式的文件里，供客户端调用

也就是web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（也就是等于回调函数里面的res数据）

客户端在对json格式文件调用成功后，获得了所需数据，这种获取远程数据方式类似ajax，但是不一样

为了便于客户端使用数据，上述方案逐渐成为非正式传输协议，该协议要点是允许用户传递一个callback参数给客户端，然后客户端返回数据时会将这个callback参数作为函数名来包裹住json数据，客户端就可以拿到json数据了

## 具体实现

1. 定义服务端和客户端页面代码

    ```js
    // 远程服务器remoteserver.com根目录下有个remote.js
    alert('success');
    ```

    ```html
    <!-- 本地服务器localserver.com下有个jsonp.html -->
    <html>
        <head>
            <script src="http://remoteserver.com/remote.js"></script>
        </head>
    </html>
    ```

    这是可以调用成功的，页面弹出success

2. 客户端页面定义一个函数，服务端传入数据进行调用

    ```html
    <!-- 本地服务器localserver.com下有个jsonp.html -->
    <html>
        <head>
            <script>
                var localHandler = function (data) {
                    alert('我是本地函数，可以被跨域的remote.js文件调用，远程js带来的数据是：' + data.result);
                };
            </script>
            <script src="http://remoteserver.com/remote.js"></script>
        </head>
    </html>
    ```

    ```js
    // 远程服务器remote.js代码如下
    localHandler({ result: "我是远程js带来的数据" });
    ```

    运行后也是成功，并且拿到了远程js的数据

3. 服务端如何得知调用的是那个函数？为了解决这个问题，服务端的js脚本变成了动态生成的，调用者可以通过传一个参数过去服务端，告知服务端需要生成一段调用xxx函数的js代码，于是服务器就可以按照客户端的需求来生成js脚本并响应了

    ```html
    <!-- 客户端jsonp.html页面代码 -->
    <html>
        <head>
            <script>
                var flightHandler = function(data) {
                    alert('您查询的航班结果是：票价 ' + data.price + ' 元', '余票 ' + data.tickets + ' 张。');
                };
                // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
                var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
                // 创建script标签，设置其属性
                var script = document.createElement('script');
                script.setAttribute('src', url);
                // 把srcipt标签加入head，此时调用开始
                document.getElementsByTagName('head')[0].appendChild(script);
            </script>
        </head>
    </html>
    ```

    服务端动态生成一段js代码并返回给前端，里面调用了前端所传过来的callback函数并且把结果数据作为该函数的参数传递进去

