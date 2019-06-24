# let&const命令

let命令声明的变量，只在代码块中有效

let声明不存在变量提升

let命令会存在暂时性死区（TDZ），也就是一旦语句块中存在某个let声明的变量，那么该语句块就不能提前再访问该变量，如下

```js
var temp = 'aaa';
if (true) {
    console.log(temp); // Uncaught ReferenceError: Cannot access 'temp' before initialization
    let temp = 123;
}
```

let不允许同一个作用域内重复声明同一个变量

let声明创造了块级作用域的概念，块级作用域可以替代匿名立即执行函数的作用

避免在块级作用域中声明函数（es5不支持，但是浏览器支持，严格模式下不支持，es6支持）

const声明一个只读常量，所以声明时候就需要马上赋值

const声明同样不提升，存在暂时性死区，不可重复声明

对于const声明对象，const只是保证变量名指向的地址不变，但是不保证地址的数据不变，所以只能通过Object.freeze方法冻结一个对象，避免修改

冻结对象还需要利用for循环一一冻结其属性

es6新增了let const class import四种声明变量方式，加上var function共六种方式

let const class命令声明的全局变量不属于全局对象的变量

```js
var a = 1;
window.a // 1

let b = 1;
window.b // undefined
```
