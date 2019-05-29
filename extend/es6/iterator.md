# Iterator和for...of

js原有表示'集合'概念的有Array和Object，后面es6增加了Set和Map，因此需要一个统一的接口机制来处理不同的数据结构

iterator接口一旦部署了，就可以依次访问某集合的元素

iterator便利过程：

1. 创建一个指针对象，指向当前数据结构的起始位置
2. 第一次调用指针对象的next()方法，指针指向数据结构的第一个成员
3. 第二次调用next()方法，指针指向第二个成员
4. 不断调用next()方法，直到它指向数据结构的结束位置

每次调用next()方法都会返回两个值，分别是遍历成员和done布尔值（用于标识遍历是否已经结束）

es6规定，默认的iterator接口部署在Symbol.iterator属性，也就是说，只要一个数据接口具有Symbol.iterator属性，就可以认为是可遍历的，for...of循环可以遍历

原生部署了Symbol.iterator接口的数据结构有

* Array
* Map
* Set
* String
* TypedArray
* 函数的argument对象
* NodeList对象

[Symbol.iterator]属性会返回一个遍历器，其核心特征就是拥有next()方法，用于遍历成员

