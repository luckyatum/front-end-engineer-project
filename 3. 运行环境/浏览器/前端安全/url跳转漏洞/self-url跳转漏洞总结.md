# url跳转漏洞总结

## 一、什么是url跳转漏洞

网站接受用户输入的链接，跳转到一个攻击者控制的网站，可能导致跳转过去的用户被精心设置的钓鱼页面骗走自己的个人信息和登录口令。

## 二、漏洞怎么产生的

url跳转的几种方式：

* meta标签内跳转;

    详细可以参考[很实用的html meta 标签实现页面跳转](https://www.jianshu.com/p/c39400906aab);

* js跳转;
* header跳转;

    详细可以参考[PHP 页面跳转的三种方式](https://www.jianshu.com/p/8fa51d7fbb7e);

一般出现漏洞的原因如下：

1. 写代码时没有考虑过任意URL跳转漏洞，或者根本不知道/不认为这是个漏洞;
2. 写代码时考虑不周,用取子串、取后缀等方法简单判断，代码逻辑可被绕过;
3. 对传入参数做一些奇葩的操作(域名剪切/拼接/重组)和判断，适得其反，反被绕过;
4. 原始语言自带的解析URL、判断域名的函数库出现逻辑漏洞或者意外特性,可被绕过;
5. 原始语言、服务器/容器特性、浏览器等对标准URL协议解析处理等差异性导致被绕过;

一般出现漏洞的地方如下：

1. 用户登录、统一身份认证处，认证完后会跳转
2. 用户分享、收藏内容过后，会跳转
3. 跨站点认证、授权后，会跳转
4. 站内点击其它网址链接时，会跳转

🌰（假设原网站为www.landgrey.me，恶意网站为www.evil.com）：

1. 如果网站不做任何跳转校验，则直接跳转：

    ```https://www.landgrey.me/redirect.php?url=http://www.evil.com/untrust.html```

2. 如果网站有做协议校验，则写法如下：

    ```https://www.landgrey.me/redirect.php?url=https://www.evil.com/untrust.html```

3. 如果网站有做跳转域名校验，也有可能因为校验逻辑问题而被绕过：

    1. 有的代码是直接校验当前域名字符串是否在要跳转过去的字符串中，是子串才会跳转；

        绕过：```https://www.landgrey.me/redirect.php?url=http://www.landgrey.me.www.evil.com/untrust.html```

    2. 还有的是检测域名结尾是不是当前域名，是的话才会跳转；

        两种方式绕过：

        ```https://www.landgrey.me/redirect.php?url=http://www.evil.com/www.landgrey.me```

        或者买个xxxlandgrey.me的域名

        ```https://www.landgrey.me/redirect.php?url=http://xxxlandgrey.me```

    3. 利用可信站点进行多次重定向绕过

        也就是利用已知的可重定向到自己域名的可信站点来重定向，也就是重定向两次以上，先从原网站重定向到可信网站，然后利用可信网站的漏洞重定向到恶意网站；

4. 畸形地址绕过

    这是利用各种语言、框架和代码的不同，防护任意跳转代码的多种多样，导致绕过方式看起来很诡异；

    🌰一：通过添加多余的'/'(%2F)符号，再对'.'两次编码成%252E绕过代码中对域名后.com的切割，从而构造类似

    ```https://landgrey.me/%2Fevil%252Ecom```

    达到任意跳转目的；

    🌰二：通过添加4个'/'前缀和'/..'后缀，构造类似

    ```https://landgrey.me/redirect.php?url=////www.evil.com/..```

    进行绕过；

    🌰三：通过'\\.'字符，构造类似

    ```https://landgrey.me/redirect.php?url=http://www.evil.com\.landgrey.me```

    进行绕过；

5. 其他的一些绕过思路：

    1. 跳转到IP地址，而不是域名;
    2. 跳转到IPV6地址，而不是IPv4地址;
    3. 将要跳转到的IP地址用10进制、8进制、16进制形式表示;
    4. 更换协议,使用ftp、gopher协议等;
    5. 借鉴SSRF漏洞绕过的tricks;
    6. CRLF注入不能xss时，转向利用任意URL跳转漏洞;

## 三、怎么避免或者检测该漏洞

1. 代码固定跳转地址，不让用户控制变量；
2. 跳转目标地址采用白名单映射机制
    比如1代表'auth.landgrey.me'，2代表'www.landgrey.me'，其它不做任何动作；
3. 合理充分的校验跳转的目标地址，非己方地址时告知用户跳转风险；

参考博客：

1. [URL跳转漏洞bypass小结](https://landgrey.me/static/upload/2019-09-15/mofwvdcx.pdf);
