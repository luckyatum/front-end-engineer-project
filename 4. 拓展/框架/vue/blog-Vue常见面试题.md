# [30 道 Vue 面试题，内含详细讲解（涵盖入门到精通，自测 Vue 掌握程度）](https://juejin.im/post/5d59f2a451882549be53b170)

1. 说说对spa单页面的理解，它的优缺点分别是什么？

    spa指的是仅在页面初始化的时候加载相应的html、js、css。后续不会因为用户的操作而进行页面的跳转和重新加载，取而代之的是使用路由机制实现的html内容的变换。

    优点：

      * 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的重复渲染和请求；
      * 对服务器压力相对来说减小；
      * 前后端职责分离，前端进行逻辑交互，后端负责数据处理；

    缺点：

      * 初次加载耗时多，需要一次加载所有的js、css，但是可以在代码层面解决，比如按需加载；
      * 不利于seo，所有内容在一个页面动态替换显示；
      * 导航不可用，需要自己实现前进、后退；

2. v-show和v-if的区别

    v-if是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件被销毁与重建，而且是惰性的；

    v-show则简单很多，不管初始条件如何，元素总是会被渲染，并且只是简单的修改display属性；

    所以，v-if适用于不频繁地切换条件的场景，v-show则适用于需要非常频繁切换的场景；

3. Class和Style如何动态绑定？

    可以通过对象语法和数组语法进行动态绑定：

    * 对象语法

    ```js
      <div v-bind:class="{ active: isActive, 'text-danger': hasError }"></div>

      data: {
        isActive: true,
        hasError: false
      }

      <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

      data: {
        activeColor: 'red',
        fontSize: 30
      }
    ```

    * 数组语法

    ```js
      <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>

      data: {
        activeClass: 'active',
        errorClass: 'text-danger'
      }

      <div v-bind:style="[styleColor, styleSize]"></div>

      data: {
        styleColor: {
          color: 'red'
        },
        styleSize:{
          fontSize:'23px'
        }
      }
    ```

4. 怎么理解Vue的单向数据流？

    所有的prop都使得其父子prop之间形成了一个单行向下绑定，父prop的更新会向下流动到子组件中，但是反过来则不行（子组件不能改变父组件的prop值）；

    这是为了防止子组件意外改变父级组件的状态，从而导致你的应用数据流向难以理解；

    子组件想要修改父组件状态，需要emit一个事件，再在父组件中监听该事件进行数据修改；

5. computed和watch的区别和应用场景?

    * computed: 是计算属性，依赖其他属性值，并且computed的值有缓存，只有它依赖的属性值发生改变，下一次computed的值才会重新计算；
    * watch: 更多的是观察的意思，类似于某些数据的监听回调，每当监听的数据变化时会执行的回调函数；

    当我们需要进行数值计算，并且依赖于其他数据时，应该使用computed；

    当我们需要在数据变化时执行异步或开销较大的操作时，应该使用watch，watch允许我们执行异步操作，限制我们执行该操作的频率，并在我们得到最终结果前设置中间状态；

6. 直接给一个数组项赋值，Vue能监听的到吗？

    Vue没办法监听到下面的数组改动：

      * arr[index] = newValue;
      * arr.length = newLength;

    第一个问题可以使用下面方法解决：

    ```js
      // Vue.set
      Vue.set(vm.items, indexOfItem, newValue);

      // Vue.$set，其实就是Vue.set的别名
      Vue.$set(vm.items, indexOfItem, newValue);

      // Array.prototype.splice
      vm.items.splice(indexOfItem, 1, newValue);
    ```

    第二个问题可以使用下面的方式：

    ```js
      // Array.prototype.splice
      vm.items.splice(indexOfItem, 1, newValue);
    ```

