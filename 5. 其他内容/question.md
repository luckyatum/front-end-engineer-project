# 关于前端的小问题

$1.你关于性能优化是否只知道js文件摆放顺序、减少请求、雪碧图等等，却连衡量指标window.performance.timing都不清楚是干什么的？

$2.请你描述下一个网页是如何渲染出来的，dom树和css树是如何合并的，浏览器的运行机制是什么，什么是否会造成渲染阻塞？
    从服务器获取到Html页面后，浏览器会开始解析html文档，解析算法分为标记构造算法和树构造算法，所谓标记构造，也就是浏览器解析html标签的方法，简单来说，html文档会当作输入流，当遇到<符号，文档状态会改变为标记打开状态，直到接收到>符号，中间的流就会解析为标签输入，此时状态会变成数据状态，然后一旦遇到</符号，状态变成标记结束状态，直到遇到下一个>，其中的流会当作树构造算法的输入；树构造算法，接受标记化算法的输出流，所谓树也就是dom树，树的结构反应了dom节点结构，树构造过程是从构造化接受流输入，一旦遇到html标签，会创建DOMHtmlElement节点，添加到#document根节点上，直到遇到body标签，然后会创建DOMHeadElement节点，即使没有head标签也会默认创建该节点，一直解析，遇到标签就创建，文本的话就创建textNode节点，直到遇到闭合的html标签；dom树构造的同时，还会解析css，css的解析是通过规则树和样式上下文树来构建的，规则树的原理，我看过一些文档，也是没有理解的很透彻，规则树可以说是一种用来简化浏览器查询重复路径的树，一开始是一条空的树，然后呢每次解析到一条css规则，会先到规则树查找是否有匹配的路径，查找到的话直接返回存储的规则节点，添加到样式上下文树上面去，没有的话就把新的规则添加到树中去，可能这棵树最主要的就是节省了每次解析重复css规则的工作；有了dom树和样式上下文树，会开始构建渲染树，渲染树的节点包含了每一个dom节点的位置，颜色，大小等等信息，所以渲染树也就是描述了dom节点在页面上的位置信息的对象节点；但是渲染树和dom树不是一一对应的，有的dom是display:none的话是不会出现在渲染树上的，也有的特殊标签会存在多个渲染节点，例如select标签就有三个；有了渲染树，浏览器会开始布局，从上至下，从左到右，已布局的节点不会再修改位置，具体流程是，每渲染一个节点，节点负责自身和其子节点的布局，直到子节点布局完成，获取到子节点的所有高度，然后得出自身高度；浏览器使用的是脏布局，元素样式发生变化时，该元素及其所有子元素会被标记为脏元素，浏览器会定时检查哪些元素是脏元素，然后重新排列渲染这些元素，如果有些样式例如font-size或者屏幕尺寸调整的话，就会触发全局的重排，布局完成后元素会把dirty设置为false;js的解析会造成渲染的阻塞，这是因为js可能会操作dom节点，如果此时继续渲染dom，会导致脚本获取到的dom节点错误，顺便需要注意的是，css的解析会阻止脚本的解析，因为可能脚本会会去元素的css信息，所以一般只有css解析完了之后才会进行脚本的执行，谷歌这种就会在脚本可能获取未加载的css时候才阻止脚本的执行；但是浏览器也会做优化，脚本就算再执行，也是会有副线程继续解析剩下的html文档，但是这时候不会改变dom，只是拿到其中的img，video等标签的资源链接，先做出请求；有的脚本开发者可以设置成defer，这样脚本不会阻塞dom的渲染，而这些脚本会先进行下载，在最后dom构造树完成后，会执行这些带有defer标记的脚本；最后，触发onload事件。

$3.请简述下js引擎的工作原理，js是怎样处理事件的eventloop，宏任务源tasks和微任务源jobs分别有哪些？js是如何构造抽象语法树（AST）的？

4.你是否考虑全面你编写的整个函数，或者整个功能的容错性与扩展性？怎样构建一个组件是最合理最科学的，对于错误的处理是否有统一的方式方法？

$5.浏览器缓存的基本策略，什么时候该缓存什么时候不该缓存，以及对于控制缓存的字段的相关设置是否清楚？

6.你是否可以利用面向对象的思维去抽象你的功能，你会构建一个class（ES6）吗？你对于前端架构的理解？

*7.你会用VUE，你会用React，你读得懂这两个架构的源码吗？你懂他俩的基本设计模式吗？让你去构建一个类似的框架你如何下手？

