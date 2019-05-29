# Set和Map数据结构

## Set

set是一个类似数组的结构，但是其成员都是唯一的

```js
var s = new Set();
[2, 3, 5, 4, 2, 2, 4].forEach(x => s.add(x));
s // [2, 3, 5, 4]
```

add()方法可以向set结构添加成员，Set结构不会添加重复的成员

Set函数可以接受一个数组（或者一个具有iterator接口的对象）作为初始化

```js
var s = new Set([1, 2, 3, 2, 4]);
s // [1, 2, 3, 4]
s.size // 4
```

通过size属性可以获取到Set结构的数量

Set内部不会对参数进行类型转换，所以5和'5'是不一样的数值，其内部使用的判断算法类似===，唯一区别是NaN等于自身

两个对象是永远都不相等的

Set实例的方法：操作方法、遍历方法

4个操作方法：

1. add();添加某个值，返回set本身
2. delete();删除某个值，返回一个布尔值，表示是否删除成功
3. has();返回一个布尔值，表示参数是否是Set的成员
4. clear();清除所有成员，没有返回值

Array.from()方法可以将set转为数组

```js
var s = new Set([1, 2, 3]);
Array.from(s); // [1, 2, 3]

// 数组去重方法
var arr = [1, 2, 3, 2, 3, 4, 5, 1, 3];
Array.from(new Set(arr)); // [1, 2, 3, 4, 5]
```

4个遍历方法：

1. keys();返回键名的遍历器
2. values();返回键值的遍历器
3. entries();返回键值对的遍历器
4. forEach();使用回调函数遍历每个成员

Set遍历顺序和插入顺序一致，同时由于Set没有键名，所以keys()和values()行为完全一致

```js
let arr = ['red', 'green', 'blue'];
let s = new Set(arr);
s // ['red', 'green', 'blue']
s.keys(); // ['red', 'green', 'blue']
s.values(); // ['red', 'green', 'blue']
s.entries(); // [['red', 'red'], ['green', 'green'], ['blue', 'blue']]
```

上面可见entries()返回的键值对成员完全一样，值得注意的是，上述三个遍历方法返回的都是Interator接口对象，必须使用for...of将其便利出来

遍历的扩展，由于...运算符内部使用for...of，所以可以用其遍历set集合

```js
let arr = ['red', 'green', 'blue'];
let s = new Set(arr);
let arr2 = [...set];
arr2; // ['red', 'green', 'blue']
```

而且数组的filter和map也可用于Set

```js
let set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
set // [2, 4, 6]
```

所以Set可以很方便实现并集，交集和差集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
// 并集
let union = new Set([...a, ...b]);
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
```

WeakSet，和Set类似，但是有两个区别，一个是WeakSet的成员只能是对象，另一个是WeakSet里面的对象引用都是弱引用，垃圾回收机制不会考虑是否该对象还在WeakSet中被引用，一旦其他对该对象的引用已经消失，那么对象会被回收

由于WeakSet的特点，所以可能在垃圾运行机制运行前后，一个WeakSet成员可能是不一致的，所以标准规定WeakSet不能遍历，该特点同样适用于WeakMap

WeakSet是一个构造函数，其参数可以是一个具有iterator接口的对象，同时该对象的成员也必须是对象

```js
var arr = [[1, 2], [3, 4]];
var ws = new WeakSet(arr);
ws; // {[1, 2], [3, 4]}

// 如果数组成员不是对象，会出错
var arr2 = [1, 2];
var ws2 = new WeakSet(arr2); // error
```

WeakSet的一个用处是存储Dom节点，而不用担心这些节点从文档移除时引发内存泄露

```js
// 另一个WeakSet用法
const foos = new WeakSet()
class Foo {
    constructor() {
        foos.add(this);
    }
    method() {
        if (!foos.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用')
        }
    }
}
```

上面代码保证了Foo的实例方法只能在Foo实例上调用，这里使用WeakSet的好处是，数组foos对实例的引用不会被计入内存回收机制，所以删除实例的时候不用考虑foos，也不会出现内存泄漏

## Map

Map数据结构类似对象，但是其键的范围不限于字符串，也就是说，Object提供了"字符串-值"的集合，而Map提供了"值-值"的集合

```js
const m = new Map();
const o = {p: 'hello world'};

m.set(o, 'content');
m.get(o); // content
```

Map作为构造函数，可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组

```js
const map = new Map([
    ['name', '张三'],
    ['age', 12]
]);
map.get('name'); // 张三
map.has('age'); // true
```

实际上任何的具有iterator接口的双元素数组的数据结构都可以做Map的参数

Map对于对象的键，只有在相同内存地址的对象才被当作是同一个键

```js
var o1 = ['1'];
var o2 = ['1'];
var m = new Map();
m.set(o1, 111);
m.set(o2, 222);
m.get(o1); // 111
m.get(o2); // 222
```

如果Map的键是简单类型的值，那么，-0和0会被当作是同一个，NaN也被当作是同一个

Map的实例方法和属性：

map.size;返回Map结构的成员总数

set(key, value);设置Map的键值对，然后返回整个Map结构

get(key);返回对应key值的键值，找不到返回undefined

has(key);返回布尔值，表示key值对应的键名是否存在Map中

delete(key);删除某个键，返回布尔值表示是否删除成功

clear(); 清除所有成员

Map的遍历方法：

keys()、values()、entries()和forEach()

Map的遍历顺序就是插入顺序

Map结构转为数组的快速方法

```js
const map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);
[...map.keys()]; // [1, 2, 3]
[...map.values()]; // ['one', 'two', 'three']
```