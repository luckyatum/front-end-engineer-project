# async函数

async就是generator的语法糖，用于解决异步回调地狱问题，它提供了一个将异步操作写成同步写法的机制

aysnc相比generator，主要改进在以下几点：

1. 内置执行器，async函数不需要调用next方法即可全部执行完毕
2. 更好的语义，async表示函数内部有异步操作,await表示操作需要等待
3. 更广的适用性，相比于generator的自动执行器（Thunk和co）必须跟着Thunk函数或者Promise函数，await语句后面可以跟任意类型的数据（普通类型的表达式表示同步执行）
4. 返回值是Promise对象

