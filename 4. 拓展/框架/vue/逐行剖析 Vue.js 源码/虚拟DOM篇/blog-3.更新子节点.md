# [更新子节点](https://nlrx-wjc.github.io/Learn-Vue-Source-Code/virtualDOM/updataChildren.html)

当新旧节点都包含子节点的时候，节点上的children属性就是它们的子节点数组；

我们把新节点的子节点数组记为newChildren，旧节点的子节点数组记为oldChildren；

我们把newChildren和oldChildren元素进行一一比对，对比两个子节点肯定要经过循环，外层循环newChildren数组，内层循环oldChildren数组；

每循环外层newChildren数组的一个子节点，就去内层oldChildren数组中找有没有与之相同的子节点；伪代码如下：

```js
for(let i = 0;i < newChildren.length;i++) {
    const newChild = newChildren[i];
    for(let j = 0;i < oldChildren.length;j++) {
        const oldChild = oldChildren[j];

        if (newChild === oldChild) {
            // ...
        }
    }
}
```

以上过程会出现四种情况：

* 创建子节点

    如果newChildren里面的某个子节点在oldChildren中找不到与之相同的子节点，那么说明newChildren里面的这个子节点是之前没有的，那么就创建子节点；

* 删除子节点

    如果把newChildren里面的每一个子节点都循环完毕后，发现在oldChildren中还有未处理的子节点，那么说明这些是废弃的子节点，那么就删除这些子节点；

* 移动子节点

    如果newChildren中某个子节点在oldChildren中找到了与之相同的子节点，但是所处位置不同，说明此次变化需要调整子节点位置，