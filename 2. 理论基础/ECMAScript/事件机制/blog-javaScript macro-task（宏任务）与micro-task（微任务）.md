# [javaScript macro-task（宏任务）与micro-task（微任务）](https://www.jianshu.com/p/6a1932dbbc95)

js使用函数调用栈搞定函数执行问题，使用任务队列（task queue）搞定另外一些代码执行问题

一个线程中，事件循环是唯一的，任务队列是多个的，任务队列分为宏任务和微任务，最新标准称为task与jobs

宏任务包括：script整体代码、setTimeout、setInterval、setImmediate、I/O、UI rendering
微任务包括：process.nextTick、Promise、MutationObserver(h5新特性，用于监听Dom节点改变)

```js
setTimeout(function() {
    console.log('timeout1');
})
new Promise(function(resolve) {
    console.log('promise1');
    for(var i =0; i <1000; i++) {
        i == 99 && resolve();
    }
    console.log('promise2');
}).then(function() {
    console.log('then1');
});
console.log('global1')
```

输出：

```js
'promise1'
'promise2'
'global1'
'then1'
'timeout1'
```

首先，事件循环从宏任务开始，此时宏任务队列只有一个script（整体代码）任务。

当遇到任务源（setTimeout、Promise等）时，会先分发任务到对应的队列中，setTimeout分发到setTimeout队列中，Promise.then分发到微任务的Promise队列中

继续执行，到最后全局任务执行完毕，然后执行所有可执行的微任务，即Promise.then

所有微任务执行完毕，表示第一轮循环结束，开始第二轮循环

先执行宏任务，宏任务中只有一个setTimeout队列待执行，直接执行

至此，代码执行完毕