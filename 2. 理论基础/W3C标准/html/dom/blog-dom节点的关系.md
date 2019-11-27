# [DOM节点之间的关系,与节点的基本操作](https://blog.csdn.net/wangpigu5201314/article/details/81835323)

## 1. 节点之间的关系

### 1.1 获取到所有节点类型（元素节点类型，文本节点类型等）的元素

1. 获取一个元素下的所有子节点 ```dom.childNodes```
2. 获取一个元素的第一个节点 ```dom.firstChild```
3. 获取一个元素的最后一个节点 ```dom.lastChild```
4. 获取一个元素的下一个节点对象 ```dom.nextSibling```
5. 获取一个元素节点的上一个节点对象 ```dom.previousSibling```
6. 获取一个元素的父节点 ```dom.parentNode```

## 1.2 获取到元素节点类型的元素

1. 获取一个元素下的所有子节点（获取到类数组HTMLCollection） ```dom.children```
2. 获取一个元素的第一个元素子节点 ```dom.firstElementChild```
3. 获取一个元素的最后一个元素元素子节点 ```dom.lastElementChild```
4. 获取一个元素的下一个元素节点对象 ```dom.nextElementSibling```
5. 获取一个元素节点的上一个元素节点对象 ```dom.previousElementSibling```
6. 获取一个元素的元素父节点 ```dom.parentElement```
7. 获取一个元素的所有子节点个数 ```dom.childElementCount```

## 2. 节点的增加、插入、替换、移除、克隆

### 2.1 增加节点

1. 增加文本节点

    ```var text = document.createTextNode('文本内容')```

2. 增加元素节点

    ```var ele = document.createElement('元素名')```

### 2.2 插入子节点

插入节点必须通过父元素插入（以下ele均为父元素）

1. 追加法

    ```ele.appendChild(text)```

2. 某一个子节点前插入节点

    ```ele.insertBefore(text, ele.lastElementChild)```

    ```ele.insertBefore(text, null)```

    如果第二个参数是null或者undefined，效果和appendChild一致

### 2.3 替换子节点

    ```ele.replaceChild(newNode, oldNode)```

### 2.4 移除子节点

    ```ele.removeChild(childNode)```

### 2.5 克隆节点

    ```ele.cloneNode(true)```

    true表示深复制，子孙之类的全复制

    false表示浅复制，只复制当前节点，子孙节点不会复制
