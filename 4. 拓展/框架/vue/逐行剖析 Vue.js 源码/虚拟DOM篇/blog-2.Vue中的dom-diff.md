# [Vue中的虚拟Dom](https://nlrx-wjc.github.io/Learn-Vue-Source-Code/virtualDOM/#_1-%E5%89%8D%E8%A8%80)

## 前言

Dom-diff的核心思想就是比对两个VNode，找出差异所在，然后更新有差异的DOM节点，最终达到以最少操作真实DOM更新视图的目的。

## patch

vue中把Dom-diff过程称为patch，意为补丁。即对旧的VNode进行修补，得到新的VNode。

patch过程中，我们要抓住这样的思想：旧的OldVNode就是数据变化之前视图对应的虚拟DOM节点，新的VNode是数据变化之后将要渲染的视图对应的虚拟DOM节点。所以我们要以新的VNode为基准，对比旧的OldVNode，如果新的VNode上面有而旧的OldVNode上面没有的话，就在旧的VNode上面加上去；如果新的VNode上面没有而旧的OldVNode上面有的话，把旧的OldVNode上面的删掉；如果在新的VNode和旧的OldVNode上面都有的话，则以新的VNode为准，更新旧的OldVNode。

所以，整个patch过程其实就是做三件事：

* 创建节点：新的VNode有而旧的OldVNode没有，则在旧的OldVNode上面创建相应的节点；
* 删除节点：新的VNode没有而旧的OldVNode有的话，则在旧的OldVNode上面删除相应的节点；
* 修改节点：新的VNode和旧的OldVNode都有的话，则以新的VNode为准，更新旧的OldVNode；

## 创建节点

VNode类可以描述6中类型的节点，实际上只有三种节点可以被创建并插入到DOM中，分别是：元素节点、文本节点、注释节点；

所以Vue中会先判断在新的VNode中有而旧的OldVNode中没有的节点是属于哪种类型的节点；源码如下：

```js
// 源码位置: /src/core/vdom/patch.js
function createElm (vnode, parentElm, refElm) {
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) {
        vnode.elm = nodeOps.createElement(tag, vnode)   // 创建元素节点
        createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
        insert(parentElm, vnode.elm, refElm)       // 插入到DOM中
    } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text)  // 创建注释节点
        insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
    } else {
        vnode.elm = nodeOps.createTextNode(vnode.text)  // 创建文本节点
        insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
    }
}
```

从上面代码中，我们可以看出：

* 判断是否为元素节点只需要判断VNode节点是否有tag标签即可；如果有则表示是元素节点，然后调用createElement方法创建元素节点；通常元素节点还会有子节点，那就递归遍历创建所有子节点，将子节点创建好之后insert到当前元素节点中，最后把元素节点插入到DOM中；
* 判断是否为注释节点，只需要判断VNode的isComment属性是否为true，如果是true则为注释节点，然后调用createComment方法创建注释节点，再插入DOM中；
* 如果既不是元素节点，也不是注释节点，那么就认为是文本节点，调用createTextNode方法创建文本节点，再插入到DOM中；

## 删除节点

如果某些节点在新的VNode中没有而在旧的OldVNode中有的话，就把这些节点从旧的oldVNode中删除；源码如下：

```js
function removeNode (el) {
    const parent = nodeOps.parentNode(el)  // 获取父节点
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el)  // 调用父节点的removeChild方法
    }
}
```

## 更新节点

创建节点和删除节点都比较简单，更新节点就比较复杂了；

首先介绍什么是静态节点？

也就是一个节点中只包含纯文字，不包含任何的变量，那么任何的数据变化都不会影响该节点；所以更新节点的时候我们需要对下面3种情况进行判断并分别处理：

1. VNode和OldVNode都为静态节点

    直接跳过，无需处理

2. VNode是文本节点

    表示这个节点内只包含文本，然后只需看OldVNode是否也是文本节点，如果是的话，则比较两者是否不同，不同则更新旧的OldVNode节点的文本内容即可；如果OldVNode不是文本节点，那么不论它是什么，直接调用setTextNode方法把它改成文本节点，并且文本内容和VNode相同；

3. VNode是元素节点

    如果是元素节点，又分为以下几种情况：

    * 该节点包含子节点

    如果新节点包含子节点，那么需要看旧的节点是否包含子节点；

    如果旧的节点也包含子节点，那么就递归对比更新子节点；

    如果旧的节点不包含子节点，那么旧节点有可能是空节点或者是文本节点；

    如果旧的节点是空节点，就把新的节点里的子节点创建一份然后插入到旧的节点里面；

    如果旧的节点是文本节点，则把文本清空然后把新的节点的子节点创建一份然后插入到旧的节点里面；

    * 该节点不包含子节点

    如果新的节点不包含子节点，同时它又不是文本节点，那么说明该节点是个空节点，那就直接把旧节点清空就好；
