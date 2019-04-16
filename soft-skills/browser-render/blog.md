### [从浏览器渲染原理谈页面优化](https://blog.csdn.net/riddle1981/article/details/78681191)
> * DOM树的渲染从接收到文档开始，字节转化为字符，字符转化为标记，标记构建dom树
### [浏览器如何工作](http://taligarsiel.com/Projects/howbrowserswork1.htm#Introduction)
> * 从地址栏输入"google.com"到屏幕上看到页面发生了什么？
> 
> * 浏览器基本组件
>   > * 用户界面（地址栏，后退\前进，书签）
>   > * 浏览器引擎（查询和操作渲染引擎）
>   > * 渲染引擎（渲染html/css等内容）
>   > * 网络（网络请求）
>   > * UI后端（组合框/窗口等部件）
>   > * JavaScript解析器
>   > * 数据存储（h5新定义了"web数据库"）
> * 浏览器解析html的算法（简单版）
>   > * 标记化算法，遇到"<"字符，状态更改为"标记打开状态"，接下来接收到的字符会是状态跳转至"标记名称状态"，直到消耗掉">"字符，其中"标记名称状态"的字符会被附加到新标记名称中。之后状态更改回"数据状态"，标签中的内容将会创建和发出字符标记，直到遇到"</"中的"<"，此时重新回到"标记打开状态"，下一个"/"将导致创建"结束标记令牌"并且移动到"标记名称状态"，继续直到">"，然后返回"数据状态"。
>   > * 树构造算法，该算法的输入来自于标记化算法的每一个标记。初始状态为"initial mode"，接收到"html"标记的话，状态变为"before html"，此时会创建一个HTMLHtmlElement节点，并且添加到#document根节点中。然后状态变为"before head"，当接收到一个"body"令牌时候，将会创建一个HTMLHeadElement节点并添加到dom树，此时状态变为"in head"然后变为"after head"，此时会创建一个HTMLBodyElement节点并且添加到dom树，状态变为"in body"，然后接受上述的字符标记（也就是内容），此时会创建一个TextNode节点，字符标记会添加到TextNode节点中。最后，变为"after body"状态，接收"html"结束标签，完成树结构创建。
>   > * 解析完成后，浏览器标记文档为交互式，并且开始解析脚本，然后触发"onload"事件。
>   > * 浏览器容错（webkit容错示例）
>   >   > * \</br>与\<br>，webkit将统一视为\<br>。
>   >   > ```
>   >   > if（t-> isCloseTag（brTag）&& m_document-> inCompatMode（））{
>   >   >   reportError（MalformedBRError）;
>   >   >   t-> beginTag = true;
>   >   > }
>   >   > ```
>   >   > * 嵌套混乱的table标签
>   >   > ```
>   >   ><table>
>   >   >   <table>
>   >   >       <tr><td>内表</td></tr>
>   >   >   </table>
>   >   >   <tr><td>外表</td></tr>
>   >   ></table>
>   >   > ```
>   >   > * webkit将其渲染为两个table
>   >   > ```
>   >   ><table> 
>   >   >   <tr><td>内表</td></tr>
>   >   ></table>
>   >   ><table> 
>   >   >   <tr><td>外表</td></tr>
>   >   ></table>
>   >   > ```
>   >   > * 标签嵌套层次太深，webkit将只允许最多20层的相同元素嵌套
