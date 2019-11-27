# [dom操作节点-----怎样添加、移除、移动、复制、创建和查找节点？](https://www.cnblogs.com/SRH151219/p/10382634.html)

## 1. 创建新节点

```js
document.createElement('标签名'); // 创建一个具体元素
document.createTextNode('文本内容'); // 创建一个文本节点
```

## 2. 添加

```js
ele.appendChild('节点、文本内容'); // 添加到ele的所有子节点的末尾
ele.insertBefore('插入的节点、文本', '目标节点'); // 添加插入的节点到目标节点之前，如果目标节点为null、undefined，则等同于appendChild
```

## 3. 文档碎片(documentFragment)

```js
// 1. 创建文档碎片
var frag = document.createDocumentFragment()
// 2. 将创建的元素添加到文档碎片
frag.appendChild('元素');
// 3. 将文档碎片添加到ele元素中
ele.appendChild(frag);
```

## 4. 移除

```js
ele.removeChild('子元素'); // 移除ele中的子元素
ele.remove(); // ele移除自身元素
```

## 5. 替换

```js
ele.replaceChild('新元素', '旧元素'); // 用新元素替换旧元素
```
