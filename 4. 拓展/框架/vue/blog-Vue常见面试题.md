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

    