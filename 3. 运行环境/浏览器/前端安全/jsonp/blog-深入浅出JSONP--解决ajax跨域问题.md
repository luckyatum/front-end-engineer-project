# [深入浅出JSONP--解决ajax跨域问题](https://www.cnblogs.com/chopper/archive/2012/03/24/2403945.html)

所有支持JavaScript的浏览器都会使用同源策略

同源指的是域名，协议，端口相同，当不同源的脚本是不会被执行的

## JSONP解决跨域问题

JSONP指的是JSON with Padding（填充），非官方协议，允许在服务端集成Script tags返回值客户端，通过javascript callback的形式实现跨域访问

```html
<!-- 服务端, localhost:8080/test.js -->
<script>
    alert('success');
</script>
<!-- 非同源客户端, localhost:8081 -->
<html>
    <body>
        <script src="localhost:8080/test.js"></script>
    </body>
</html>
```

上述打开客户端页面会弹出success，表示成功执行了服务端的脚本；

事实上script标签的src属性不被同源策略所约束，所以可以获取到任何服务器上脚本并执行

## JSONP实现模式--callback

程序A中的部分代码

```html
<script>
    function callback(data) {
        alert(data.message);
    }
</script>
<script scr="localhost:8080/test.js"></script>
```

程序B中test.js代码

```js
// 调用callback函数，并以json数据形式作为参数传递，完成回调
callback({ message: 'success' });
```

上面就是jsonp的原型，创建一个回调函数，然后在远程服务器上调用这个函数并且将json数据形式作为参数传递，完成回调

一般我们希望可以动态调用script标签，而不是像上面因为固定在html里面没等页面显示就执行了，可以通过js动态创建script标签

```html
<!-- 程序A部分代码 -->
<script>
    function callback(data) {
        alert(data.message);
    }
    // 添加script标签方法
    function addScriptTag(src) {
        var script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.src = src;
        document.body.appendChild(script);
    }

    window.onload = function() {
        addScriptTag("http://localhost:8080/test.js");
    }
</script>
```
