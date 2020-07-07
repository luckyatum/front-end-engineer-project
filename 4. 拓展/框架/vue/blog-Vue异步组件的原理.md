# [[Vue.js进阶]从源码角度剖析异步组件](https://juejin.im/post/5d6b66e1e51d456210163be5)

使用Vue开发单页面应用时，会通过路由懒加载方式减少首屏代码量，实现访问其他页面再加载对应组件的功能。

而针对当前页面，也会通过异步加载组件的方式减少当前页面代码量。

```js
  components: {
    Imgshow: () => import('../../../components/Imgshow'),
    Audioplay: () => import('../../../components/Audioplay'),
    Videoplay: () => import('../../../components/Videoplay')
  }
```

例如打开一个dialog，当用户不打开dialog的时候就不需要加载这个组件的代码。

## 原理解析

Vue是如何加载组件的？

Vue可以使用Template标签来描述DOM结构：

```vue
  <template>
    <div>
      <HelloWorld />
    </div>
  </template>
```

也可以直接使用render函数

```vue
  <script>
  export default {
    name: "home",
    components: {
      HelloWorld: () => import("@/components/HelloWorld.vue")
    },
    render(h) {
      return h("div", [h("HelloWorld")]);
    }
  };
  </script>
```

针对第一种template标签的写法，vue-loader会将其解析成render函数，因此两种写法实质上是一样的。

h函数作用是将参数转换为vNode，即虚拟DOM。

当传入的第一个参数不是默认html标签（对应上面代码中的helloWorld），Vue会认为它是一个组件的标签，所以会从component配置中找到对应的组件函数，也就是：() => import("@/components/HelloWorld.vue")；
