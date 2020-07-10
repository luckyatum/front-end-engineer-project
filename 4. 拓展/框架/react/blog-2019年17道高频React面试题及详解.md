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
    * render props
    * react-hooks；

10. mixin、hoc、render props、react-hooks的优劣如何？

    Mixin的缺陷：

    * 组件与Mixin之间存在隐式依赖（Mixin依赖组件的某个方法，但是定义时并不知道这种依赖）
    * 多个Mixin之间存在冲突（比如定义了相同的State字段）
    * Mixin倾向于增加更多状态，降低了应用的可预测性；
    * 隐式依赖导致依赖关系不透明，维护成本和理解成本增加；

    HOC相比Mixin的优势：

    * HOC通过外层组件通过props影响内层组件的状态，而不是直接改变其state，不存在冲突干扰；
    * 不同于Mixin的打平+合并，HOC具有天然的层级结构；

    HOC的缺陷：

    * 扩展性缺陷：HOC无法从外部访问子组件的State因此无法通过shouldComponentUpdate滤掉不必要的更新；
    * Ref传递问题：Ref被隔断；
    * Wrapper Hell：HOC可能出现多层包裹组件的情况；
    * 命名冲突：如果高阶组件多层嵌套，没有使用命名空间的话会产生冲突；
    * 不可见性：HOC相当于在原有组件外层再包装一个组件，无法得知外层的包装是啥；

    Render Props优点：

    * 上述HOC缺陷Render Props都可以解决；

    Render Props缺陷：

    * 使用繁琐：HOC使用只需要借助装饰器语法通常一行代码即可复用；
    * 嵌套过深：Render Props虽然摆脱了组件多层嵌套的问题，但是转化为了函数回调的嵌套；

    React Hooks优点

    * 简洁：解决了HOC和Render Props的嵌套缺陷；
    * 解耦：可以更方便地做到UI和状态分离，做到更彻底的解耦；
    * 组合：Hooks中可以引用另外的hooks形成新的Hooks，千变万化；
    * 函数友好：为函数组件而生，从而解决了类组件的几大问题：

        * this指向错误；
        * 分隔在不同的生命周期中的逻辑使得代码难以维护；
        * 代码复用成本高（高阶组件容易使代码量剧增）；

    React Hooks缺点

    * 额外的学习成本；
    * 写法上有限制，不能出现在条件、循环中，并且写法限制增加了重构成本；
    * 破坏了PureComponent、React.memo浅比较的性能优势；
    * 在闭包场景可能会引用到旧的state、props；
    * 内部实现上不直观；
    * React.memo不能完全替代shouldComponentUpdate；

11. 如何理解fiber？

    fiber是一种基于浏览器的单线程调度算法；

    React16之前，reconcilation算法实际上是递归，想要中断递归比较困难，React16开始用循环来代替递归；

    fiber：一种将reconcilation拆分成无数个小任务的算法，可以随时停止、恢复；

12. Redux工作流程？

    核心概念：

    * Store：保存数据的地方，整个应用只能有一个Store;
    * State: Store对象包含所有数据，如果想得到某个时点的数据，就要对Store产生快照，这种时点的数据集合，就叫做State；
    * Action: State的变化，会导致View的变化。但是，用户接触不到State，只能接触View，所以，State的变化必须是View导致的，Action就是View发出通知，表示State要发生的变化；
    * Action Creator: View要发送多少种消息，就会有多少种Action；如果都手写，会很麻烦；所以我们定义一个函数来生成Action；
    * Reducer：Store收到Action以后，必须给出一个新的State，这种Store的计算过程就叫Reducer；
    * dispatch: 是View发出Action的唯一方法；

    工作流程：

    * 用户通过View发出Action，使用dispatch方法；
    * Store自动调用Reducer，传入两个参数：State和收到的Action，Reducer会返回新的State；
    * State一旦有变化，Store就会调用监听函数，来更新View;
