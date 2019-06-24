# [前端安全](https://www.jianshu.com/p/3bbb2e173877)

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