7. 谈谈Vue的生命周期？

    * 生命周期是什么？

      Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载DOM -> 渲染、更新 -> 渲染、卸载等一系列过程，称为Vue的生命周期；

    * 生命周期的作用是什么？

      beforeCreate: 组件实例创建之前，属性生效之前；

      created：组件实例已经创建，属性也绑定了，但真实DOM还没生成，还无法操作dom；

      beforeMount: 在挂载之前调用，相关的render函数首次被调用；

      mounted: 挂载完成，可以获取到dom节点；

      beforeUpdate: 组件数据更新之前调用，发生在虚拟DOM打补丁之前；

      updated: 组件更新之后；

      activated: keep-alive专属，组件被激活时调用；

      deactivated: keep-alive专属，组件被销毁时调用；

      beforeDestroy: 组件销毁前调用；

      destroyed: 组件销毁后调用；

8. Vue父组件和子组件生命周期钩子函数执行顺序？

    * 加载渲染过程

      父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子beforeMount -> 子mounted -> 父mounted；

    * 子组件更新过程

      父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated

    * 父组件更新过程

      父beforeUpdate -> 父updated

    * 销毁过程

      父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed;

9. 在哪个生命周期调用异步请求？

    可以在钩子函数created、beforeMounted、mounted中调用，因为这时候data已经创建，可以从接口拿到值直接赋值给data。

10. 在什么阶段能访问操作Dom?

    在钩子函数被调用前，Vue已经将编译好的模板挂载到页面上，所以在mounted阶段可以访问Dom。

11. 父组件如何监听子组件的生命周期？

    ```js
      // 父组件
      <Child @mounted='doSomething'>

      // 子组件
      mounted () {
        this.$emit('mounted');
      }
    ```

    也就是说，只有子组件主动emit事件出来，父组件才可以监听到；

    还有更简单的方法，父组件通过@hook来监听：

    ```js
      // 父组件
      <Child @hook:mounted='doSomething'>

      doSomething() {
        console.log('父组件监听到 mounted 钩子函数 ...');
      },

      // 子组件
      mounted () {
        console.log('子组件触发 mounted 钩子函数 ...');
      }

      // 子组件触发 mounted 钩子函数 ...
      // 父组件监听到 mounted 钩子函数 ...
    ```

12. 谈谈你对keep-alive的理解？

    keep-alive是Vue内置的一个组件，可以使得被包含的组件保留状态，避免被重新渲染。

    * 一般结合路由和动态组件一起使用，用于缓存组件；
    * 提供include和exclude属性，两者都支持字符串或正则，include表示只有名称匹配的组件会被缓存，exclude表示任何名称匹配的组件都不会被缓存，exclude优先级较高；
    * 两个钩子函数activated和deactivated，当组件被激活时，触发钩子函数activated，当组件被移除时，触发钩子函数deactivated;

13. 组件中data为什么是一个函数？

    因为组件是复用的，而且js对象是引用关系，如果组件的data是一个对象，那么作用域没有隔离，子组件的data会互相影响；函数的话则不会有该问题；

14. v-model的原理？

    v-model主要用于在表单元素中创建双向绑定数据，v-model不过是语法糖，v-model在内部为不同的元素使用不同的属性，抛出不同的事件：

    * text和textarea元素使用value属性和input事件；
    * checkbox和radio使用checked属性和change事件；
    * select字段将value作为Prop并将change作为事件；

    如果是自定义组件的话，会使用名为value的prop和名为Input的事件；

15. Vue组件间通信有哪几种方式？

    Vue通信主要有三种：父子组件通信，隔代组件通信，兄弟组件通信；

    * props / $emit 父子组件通信
    * ref与$parent / $children 父子组件通信

      通过给子组件绑定ref属性，可以直接在父元素通过this.$ref获取到子组件的实例，并且调用其方法和属性；

    * EventBus ($emit / $on) 适用于父子、隔代、兄弟组件通信
    * $attrs / $listeners 隔代组件通信

      解决A -> B -> C的多层组件嵌套传值问题，只要在B组件上添加$attr和$listeners属性，即可将A的属性传递下去给到C

    * provide / inject 隔代组件通信

      祖先组件通过provide属性提供变量，子孙组件中通过inject来注入变量。它的应用场景主要是为子组件获取上级组件提供可能；

    * Vuex 适用于父子、隔代、兄弟组件通信

