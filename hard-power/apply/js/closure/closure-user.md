# 闭包的使用场景

1. for循环

```js
// 未使用闭包
for(var i = 0;i < 10;i++) {
    setTimeout(() => {
        console.log(i);
    });
}

// 使用闭包
for(var i = 0;i < 10;i++) {
    ((index) => {
        setTimeout(() => {
            console.log(index);
        });
    })(i);
}
```

2. 用作es6的修饰器

