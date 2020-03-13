# [跨站脚本漏洞(XSS)基础讲解](https://www.jianshu.com/p/4fcb4b411a66)

1. XSS是什么？

    * 跨站脚本漏洞指攻击者往web页面里插入恶意script代码，当用户浏览时，嵌入其中的script代码会被执行，从而达到恶意攻击者的目的；
    * 该类攻击常见于php输出函数将js代码输出到页面中，常见的输出函数：echo、printf、print、print_r、sprintf、die、var_dump、var_export；

2. XSS类型？

    * 反射型XSS：非持久化，该类攻击通常是攻击者事先制作好攻击链接，欺骗用户自己去点击链接才能触发XSS代码，通常见于搜索页面；
    * 存储型XSS：持久化，代码存储在服务器中，如在个人信息或者发布文章中注入攻击代码，如果服务器存储该篇文章时候没有经过处理，将会保存这段带有攻击性的代码；每当有用户访问该篇文章时，都会触发该代码；
    * DOM型XSS：基于文档对象模型的一种漏洞。DOM是一个与平台、编程语言无关的接口，脚本可以动态访问和更新文档内容，处理后展示在页面上；DOM中有一些内容是用户可以操纵的，如果DOM中的数据没有经过严格验证，就会产生DOM XSS漏洞；

3. XSS漏洞原理？

    * 反射型XSS
        有一个简单的php代码如下：

        ```php
        <?php
            $XssReflex = $_GET['input'];
            echo 'output:<br>'.$XssReflex;
        ?>
        ```

        变量$XssReflex获取GET方式传递的变量名为input的值，然后通过echo函数输出在页面上，并未对输出做任何过滤；
        正常的输入输出是没有问题，但是如果输入值为：<script>alert('xss')</script>，将会在页面上弹框'xss'，也就是该段js代码被执行了；
        因此，alert代码可以被替换成任何攻击者想要的操作，例如获取cookie信息等等；

    * 存储型XSS
        存储型和反射型最大区别是存储型需要经过数据库，将攻击代码存储起来；
        和即时响应的反射型相比，存储型的生效时间要慢很多，但是它可以不用考虑浏览器的过滤问题，屏蔽性要比反射型好；
        存储型XSS还有一个好处就是，一次提交之后，后面每当有用户访问到该页面，都会被攻击一次，危害巨大；

4. XSS防范？

    * 反射型XSS防范规范

        ```text
        A.PHP直接输出html的，可以采用以下的方法进行过滤：

            1.htmlspecialchars函数
            2.htmlentities函数
            3.HTMLPurifier.auto.php插件
            4.RemoveXss函数

        B.PHP输出到JS代码中，或者开发Json API的，则需要前端在JS中进行过滤：

            1.尽量使用innerText(IE)和textContent(Firefox),也就是jQuery的text()来输出文本内容
            2.必须要用innerHTML等等函数，则需要做类似php的htmlspecialchars的过滤

        C.其它的通用的补充性防御手段

            1.在输出html时，加上Content Security Policy的Http Header
            （作用：可以防止页面被XSS攻击时，嵌入第三方的脚本文件等）
            （缺陷：IE或低版本的浏览器可能不支持）
            2.在设置Cookie时，加上HttpOnly参数
            （作用：可以防止页面被XSS攻击时，Cookie信息被盗取，可兼容至IE6）
            （缺陷：网站本身的JS代码也无法操作Cookie，而且作用有限，只能保证Cookie的安全）
            3.在开发API时，检验请求的Referer参数
            （作用：可以在一定程度上防止CSRF攻击）
            （缺陷：IE或低版本的浏览器中，Referer参数可以被伪造）
        ```
