
# [前端安全](https://www.jianshu.com/p/3bbb2e173877)

[TOC]

## 九大前端安全问题

1. CSRF
2. XSS
3. iFrame风险
4. 点击劫持
5. 恶意文件上传
6. 不安全的第三方依赖包
7. https的坑
8. 本地存储数据泄露
9. 缺失静态资源完整性校验

## 1. CSRF(Cross-site-request forgery) 跨站请求伪造

用户已经登录a.com，然后可能会通过攻击者发出来的链接打开攻击者的网站(如h.com)，此时h.com会发送一个请求到a.com，根据同源策略，两个页面地址中的协议，域名，端口号一致的话，会在该请求上附带上cookie（用户之前登陆a.com时候cookie就存在了），而鉴权是通过cookie的某个key值凭证的，所以后端没有判断请求来源的话，伪造请求就可以做任何一个操作

通过referer字段可以查看到请求的来源网址，但是referer很多时候会设置的比较泛，如: *a.com，或者是一些历史原因导致referer为空的时候会漏过校验等

目前解决方案是每个请求上附带一个anti-CSRF token，将sid通过一定算法后一起发送给后端，服务端拿到token后用相同算法对sid运算后匹配，相同则为已登录用户发送的请求，由于算法用到了cookie的sid，所以即使加密算法被破解了，但是h.com网站拿不到cookie的sid，没办法伪造token

## 2. XSS（Cross-Site Scripting）跨站脚本攻击

获取用户的cookie

1. 反射型XSS

    前端get请求：www.a.com/xss.php?name=userA

    后台: <?php echo 'Hello', $_GET['name'];

    如果不对name编码校验，如果链接是 www.a.com/xss.php?name=<script>alert(document.cookie);</script>

    这时访问该链接就会弹出cookie内容，然后把alert改成一个发送函数，则可以把cookie偷走

2. 持久型XSS

    也称为存储型XSS，注入脚本跟XSS大同小异，只是脚本不是通过浏览器->服务器->浏览器这样的反射方式，而是多发生在富文本编辑器，日志，留言，配置系统等数据库保存用户输入内容的业务场景

    即用户的注入脚本保存到了数据库里，其他用户只要一访问都会中招

    前端get请求：www.a.com/xss.php?name=<script>alert(document.cookie);</script>

    后台处理：<?php $db.set("name", $_GET["name"]);

    前端请求页面：<?php echo "Hello",$db_get["name"];

3. XSS分类

   XSS分类有两种，按照是否存储在数据库中可以分为反射型XSS（浏览器->服务器->浏览器）和存储型XSS，按照是否和服务器有交互又可划分为"Server Side XSS"和"DOM based XSS"

4. 解决XSS

    要解决XSS攻击主要在于不让js读取到cookie，cookie中有个属性是httpOnly，可以让页面无法通过JS来读写cookie

    但是即使这样cookie还是存在header中，还是有其他手段去获取header中的cookie

    不要相信用户的一切输入，对编码输出在页面中会破坏原有代码规则的特殊字符以及对某些标签的某些属性进行白名单检查

    对输出做严格输出编码，使得攻击者提供的数据不再被浏览器认为是脚本而被误执行，如数据将被放置在HTML元素中则进行HTML编码，放在链接中进行URL编码等等

    其他的防御措施：**CSS HTTP Header、输入验证、开启浏览器XSS防御等等**

## 3. iFrame带来的风险

风险

    使用iFrame的场景很多是引入第三方提供的页面组件，例如广告，天气预报，社交分享插件等等

    由于第三方不受我们自身控制，他们可以在iframe中运行js脚本，flash插件，弹出对话框等等

    如果iframe中的域名因为过期而被恶意攻击者抢注，或者第三方被黑客攻破，iframe中的内容被替换掉了，从而利用浏览器的安全漏洞下载安装木马，恶意勒索软件等

防御

    h5的iframe中有一个叫做sandbox的安全属性，通过它可以对iframe的行为进行各种限制，充分实现"最小权限"原则

    ```html
    <iframe sandbox src="...">...</iframe>
    ```

    单独设置sandbox属性，将会对iframe实施最严厉的调控限制，例如不准提交表单，不准弹窗，不准执行脚本，Origin会被重新分配一个唯一值，也就是Iframe访问自己服务器会被当做跨域请求

    sandbox一些典型参数如下：

* allow-forms: 允许提交form表单
* allow-popups: 允许弹出新的窗口或者标签页，如window.open()、showModalDialog()、target="_blank"等等
* allow-script: 允许执行js
* allow-same-origin: 允许开启同源策略

