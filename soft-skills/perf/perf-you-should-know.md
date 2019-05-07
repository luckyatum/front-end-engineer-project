# [web前端性能优化，这几个你值得知道](https://baijiahao.baidu.com/s?id=1618549345650870441&wfr=spider&for=pc)

1. 使用cdn
2. 减少外部http协议，即减少http请求次数
3. 预获取，链接预先获取(rel="prefetch")、dns预先获取(rel="dns-prefetch")、预先渲染(rel="prerender")，但是避免过多使用

    ```html
    <link rel="dns-prefetch" href="//www.zhix.net">
    <link rel="dns-prefetch" href="//api.share.zhix.net">
    <link rel="dns-prefetch" href="//bdimg.share.zhix.net">
    ```

4. 压缩代码
5. 压缩图片
6. ajax请求缓存，get请求默认缓存在客户端，post请求不会缓存在客户端，所以尽量使用get请求