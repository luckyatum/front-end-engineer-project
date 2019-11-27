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

在dom元素上可以通过\$event访问原生DOM事件

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

## 父子组件通信，兄弟组件通信，跨级组件通信

1. 父子组件通信

    子组件向父组件传递数据时，通过自定义事件，子组件通过\$emit()来触发事件，父组件用\$on()来监听子组件的事件

    父组件除了可以监听子组件的事件，还可以监听原生DOM事件，通过.native修饰符监听子组件根元素的节点

2. 非父子组件通信

    方案一：使用一个空的Vue实例作为中央事件总线

    ```html
    <div id="app">
        {{message}}
        <component-a></component-a>
    </div>
    <script>
        var bus = new Vue();

        Vue.component('component-a', {
            template: '<button @click="handleEvent">传递事件</button>',
            methods: {
                handleEvent: function() {
                    bus.$emit('on-message', '来自组件component-a的内容');
                }
            }
        });

        var app = new Vue({
            el: '#app',
            data: {
                message: ''
            },
            mounted: function() {
                var _this = this;
                // 在实例初始化时，监听来自bus实例的事件
                bus.$on('on-message', function(msg) {
                    _this.message = msg;
                });
            }
        });
    </script>
    ```

3. 其他通信方式

    * 父链（不建议使用，子组件可能修改父组件数据）

        子组件中，使用this.\$parent可以直接访问该组件的父实例或组件，父组件可以使用this.\$children访问它所有的子组件，而且可以递归向上或向下无限访问，直到根实例或最内层组件

    * 子组件索引

        当子组件较多时，通过this.\$children来一一遍历出我们需要的组件实例比较困难，尤其是组件动态渲染

        Vue提供了子组件索引的方法，用特殊的属性ref来为子组件指定一个索引名称

        ```html
            <div id="app">
                <button @click="handleRef">通过ref获取子组件实例</button>
                <component-a href="comA"></component-a>
            </div>
            <script>
                Vue.component('component-a', {
                    template: '<div>子组件</div>',
                    data: function() {
                        return {
                            message: '子组件内容'
                        };
                    }
                });

                var app = new Vue({
                    el: '#app',
                    methods: {
                        handleRef: function() {
                            // 通过$refs来访问指定的实例
                            var msg = this.$refs.comA.message;
                            console.log(msg);
                        }
                    }
                });
            </script>
        ```

## 使用slot分发内容

slot用于父组件向子组件中插入内容

```html
<child-component>
    {{message}}
</child-component>
```

这里的message就是一个slot，但是它绑定的是父组件的数据，而不是子组件的数据

使用slot分发的内容，作用域是在父组件上的

### 单个slot

在子组件内使用slot标签就可以为这个子组件开启一个插槽，在父组件模板中，插入在子组件标签内的所有内容将替代子组件的slot标签及它的内容

```html
<div id="app">
    <child-component>
        <p>分发的内容</p>
        <p>更多的分发的内容</p>
    </child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '\
            <div>\
                <slot>\
                    <p>如果父组件没有插入内容，则默认展示</p>\
                </slot>\
            </div>'
    });
    var app = new Vue({
        el: '#app'
    })
</script>
```

子组件定义了一个slot元素，并且用p标签作为默认内容，父组件没有使用slot时，会默认渲染这段文本

### 具名slot

给slot标签指定一个name后可以分发多个内容

```html
<div id="app">
    <child-component>
        <h2 slot="header">标题</h2>
        <p>正文内容</p>
        <p>更多的正文内容</p>
        <div slot="footer">底部信息</div>
    </child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '\
            <div class="container">\
                <div class="header">\
                    <slot name="header"></slot>\
                </div>\
                <div class="main">\
                    <slot></slot>\
                </div>\
                <div class="footer">\
                    <slot name="footer"></slot>\
                </div>\
            </div>'
    });

    var app = new Vue({
        el: '#app'
    });
</script>
```

上面子组件中声明了三个slot，其中main里面的slot没有使用name，因此将作为默认slot，父组件中没有使用具名slot的都将渲染到默认slot中

### 作用域插槽

```html
<div id="app">
    <child-component>
        <template scope="props">
            <p>来自伏组件的内容</p>
            <p>{{props.msg}}</p>
        </template>
    </child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '\
            <div class="container">\
                <slot msg="来自子组件的内容"></slot>\
            </div>'
    });
</script>
```

子组件模板的slot元素上有一个类似props传递数据给组件的写法，将数据传递到了插槽，父组件使用template元素而且拥有scope="props"的特性，这里的props是一个临时变量，template内可以通过临时变量props访问来自子组件插槽的数据msg

### 访问slot

Vue.js 2.x提供了用来访问被slot分发的内容的方法 \$slots

```html
<div id="app">
    <child-component>
        <h2 slot="header">标题</h2>
        <p>正文内容</p>
        <p>更多的正文内容</p>
        <div slot="footer">底部信息</div>
    </child-component>
</div>
<script>
    Vue.component('child-component', {
        template: '\
            <div class="container">\
                <div class="header">\
                    <slot name="header"></slot>\
                </div>\
                <div class="main">\
                    <slot></slot>\
                </div>\
                <div class="footer">\
                    <slot name="footer"></slot>\
                </div>\
            </div>',
        mounted: function() {
            var header = this.$slots.header;
            var main = this.$slots.default;
            var footer = this.$slots.footer;
        }
    });

    var app = new Vue({
        el: '#app'
    });
</script>
```

