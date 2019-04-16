# [浏览器如何工作](http://taligarsiel.com/Projects/howbrowserswork1.htm#Introduction)

## 1. 从地址栏输入"google.com"到屏幕上看到页面发生了什么？

## 2. 浏览器基本组件

* 用户界面（地址栏，后退\前进，书签）
* 浏览器引擎（查询和操作渲染引擎）
* 渲染引擎（渲染html/css等内容）
* 网络（网络请求）
* UI后端（组合框/窗口等部件）
* JavaScript解析器
* 数据存储（h5新定义了"web数据库"）
  
## 3. 浏览器解析html的算法（简单版）

* 标记化算法，遇到"<"字符，状态更改为"标记打开状态"，接下来接收到的字符会是状态跳转至"标记名   称状态"，直到消耗掉">"字符，其中"标记名称状态"的字符会被附加到新标记名称中。之后状态更改回"   数据状态"，标签中的内容将会创建和发出字符标记，直到遇到"</"中的"<"，此时重新回到"标记打开状   态"，下一个"/"将导致创建"结束标记令牌"并且移动到"标记名称状态"，继续直到">"，然后返回"数据状   态"。
* 树构造算法，该算法的输入来自于标记化算法的每一个标记。初始状态为"initial mode"，接收到   "html"标记的话，状态变为"before html"，此时会创建一个HTMLHtmlElement节点，并且添加到   #document根节点中。然后状态变为"before head"，当接收到一个"body"令牌时候，将会创建一个   HTMLHeadElement节点并添加到dom树，此时状态变为"in head"然后变为"after head"，此时会创建一   个HTMLBodyElement节点并且添加到dom树，状态变为"in body"，然后接受上述的字符标记（也就是内   容），此时会创建一个TextNode节点，字符标记会添加到TextNode节点中。最后，变为"after body"状   态，接收"html"结束标签，完成树结构创建。
* 解析完成后，浏览器标记文档为交互式，并且开始解析脚本，然后触发"onload"事件。
* 浏览器容错（webkit容错示例）
  \</br>与\<br>，webkit将统一视为\<br>。
  
  ```js
  if（t-> isCloseTag（brTag）&& m_document-> inCompatMode（））{
      reportError（MalformedBRError）;
      t-> beginTag = true;
  }
  ```

  嵌套混乱的table标签
  
  ```html
  <table>
    <table>
      <tr><td>内表</td></tr>
    </table>
  <tr><td>外表</td></tr>
  </table>
  ```

  webkit将其渲染为两个table
  
  ```html
  <table>
    <tr><td>内表</td></tr>
  </table>
  <table>
    <tr><td>外表</td></tr>
  </table>
  ```

  标签嵌套层次太深，webkit将只允许最多20层的相同元素嵌套
  
## 4. 浏览器解析css的算法（简单版）

css词法正则定义

词法名称|词法含义|表达式
---|:--:|--:
comment|注释|\/\*[^*]*\*+([^/*][^*]*\*+)*\/
num|数字|[0-9]+|[0-9]*"."[0-9]+
nonascii|非ascii码|[\200-\377]
nmstart|xx|[_a-z]|{nonascii}|{escape}
nmchar|xx|[_a-z0-9-]\|{nonascii}|{escape}
name|名称|{nmchar}+
ident|标识符|{nmstart}{nmchar}*

&emsp;&emsp;webkit使用flex和bison解析器生成器解析css，每个css文件都被解析为StyleSheet对象，每个对象都包含css规则，每条CSS规则对象包含选择器和声明对象以及与CSS语法对应的其他对象。例如：

```css
p, div {
    margin-top: 3px;
}
.error {
    color: red;
}
```

&emsp;&emsp;根据css语法解析规则，以上代码将会解析成以下对象结构</br>

```js
CSSStyleSheet: {
    CSSRule: {
        Selectors: ['p', 'div'],
        Declaration: ['margin-top', '3px']
    },
    CSSRule: {
        Selectors: ['p', 'div'],
        Declaration: ['margin-top', '3px']
    }
}
```

## 5. 浏览器解析js

* H5标准新增加了选项，可以将脚本标记为异步，此时浏览器在遇到script标签时候会用另一个线程解析执行。
* webkit和ff都对脚本的执行进行了优化，脚本执行时，另一个线程会解析文档剩余部分，找出其中需要请求的资源并加载，推测解析器不会修改DOM，而仅仅是找出了对外部资源的引用然后发起请求。（因为脚本的执行可能会改变DOM节点）
* 样式表的加载不会影响文档解析，但是，会影响到脚本的执行，所以，浏览器在加载完成样式表前，会阻止脚本的执行，这也是css建议放在头部的原因。

## 6. 渲染树

* 渲染树是在构建Dom树时候，同时构建的；
* 渲染树是文档的直观表现，该树的目的是以正确的顺序绘制内容；
* 每个渲染器代表一个矩形区域，包含高度、宽度、位置等信息；
* 矩形框类型受到该节点或者与节点相关的"display"属性影响；
* 渲染树和Dom元素不是一一对应的，非可视Dom元素不会插入渲染树(如"head"元素，"display: none"的元素同样不插入渲染树)；
* 某些Dom元素具有多个可视对象，通常这些元素都是结构比较复杂的，例如"select"元素有3个渲染器 - 一个用于显示区域，一个用于显示下拉列表框，一个用于按钮；
* 