# 函数的扩展

可以为参数指定默认值

参数默认值可以与解构赋值结合起来使用

如果参数是null，默认值不会生效，只有强等于undefined参数才会被赋予默认值

函数参数默认值和解构赋值默认值结合使用需要注意：

```js
// 写法一
function fetch(url, {x = 0, y = 1}) {}
fetch('http://example.com') // 报错

// 写法二
function fetch(url, {x = 0, y = 0} = {})
fetch('http://example.com') // x = 0， y = 0
```

两种写法差别在于，第一种必须指定第二个参数，否则会报错，第二种则不需要，而是如果对象不存在，则赋值空对象，然后对其结构在赋予默认值

一般定义参数默认值的位置应该是尾参数，因为无法显式忽略前面参数不传

指定了函数默认值后，函数的length属性将会返回没有指定默认值的参数个数

指定了函数默认值后，函数进行声明初始化时候，参数会形成一个单独的作用域，初始化结束后作用域会消失

一个关于变量默认值的例子

```js
// 第一个例子
var x = 1;
function foo(x, y = function() { x = 2; }) {
    var x = 3;
    y();
    console.log(x);
};
foo(); // 3
console.log(x); // 1

// 第二个例子
var x = 1;
function foo(x, y = function() { x = 2; }) {
    x = 3;
    y();
    console.log(x);
};
foo(); // 2
console.log(x); // 1
```

上面的第一个例子中，函数参数形成了单独的作用域，先是定义了变量x，然后定义了变量y，y是一个函数，里面的x指向前面的参数x

函数foo内部又定义了一个内部变量x，该变量与第一个参数x不是同一个作用域，所以不是同一个变量，执行y后，内部变量和外部变量的值都没变

如果将var x = 3的var声明去掉（第二个例子），则x指向的是第一个参数x，与匿名函数内部x一致，所以执行y后，x = 2，外部x依然不受影响

利用参数默认值可以指定某个参数不可省略，省略的话就执行函数抛出错误

```js
function throwIfMissing() {
    throw new Error('missing parameter');
}

function foo(mustBeProviced = throwIfMissing()) {
    return mustBeProviced;
}
foo(); // throw missing parameter
```

es6对函数内部设置'use strict'进行了限制，一旦函数参数使用了默认值，解构赋值和扩展运算符(...)，那么函数内部不能显式设置为严格模式

原因在于，函数内部设置严格模式对于函数参数和函数体都适用，但是上述函数参数操作会先于函数体的执行，并且能够成功执行成功，与后面使用严格模式相矛盾，因此索性直接禁用了

函数新增了'name'属性，返回函数名称,es5和es6有些差异

```js
var foo = function() {}; // 将一个匿名函数返回给一个变量
// es5
foo.name; // ''
// es6
foo.name; // foo

var foo = function bar() {}; // 将一个具名函数返回给一个变量
// es5
foo.name; // bar
// es6
foo.name; // bar

(new Function).name; // anonymous

// bind函数绑定的会添加bound前缀
function foo(){};
foo.bind({}).name; // bound foo
```

es6允许使用箭头函数() => {}定义函数

箭头函数函数体内的this就是定义时所在的this，而不是使用时的this

不可以当作构造函数

不可以使用arguments对象，可以使用rest参数代替（...rest，表示多个函数参数）

不可以使用yeild命令，因此箭头函数不能用作generator函数

箭头函数的this指向是由于其内部没有this，所以函数体的this指向的都是外部的this

绑定this，es7提出了新标准，将对象绑定在函数中，如下：

```js
foo::bar
// 等同于
bar.bind(foo); // 左侧foo是对象，右侧bar是函数，该运算符表示把bar函数绑定在foo对象上
```