this.\$slots.default包含了所有没有包含在具名slot中的所有节点

## *组件高级用法(实际业务不常用，单独开发常用)

### 1. 递归组件

组件在他的模板内可以递归调用自己，只要给组件设置name的选项

```html
<div id="app">
    <child-component :count="1"></child-component>
</div>
<script>
    Vue.component('child-component', {
        name: 'child-component',
        props: {
            count: {
                type: Number,
                default: 1
            }
        },
        template: '\
            <div class="child">\
                <child-component\
                    :count="count + 1"\
                    v-if="count < 3">\
                </child-component>\
            </div>'
    });
    var app = new Vue({
        el: '#app'
    });
</script>
```

### 2.内联模板

组件模板一般是在template内定义的，Vue提供了一个内联模板的功能，在使用组件时，给组件标签使用inline-template特性，组件会把它的内容当做模板，而不是当做内容分发

```html
<div id="app">
    <child-component inline-template>
        <div>
            <h2>在父组件中定义子组件的模板</h2>
            <p>{{message}}</p>
            <p>{{msg}}</p>
        </div>
    </child-component>
</div>
<script>
    Vue.component('child-component', {
        data: function() {
            return {
                msg: '在子组件声明的数据'
            };
        }
    });
    var app = new Vue({
        el: '#app',
        data: {
            message: '在父组件声明的数据'
        }
    });
</script>
```

内联模板中可以得到父组件声明的数据，也可以得到子组件声明的数据，同名则优先使用子组件的数据，这是内联模板的缺点

### 3.动态组件

Vue提供了一个特殊元素component用来动态挂载不同的组件，使用is特性来选择要挂载的组件

```html
<div id="app">
    <component :is="currentView"></component>
    <button @click="handleChangeView('A')">切换到A</button>
    <button @click="handleChangeView('B')">切换到B</button>
    <button @click="handleChangeView('C')">切换到C</button>
</div>
<script>
    var app = new Vue({
        el: '#app',
        components: {
            comA: {
                template: '<div>组件A</div>'
            },
            comB: {
                template: '<div>组件B</div>'
            },
            comC: {
                template: '<div>组件C</div>'
            }
        },
        data: {
            currentView: 'comA'
        },
        methods: {
            handleChangeView: function(component) {
                this.currentView = 'com' + component;
            }
        }
    });
</script>
```

:is属性值在就是配置项components的键值，然后渲染键值对应的组件内容

### 4.异步组件

Vue定义组件时可以接受一个函数，函数两个参数分别是resolve和reject，调用resolve来开始加载组件，调用rejecr来指示加载失败

## 其他Vue方法属性

### 1.$nextTick

Vue异步更新DOM的原理：Vue在观察到数据变化时不会直接更新DOM，而是开启一个队列，并缓冲在同一事件循环中发生的所有数据改变，缓冲时会去除重复数据，避免不必要的计算和DOM操作，然后在下一次事件循环中，Vue刷新队列并执行实际工作，所以就算用for循环动态改变数据100次，也会只应用最后一次，如果没有这种机制，DOM就要重绘100次

Vue会根据浏览器环境优先使用Promise.then，如果不支持，则使用setTimeout

所以，$nextTick就是用来得知什么时候DOM更新完成的

### 2.Vue.extend和$mount（几乎用不到）

两个方法用来手动挂载一个实例

Vue.extend是基础Vue构造器，构建一个子类，参数是一个包含组件选项的对象

如果Vue实例在实例化时没有收到el选项，它就处于未挂载状态，可以使用$mount手动地挂载一个未挂载的实例

```html
<div id="mount-div">
</div>
<script>
    var MyComponent = Vue.extend({
        template: '<div>Hello: {{name}}</div>',
        data: function() {
            return {
                name: 'Arsen'
            };
        }
    });
    new MyComponent().$mount('#mount-div');
</script>
```

## 自定义指令

指令分全局注册和局部注册

```js
// 全局注册
Vue.directive('focus', {
    // 指令选项
});
// 局部注册
var app = new Vue({
    el: '#app',
    directives: {
        focus: {
            // 指令选项
        }
    }
});
```

下面是指令的选项

* bind: 只调用一次，指令第一次绑定到元素时调用，该钩子函数可以定义一个在绑定时执行一次的初始化动作
* inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）
* update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化，通过比较更新前后的绑定值，可以忽略不必要的模板更新
* componentUpdated: 被绑定元素所在模板完成一次更新周期时调用
* unbind: 只调用一次，指令与元素解绑时调用

每个钩子函数都有几个参数可用，含义如下：

* el 指令所绑定的元素
* binding 一个对象，包含以下属性：
  * name 指令名，不包括v-前缀
  * value 指令的绑定值，例如v-my-directive="1+1"，value的值是2
  * oldValue 指令绑定的前一个值，仅在update和componentUpdated钩子中可用
  * expression 绑定值的字符串形式，如v-my-directive="1+1"，expression的值是"1+1"
  * arg 传给指令的参数，例如v-my-directive:foo，arg的值是foo
  * modifiers 一个包含修饰符的对象，例如v-my-directive.foo.bar，修饰符对象modifiers的值是{foo: true, bar: true}
* vnode Vue编译生成的虚拟节点
* oldVnode 上一个虚拟节点仅在update和componentUpdated钩子中可用
