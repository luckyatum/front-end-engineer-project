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

es6正则对象多了sticky属性，表示是否设置了y修饰符

es6正则对象多了flags属性，返回修饰符(giyu等)

es6添加s修饰符，表示.匹配任意一个字符，包括原先不匹配的换行符

es6正则对象多了dotAll属性，表示是否设置了s修饰符

es6后v8引擎已经支持后行断言和后行否定断言

匹配组可以添加组名识别

```js
reg = /(?<name>a+)/
// 使用
reg.exec('gaasfasdav').groups.name
// "aa"
```

有了具名组匹配后，可以解构赋值直接从匹配结果上为变量赋值

```js
let {groups: {one, two}} = /^(?<one>.*):(?<two>.*)$/u.exec('foo:bar')

// one foo
// two bar
```

具名组也可以直接在后面引用

```js
reg = /(?<word>[a-z]+)!\k<word>$/
reg.test('abc!abc') // true
```
