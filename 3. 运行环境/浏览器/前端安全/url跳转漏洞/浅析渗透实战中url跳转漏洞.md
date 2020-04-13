# [URL重定向/跳转漏洞](https://blog.csdn.net/wst0717/article/details/83275253l)

## 背景

目前应用越来越需要和第三方交互，例如跳转第三方登录之后回跳，如果实现不好可能会存在严重的跳转漏洞；

## 成因

url跳转的几种实现方式：

1. Meta标签
2. js跳转
3. header头标签

## 一个典型的例子

    ```php
    <?php

    $url=$_GET['jumpto'];

    header("Location: $url");

    ?>
    ```

如果jumpto没有限制，恶意用户可以提交：

```http://www.wooyun.org/login.php?jumpto=http://www.evil.com```

安全意识薄弱用户看到展示的是www.wooyun.org可能会毫无防范，从而跳转到恶意网站；

## 可能导致的问题

1. 同时如果是大企业的跳转链接，可能存在白名单欺骗问题，一些网站可能会直接把淘宝、百度等等域名加入到白名单中，从而忽略了域名后面的恶意链接；
2. 一些网站会引用资源，如各大视频网站，同样是使用白名单方式
