# [Promise实现原理（附源码）](https://juejin.im/post/5b83cb5ae51d4538cc3ec354)

## Promise基本结构

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('FULFILLED');
    });
});
```

构造函数必须接受一个函数作为参数，称为executor，包含resolve和reject两个参数

定义一个判断一个变量是否为函数的方法

```js
const isFunction = variable => typeof variable === 'function';
```

首先定义一个名为MyPromise的class，接受一个函数handle为参数

```js
class MyPromise {
    constructor (handle) {
        if (!isFunction(handle)) {
            throw new Error('must be a function');
        }
    }
}
```

## Promise的状态和值

promise对象存在三种状态，pending、fulfilled和rejected

状态只能由pending转为fulfilled或者pending转为rejected，一旦状态改变后不会再变化

promise的值是状态改变时传递给回调函数的值
