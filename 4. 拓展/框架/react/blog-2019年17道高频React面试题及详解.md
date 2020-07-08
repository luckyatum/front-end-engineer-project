# [2019年17道高频React面试题及详解](https://juejin.im/post/5d5f44dae51d4561df7805b4)

1. 为什么选择框架而非原生？

    框架的好处：

    1. 组件化：React的组件化思想最彻底，甚至达到函数级别的原子组件；高度的组件化使得我们工程易于维护；
    2. 天然分层：jQuery大部分情况下代码耦合严重，现代框架MVC、MVP、MVVM模式都能帮我们进行分层，代码解耦；
    3. 生态：现在主流前端框架都自带生态，不管是数据流管理架构还是UI库都有成熟解决方案；
    4. 开发效率：现代前端框架都默认自动更新DOM，提高开发效率，提高性能；

2. 虚拟DOM的优劣如何？

    优点：

      * 保证性能下限：虚拟DOM可以通过diff找出最小差异，然后批量patch，比起粗暴的操作DOM，性能上要高出不少；
      * 跨平台：虚拟DOM本质上是js对象，而DOM与平台强相关。因此虚拟DOM可以更方便进行一些跨平台的操作，例如服务端渲染、移动端开发；

    缺点：

      * 无法进行极致优化：在一些性能要求极高的应用中虚拟DOM无法针对性的进行极致优化；

3. 虚拟DOM实现原理？

    * 虚拟DOM本质上是js对象，是对真实DOM的抽象；
    * 状态变更时，记录新树和旧树的差异；
    * 最后把差异更新到真正的DOM中；

4. React最新的生命周期是怎样的？

    React16之后有三个生命周期被废弃：

    * componentWillMount;
    * componentWillReceiveProps;
    * componentWillUpdate;

    React16.8之后生命周期分成了三个阶段：挂载阶段、更新阶段、卸载阶段；

    挂载阶段：

    * constructor: 构造函数，可以初始化state和给方法绑定this;
    * getDerivedStateFromProps: 这是个静态方法，当我们接收到新的属性想去修改state时，可以使用；
    * render：render是纯函数，只返回需要渲染的东西；
    * componentDidMount: 组件装载之后调用，此时我们可以获取到DOM节点并操作；

    更新阶段：

    * getDerivedStateFromProps：该方法在每个阶段都有可能调用；
    * shouldComponentUpdate: 返回一个布尔值，为true会触发重新渲染，false表示不会重新渲染；我们通常利用此生命周期来优化React程序性能；
    * render：更新阶段也会触发该函数；
    * getSnapshotBeforeUpdate：在render之后，componentDidUpdate之前调用，这个函数有一个返回值，会作为第三个参数传递给componentDidUpdate；
    * componentDidUpdate：在getSnapshotBeforeUpdate之后调用，一般将对比或计算DOM元素状态的过程写在getSnapshotBeforeUpdate，而在componentDidUpdate中统一更新或者触发回调函数；

    卸载阶段：

    * componentWillUnmount：当我们组件被卸载或者销毁了就会调用，我们可以在这个函数中做一些清除定时器，取消网络请求等等操作；

5. React网络请求应该放在哪个生命周期？

    一般在componentDidMount中请求，特殊情况需要更早请求的话，就放在constructor中；

    注意不要放在componentWillMount，一方面它可能会在某个React版本触发多次，另一方面新的React生命周期已经废弃了该生命周期；

6. setState是异步还是同步？

    1. setState只在合成事件和钩子函数中是异步的，在原生事件和setTimeout中都是同步的；
    2. setState的异步并不是说内部由异步代码实现，其本身执行过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没办法拿到最新的值；
    3. setState的批量更新优化也是建立在异步上的，在异步中如果多次对同一个值进行修改，setState只会执行最后一次；

7. React组件如何通信？

    * 父向子组件通信：父组件向子组件传递props；
    * 子向父通信：props + 回调的方式，父组件传给子组件一个函数，子组件调用该函数就能告诉父组件自己的一些数据；
    * 兄弟组件通信：找到兄弟共同的父节点，结合上面的转发信息进行通信；
    * 跨层级通信：Context的设计是为了共享那些对于组件树而言是全局的数据；
    * 发布订阅事件：通过引入event模块来通信；
    * 全局状态管理工具：Redux或者Mobx通信；

8. React有哪些优化性能的手段？

9. React如何进行组件、逻辑复用？

    * 高阶组件；
    * 渲染属性；
    * react-hooks；

10. mixin、hoc、render props、react-hooks的优劣如何？

11. 