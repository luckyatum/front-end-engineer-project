# 基础篇

## 计算属性

计算属性和方法调用的区别：计算属性是依赖缓存，只有其依赖的数据发生变化才会重新计算，而方法是只要视图重新渲染就会重新计算结果，所以如果有大量的数组等数据需要计算的话使用计算属性会好一点，除非业务要求不能使用缓存

## class绑定

对象语法

```html
<div id="app">
    <div :class="{ 'active': isActive }"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            isActive: true
        }
    });
</script>
```

上述当isActive为true是会拥有active类名，false则没有

数组语法

```html
<div id="app">
    <div :class="[activeCls, errorCls]"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            activeCls: 'active',
            errorCls: 'error'
        }
    });
</script>
```

当有多个class时候，可以使用数组语法

## 内联样式绑定

对象语法

```html
<div id="app">
    <div :class="{ 'color': color, 'fontSize': fontSize + 'px' }"></div>
</div>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            color: 'red',
            fontSize: 14
        }
    });
</script>
```

css属性名称使用驼峰

## 基本指令

* v-cloak

    该指令会在Vue实例结束编译时从绑定的HTML元素上移除，等同于display: none;常用于网速较慢导致的未加载完vue.js文件就先渲染了页面的{{}}符号

* v-once

    该指令表示元素及其子节点只渲染一次，后面数据变化不再重新更新视图

* v-if、v-else-if、v-else

    渲染或销毁元素/组件

    vue会默认复用元素

    ```html
        <template v-if="type === 'name'">
            <label>用户名：</label>
            <input placeholder="输入用户名"/>
        </template>
        <template v-else>
            <label>邮箱：</label>
            <input placeholder="输入邮箱"/>
        </template>
    ```

    当type切换的时候，input框已经输入的内容不会被清空，因为vue使用了同一个input，只是替换了其placeholder

    可以使用key绑定来取消这种默认复用

    ```html
        <template v-if="type === 'name'">
            <label>用户名：</label>
            <input placeholder="输入用户名" key="name"/>
        </template>
        <template v-else>
            <label>邮箱：</label>
            <input placeholder="输入邮箱" key="email"/>
        </template>
    ```

    key值必须是唯一的

* v-show

    用于显示隐藏元素，但是仅仅是改变元素的display:none;属性，所以不能用于template上

* v-for

    将对象或者数组循环显示

## 数组更新

触发数组更新的方法: push()、pop()、shift()、unshift()、splice()、sort()、reverse()

## 事件

在dom元素上可以通过$event访问原生DOM事件

```html
<div @click="handle('hello', $event)"></div>
```

事件修饰符如下：

> * .stop   阻止单击事件冒泡
> * .prevent    提交事件不再重载页面
> * .capture    侦听事件时候使用捕获模式
> * .self   只当元素在该元素本身（而非子元素）触发时触发回调
> * .once   只触发一次

表单元素上监听键盘事件，可以使用按键修饰符

```html
<!-- 只有keyCode是13时调用方法 -->
<input @keyup.13="submit">
```

可以自己配置按钮

```js
Vue.config.keyCodes.f1 = 112;
```

Vue还提供了一些默认的快捷名称

* .enter
* .tab
* .delete（delete、backspace键）
* .esc
* .space
* .up
* .down
* .left
* .right

* .ctrl
* .alt
* .shift
* .meta(Mac下是Command键，Windows下是窗口键)

## v-model修饰符

* .lazy v-model默认是在input事件中同步输入框，该修饰符会转变为在change事件中同步（input框失焦或按回车）
* .number   将输入转换为number类型
* .trim 自动过滤输入的首尾空格

## vue组件

组件目的是提高代码的重用性

vue组件需要注册才能使用，可以全局注册，也可以局部注册

```js
// 全局注册
Vue.component('my-component', {
    // options
});
// 局部注册
var app = new App({
    el: '#app',
    components: {
        'my-component': child
    }
});
```

## vue组件间的通信

组件间要进行通信，通常父组件的模板中包含子组件，父组件要正向的向子组件传递数据或参数，子组件接收到后渲染数据，正向传递就是通过props实现的

组件中，通过props声明需要从父级接收的数据，props的值可以是字符串数组，也可以是对象

```html
<div id="app">
    <my-component message="父亲的数据"></my-component>
</div>
<script>
    Vue.component('my-component', {
        props: ['message'],
        template: '<div>{{message}}</div>'
    });
    var app = new Vue({
        el: '#app'
    });
</script>
```

如果接收的数据是驼峰命名的，在父组件上需要使用小写中横杠传递，因为存在html不区分大小写的问题，但是在字符串模板中没有该限制

当props需要验证时，就需要对象写法

```js
Vue.component('my-component', {
    props: {
        // 必须是数组类型
        propA: Number,
        // 必须是字符串或者数字类型
        propB: [String, Number],
        // 布尔值，如果没有定义默认true
        propC: {
            type: Boolean,
            default: true
        },
        // 数字，而且是必传
        propD: {
            type: Number,
            required: true
        },
        // 如果是数组或对象，默认值必须是一个函数来返回
        propE: {
            type: Array,
            default: function() {
                return [];
            }
        },
        // 自定义一个验证函数
        propF: {
            validator: function(value) {
                return value > 10;
            }
        }
    }
});
```