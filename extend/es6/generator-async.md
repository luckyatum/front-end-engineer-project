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

Thunk函数是自动执行Generator函数的一种方式

Thunk函数替换函数参数，将多参函数替换成一个只接受回调函数作为参数的单参数函数

```js
// 正常版本的readFile
fs.readFile(fileName, callback);
// Thunk版本的readFile
var Thunk = function(fileName) {
    return function(callback) {
        return fs.readFile(fileName, callback);
    };
};
var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

下面是一个简单的Thunk函数转换器

```js
const Thunk = function(fn) {
    return function(...args) {
        return function(callback) {
            return fn.call(this, ...args, callback);
        }
    }
};
// 使用上述转换器生成fs.readFile的Thunk函数
const readFileThunk = Thunk(fs.readFile);
readFileThunk(fileName)(callback);
```

## Thunk用于Generator函数的自动管理流程

下面是一个可以自动执行的gen

```js
function* gen() {
    // ...
}
var g = gen();
var res = g.next();

while(!res.done) {
    console.log(res.value);
    res = g.next();
}
```

但是，上述代码不适合异步操作，下面是Thunk的例子

```js
var readFileThunk = thunk(fs.readFile);
var gen = function* () {
    var r1 = yield readFileThunk('test.txt');
    console.log(r1.toString());
    var r2 = yield readFileThunk('test2.txt');
    console.log(r2.toString());
}
var g = gen();
var r1 = g.next();
r1.value(function(err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data) {
        if (err) throw err;
        g.next(data);
    })
})
```

变量g是Generator函数的内部指针，表明目前执行到哪一步，next方法负责将指针移动到下一步，并返回该步的信息

上述代码可以发现Generator函数执行过程其实是将同一个回调函数反复传入next方法的value属性

下面是一个基于Thunk函数的Generator执行器的例子

```js
function run(fn) {
    var gen = fn();

    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}

function* g() {}

run(g);
```

上述代码中，run就是一个执行器，内部的Next函数就是Thunk的回调函数，next函数先将指针移到generator函数的下一步（gen.next方法），然后判断Generator函数是否结束（result.done属性），如果没结束，就将next函数再传入Thunk函数（result.value属性），否则就直接退出

## co模块

还没看懂...
