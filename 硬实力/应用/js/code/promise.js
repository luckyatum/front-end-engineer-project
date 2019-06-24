// js实现原生promise功能
// PromiseDemo
class MyPromise {
    constructor (exec) {
        if (typeof exec !== 'function') {
            throw new Error('arguments must be a function');
        }
        this.state = 'pending';
        this.statesSave = [];

        const resolve = res => {
            if (this.state !== 'pending') {
                return;
            }
            this.state = 'resolved';
            this.internalValue = res;

            this.statesSave[0]['successFunc'](res);
        };

        const reject = err => {
            if (this.state !== 'pending') {
                return;
            }
            this.state = 'rejected';
            this.internalValue = err;
            this.statesSave[0]['FailFunc'](err);
        }
        try {
            exec(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then (successFunc, FailFunc) {
        if (this.state === 'resolved') {
            successFunc(this.internalValue);
        } else if (this.state === 'rejected') {
            FailFunc(this.internalValue);
        } else {
            this.statesSave.push({ successFunc, FailFunc });
        }
        return this;
    }
    catch (FailFunc) {
        if (this.state === 'rejected') {
            FailFunc(this.internalValue);
        }
        return this;
    }
}

let demo = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('reject');
        resolve('resolve');
    }, 1000);
});

demo.then(res => {
    console.log(res);
}, err => {
    console.log(err);
}).catch(err => {
    console.log(err, 'catch');
});