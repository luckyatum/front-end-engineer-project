# [探索JS引擎工作原理](https://www.cnblogs.com/onepixel/p/5090799.html)

* js引擎核心组件，执行环境栈，全局对象，执行环境，变量对象，活动对象，作用域和作用域链

1. 全局初始化
    * 创建全局对象，该对象属性在任何地方都可以访问，全局对象将Math,String,Date,document等js对象作为属性，然后将自身指向window，js可以通过window名称来访问，代码大致如下
    
    ```js
    var globalObject = {
        Math: {},
        String: {},
        Date: {},
        ...
        window: this
    }
    ```

    * 构建一个执行环境栈(ecStack)，创建一个全局执行环境(ec)，然后将ec压入执行环境栈，作用是为了保证程序按照正确顺序执行，每个函数都有自己的执行环境，每当执行一个函数，该函数的执行环境就会被入栈，并且获得执行权，当这个函数执行完毕，执行环境又会从环境栈删除
    
    ```js
        var ECStack = [];
        var EC = {};
        
        ECStack.push(EC);
        ECStack.pop(EC);
    ```

    * 同时，js引擎还要创建一个与ec关联的全局对象(vo)，并把vo指向全局对象，vo除了包含全局对象的原有属性，还将包括代码执行后新创建的全局对象和函数，每一个定义的函数，自身会添加一个scope属性，该属性指向函数定义所在的环境（函数的scope总是会指向定义时候所在的环境）

    ```js
        ecStack = {
            ec = {
                vo = {
                    ...
                    x = 1,
                    A = function() {},
                    A['scope'] = this
                }
            }
        }
    ```
2. 执行函数A
    当执行函数A时，js引擎会做以下工作
    * 创建A的执行环境ec，入栈并获取执行权，此时环境栈有两个执行环境，分别是全局执行环境和A函数执行环境
    * 创建A的作用域链(sc)，js中，每个执行环境都有自己的作用域链，用于标识符解析，作用域链初始化为当前函数所在scope对象
    * 接着js引擎会创建一个活动对象(ao)，ao包含了函数的形参，arguments对象，this对象，以及局部变量和内部函数的定义，然后ao会被推到作用域链顶端，例如如果A函数内部还有一个B函数，在定义B函数时候，js引擎也会为其创建一个scope属性，该属性指向的就是A函数的ao对象

    ```js
        ecStack = {
            ec(A) = {
                [[scope]]: vo(G),
                ao(A): {
                    y: 1,
                    x: 2,
                    B: function() {},
                    B[[scope]]: this,
                    arguments: {},
                    this: window  函数中的this指向调用者window对象
                },
                scopeChain: <ao(A), A[[scope]]>
            }
            ec(G) = {
                vo(G): {
                    x = 1,
                    A = function() {},
                    A[[scope]] = this
                    ...
                }
            }
        }
    ```

3. 执行函数B
    函数B为函数A的内部函数，同样，执行函数B时候，将创建执行环境ec(B)，然后因为函数A已经执行完毕，所以出栈，ec(B)入栈，然后呢B的scope属性指向的是所在环境的活动对象，也就是ao(A)，同时B也会创建一个活动对象ao(B)，并且把B函数的形参，arguments，this等作为属性，然后再在其scopeChain属性中添加ao(B)表头，此时作用域链为ao(B) -> ao(A) -> vo(G)，当函数B内部执行各种操作，获取变量时候，会沿着作用域链一级一级的查找，最先找到变量的话就返回，如果最后都找不到就返回'undefined'