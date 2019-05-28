# 数组的扩展

扩展运算符(...)，主要作用在于将数组分割成逗号分隔的变量

```js
console.log(...[1, 2, 3]);
// 1 2 3
```

该运算常用于将数组用于参数列表，可以替代原先的apply用法

```js
// 使用max求参数中的最大值
// es5写法
Math.max.apply(null, [2, 3, 4]);
// es6写法
Math.max(...[2, 3, 4]);

// 将一个数组放进另一个数组尾部
// es5写法
Array.prototype.push.apply([1, 2, 3], [4, 5, 6]);
// es6写法
[1, 2, 3].push(...[4, 5, 6]);

// 数组合并新写法
// es5
[1, 2, 3].concat(more);
// es6
[1, 2, 3, ...more];

// 和解构赋值结合使用，生成新数组
[a, ...arr1] = [1, 2, 3, 4, 5];
arr1 // [s2, 3, 4, 5]

// 把字符串拆分成数组
...'hello' // ['h', 'e', 'l', 'l', 'o']
```

任何实现了iterator接口的对象都可以使用扩展运算符

Array.from方法把类数组转换为数组，只需要对象有length属性

```js
// 类数组的对象转化成数组
let arrayLikeObj = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
}
// es5
Array.prototype.slice.call(arrayLikeObj);
// es6
Array.from(arrayLikeObj);
```

Array.from可以接受第二个参数，接受一个函数，作用类似于map，即使用第一个参数转换后的数组，再对数组进行map处理后返回新数组

Array.of()用于将参数值转化为数组

```js
Array.of(1, 2, 3);
// [1, 2, 3]
```

## 数组实例的方法

(new Array()).copyWithin()，表示从数组内部某个位置开始，复制指定长度的内容到目标位置

copyWithin接受三个参数，分别是target(要改变的目标位置)，start，end表示复制开始和结束的位置

```js
[1, 2, 3, 4, 5].copyWithin(0, 3);
// [4, 5, 3, 4, 5]
```

上述例子表示，从数组的第3序号开始到结束，其中的内容（[4, 5]）将复制到序号0开始的位置

(new Array()).find()和findIndex()，find用于找出数组第一个符合条件的成员，参数是一个函数，找不到返回undefined，findIndex则返回第一个符合条件的成员的序号，找不到返回-1

```js
[1, -5, 3].find((i) => {
    return i < 0;
});
// -5

[1, -5, 3].findIndex((i) => {
    return i < 0;
});
// 1
```

上述两个方法都可以接受第二个参数，用于绑定第一个函数参数的this对象

findIndex方法可用于识别NaN，利用的是Object.is()函数

```js
[NaN].indexOf(NaN); // -1
[NaN].findIndex((i) => {
    Object.is(NaN, i);
});
// 0
```

fill()方法使用给定值填充一个数组

```js
[1, 2].fill(7);
// [7, 7]

[1, 2, 3].fill(7, 1, 2); // 可以指定开始和结束位置（结束位置不包含在替换中）
// [1, 7, 3]
```

entries()、keys()和values()，三个方法都是返回一个遍历器对象，可用for...of对其进行遍历

```js
for(let i of [2, 3, 4].keys()) {
    i;
    // 0
    // 1
    // 2
}

for(let i of [2, 3, 4].values()) {
    i;
    // 2
    // 3
    // 4
}

for(let i of [2, 3, 4].entries()) {
    i;
    // [0, 2]
    // [1, 3]
    // [2, 4]
}
```

includes(),返回数组是否包含某个值

该方法对比indexOf方法的好处是：1.更加语义化；2.不会造成对NaN值的误判

