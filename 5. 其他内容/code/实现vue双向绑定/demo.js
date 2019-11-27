// 简单的双向绑定例子（实现监听者observer、订阅者watcher）
/**
 * 1. 基本概念：
 *      数据监听器observer，能够对对象所有属性进行监听
 *      watcher将数据监听器和指令解析器连接起来，数据的属性变动时，执行指令回调函数
 *      compile指令解析器，对每个节点元素进行扫描和解析，将相关指令初始化成一个订阅者watcher
 * 2. 订阅收集器dep
 *      因为订阅者watcher会有很多个，所以专门有一个消息收集器将这些watcher收集起来，然后在observer和watcher之间统一管理
 * 
 */
function defineReactive(data, key, val) {
    // 递归监听所有属性
    observers(val);

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            if(Dep.target){
                dep.addSub(Dep.target);//在这里添加一个订阅者
            }
            console.log('get prop '+ key);
            return val;
        },
        set: function(newVal) {
            console.log('set prop ' + key + ' as ' + newVal.toString());
            val = newVal;
        }
    })
};

// 监听属性
function observers(data) {
    if (!data || typeof data !== 'object') {
        return;
    }

    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
}

// 定义一个订阅收集器dep，用于收集所有的watcher，然后在属性变化时候执行订阅者更新函数
function Observe(data) {
    this.data = data;
    this.walk(data);
};

Observe.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data, key, val) {
        observers(val);
        var dep = new Dep();

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if (是否需要添加订阅者) {
                    // 添加一个订阅者·
                    dep.addSub(Watcher);
                }
                return val;
            },
            set: function(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                // 数据变化，通知所有订阅者
                dep.notify();
            }
        })
    }
}

// 递归创建监听者
function observers(data){
    if(!data || typeof data!='object'){
        return;
    }
    return new Observe(data);
}

// 创建一个可以容纳所有订阅者的容器
function Dep() {
    this.subs = [];
    this.target = null;
};

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
}

// 订阅者watcher
/**
 * 订阅者初始化时候要将自己添加到dep中，已经知道dep是在object.defineProperty()的get函数时候添加watcher;
 * 所以只需要在watcher初始化时候出发数据的get方法;
 * 如何触发get方法
 * 只要获取对应的属性值就能触发
 * 
 */
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); // 将自己添加到订阅者的操作
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;

        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, obj);
        }
    },
    get: function() {
        Dep.target = this; // 缓存自己
        var value = this.vm.data[this.exp]; // 强制执行监听器observer里的Object.defineProperty里的get函数
        Dep.target = null;
        return value;
    }
};