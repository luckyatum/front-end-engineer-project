# Promise

Promise是异步编程的一种解决方案

Promise对象的特点：

1. 对象状态不受外界影响，Promise对象有3中状态，Pending(进行中)、Fulfilled(已成功)、Rejected(已失败)，只有异步操作结果可以改变其状态，任何其他操作无法改变其状态
2. 一旦状态改变就不会再变，同时状态改变只有两种可能，Pending -> Fulfilled、Pending -> Rejected，一旦变化就不会再变，此时称为Resolved

Promise是一个构造函数，可以生成一个Promise实例

```js
new Promise(function(resolved, rejected) {});
```

Promise接收一个函数，函数参数分别是resolved和rejected回调函数，resolved函数作用是将Promise对象从pending转变为resolved，异步操作成功时调用；reject函数作用是，将Promise对象状态从pending变成rejected，异步操作失败时调用

Promise实例可以使用then方法分别指定resolved和rejected状态的回调函数

```js
promise.then(function(value) {
    // resolved
}, function(err) {
    // rejected
});
```

Promise.all(),将多个Promise实例包装成一个新的Promise实例

该方法接收一个数组，数组元素是promise实例

```js
var p = Promise.all([p1, p2, p3]);
```

只有p1,p2,p3的状态都变为resolved，p才会变为resolved，一旦其中某一个变成rejected，p状态变为rejected，实例的返回值会传递给p的回调函数

如果p1，p2，p3中某一个定义了catch方法，那么该实例出错不会触发p的catch方法

```js
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
}).then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
}).then(result => result)
.catch(e => {
    console.log(e, 'err');
    return e;
});

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ['hello', '报错了']
```

上述代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的Promise实例，p2实际上指向的是该实例，该实例执行完catch方法后也会变成resolved，导致Promise.all方法参数里面两个实例都变成resolved，因此then回调会被调用，如果p2没有自己的catch方法，那么就会调用p的catch方法，状态也会变成rejected

Promise.race()也是将多个Promise实例包装成一个新的Promise实例

```js
var p = Promise.race([p1, p2, p3]);
```

和all不一样的是，一旦p1，p2，p3中某一个状态改变，p就会跟着改变，p的状态就是率先改变状态的实例的状态

Promise.resolve()，将现有对象转为Promise对象，该方法参数有四种情况：

1. 参数是Promise实例，那么将不做任何修改，直接返回该实例
2. 参数是一个thenable对象，也就是有then方法，那么Promise.resolve会将这个对象转为Promise对象，然后立即执行then方法
3. 参数不具有then方法或者根本不是对象，Promise.resolve返回一个新的Promise对象，状态为resolved
4. 不带有任何参数，直接返回一个resolved状态的Promise对象

Promise.reject()，返回一个新的promsie实例，状态为rejected

```js
var p = Promise.reject('出错了');
// 等同于
var p = new Promise((resolved, rejected) => rejected('出错了'));

p.then(null, function(err) {
    err; // 出错了
});
```

Promise.reject()的参数会原封不动地作为reject的理由变为后续方法的参数，这个与Promise.resolve不同