16. 你使用过Vuex吗？

    Vuex是一个专为vue.js提供应用程序状态管理的模块；Vuex核心是一个store，里面存储所有的应用数据；

    Vuex的状态存储是响应式的，当Vue组件从store中读取状态时，若store状态发生变化，相应的组件也会得到高效更新；

    改变Vuex的store唯一办法就是提交commit(mutation)，这是为了便于追踪每一个状态的变化；

    主要包含以下模块：

    * State: 定义了应用状态的数据结构，设置应用的初始状态；
    * Getter: 允许组件从store中获取数据，mapGetters辅助函数仅仅是将store的getter映射到计算属性；
    * Mutation: 唯一更改store状态的方法，且必须是同步函数；
    * Action: 用于提交mutation，而不是直接提交状态，允许异步操作；
    * Module: 允许将单一的Store拆分为多个store且同时保存在单一的状态树中；

17. 使用过Vue SSR吗？

    即服务端渲染，vue将标签渲染成整个html的工作在服务端完成，服务端形成的html片段直接返回给客户端；

    优缺点

    **优点：**

      * 更好的seo，因为spa页面是通过ajax获取的，而搜索引擎不会等待ajax异步完成后再抓取页面内容，所以spa中搜索引擎是抓取不到通过ajax获取的内容；而ssr则直接由服务端返回已渲染好的页面，所以搜索引擎可以抓取到渲染好的页面；
      * 更快的内容到达时间（首屏加载更快），spa会等待所有vue编译后的js文件都下载完成后才开始页面的渲染，文件下载需要时间，所以首屏需要一定时间；而ssr直接由服务端渲染好之后直接返回，无需再等待js文件下载和其他渲染过程；

    **缺点：**

      * 更多开发条件限制，例如只支持beforeCreate和created两个钩子函数，导致一些外部扩展库需要特殊处理；
      * 更多的服务器负载：在node.js中渲染完整应用程序，显然会比仅提供静态文件的server更加占用资源；

18. vue-router路由模式有几种？

    3种，hash、history和abstract；

    * hash：使用URL hash值来做路由，支持所有浏览器；
    * history：依赖h5的History API和服务器配置；
    * abstract: 支持所有的js运行环境，如node.js服务器端；如果发现没有浏览器的API，路由会强制进入这个模式；

19. vue-router中hash和history实现原理是什么？

    * **hash模式的实现原理**

      早期前端路由实现就是基于location.hash来实现的，实现原理很简单。location.hash的值就是URL中#后面的值；

      hash路由模式主要有以下几个特性：

      * URL中hash值只是客户端的一种状态，也就是说当向服务器发送请求时，hash部分不会被发送；
      * hash值的改变，都会在浏览器中留下一个痕迹，因此可以通过浏览器的回退、前进控制hash的切换；
      * 可以通过a标签，并设置href属性，当用户点击这个标签后，URL的hash值会发生变化；也可以通过Js修改location.hash值；
      * 可以使用hashChange事件监听hash值的变化，从而对页面进行跳转；

    * **history模式的实现原理**

      h5提供了history API来实现URL的变化，history.pushState()和history.replaceState()；这两个API可以在不刷新的情况下，操作浏览器的历史记录；

      下面是history模式的一些特性：

      * pushState和replaceState两个API实现URl变化；
      * 可以使用popState事件来监听url的变化，从而对页面进行渲染；
      * history.pushState()或history.replaceState()不会触发popState事件，这时我们需要手动触发页面跳转；

