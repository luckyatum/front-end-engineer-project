# 关于前端的小问题

1.你关于性能优化是否只知道js文件摆放顺序、减少请求、雪碧图等等，却连衡量指标window.performance.timing都不清楚是干什么的？

2.请你描述下一个网页是如何渲染出来的，dom树和css树是如何合并的，浏览器的运行机制是什么，什么是否会造成渲染阻塞？
    从服务器获取到Html页面后，浏览器会开始解析html文档，解析算法分为标记构造算法和树构造算法，所谓标记构造，也就是浏览器解析html标签的方法，简单来说，html文档会当作输入流，当遇到<符号，文档状态会改变为标记打开状态，直到接收到>符号，中间的流就会解析为标签输入，此时状态会变成数据状态，然后一旦遇到</符号，状态变成标记结束状态，直到遇到下一个>，其中的流会当作树构造算法的输入；树构造算法，接受标记化算法的输出流，所谓树也就是dom树，树的结构反应了dom节点结构，树构造过程是从构造化接受流输入，一旦遇到html标签，会创建DOMHtmlElement节点，添加到#document根节点上，直到遇到body标签，然后会创建DOMHeadElement节点，即使没有head标签也会默认创建该节点，一直解析，遇到标签就创建，文本的话就创建textNode节点，直到遇到闭合的html标签；dom树构造的同时，还会解析css，css的解析是通过规则树和样式上下文树来构建的，规则树的原理，我看过一些文档，也是没有理解的很透彻，规则树可以说是一种用来简化浏览器查询重复路径的树，一开始是一条空的树，然后呢每次解析到一条css规则，会先到规则树查找是否有匹配的路径，查找到的话直接返回存储的规则节点，添加到样式上下文树上面去，没有的话就把新的规则添加到树中去，可能这棵树最主要的就是节省了每次解析重复css规则的工作；有了dom树和样式上下文树，会开始构建渲染树，渲染树的节点包含了每一个dom节点的位置，颜色，大小等等信息，所以渲染树也就是描述了dom节点在页面上的位置信息的对象节点；但是渲染树和dom树不是一一对应的，有的dom是display:none的话是不会出现在渲染树上的，也有的特殊标签会存在多个渲染节点，例如select标签就有三个；有了渲染树，浏览器会开始布局，从上至下，从左到右，已布局的节点不会再修改位置，具体流程是，每渲染一个节点，节点负责自身和其子节点的布局，直到子节点布局完成，获取到子节点的所有高度，然后得出自身高度；浏览器使用的是脏布局，元素样式发生变化时，该元素及其所有子元素会被标记为脏元素，浏览器会定时检查哪些元素是脏元素，然后重新排列渲染这些元素，如果有些样式例如font-size或者屏幕尺寸调整的话，就会触发全局的重排，布局完成后元素会把dirty设置为false;js的解析会造成渲染的阻塞，这是因为js可能会操作dom节点，如果此时继续渲染dom，会导致脚本获取到的dom节点错误，顺便需要注意的是，css的解析会阻止脚本的解析，因为可能脚本会会去元素的css信息，所以一般只有css解析完了之后才会进行脚本的执行，谷歌这种就会在脚本可能获取未加载的css时候才阻止脚本的执行；但是浏览器也会做优化，脚本就算再执行，也是会有副线程继续解析剩下的html文档，但是这时候不会改变dom，只是拿到其中的img，video等标签的资源链接，先做出请求；有的脚本开发者可以设置成defer，这样脚本不会阻塞dom的渲染，而这些脚本会先进行下载，在最后dom构造树完成后，会执行这些带有defer标记的脚本；最后，触发onload事件。

3.请简述下js引擎的工作原理，js是怎样处理事件的eventloop，宏任务源tasks和微任务源jobs分别有哪些？js是如何构造抽象语法书（AST）的？

4.你是否考虑全面你编写的整个函数，或者整个功能的容错性与扩展性？怎样构建一个组件是最合理最科学的，对于错误的处理是否有统一的方式方法？

5.浏览器缓存的基本策略，什么时候该缓存什么时候不该缓存，以及对于控制缓存的字段的相关设置是否清楚？

6.你是否可以利用面向对象的思维去抽象你的功能，你会构建一个class（ES6）吗？你对于前端架构的理解？

7.你会用VUE，你会用React，你读得懂这两个架构的源码吗？你懂他俩的基本设计模式吗？让你去构建一个类似的框架你如何下手？

8.你了解的ES6只是const、let、promise吗？你考虑过ES6提出的真正趋势吗？

9.你会用less，那么让你去写一个loader你可以吗？

10.webpack你也会用，你了解其中原理吗？你知道分析打包依赖的过程吗？你知道tree-shakeing是如何干掉无用重复的代码的吗？

11.你真的熟练使用css吗，那你知道position有几个属性吗，具体参考https://github.com/wintercn/b...

12.你了解js的数据结构吗？基本数据类型有哪些？复杂数据类型有哪些？在内存是如何表现的？

13.你可以用js去实现一个单向、双向、循环链表吗？你可以实现查找、插入、删除操作吗？

14.你了解基本常见算法吗？快速排序写一个？要是限制空间利用你该如何写？

15.你了解贪心算法、动态规划、分治算法、回溯算法等常见的算法吗？

16.你是如何理解前端架构的？你了解持续集成吗？

17.你了解基本的设计模式吗？举例单例模式、策略模式、代理模式、迭代模式、发布订阅模式。。。？

18.写一个事件监听函数呗？实现once、on、remove、emit功能

19.node.js的实现层是什么？

20.node的事件循环机制是怎样的？

21.node的child_process模块有几个api,分别的作用是什么？

22.http1.0与1.1协议的区别？

23.node是如何实现http模块的？

24.如何构建一个主从模式？

25.nginx相关配置了解过吗？

26.你真的理解前端吗？