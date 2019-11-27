// 实现监听者，监听所有属性
function Observe(data) {
    this.data = data;
    this.walk(data);
};

Observe.prototype = {
    walk: function(data) {
        var _this = this;
        Object.keys(data).forEach(function(key) {
            _this.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function(data, key ,val) {
        observers(val);

        var dep = new Dep();

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                if (Dep.target) {
                    // 添加订阅者
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        })
    }
};

function observers(data) {
    if (!data || typeof data != 'object') {
        return;
    }
    return new Observe(data);
};

// dep创建一个容纳订阅者消息的消息订阅器
function Dep() {
    this.subs = [];
    this.target = null;
};

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(watcher) {
            watcher.update();
        });
    }
}

// watcher
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();
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
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;
        var value = this.vm.data[this.exp];
        Dep.target = null;

        return value;
    }
}

// 将observe和watcher关联起来
function selfVue(data, el, exp) {
    this.data = data;
    observers(data);
    el.innerHTML = this.data[exp];

    new Watcher(this, exp, function(value) {
        el.innerHTML = value;
    });

    return this;
};