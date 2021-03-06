# [函数式编程，真香](https://mp.weixin.qq.com/s/8WZGX75DCpX0-K9U5BqFLg)

## 函数式编程的思想

>**函数式编程(FP)通过最小化变化使得代码更易理解**

设计原则

* 可扩展性--我是否需要不断地重构代码来支持额外的功能？
* 易模块化--如果我更改了一个文件，另一个文件是否会受到影响？
* 可重用性--是否有很多重复的代码？
* 可测性--给这些函数添加单元测试是否让我纠结？
* 易推理性--我写的代码是否非结构化严重并难以推理？

>**函数式编程的目的是使用函数来抽象作用在数据之上的控制流和操作，从而在系统中消除副作用并减少对状态的改变**

例如，在网页上输出"hello world"

普通写法

```js
document.querySelector('#msg').innerHTML = '<h1>Hello World</h1>';
```

函数式开发者写法

```js
const printMessage = compose(addToDom('msg', h1, echo));

printMessage('Hello World');
```

上述代码中，echo和h1都是函数，addToDom也是函数，compose函数作用是让函数从最后一个参数顺序执行到第一个参数,也就是一个任务会被拆分成多个颗粒最小的函数，然后通过组合的方式完成任务,比如在改变需求，在控制台连续打印三次"hello world";

```js
var printMessaage = compose(console.log, repeat(3), echo)

printMessage(‘Hello World’)
```

可以看到只是重组了一下函数而已;

函数式编程基本概念

* 声明式编程
* 纯函数
* 引用透明
* 不可变性

声明式编程，函数会描述一系列的操作，但是不会暴露是如何实现的，例如sql语句;

```js
// 命令式方式
var array = [0, 1, 2, 3]
for(let i = 0; i < array.length; i++) {
    array[i] = Math.pow(array[i], 2)
}

array; // [0, 1, 4, 9]

// 声明式方式
[0, 1, 2, 3].map(num => Math.pow(num, 2))
```

纯函数，指没有副作用的函数，相同的输入有相同的输出；
纯函数有如下性质

* 仅取决于提供的输入，不依赖于任何在函数求值或调用间隔时可能变化的隐藏状态和外部状态；
* 不会造成超出作用域的变化，例如修改全局变量或者引用的参数；
