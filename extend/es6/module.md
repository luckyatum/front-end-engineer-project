# module的语法

CommonJs是运行时加载，es6模块加载是编译时加载

```js
// CommonJs
let { stat, readFile, exits } = require('fs');
// es6
import { stat, readFile, exits } from 'fs';
```

上述代码中，CommonJs实质是加载整个fs模块，然后分别加载stat,readFile和exits模块

es6则是从fs中加载这三个方法，而不加载整个fs模块，效率更高，但是因为不是对象，所以无法引用fs

es6模块自动采用严格模式，主要有以下限制：

> * 变量必须声明后再使用
> * 函数参数不能有同名属性
> * 不能使用with语句
> * 不能对只读属性赋值
> * 不能使用0开始的八进制数
> * 不能删除不可删除的属性
> * 不能删除变量delete prop，只能删除属性，delete obj[prop]
> * eval不会在它的外层作用域引入变量
> * eval和arguments不能被重新赋值
> * arguments不会自动反映参数变化
> * 无法使用arguments.callee
> * 无法使用arguments.caller
> * 禁止this指向全局对象
> * 不能使用fn.caller和fn.arguments获取函数调用的堆栈
> * 增加了保留字（static protected interface）

## export命令

模块内部是独立的作用域，外部无法访问模块内部变量和函数；模块可以通过export命令对外提供接口，外部可以通过import命令导入模块

```js
// profile.js
export var fileName = 'name';
export var lastName = 'zhang';
export var age = 12;
// 等价于
export { fileName, lastName, age };
```

优先使用第二种写法，简洁易懂

export不能直接输出值，而是应该输出接口

```js
// 错误写法
export 1; // err
var m = 1;
export m; // err

// 正确写法
export var m = 1;
var m = 1;
export {m};
var n = 1;
export {n as m};
```

export输出的接口与其对应的值应该是动态绑定关系，即通过该接口可以取得模块内部实时的值

```js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上述代码中，模块输出的值在500毫秒后变为了baz，此时外部取到的值应该是baz

CommonJs规范不同，取到的是值的缓存，而不会获得最新的值

## import语法

import存在声明提升

import存在静态优化，在编译时已经将模块导入完毕

任何运行时才能得到结果的表达式用在import上都会出错

```js
// err
let module = 'my_module';
import { foo } from module;
// err
if (x == 1) {
    import { foo } from 'module1';
} else {
    import { foo } from 'module2';
}
```

import会执行所载入的代码

## 模块可以整体加载

模块可以通过*全部加载

```js
// circle.js
export function area() {
    return 'area';
}
export function circumference() {
    return 'test';
}
// 加载
// main.js
import { area, circumference } from './circle.js';
// 使用*全部加载
import * as circle from './circle.js';
console.log(circle.area()); // area
```

模块整体加载所在的对象应该是可以静态分析的。所以不允许运行时改变

```js
import * as area from './circle.js';
// 下面两行不被允许
circle.foo = 'foo';
circle.area = function () {};
```

## export default命令

export default指定导出的默认模块，用户可以任意指定模块名称

```js
// test.js
export default function() {

}
import test from './test.js';
test();
```

上面test.js中默认导出一个函数，import时候可以为该函数指定名称

使用export default导出的模块，在import时候不用加{}，同时导出的时候的名称无法被外部使用

```js
// export.js
export default function foo() {};
// 外部无法使用foo名称，但是外部可以重新指定名称
import bar from './export';

// 下面是两个导出方式对比
export function foo() {}
import { foo } from './export.js';

export default function foo() {}
import foo from './export.js';
```

export default表示模块的默认输出，所以，一个模块只能有一个export default

本质上export default是导出一个default变量

```js
// 下面写法是允许的
import {default as xxx} from './export.js';
// 等同于
import xxx from './export.js';
```

本质上export default是将要导出的变量或者函数赋值给default，所以不能跟声明语句

```js
export default var a = 1; // err
export default 42; // 正确
```

### 所以，export default对外的接口其实就是default

## export和import的复合写法

如果同时引入和导出模块，则可以通过复合写法

```js
// 一般写法
export { foo, bar } from './export.js';
// 等同于
import { foo, bar } from './export.js';
export { foo, bar };

// 接口改名
export { foo as myFoo } from './export.js';

// 整体输出
export * from './export.js';

// 默认接口
export { default } from './export.js';

// 具名接口改为默认接口
export { foo as default } from './export.js';
// 等同于
import { foo } from './export.js';
export default foo;

// 默认接口改为具名接口
export { default as foo } from './export.js';
```

## 模块的继承

模块之间可以继承

```js
// 假设circileplus模块继承了circle模块
// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}
```

上面的circleplus输出了所有的circle模块属性方法，export * 命令会忽略circle模块的default方法

*目前有一个提案是使用import()作为运行时加载

