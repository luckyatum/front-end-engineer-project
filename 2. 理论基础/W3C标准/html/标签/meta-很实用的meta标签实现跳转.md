# [很实用的html meta 标签实现页面跳转](https://www.jianshu.com/p/c39400906aab)

这个是用在登录页，登录失败后跳转到提示页的；

refresh用于刷新与跳转页面；

refresh出现在http-equiv属性中，使用content属性表示刷新或者跳转的开始时间与跳转的网站；

```html
<head>
    <!-- 5秒后跳转到http://www.xxx.com，设置为0则直接跳转，如果不加url则5秒后直接刷新本页面 -->
    <meta http-equiv="refresh" content="5;url=http://www.xxx.com"></meta>
</head>
```
