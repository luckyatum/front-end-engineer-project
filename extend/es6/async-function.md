# async函数

async就是generator的语法糖，用于解决异步回调地狱问题，它提供了一个将异步操作写成同步写法的机制

aysnc相比generator，主要改进在以下几点：

1. 内置执行器，async函数不需要调用next方法即可全部执行完毕
2. 更好的语义，async表示函数内部有异步操作,await表示操作需要等待
3. 更广的适用性，相比于generator的自动执行器（Thunk和co）必须跟着Thunk函数或者Promise函数，await语句后面可以跟任意类型的数据（普通类型的表达式表示同步执行）
4. 返回值是Promise对象

async函数返回Promise对象，可以使用then方法添加回调函数

```js
async function getStockPriceByName(name) {
    var symbol = await getStockSymbol(name);
    var stockPrice = await getStockPrice(symbol);
    return stockPrice;
}
getStockPriceByName('goog').then(res => {
    console.log(res);
});
```

async函数return的值，会作为then函数的回调函数的参数

async函数内部抛出的错误，会使得返回的Promise对象变为reject状态，抛出的错误对象会被catch方法回调函数接收到

async函数返回的Promise对象必须等到内部所有await命令后面的Promise对象执行完才会发生状态改变，除非遇到return语句或者抛出错误

## await命令

正常来说，await命令后面是一个Promise对象，如果不是，会被转成一个立即resolve的Promise对象

```js
async function f() {
    return await 123;
}
f().then(v => console.log(v));
// 123
```

如果await命令后面的Promise对象变为reject状态，则reject的参数会被catch方法的回调函数接收到

```js
async function f() {
    await Promise.reject('error');
}
f().then(v => console.log(v)).catch(e => console.log(e));
// error
```

只要一个await的Promise状态变为reject，那么整个async函数都会中断执行，可以在await中放入try...catch操作，这样不管成功与否，都不会中断async

```js
async function f() {
    try {
        await Promise.reject('err');
    } catch(e) {
        console.log(e);
    }
    return await Promise.resolve('continue');
}

f().then(r => console.log(r)).catch(e => console.log('e', e));
```

另一种方法是在await后面添加一个catch方法，处理前面的错误

```js
async function f() {
    await Promise.reject('err').catch(e => console.log(e));
    return await Promise.resolve('hello world');
}
f().then(r => {
    console.log(r);
});
// 出错了
// hello world
```

让多个独立的await同时触发

```js
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise
```

async函数原理，就是将generator函数和自动执行器包装在一个函数里

```js
async function fn(args) {
    // ...
}
// 等同于
function fn(args) {
    return spawn(function*() {
        // ...
    })
}
// spawn就是自动执行器
function spawn(genF) {
    return new Promise(function(resolve, reject) {
        var gen = genF();
        function step(nextF) {
            try {
                var next = nextF();
            } catch(e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(function(v) {
                step(function() {
                    return gen.next(v);
                })
            }, function(e) {
                step(function() {
                    return gen.throw(e);
                });
            });
        }
        step(function() {
            return gen.next(undefined);
        });
    });
}
```