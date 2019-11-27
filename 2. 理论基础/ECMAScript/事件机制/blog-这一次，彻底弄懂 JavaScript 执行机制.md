# [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.im/post/59e85eebf265da430d571f89)

小例子

```js
setTimeout(function(){
    console.log('定时器开始啦')
});

new Promise(function(resolve){
    console.log('马上执行for循环啦');
    for(var i = 0; i < 10000; i++){
        i == 99 && resolve();
    }
}).then(function(){
    console.log('执行then函数啦')
});

console.log('代码执行结束');
```

输出：

```js
'马上执行for循环啦'
'代码执行结束'
'执行then函数啦'
// 第一次事件循环结束
'定时器开始啦'
```

同步异步任务导图

![同步异步任务导图](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

任务进入执行栈 -> 判断同步任务还是异步任务 -> 同步任务在主线程执行，异步任务放入event table，注册回掉函数 -> 异步任务完成后，会从event table放入event queue -> 主线程任务全部执行完毕 -> 读取任务队列的结果，进入主线程执行

## 问题：如何得知主线程执行栈是否为空？

js引擎存在monitoring process进程，持续检查主线程执行栈是否为空，一旦为空，就会去event queue中检查是否有等待被调用的函数

```js
let data = [];
$.ajax({
    url: www.xxx.com,
    data: data,
    success: () => {
        console.log('success');
    }
});
console.log('finish');
```

上述代码中

* ajax进入event table，注册回调函数success
* 输出'finish'
* ajax事件完成，回调函数进入event queue
* 主线程从event queue读取回调函数success并执行

```js
setTimeout(() => {
    task();
}, 1000);
sleep(10000000);
```

上述代码执行过程

* task()进入event table并注册，计时开始
* 执行sleep函数
* 3秒到了，计时事件完成，task()进入event queue，但是sleep尚未执行完，继续等待
* sleep执行完毕，task()从event queue进入主线程执行

所以，setTimeout函数其实是经过指定时间后，把回调函数放到event queue中，但是具体执行得看主线程什么时候执行完毕

setInterval函数则是每经过指定时间，就把回调函数放入event queue，同样具体执行时机得等待主线程任务执行完成

## Promise和process.nextTick()

两者均为微任务（micro-task），process.nextTick()是node添加的一个异步计时器

setTimeout和setInterval会进入相同的event queue(主任务,macro-task)

```js
setTimeout(() => {
    console.log('timeout');
}, 1000);

new Promise((resolve) => {
    console.log('resolve');
}).then(() => {
    console.log('then');
});

console.log('finish');
```

上述代码输出：

```js
'resolve'
'finish'
'then'
'timeout'
```

* 先遇到setTimeout，把其回调函数放入event table并注册
* 接下来遇到Promise，new Promise立即执行，then函数分发到微任务event queue
* 遇到console.log(),立即执行
* 此时整体代码作为第一个宏任务执行完毕，开始查看是否存在微任务，发现存在then函数在微任务event queue中，立即执行
* 第一轮事件循环结束，开始第二轮循环，从宏任务event queue开始，发现setTimeout函数，立即执行

```js
// 不当人代码例子
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
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
});

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
});
// 1 7 6 8 2 4 9 11 3 10 5 12
```