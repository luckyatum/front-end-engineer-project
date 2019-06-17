# [一个合格的中级前端工程师必须要掌握的 28 个 JavaScript 技巧](https://juejin.im/post/5cef46226fb9a07eaf2b7516)

## 1. 判断对象的数据类型

```js
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target);
const isArray = isType('Array');
console.log(isArray[]); // true
```

## 2. es5实现数组map方法

```js
var selfMap = function(fn, context) {
    var arr = Array.prototype.slice.call(this); // 浅拷贝当前数组
    var newMapArr = [];
    for(var i = 0;i < arr.length;i++) {
        if (!arr.hasOwnProperty(i)) continue;
        newMapArr.push(fn.call(context, arr[i], i, this));
    }
    return newMapArr;
};

// 使用
Array.prototype.selfMap = selfMap;
[1, 2, 3, 4].selfMap(function(i, index, _this) {
    return i + 3 + this['name'];
}, {
    name: 'hahaha'
});
// ["4hahaha", "5hahaha", "6hahaha", "7hahaha"]
```

如果map第一个参数是箭头函数，第二个this会因为箭头函数的词法绑定而失效（此时函数中的this指向window，严格模式下指向undefined）

## 3. 使用 reduce 实现数组 map 方法

```js
var selfMap2 = function(fn, context) {
    var arr = Array.prototype.slice.call(this); // 浅拷贝一个数组
    return arr.reduce((pre, cur, index) => {
        return [...pre, fn.call(context, cur, index, this)];
    }, []);
};
```

## 4. es5实现filter方法

```js
var selfFilter = function(fn, context) {
    var arr = Array.prototype.slice.call(this); // 浅拷贝一个数组
    var filteredArr = [];
    for(var i = 0;i < arr.length;i++) {
        if (!arr.hasOwnProperty(i)) continue;
        fn.call(context, arr[i], i, this) && filteredArr.push(arr[i]);
    }
    return filteredArr;
};

// 使用
Array.prototype.selfFilter = selfFilter;
[1, 2, 3, 4].selfFilter(function(i) {
    console.log(i, this['num']);
    return i < this['num'];
}, {
    num: 3
});
```

## 5. 使用reduce实现filter方法

```js
var selfFilterReduce = function(fn, context) {
    return this.reduce((pre, cur, index) => {
        return fn.call(context, cur, index, this) ? [...pre, cur] : [...pre];
    }, []);
};
```

## 6. es5实现some方法

```js
var selfSome = function(fn, context) {
    var arr = Array.prototype.slice.call(this);
    if (!arr.length) return false;
    for(var i = 0;i < arr.length;i++) {
        if (!arr.hasOwnProperty(i)) continue;
        if (fn.call(context, arr[i], i, this)) return true;
    }
    return false;
};
```

## 7.es5实现数组的reduce方法

```js
var selfReduce = function(fn, initialValue) {
    var arr = Array.prototype.slice.call(this);
    var res;
    var startIndex;
    if (initValue === undefined) {
        // 找到第一个非空单元（真实）的元素和下标
        for(var i = 0;i < arr.length;i++) {
            if (!arr.hasOwnProperty(i)) continue;
            startIndex = i;
            res = arr[i];
            break;
        }
    } else {
        res = initialValue;
    }

    for(var i = ++startIndex || 0;i < arr.length;i++) {
        if (!arr.hasOwnProperty(i)) continue;
        res = fn.call(null, res, arr[i], i, this);
    }
    return res;
}
```

## 8.使用 reduce 实现数组的 flat 方法

```js
var selfFlat = function(depth) {
    depth = depth || 1; // 默认为1
    if (depth == 0) return arr;
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return [...pre, ...selfFlat.call(cur, depth - 1)];
        } else {
            return [...pre, cur];
        }
    }, []);
}
```

## 9.实现es6的class语法

```js
function inherit(subType, superType) {
    subType.prototype = Object.create(superType.prototype, {
        constructor: {
            enumerable: false,
            configurable: true,
            writeable: true,
            value: superType
        }
    });
    Object.setPrototypeOf(subType, superType);
}
```

## 10.函数柯里化

```js
function curry(fn) {
    if (fn.length <= 1) return fn;
    var generator = (...args) => {
        if (fn.length === args.length) {
            return fn(...args);
        } else {
            return (...args2) => {
                return generator(...args, ...args2);
            }
        }
    };
    return generator;
}
```
