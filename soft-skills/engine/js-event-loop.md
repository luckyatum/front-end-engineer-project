# [简单总结下JS中EventLoop事件循环机制](https://www.cnblogs.com/hanzhecheng/p/9046144.html)

js的事件分两种，宏任务（macro-task）和微任务（micro-task）

宏任务，包括整体代码script，setInterval，setTimeout

微任务，Promise.then(非new Promise)，process.nextTick(node);

事件执行顺序,宏任务->微任务,任务分为同步任务和异步任务，同步进入主线程，异步进入Event Table并注册函数，异步事件完成后，会将回调函数放入Event Queue(宏任务和微任务是不同的event queue)中，同步代码执行完成后，会从event queue中拿取函数放入主线程执行，回调函数可能包含不同的任务，所以上述操作会循环执行

下面是包含宏任务，微任务的同步异步代码

```js
setTimeout(() => {
    console.log('settimeout');
});

new Promise((resolve, reject) => {
    console.log('promise');
}).then(() => {
    console.log('then');
});

console.log('finish');
```

首先是setTimeout，放入event table，1秒后放入宏任务的event queue中

new Promise同步代码，直接执行输出'promise',然后遇到微任务then，放入微任务的event queue中

然后执行同步代码输出'finish'

至此，宏任务的主线程执行完毕，然后执行微任务，所以会执行Promise.then，输出'then',第一轮事件循环结束

第二轮事件循环，执行宏任务，即setTimeout的回调函数，输出'settimeout'，然后检查是否有微任务，没有则结束

总结：先执行宏任务的同步代码，遇到异步任务，添加到event queue中，setTimeout放入宏任务的event queue，Promise.then放入微任务的event queue，宏任务同步代码执行完毕后，会检查微任务的event queue中是否存在任务，有的话执行，至此结束第一轮事件循环,然后查看宏任务的event queue是否有未执行的任务，有的话开始第二轮事件循环

第二个例子

```js
console.log('1');
setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
});
```

输出：1 2 4 3 5