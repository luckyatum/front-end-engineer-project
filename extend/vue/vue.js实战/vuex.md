# 状态管理

vuex设计用来统一管理组件状态，可以实现跨组件共享数据，主要使用场景是大型单页应用

## 1.vuex安装及使用

```js
// 安装 npm install --save vuex
// main.js引入
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

// vuex配置
const store = new Vuex.Store({
    // vuex相关配置
})

// 新建Vue实例
new Vue({
    el: '#app',
    router: router,
    // 使用vuex
    store: store,
    render: h => {
        return h(App);
    }
});
```

数据保存在vuex的state字段内

```js
const store = new Vuex.Store({
    state: {
        count: 0
    }
});

// 在组件内获取该值
this.$store.state.count

// 通过mutations修改store数据
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count ++;
        },
        decrease (state) {
            state.count --;
        }
    }
});

// 组件内通过this.$store.commit方法来执行mutations
this.$store.commit('increment');
this.$store.commit('decrease');
```

getters类似于计算属性，可以缓存对state数据做的某些特定计算后的值

```js
// 使用getters
const store = new Vuex.Store({
    state: {
        list: [1, 2, 3, 4, 5]
    },
    getters: {
        filteredList: (state) => {
            return state.list.filter(item => item < 10);
        }
    }
});

// 组件内使用
export default {
    computed: {
        list () {
            return this.$store.getters.filteredList;
        }
    }
}

```

getters也可以依赖别的getter

```js
// 使用getters
const store = new Vuex.Store({
    state: {
        list: [1, 2, 3, 4, 5]
    },
    getters: {
        filteredList: (state) => {
            return state.list.filter(item => item < 10);
        },
        listCount: (state, getters) => {
            return getters.filteredList.length;
        }
    }
});

// 组件内使用
export default {
    computed: {
        list () {
            return this.$store.getters.filteredList;
        },
        listCount () {
            return this.$store.getters.listCount;
        }
    }
}
```

在mutation里不能进行异步操作数据，一旦异步操作，组件在commit后数据不能立即改变，而且不知道什么时候改变，关于异步操作可以使用actions

actions选项与mutation很像，但是action里面提交的是mutation，并且可以操作异步数据

```js
const store = new Vuex.Store({
    state: {
        list: [1, 2, 3, 4, 5]
    },
    mutations: {
        increment (state, n = 1) {
            state.count += n;
        }
    },
    actions: {
        increment (context) {
            context.commit('increment');
        },
        // 异步提交mutation
        asyncIncrement(context) {
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                }, 1000);
            });
        }
    }
});

// 组件内触发
export default {
    computed: {
        count () {
            return this.$store.state.count;
        }
    },
    methods: {
        handleActionIncrement () {
            this.$store.dispatch('increment');
        },
        // 异步操作数据
        handleAsyncActionIncrement() {
            this.$store.dispatch('asyncIncrement').then(() => {
                console.log(this.$store.state.count); // 1
            });
        }
    }
}
```

Vuex与开发者约定，涉及改变数据的，使用mutations，存在业务逻辑的，使用actions

最后还有一个选项是modules，用于模块化开发

```js
const moduleA = {
    state: {},
    // ...
}
const moduleB = {
    state: {},
    // ...
}
const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
});
store.state.a; // moduleA的状态
store.state.b; // moduleB的状态
```

## event-bus插件编写

```js
// event-bus.js
const install = function(Vue) {
    const Bus = new Vue({
        methods: {
            emit (event, ...args) {
                this.$emit(event, ...args);
            },
            on (event, callback) {
                this.$on(event, callback);
            },
            off (event, callback) {
                this.$off(event, callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;
};
export default install;

// main.js中使用
import VueBus from './vue-bus';
Vue.use(VueBus);

// 组件内使用
export default {
    props: {
        number: {
            type: Number
        }
    },
    methods: {
        handleAddRandom () {
            // 随机获取1~100中的数
            const num = Math.floor(Math.random() * 100 + 1);
            this.$bus.emit('add', num);
        }
    }
}
// 其他组件中监听
export default {
    created () {
        this.$bus.on('add', num => {
            this.number += num;
        });
    },
    // 在组件销毁前去掉监听函数
    beforeDestroy () {
        this.$bus.off('add', this.handleAddRandom);
    }
}
```
