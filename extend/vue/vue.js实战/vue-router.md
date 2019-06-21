# 前端路由

前端来维护一个路由规则，实现方式有两种：

1. 利用url的hash，也就是锚点，js通过hashChange事件来监听url的改变
2. HTML5的history模式，它使url看起来像普通网站那样，以'/'分割，没有#，但页面并没有跳转，这种模式需要服务端支持，服务端接收到所有的请求后，指向同一个html文件，不然会出现404

## vue-router的基本用法

路由不同的页面事实上就是动态加载不同的组件

```js
// 通过npm安装
npm install --save vue-router
// main.js里使用Vue.use()加载插件
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.use(VueRouter);
```

每个页面对应一个组件，也就是对应一个.vue文件，Router里每一项的path属性就是指定当前匹配的路径，component是映射的组件；

设置router的mode为history会开启HTML5路由模式。通过'/'设置路径，如果不配置mode，就会使用'#'来设置路径。

开启history路由，在生产环境时服务端必须进行配置，将所有路由指向同一个html，或设置404页面为该html，否则刷新页面时页面会出现404

## hash模式和history模式的区别

hash模式是前端监听onhashChange事件，然后通过改变hash来完成一些处理，因为hash的变化url都会被浏览器记录下来，所以前进后退按钮也是可用的，所以就算页面没有请求服务器，但是页面url和页面状态关联起来

但是hash模式只能改变#后面的url片段，而history模式给了前端完全的自由，history可以通过back，forward，go三个方法操作浏览器的后退前进跳转操作，history模式也可以用pushState和replaceState方法修改浏览器历史

history模式缺点在于一旦页面刷新，会向服务端进行一次请求，所以如果后端没有做相应的路由处理，会出现页面404的情况

## 动态路由

路由列表的path可以带参数，如'user/12'中，12是动态的，但是路由到同一个页面，在这个页面中可以获取到这个id

```js
// main.js
const Routers = [
    {
        path: '/user/:id',
        component: (resolve) => require(['./views/user.vue'], resolve)
    }
]
// user.vue文件可以获取id参数
this.$route.params.id
```

如果直接访问/user路径，是没办法访问user.vue页面的，必须带上一个id

## 路由跳转

vue-router有两种跳转页面的方法：

1. 使用内置的router-link组件，会被渲染为一个a标签

    ```vue
    <template>
        <div>
            <h1>首页</h1>
            <router-link to="/about">跳转到about</router-link>
        </div>
    </template>
    ```

    其用法与一般组件一样，to属性制订了需要跳转的路径，也可以用v-bind动态设置，在h5的history模式下会拦截点击，避免浏览器重新加载页面

    router-link还有一些其他标签

    * tag 指定渲染成什么标签如tag="li"，渲染结果就是li而不是a
    * replace 使用replace不会留下history记录，所以导航后不能用后退键返回上一个页面
    * active-class
