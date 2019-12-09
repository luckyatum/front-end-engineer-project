# module加载的实现

## 浏览器加载模块

浏览器加载es6模块也使用script标签，在script标签加入type="module"属性

```js
<script type="module" scr="foo.js">
import util from './util.js';
</script>
```

type="module"的模块都是异步加载的，不会造成渲染阻塞，等同于打开了defer属性（defer属性和async属性差别在于，前者是页面渲染完成后，即触发了onready事件后才执行脚本，而async则在脚本下载完成后阻塞渲染然后执行）

type="module"的脚本有以下特点：

> * module脚本的代码作用域是在模块中的，外部脚本无法获取到script标签里面定义的顶层变量
> * 模块脚本使用严格模式
> * 模块中可以使用import命令加载其他模块，也可以使用export输出接口（es6模块语法）
> * 模块中，顶层this返回undefined
> * 同一个模块加载多次，将只执行一次

## CommonJs和es6模块的差异

CommonJs模块输出的是一个值的复制，es6模块是值的引用
CommonJs是运行时加载，es6模块是编译时输出接口

es6模块的接口是只读的，无法对其进行改写，但是如果接口是一个对象，那么可以为其添加属性值

```js
import { obj } from 'objModule';
obj.prop = '1'; // 正确
onj = 2; // err
```

## Node环境加载es6模块

因为Node有自己的CommonJs模块加载规则，所以在node环境中，一旦检测到存在import或者export语句，将会以es6模块来解析（编译时加载）

```js
export {}
```

所以可以在代码中加入上述语句，这样即使别的地方没有使用es6模块，node也会以es6模块规则来解析

## import命令加载CommonJs模块

在node环境中，使用import加载CommonJs模块，node会自动将module.exports属性当作模块的默认输出

## require命令加载es6模块

使用require命令加载es6模块，所有的输出接口都会成为输入对象的属性

```js
// es.js
let foo = { bar: 'my-default' };
export default foo;
foo = null;

// cjs.js
const es_module = require('./es');
console.log(es_module.default);
// { bar: 'my-default' }
```

上述代码，default变成了es-module的属性，然后es内部的变化也没有反映在cjs上

## CommonJs循环加载

项目中很可能会出现模块a加载模块b，模块b又加载模块a的情况，这就是循环加载

CommonJs加载原理：一个模块就是一个脚本文件，require命令第一次加载该模块时候，先执行整个脚本，然后在内存中生成一个对象，所以，CommonJs模块只会执行一次

所以，CommonJs会在脚本被require时候执行，而一旦出现循环加载情况，只会输出执行完毕部分，未执行完的部分不会输出

```js
// a.js
exports.done = false;
var b = require('./b.js');
exports.done = true;
```

上述代码中，先是输出done = false，然后加载b.js，此时等待b执行

```js
// b.js
exports.done = false;
var a = require('./a.js');
exports.done = true;
```

b执行，又加载a，此时a的done是false，然后b执行完毕，执行权再次回到a，a继续往下执行

因此，由于循环加载的存在，模块的返回值可能会不一致，下面的写法也是比较危险的

```js
var foo = require('./a.js').foo; // 危险写法
var a = require('./a.js'); // 安全写法
```

## es6循环加载

es6循环加载与CommonJs有本质区别

```js
// a.js
import { bar } from './b.js';
console.log('a.js');
console.log(bar);
export let foo = 'foo';

// b.js
import { foo } from './a.js';
console.log('b.js');
console.log(foo);
export let bar = 'bar';

// 最后输出
// b.js
// undefined
// a.js
// bar
```

上述代码中，构成循环加载，a.js先执行，然后直接加载b，所以执行b，b加载a，但是a已经开始执行，所以不会重复执行，所以b继续执行，输出'b.js'，然后是foo，此时的foo是undefined，然后b执行完毕，a继续执行，输出a.js然后输出bar
