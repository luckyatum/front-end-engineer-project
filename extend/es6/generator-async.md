# generator函数的异步应用

传统异步编程方式

* 回调函数
* 事件监听
* 发布/订阅
* Promise对象

Generator将异步编程带入全新阶段

## 协程异步generator实现

所谓协程，是单线程编程中一种异步解决方案，A函数获得执行权，某时间点，A会交出函数执行权，B函数执行，一段时间后，执行权会继续交还给A，A继续执行剩下代码

Generator函数可以实现简单的协程

```js
function* gen() {
    // ...
    yield someAsyncTask();
    // ...
}
```

协程遇到yield表达式就暂停，交出函数执行权，直到外部再次调用next函数，再次获得执行权，最大优点就在于代码跟同步代码一样

## 使用generator封装一个真正的异步任务

```js
var fetch = require('node-fetch');

function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}
// 执行上述方法
var g = gen();
var result = g.next();
return result.value.then(function(data) {
    return data.json();
}).then(function(data) {
    g.next(data);
});
```

上面代码先是定义了一个generator函数，然后使用next()执行里面的yield后面的代码，由于fetch函数返回一个Promise对象，所以需要使用.then执行后面代码，最后再次执行next方法，把结果传回到gen函数

## Thunk函数

还没看懂...

## co模块

还没看懂...
