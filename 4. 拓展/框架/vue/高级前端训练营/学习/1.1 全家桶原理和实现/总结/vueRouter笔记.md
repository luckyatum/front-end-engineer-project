# vue-router

## vueRouter实现要点

* spa页面不能刷新

  * hash #/about
  * history /about

* 根据url显示内容

  * router-view组件
  * 数据响应式，current变量持有url地址，一旦变化，重新执行render

## 实现插件任务

* 实现VueRouter类

  * 处理路由选项
  * 监控url变化，hashchange
  * 响应这个变化

* 实现install方法

  * $router方法
  * 两个全局组件，router-view、router-link

## 要点

* 实现vueRouter的时候，将install传进来的Vue这个全局变量存储到全局作用域，以供其他的函数使用；
* 实现一个响应式对象：

  * Vue.util.defineReactive(this, 'current', '/')
  * new Vue({ data: { current: '/' } })

* 先正常使用vue的插件，然后将其替换成自己实现的插件，最后能正常跑起来就表示插件实现了；
* runtime-only的vue只能通过render函数来渲染DOM模板；
* 通过vue实例的this.$slots.default可以拿到dom节点中的默认节点；

* 有一个VueRouter类，通过new VueRouter()的时候传入路由选项，路由选项结构是path、component；
* 然后这个类需要监听hashChange事件，变化的时候保存一下当前的路径current；
* current需要是响应式的，这样每次current变化的时候，依赖current的组件都会重新执行render函数
* 然后注册两个全局，router-link和router-view
* router-link接收props: to，然后通过render函数将组件渲染成a标签，href就是'#' + this.to，a标签内容则通过this.$slots.default获取到
* router-view不接收参数，通过判断vueRouter实例的current和vueRouter选项中的path是否相等，相等则获取到其中的component并且渲染

## 优化点

* 提前处理路由表，避免每次都循环获取
* 嵌套路由还未处理
