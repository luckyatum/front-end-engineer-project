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