20. 什么是MVVM？

    是一种软件架构设计模式。源自经典的MVC模式，MVVM的出现促进了前端开发与后端业务逻辑的分离，极大地提高了前端开发效率；MVVM的核心是ViewModel层，它就像一个中转站，负责转换Model中的数据；

    ViewModel层向上绑定了视图层，向下与Model层通过接口请求进行数据交互；

    * View层

      视图层，也就是用户界面；

    * Model层

      数据模型，也就是后端的数据；

    * ViewModel层

      这一层前端开发者对从后端获取的Model数据进行转换处理，做二次封装，以生成符合View层使用的视图数据模型；

      该层实现了双向绑定，因此viewModel的内容会实时展现在view层，前端人员不再需要关心dom操作这些东西，只需要处理好viewModel层到view层的逻辑即可；

      因此，view不再是和model层交互，而是和viewModel层交互，这是前后端分离的重要一环；

21. Vue是如何实现双向绑定的？

    双向绑定要点：视图变化更新数据，数据变化更新视图；

    其中，View变化更新data，可以通过监听事件来实现；

    而data变化更新视图，则是vue主要的工作：

    1. 实现一个监听器Observer，对数据对象进行遍历，利用Object.defineProperty()对属性都加上setter和getter；这样一旦给这个对象赋值，就会触发setter；
    2. 实现一个解析器Compiler，解析Vue模板指令，将模板中的变量都替换成数据，然后初始化渲染视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者；
    3. 实现一个订阅者Watcher，Watcher是Observer和Compiler的桥梁，主要是订阅Observer中的属性值变化的消息，当收到变化消息时，通知Compiler更新数据；
    4. 实现一个订阅器Dep，用来收集管理订阅者Watcher，对监听器和订阅者统一管理；

22. Vue如何实现对象和数组的监听？

    Object.defineProperty()只能对属性进行劫持，因此数组和对象都是没办法监听到的。Vue是通过遍历数组和递归遍历对象对其中的属性进行监听的；

23. Proxy和Object.defineProperty()的对比；

    Proxy的优势如下：

    * 可以直接监听对象而非属性；
    * 可以直接监听数组的变化；
    * 有多达13种拦截方式，不限于apply、ownKeys、deleteProperty等等；
    * 返回一个新对象，我们可以只操作新的对象达到目的；

    Object.defineProperty优势如下：

    * 兼容性好，支持ie9，Proxy存在兼容性问题；

24. Vue怎么使用Vue.set()/vm.$set()解决对象新增属性不能响应的问题？

    由于js的限制，Vue无法检测到对象属性的变化。所以Vue提供了vm.$set()方法让对象的多有属性转换成响应式的。

    阅读Vue源码可知，vm.$set实现原理是：

    * 如果目标是数组，直接使用数组的splice方法触发响应式；
    * 如果目标是对象，会先判断属性是否存在，对象是否是响应式；如果目标本身不是响应式数据，则直接赋值，否则会调用defineReactive方法进行响应处理；

25. 虚拟DOM的优缺点？

    优点：

      * 保证性能下限：即保证在你不手动优化的情况下，还能保有不错的性能；
      * 无需手动操作DOM：不再需要手动操作DOM，只需要写好ViewModel的代码逻辑，框架会根据虚拟DOM和数据双向绑定，帮我们以可预知的方式更新视图;
      * 跨平台：虚拟DOM本质上是js对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便的跨平台操作，如服务端渲染，weex开发；

    缺点：

      * 无法极致地优化：对一些性能要求极高的应用虚拟DOM无法进行针对性的极致优化；

26. 虚拟DOM实现原理？

    * 用js对象模拟真实的DOM树；
    * diff算法 - 比较两颗虚拟DOM树的差异；
    * pach算法 - 将两个虚拟DOM对象的差异应用到真正的DOM树；