## 4. 被点击劫持

我们自己的页面可能被攻击者放到他们精心构造的iframe中，进行点击劫持攻击

这是一种欺骗性比较强的，需要用户高度参与的攻击

1. 攻击者精心构造一个诱导用户点击的内容，例如web小游戏
2. 将我们的页面放入到iframe中
3. 利用z-index等css样式将这个iframe叠加到小游戏的垂直方向正上方
4. 将iframe设置为100%透明度
5. 受害者访问这个页面后，看到的是一个小游戏，如果点击了的话，实际上点击的是iframe中我们的页面

该攻击利用了受害者的用户身份，在其不知情的情况下进行了一些操作

防御

Frame Breaking方案

    使用X-Frame-Options:DENY，明确告知浏览器不要把当前HTTP响应中的内容在HTML Frame中显示出来

## 5. 恶意文件上传这个常见安全问题

某网站允许用户在评论里上传图片，攻击者上传图片时候，实则是上传了含有js脚本的文件，该文件逃过了文件类型校验，在数据库存储下来

受害者在访问这段评论的时候，浏览器会去请求这个伪装成图片的js脚本，而此时如果浏览器错误推断了这个响应的内容类型，那么就会将该文件当做js执行，于是攻击也就成功了

问题关键在于，后端服务器在返回的响应中设置的Content-TypeHeader仅仅只是给浏览器提供当前响应内容类型的建议，而浏览器有可能会自作主张根据响应中的实际内容去推断内容的类型

防御

    办法就是通过设置X-Content-Type-Options这个HTTP Header明确禁止浏览器去推断响应类型

    后端服务器返回的Content-Type建议浏览器按照图片内容进行内容渲染，浏览器发现有X-Content_Type_OptionsHTTP Header的存在，并且其参数值是nosniff，则不会去推断内容类型，而是严格按照图片进行渲染

## 6. 不安全的第三方依赖包

应用使用的第三方组件、依赖的库等可能存在安全漏洞，例如jquery issue 2432可能使得应用存在被XSS攻击的可能，node.js也有一些已知的安全漏洞，比如CVE-2017-11499，可能导致前端应用受到DoS攻击

另外还有node组件包中存在的安全漏洞

目前有自动化工具可以帮助检查组件的安全问题，例如NSP(Node Security Platform)，Snyk等等

## 7. 用了HTTPS也可能掉坑里

服务器端开启了HTTPS也存在安全隐患，在浏览器发出去的第一次请求就被攻击者拦截了下来并作了修改，根本不给浏览器和服务器进行HTTPS通信的机会

用户输入url的时候往往不是从https开始的，而是直接从域名开始输入，随后浏览器像服务器发起HTTP通信，然而由于攻击者的存在，他把服务端返回的跳转到httos页面的响应拦截了，并且代替客户端和服务端进行后续通信

解决方案是HSTS(HTTP Strict Transport Security)，通过下面的HTTP Header以及一个预加载的清单，来告知浏览器在和网站通信时候强制使用HTTPS，而不是通过明文的HTTP进行通信

```Strict-Transport-Security: max-age=; includeSubDomains; preload```

这里的强制性表现为任何情况下都直接向服务器发起HTTPS请求，而不是从HTTP跳转到HTTPS

## 8. 本地存储数据泄露

随着前端框架的兴起，前端能担任更多的职能，同时SPA应用大量出现，在前端需要存储的数据量也越来越多，任何存储在前端的数据都是不安全的，所以唯一解决方案是不在前端存储敏感数据，例如历史账单，消费记录等

## 9. 缺乏静态资源完整性校验

出于性能考虑，前端应用通常会把一些静态资源存放到CDN，可以显著提高前端应用的访问速度

但是一旦攻击者劫持了CDN，或者对CDN的资源进行了污染，那么前端应用拿到的就是有问题的JS脚本或者StyleSheet文件，攻击者可以随意篡改我们的页面，这种攻击方式和XSS跨站脚本攻击有些类似，不同点在于攻击者从CDN开始实施的攻击

防御方法是使用浏览器提供的SRI(Subresource Integrity)功能

每个资源都有一个SRI值，有两部分组成，左侧是生成SRI值用到的哈希算法名，右侧是经过Base64编码后的该资源文件的Hash值，浏览器在处理这个script元素的时候，就会检查对应的js脚本文件的完整性，看其是否和script元素中integrity属性指定的sri值一致
