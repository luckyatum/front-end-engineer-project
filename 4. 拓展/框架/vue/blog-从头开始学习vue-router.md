# [从头开始学习vue-router](https://www.jianshu.com/p/4c5c99abb864)

路由的本质，就是建立起url和页面之间的映射关系

## vue-router模式

1. hash模式

    vue-rotuer默认hash模式，使用URL的hash来模拟一个完整的URL，于是当URL改变时，页面不会重新加载

    hash是一个锚点，只用来代表网页中的一个位置，不会被包含在http请求中，对后端完全没有影响，改变hash不会重新加载页面

    所以hash模式原理是监听onhashchange事件，根据不同的值，渲染指定DOM位置的不同数据

2. history模式

    因为hash模式在url中自带#，如果不想要这种地址而是完全模仿网页url的话，可以使用history模式；

    该模式充分利用了h5新的api pushState()和replaceState()，应用于浏览器记录栈，提供了对历史记录修改的功能，但是在执行修改时，虽然改变了url，但浏览器不会立即向后端发送请求

    该模式还需要后台配置支持，因为前端为单页面应用，如果后端没有对别的路由指向唯一的index.html页面，那么用户在访问别的路径时候可能就会返回404

## vue-router实现页面跳转方式

1. ```window.location.href = xx;```
2. ```this.$router.push(xx);```
3. ```<router-link to="xx"></router-link>```

## vue-router传参

1. 用name传递

    在路由配置文件中配置name属性

    ```js
    var route = routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        }
    ]
    ```

    模板里用$route.name来接收

2. 通过router-link标签中的to传参

    ```html
    <router-link :to="{name: xxx, params: {key: value}}"></router-link>

    <!-- 页面接收 -->
    <script>
        console.log(this.$route.params.key);
    </script>
    ```

3. 利用url传参

    在index.js路由配置文件中设置

    ```js
        var route = {
            {
                path: '/params/:title/:id',
                component: Params
            }
        }

        // 页面使用
        this.$route.params.id;
        this.$route.params.title;
    ```

4. 利用path来匹配路由，然后通过query传参

    ```html
        <router-link :to="{name: 'Query', query: {queryId: status}}">跳转</router-link>
    ```

    对应的页面获取

    ```this.$route.query.queryId```

## vue-router配置子路由

```js
var route = routes: [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld,
        children: [
            {
                path: '/h1',
                name: 'h1',
                component: H1
            }
        ]
    }
]
```

## vue-router单页面多路由区域

App.vue文件

```html
<template>
    <router-view></router-view>
    <router-view name="left"></router-view>
    <router-view name="right"></router-view>
</template>
```

index.js文件

```js
export default new Router({
    routes: [
        {
            path: '/',
            name: 'H1',
            components: {
                default: HelloWorld, // 显示HelloWorld组件内容
                left: H1, // 显示H1组件内容
                right: H2 // 显示H2组件内容
            }
        }
    ]
})
```

## $route和$router区别

$route是路由信息对象，包含path，params，hash，query，fullPath，matched，name等路由信息

$router是路由实例对象，即new VueRouter创建的实例，包含了路由的跳转方式，钩子函数等

## 设置404页面

```js
routes = [
    {
        path: '*',
        component: Error
    }
]
```

如果输入的地址不匹配时，会自动显示出Error.vue的内容