27. Vue中的key有什么用？

    key是为Vue中的vnode唯一标记，通过这个key，我们的diff操作可以更准确，更快速。

    vue的diff过程可以概括为：oldCh和newCh各有两个头尾的变量oldStartIndex、oldEndIndex和newStartIndex和newEndIndex，它们会新节点和旧节点进行两两对比；

    即一共有四中比较方式：newStartIndex和oldStartIndex 、newEndIndex 和 oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex

    如果以上4种比较都没匹配，如果设置了Key，将会用key在进行比较，在比较过程中，遍历会往中间靠，一旦StartIndex > EndIndex，表明oldCh和newCh至少有一个已经遍历完了，就会结束比较；

    所以Vue中的key作用是：key是vnode中的唯一标记，通过它可以使得我们的diff过程更加快速、准确；

    * **更准确**：因为带key就不是就地复用了，在sameNode函数中，a.key === b.key对比中可以避免就地复用的情况；
    * **更快速**：利用key的唯一性生成map对象来获取对应节点，比遍历节点更快；

28. 你有对Vue项目做过哪些优化？[https://juejin.im/post/5d548b83f265da03ab42471d](https://juejin.im/post/5d548b83f265da03ab42471d)

    1. 代码层面的优化

        * v-if和v-show区分使用场景；
        * computed和watch区分使用场景；
        * v-for遍历必须添加key，且避免同时使用v-if；
        * 长列表性能优化；
        * 事件的销毁；
        * 图片资源懒加载；
        * 路由懒加载；
        * 第三方插件按需引入；
        * 优化无限列表的性能；
        * 服务端渲染ssr或者预渲染；

    2. webpack层面的优化

        * webpack对图片进行压缩；(image-webpack-loader)
        * 减少es6转为es5的冗余代码；(babel-plugin-transform-runtime)
        * 提取公共代码；(webpack.optimize.CommonsChunkPlugin)
        * 模板预编译；(vue-template-loader)
        * 提取组件的css；
        * 优化sourceMap;(cheap-module-source-map)
        * 构建结果输出分析;(webpack-bundle-analyzer)

    3. 基础的web技术优化

        * 开启gzip压缩；
        * 浏览器缓存；
        * 使用cdn；
        * 使用chrome Performance；

29. 对于即将到来的vue3.0你有什么了解的嘛？

    1. 监测机制的改变

        3.0将带来基于代理Proxy的observer实现，提供全语言覆盖的反应性跟踪。这消除了Vue2当中基于Object.defineProperty的诸多限制：

          * 只能检测属性，不能检测对象；
          * 检测属性的添加和删除；
          * 检测数组索引和长度的变更；
          * 支持Map、Set、WeakMap和WeakSet；

        新的Observer还提供以下特性：

          * 用于创建observable的公开api，为中小规模场景提供了简单的跨组件状态管理解决方案；
          * 默认采用惰性观察，只观察用于渲染应用程序最初可见部分的数据；
          * 更精确的变更通知，在2.x中，通过Vue.set强制添加新属性将导致依赖于该对象的watcher收到变更通知，在3.x中，只有依赖于特定属性的watcher才会收到通知；
          * 不可变的observable，我们可以创建值的不可变版本，除非系统在内部将其暂时解禁；
          * 更好的调试功能，我们可以使用新的renderTracked和renderTriggered钩子精确地跟踪组件在什么时候以及为什么重新渲染；

    2. 模板

        模板方面只改了作用域插槽，2.x机制中作用域插槽变了，父组件会重新渲染，而3.0会把作用域插槽改成函数方式，这样只会影响子组件的重新渲染；

    3. 对象式的组件声明方式

        vue2.x的组件是通过声明的方式传入一系列option，和ts的结合需要一些装饰器方式来做；3.0修改了声明方式，改成了类式写法，使得和ts结合更加容易；

        另外3.0全部使用了ts进行重写；

    4. 其他方面的更改

        * 支持自定义渲染器，使得weex可以通过自定义渲染器的方式来扩展，而不是直接fork源码来改；
        * 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。
        * 基于 treeshaking 优化，提供了更多的内置功能。

30. 说说使用vue踩过最大的坑是什么？怎么解决的？
