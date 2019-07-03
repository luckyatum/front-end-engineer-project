// promise实现
function Promise(exec) {
    var _this = this;
    this.value = null;
    this.status = 'pending';
    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    try {
        exec(resolve, reject);
    } catch(e) {
        reject(e);
    }

    function resolve(value) {
        if (value instanceof Promise) {
            return value.then(resolve, reject);
        }
        setTimeout(() => {
            if (_this.status === 'pending') {
                _this.status = 'fulfilled';
                _this.value = value;
                _this.fulfilledCallbacks.forEach((cb) => {
                    cb(_this.value);
                });
            }
        });
    }

    function reject(reason) {
        setTimeout(() => {
            if (_this.status === 'pending') {
                _this.status = 'rejected';
                _this.value = reason;
                _this.rejectedCallbacks.forEach((cb) => {
                    cb(_this.value);
                });
            }
        });
    }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    };

    return new Promise((resolve) => {
        
    });
}