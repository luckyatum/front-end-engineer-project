# [Promise深度学习---我のPromise/A+实现](https://www.jianshu.com/p/e7b8147ffc56)

## Promise/A+标准术语（promise是该标准的实现）

1. promise是一个对象或者函数
2. theable是一个定义了then方法的对象或者函数
3. 要判断是不是promise，主要判断：是否有三种状态（pending、fulfilled、rejected），是否含有then方法，是否含有状态转换处理方法

## 一个小栗子

```js
let p = new Promise((resolve, reject) => {
    let x = Math.random();
    if (x > .5) {
        resolve('resolve');
    } else {
        reject('reject');
    }
});
p.then((value) => {
    console.log('fulfilled', value); // fulfilled resolve
}, (err) => {
    console.log('rejected', err); // rejected reject
});
```

## 实现Promise

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(exec) {
    let _this = this;
    _this.value = undefined; // 用来存放value和reason，也就是resolve和reject方法执行时候传入的参数
    _this.status = PENDING; // 将初始状态设置为pending
    _this.onFulfilledCallbacks = []; // 用来存放所有成功的回调函数
    _this.onRejectedCallbacks = []; // 用来存放所有失败的回调函数

    try {
        exec(resolve, reject); // 调用执行函数，将resolve和reject方法作为参数传入
    } catch(e) {
        reject(e); // 若执行函数中存在异常直接用抛出的值来拒绝promise
    }

    function resolve(value) {
        setTimeout(function() {
            if (_this.status === PENDING) {
                // 确保状态只会改变一次
                _this.status = FULFILLED; // 改变状态
                _this.value = value;
                _this.onFulfilledCallbacks.forEach(cb => cb(_this.value));  // 每次转换状态都会执行一遍所有的回调函数
            }
        })
    }
    function reject(reason) {
        setTimeout(function() {
            if (_this.status === PENDING) {
                _this.status = REJECTED;
                _this.value = reason;
                _this.onRejectedCallbacks.forEach(cb => cb(_this.value));  // 每次转换状态都会执行一遍所有的回调函数
            }
        });
    }
}
// then函数实现
Promise.prototype.then = function(onFulfilled, onRejected) {
    // 保证then函数的两个参数必须是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};

    let _this = this, promise2;

    if (_this.status === PENDING) {
        return promise2 = new Promise(function(resolve, reject) {
            // 存储then方法绑定的回调函数
            _this.onFulfilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            _this.onRejectedCallbacks.push((reason) => {
                try {
                    let x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
}
```