$8.你了解的ES6只是const、let、promise吗？你考虑过ES6提出的真正趋势吗？

    es6主要内容是包括，let const的块级作用域声明，然后呢对字符串，数值，函数，数组，对象，正则都做了相应的扩展，提供更加语义化的函数，然后就是引入新的基本数据类型Symbol，还有Reflact，proxy代理，然后是promise函数还有generator遍历器，还引入了class语法和模块化语法，最后是async函数和await语法；个人感觉es6就是编码更加简洁，然后函数调用更加语义化，还有新的特性可以使得前端在未来有更多可能性，例如vue3.0就是基于proxy代理的，我是觉得应该好好掌握然后多点进行运用

9.你会用less，那么让你去写一个loader你可以吗？

10.webpack有哪些常见的 loader？他们能解决什么问题？

11.webpack 的构建流程是什么?从读取配置到输出文件的整个过程

12.是否写过 loader 和 Plugin ？描述一下编写 loader 或 Plugin 的思路？

13.webpack 的热更新是如何做到的？说明其原理？

14.如何利用 webpack 来优化前端性能？（提高性能和体验）

15.webpack你也会用，你了解其中原理吗？你知道分析打包依赖的过程吗？你知道tree-shakeing是如何干掉无用重复的代码的吗？

16.你真的熟练使用css吗，那你知道position有几个属性吗，具体参考 [https://github.com/wintercn](https://github.com/wintercn)

17.你了解js的数据结构吗？基本数据类型有哪些？复杂数据类型有哪些？在内存是如何表现的？

18.你可以用js去实现一个单向、双向、循环链表吗？你可以实现查找、插入、删除操作吗？

19.你了解基本常见算法吗？快速排序写一个？要是限制空间利用你该如何写？

20.你了解贪心算法、动态规划、分治算法、回溯算法等常见的算法吗？

21.你是如何理解前端架构的？你了解持续集成吗？

22.你了解基本的设计模式吗？举例单例模式、策略模式、代理模式、迭代模式、发布订阅模式。。。？

23.写一个事件监听函数呗？实现once、on、remove、emit功能

24.node.js的实现层是什么？

25.node的事件循环机制是怎样的？

26.node的child_process模块有几个api,分别的作用是什么？

27.http1.0与1.1协议的区别？

28.node是如何实现http模块的？

29.如何构建一个主从模式？

30.nginx相关配置了解过吗？

31.你真的理解前端吗？

32.你做过的前端优化方案有哪些？

    1.简单的如css放头部，js放底部
    2.有的比较大的字体文件放到cdn上；
    3.图片尽量使用jpg格式，然后过大的在不影响品质的情况下再压缩一下；
    4.css样式选择器不使用*选择器，尽量使用一个类名选择器，不嵌套类名；
    5.js方面涉及到dom操作的都是先循环结束后再一次append进去，查询到的dom节点尽量先缓存起来；
    6.还有就是避免过多访问上级作用域，都是把上级作用域变量缓存到内部或者作为参数传递进去

33.浅拷贝数组

    1. lodash的clone方法
    2. 赋值

34.深拷贝数组

    1. lodash的cloneDeep
    2. slice方法和concact方法
    3. es6的数组扩展运算符

35.闭包的作用

    1. 解决延迟执行函数访问变量时候和预期不一致的问题，也就是常说的for循环变量打印成同一个的问题
    2. es6里面用作修饰器，修饰器是对类的修饰，在编译时候就执行的函数，闭包在修饰器使用场景是在修饰器想要传递参数的时候，可以通过在函数外层在封装一层函数，执行该层函数就是传递对应的参数给闭包，然后返回这个闭包用作真正的修饰器函数
    3. 函数式编程里面使用，函数柯里化时候

36.盒子模型和怪异盒子模型

    盒子包括margin、border、padding、content；
    标准盒子模型，也就是W3C盒子模型，width就是content的宽度
    IE怪异盒子模型，width属性包含了content、padding、border总宽度
    W3C有个提供了一个box-sizing属性，用于在两种盒子模型之间切换

37.基本垂直居中方案

    水平居中
        text-align: center;
        margin: 0 auto;
    垂直居中
        height和line-height;
        position: absolute;top:0;bottom:0;margin: auto 0; width; height;
    水平垂直居中
        position: absolute; top:0; right: 0; bottom: 0; left: 0; margin: auto 0; width; height;
        position: absolute; top: 50%; left: 50%; margin;width;height;
        position: absolute; top: 50%; left: 50%; translate;
    未知宽高的垂直居中
        flex;
        父元素table;子元素cell-table;text-align:center; vertical-align: middle;
        使用一个空标签span设置vertical-align基准线为中间，让其为inline-block;宽度为0;
        position: absolute; top: 50%; left: 50%; translate(-50%, -50%);

38.ie8浏览器兼容事项

    1.jq版本使用1.x以下
    2.不能使用flex布局和h5特性，css3属性
    3.border-radius和background-size兼容：在border-radius样式后面添加behavior: PIE.htc;语句，必须设置当前元素的position不为static
    4.透明度兼容：ie提供了filter过滤器，表现和opacity一致
    5.只能使用:first-child、:hover、:focus选择器
    6.margin尽量使用margin-left或者margin-right，好像有左右边距塌陷问题
    7.视频播放兼容，使用了腾讯云的播放器
    8.swiper使用2.x版本

39.组件项目开发时候总结

    1.不同组件开发时候发现使用方法没有统一，实现了类似ele-ui的按钮，但是使用方法是标签属性替换，而其他的组件使用方法是实例化组件传递配置项的方式，所以在两种组件开发方式下，需要统一一下
    2.开发时候完全使用原生js去开发，也有做一些ie方面的兼容，但是到后面发现很多涉及到选择器，dom操作等等的兼容，然后在考虑是否应该直接引入jq框架，而不是自己去编写一些兼容性不够好的代码
    3.项目结构上面，当时换了好几套的项目文件目录结构，总觉得不够理想，当时在移动端组件和pc端组件是否应该打包到一起有过纠结，后面还是考虑到以后可能直接分成两个项目，所以就分开来打包了；然后对应的webpack配置也是一直再做修改，包括生产环境和测试环境的配置，哪些插件该用，哪些不该用都是一直在修改；我感觉自己缺的还是对项目结构整体的一个认识，想要把很多东西都放到一个项目中，这样可能会造成混乱；所以后面我把util工具文件夹单独提取了出来，放到npm上面，然后当作工具包引入到组件项目中，但是这样也有问题，就是有时候要更新工具包了，还得每次更新npm包，所以一个半成品的工具包引入到项目还是比较麻烦的
    4.webpack的loader使用了babel、style、css、sass、url，插件也有使用了一些，分离css文件的extractText插件，清空原来打包的文件夹的clean插件，还有压缩js的插件uglify等等
    5.关于原生js操作dom，获取class通过classList，查询dom使用document.querySelector()，父节点或者子节点使用parentNode和childNode，替换内容使用innerHtml，获取到样式内容使用style；

*40.Tcp如何保证可靠传输

41.js原型

    1.每个函数都会有一个prototype属性，指向一个原型对象；
    2.原型对象的constructor默认指向函数本身
    3.如果是通过函数实例化的一个对象，该对象可以访问函数原型上的所有属性
    4.由于原型也是一个对象，所以指向Object的原型，对象查找变量时候，如果自身没有，就会通过原型去一层层查找，这一层层查找的路径，就是原型链

42.js作用域

    1.js存在两个作用域，函数作用域和全局作用域
    2.外部作用域不能访问到内部作用域的变量，但是内部函数可以访问到外部的变量方法等等数据
    3.多个函数相互嵌套，构成了层层下去的作用域链，最内部的函数也可以通过作用域链访问到最外部的变量
    4.作用域链的实质，跟js的函数执行栈有联系，js在全局初始化时候，会创建一个全局对象，里面包含了所有的自带全局属性，Math，String，document等，然后构建一个执行环境栈，创建一个全局执行环境对象，全局对象会作为全局执行环境对象的属性，然后将全局执行环境入栈，每一个函数，都会添加一个scope属性，指向的是函数定义时候所在的环境对象，比如全局环境下的函数指向的就是全局环境，该属性就是后面作用域链用于查找上层作用域的依据，然后轮到某一个函数执行时候，会创建一个该函数的执行环境对象，然后创建一个函数对象，函数对象就包括函数里面定义的变量，arguments参数，this对象等等数据，然后把函数对象作为执行环境对象的属性，然后执行环境还会添加一个作用域链的属性，里面记录了该函数scope属性指向的环境，然后还包括外部环境更上一层的作用域，最后把执行环境入栈，执行完毕后，执行环境再出栈；作用域只能访问上层，而不能访问到下层的作用域，所以执行环境中也只有scope属性，而没有别的指向函数内部的别的函数的属性

43.自己的规划

    1.基础很重要，js很重要，目前自己掌握的基础知识还不够，后面会继续完善基础知识还有进阶知识，目前在规划的知识包括：设计模式，函数式编程，canvas，es7，es8，es9，webpack的原理，node知识，tcp协议，前端安全知识，jq源码，vue源码，简单的算法，希望自己能在后面一到两年内，对上面知识有个更深刻的理解，同时现在自己已经掌握的知识也要一直回顾，有的虽然工作上感觉用不上，但是其实还是会不知道在什么时候就会给你提供解决方案的思路，例如之前我们公司做一个客户端的项目，里面有一个任务时在客户端关闭前，先添加一个定时器，然后执行一个方法，但是当我一开始使用的是setTimeout来做定时器，结果定时结束后根本没有执行就关闭了，后面想到之前看过js的事件循环机制，想到setTimeout是属于宏任务的异步代码，所以不会在主线程执行结束后再次执行，只会在事件循环一开始的时候才执行，所以后面改成了node环境里面的process.nextTick，这是个类似setTimeout的定时器，但是它是在微任务里面执行的，所以主线程执行完毕后，还会检查微任务的内容，所以最后就得以执行定时器的任务
    2.工作时候会更多的注重问题的记录，以及解决问题过程的记录

44.js继承实现方式

    构造函数式，原型链式，组合继承式，寄生式，寄生组合式

45.原生ajax写法

    ```js
        function ajax(url, callback) {
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
            xhr.open('get', url, true);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        callback(xhr.responseTEXT);
                    }
                }
            }
        }
    ```

46.图片懒加载

    主要思路，图片html部分添加指定类名，设置data-src属性，不设置src属性

    js部分监听页面滚动事件，每次触发滚动事件时候开启setTimeout定时器，每当触发滚动事件时候清除定时器，重新设置定时

    当超过一定时间页面没有滚动的时候，执行图片处理方法

    图片处理主要是循环所有的需要懒加载的图片，先是判断是否已经展示了，主要是通过data-src属性是否等于src属性，等的话表示已经加载了

    然后再判断图片是否在页面可视区域，可视区域通过三个值，一个是页面向上滚动距离，通过$(window).scrollTop()获取，一个是浏览器自身高度，通过$(window).height()，还有一个是目标img标签相对顶部的距离，通过$img.offset().top获取，最后判断条件是offsetTop > scrollTop && offsetTop < (scrollTop + windowHeight)这两个临界值

    展示图片也很简单，直接设置图片的src属性

47.双列布局，三列布局，圣杯布局，双飞翼布局

48.vue的双向绑定原理，生命周期，父子通信，跨组件通信，vuex，vue-router，懒加载组件

49.GET和POST区别

* get更简单更快
* get存在缓存
* get不安全
* get适用于小文件，post没有限制
* get使用send方法时不传参，post必须传参

50.DOM结构——两个节点之间可能存在哪些关系以及如何在节点之间任意移动。

51.DOM操作——怎样添加、移除、移动、复制、创建和查找节点。

52.事件——怎样使用事件以及IE和DOM事件模型之间存在哪些主要差别。

* ie事件模型绑定方式和解绑方式不一样；
* 事件对象里面的常用属性不一样；
* ie事件阶段只有处理阶段和冒泡阶段，没有捕获阶段。

53.XMLHttpRequest——这是什么、怎样完整地执行一次GET请求、怎样检测错误。

54.严格模式与混杂模式——如何触发这两种模式，区分它们有何意义。

55.盒模型——外边距、内边距和边框之间的关系，IE 8以下版本的浏览器中的盒模型有什么不同。

56.块级元素与行内元素——怎么用CSS控制它们、它们怎样影响周围的元素以及你觉得应该如何定义它们的样式。

57.浮动元素——怎么使用它们、它们有什么问题以及怎么解决这些问题。

设置float属性来使一个元素浮动，主要问题是父元素高度无法撑开，与浮动元素同级的非浮动元素会紧随其后，若非第一个元素浮动，那么前面的同级元素会被影响

解决方案是使用clear:both清除浮动，父元素可以显式设置高度，或者是给after设置{content: '';display: block;height:0;overflow:hidden;}

58.HTML与XHTML——二者有什么区别，你觉得应该使用哪一个并说出理由。

    XHTML 元素必须被正确地嵌套
    XHTML 元素必须被关闭，空标签也必须被关闭，如 <br> 必须写成 <br />
    XHTML 标签名必须用小写字母
    XHTML 文档必须拥有根元素
    XHTML 文档要求给所有属性赋一个值
    XHTML 要求所有的属性必须用引号""括起来
    XHTML 文档需要把所有 < 、>、& 等特殊符号用编码表示
    XHTML 文档不要在注释内容中使“--”
    XHTML 图片必须有说明文字
    XHTML 文档中用id属性代替name属性

59.JSON——它是什么、为什么应该使用它、到底该怎么使用它，说出实现细节来。

    json是一种轻量级数据交换格式，它方便了不同语言之间的数据交换格式，使得语言之间的通讯更加简便；json格式更便于人阅读和编写，也更便于机器解析和生成；

60.性能优化方案

    资源方面，减少Http请求，使用cdn，使用缓存，压缩图片，压缩打包代码，css放头部，js放在尾部

    代码方面，尽量避免过多重排页面，避免过多操作dom节点，css类名不嵌套过多层，避免过多访问上级作用域，图片使用懒加载

    优化用户体验方面，制作网站大致骨架，在图片资源请求回来之前先展示一些内容，优化用户体验，减少首屏白屏时间，不加载过多的资源，特别是vue框架要注意组件和路由的懒加载，只有用到的组件才加载

