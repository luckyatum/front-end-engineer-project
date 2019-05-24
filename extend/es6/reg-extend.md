# 正则的扩展

es6添加u修饰符。正确处理大于\uFFFF的Unicode字符，也就是4个字节的UTF-16编码

码点大于0xFFFF的Unicode字符，点字符不能识别，必须加上u修饰符

es6新增大括号表示Unicode字符，必须后面添加u修饰符才能正确识别，如

```js
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('吉') // true
```

es6添加y修饰符，表示粘连，作用是全局匹配，但是下一次匹配从上一次匹配成功的下一个位置开始
