const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  let self = this; //缓存下
  self.value = undefined; //用来存放value和reason,因为promise只会处于一种状态故可只用一个变量来表示。
  self.status = PENDING; //将初始状态设置为pending
  self.onFulfilledCallbacks = []; //用来存放所有成功的回调函数
  self.onRejectedCallbacks = []; //用来存放所有失败的回调函数

  try {
    executor(resolve, reject); //调用执行函数，将resolve和reject方法作为参数传入
  } catch (e) {
    reject(e); //若执行函数中存在异常直接用抛出的值来拒绝promise
  }

  function resolve(value) {
    if (value instanceof Promise) { //和resolvePromise有点联系的是 当then return的promise中又resolve了一个promise会先走这，会将resolve里的promise的值赋给调用resolve的promise（说法欠妥，意会即可）
      return value.then(resolve, reject); //这意味着如果promise1 resolve中是一个promise2，那么promise1状态的改变时间会被推迟，直到promise2状态改变调用promise2的回调时，promise1状态才会改变才会触发promise1的回调
    }

    setTimeout(function () {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilledCallbacks.forEach(cb => cb(self.value)); //2.2.2. //2.2.6.
      }
    })
  }

  function reject(reason) {
    setTimeout(function () {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.value = reason;
        self.onRejectedCallbacks.forEach(cb => cb(self.value)); //2.2.3. //2.2.6.
      }
    })
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) { //2.2.1.
  //2.2.7.3-2.2.7.4 //2.2.5.
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  };

  let self = this,
    promise2; //2.2.7.0 //声明要返回的promise2

  if (self.status === PENDING) {
    //2.2.7.
    return promise2 = new Promise(function (resolve, reject) {
      //存储then方法绑定的回调函数 //2.2.6.
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(promise2, x, resolve, reject); //2.2.7.1 //resolve/reject属于promise2 //若此方法执行说明promise1状态已经更改
        } catch (e) {
          reject(e); //2.2.7.2
        }
      });
      self.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  } else if (self.status === FULFILLED) {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })

    });
  } else {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      })
    });
  }

};

function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) { //2.3.1.
    return reject(new TypeError('禁止循环引用!'));
  }
  let called = false;

  //2.3.2.
  if (x instanceof Promise) {
    if (x.status === PENDING) { //2.3.2.1
      x.then((y) => {
        resolvePromise(promise2, y, resolve, reject); //因为此时的y，有可能也是一个promise //挂上一个钩子只要x状态转化为成功态就递归调用resolvePromise
      }, reject);
    } else { //此分支存在的意义在于若executor调用resolve/reject不是异步的且不在resolve/reject中设置setTimeout，意味着当new的时候就会返回一个带状态的promise就会走这里。
      x.then(resolve, reject); //2.3.2.2-2.3.2.3 //只要x状态改变，就以x的状态和值来改变promise2的状态和值 //这个值可能是一个promise，前提是在上面那种假设实现中 //如果不符合上面那种实现且不想像规范一样允许值可以为一个promise或则对象 可除去此分支
    }
  } else if (x != null && ((typeof x === 'function') || (typeof x === 'object'))) { //2.3.3.
    try {
      let then = x.then; //2.3.3.1

      if (typeof then === 'function') {
        //2.3.3.3.
        then.call(x, (y) => {
          if (called) return; //2.3.3.3.3.
          called = true;
          resolvePromise(promise2, y, resolve, reject); //在resolve中又包含promise的情况下，由于resolve中的 value.then存在，当前回调调用时，resolve中的promise状态一定已经改变，在状态已经改变的时候利用then绑定回调，会走then中的status==fulfilled或则rejected分支
        }, (reason) => {
          if (called) return;
          called = true;
          reject(reason);
        });
      } else {
        resolve(x); //2.3.3.4. //1.3
      }
    } catch (e) {
      if (called) return; //2.3.3.3.4.1.
      called = true;
      reject(e); //2.3.3.2. //2.3.3.3.4.2.
    }

  } else { //2.3.4.
    resolve(x);
  }
}

Promise.deferred = Promise.defer = function () {
  let defer = {};
  defer.promise = new Promise(function (resolve, reject) {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

Promise.prototype.catch = function (onRejected) {
  this.then(null, onRejected)
};

Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  })
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
};


Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
    let result = [];
    let count = 0;
    function done(i,data){
      result[i] = data;
      if(++count === promises.length){
        resolve(result);
      }
    }
    for(let i=0;i<promises.length;++i){
      promises[i].then((value)=>{
        done(i,value);
      },reject);
    }
  })
};

Promise.race = function(promises){
  return new Promise(function(resolve,reject){
    for(let i=0;i<promises.length;++i){
      promises[i].then(resolve,reject);
    }
  });
};

Promise.promisify = function(fn){
  return function(...args){
    return new Promise((resolve,reject)=>{
      fn.apply(null,[...args,function(err,data){
        err?reject(err):resolve(data);
      }]);
    });
  }
};

Promise.promisifyALL = function(obj){
  for(var key in obj){
    if(obj.hasOwnProperty(key)&&typeof obj[key]=='function'){
      obj[key+'Async'] = Promise.promisify(obj[key]);
    }
  }
};
module.exports = Promise;