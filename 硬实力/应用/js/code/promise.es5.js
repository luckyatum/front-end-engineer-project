// es5实现promise功能
// 我们要满足状态只能三种状态：pending,fulfilled,rejected三种状态，且状态只能由pending=>fulfilled,或者pending=>rejected

var pending = 0;
var fulfilled = 1;
var rejected = 2;

// value状态为执行成功事件的入参，deferreds保存着状态改变之后的需要处理的函数以及promise子节点，构造函数里面应该包含这三个属性的初始化

function Promise(callback) {
    this.status = pending;
    this.value = null;
    this.defferd = [];
    setTimeout(callback.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
}

Promise.prototype = {
    constructor: Promise,
    // 触发改变promise状态到fulfilled
    resolve: function(result) {
        this.status = fulfilled;
        this.value = result;
        this.done();
    },
    // 触发改变promise状态到rejected
    reject: function(err) {
        this.status = rejected;
        this.value = err;
    },
    // 处理defferd
    handle: function(fn) {
        if (!fn) {
            return;
        }
        var value = this.value;
        var t = this.status;
        var p;
        if (t == pending) {
            this.defferd.push(fn);
        } else {
            if (t == fulfilled && typeof fn.onfulfiled == 'function') {
                p = fn.onfulfiled(value);
            }
            if (t == rejected && typeof fn.onrejected == 'function') {
                p = fn.onrejected(value);
            }
            var promise = fn.promise;
            if (promise) {
                if (p && p.constructor == Promise) {
                    p.defferd = promise.defferd;
                } else {
                    p = this;
                    p.defferd = promise.defferd;
                    this.done();
                }
            }
        }
    },
    // 触发promise defferd里面需要执行的函数
    done: function() {
        var status = this.status;
        if (status == pending) {
            return;
        }
        var defferd = this.defferd;
        for(var i = 0;i < defferd.length;i++) {
            this.handle(defferd[i]);
        }
    },
    /**
     * 存储then函数里面的事件
     * 返回promise对象
     * defferd函数当前promise对象里面
     */
    then: function(success, fail) {
        var o = {
            onfulfiled: success,
            onrejected: fail
        };
        var status = this.status;
        o.promise = new this.constructor(function() {});
        if (status == pending) {
            this.defferd.push(o);
        } else if (status == fulfilled || status == rejected) {
            this.handle(o);
        }
        return o.promise;
    }
}