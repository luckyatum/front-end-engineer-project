# 解构赋值

可以直接从数组和对象中提取值

```js
// 数组
let [a, b, c] = [1, 2, 3];
let {name, age} = {
    name: '123',
    age: 12,
    sex: 'none'
}
```

本质上，该写法属于模式匹配，等式两边模式相同就可以赋值，如

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
```

解构不成功的话变量值为undefined

等式两边模式只匹配一部分也可以，称作不完全解构，不匹配部分的变量为undefined

等式右边是不可遍历结构（不具备Iterator接口），将会报错

解构允许指定默认值，解构失败将会使用默认值

```js
var [foo = true] = [];
// foo true
```

es6中只有严格等于undefined才会赋予默认值，变量为null不会使用默认值

如果默认值为一个表达式，只有使用到的时候才会执行，如下：

```js
function f () {
    console.log('aaa');
}
let [x = f()] = [1];
// f不会先执行
```

默认值可以使用变量，该变量必须已经声明

对象的解构可以看作是以下形式：

```js
let {foo: foo} = { foo: 'aaa', bar: 'bbb' };

// 即

let {foo: baz} = { foo: 'aaa', bar: 'bbb' };
baz // 'aaa'
foo // error foo is not defined
```

所以，对象解构赋值真正被赋值的是后面的变量baz

对于已经声明的变量用于解构需要注意，js会将解构语句解析成语句块，所以需要添加表达式符号，如下：

```js
var x = 1;
{x} = {x: 2};
// SyntaxError: syntax error

var x = 3;
({x} = {x: 4});
// x 4
```

解构赋值左边可以不定义任何变量，如：

```js
([] = [true, false]);
```
