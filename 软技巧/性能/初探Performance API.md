# [初探Performance API](https://segmentfault.com/a/1190000014479800?utm_source=tag-newest)

1. timing，提供各种与浏览器相关的时间数据
    |名称|作用
    :--:|:--:
    connectEnd|浏览器与服务器握手认证等过程完成，连接建立时候的时间
    connectStart|HTTP请求向服务器发送时候的时间戳，长连接等同于fetchStart
    domComplete|当前网页DOM结构生成时，Document.readyState属性变成'complete'的时间戳
    domContentLoadedEventEnd|网页DOMContentLoaded事件触发的时间戳，也就是dom结构准备完成，所有脚本**运行完成**时触发
    domContentLoadedEventStart|网页DOMContentLoaded事件触发的时间戳，也就是dom结构准备完成，所有脚本**开始运行**时触发
    domInteractive|当前网页DOM结构结束解析、开始加载内嵌资源时，也就是Document.readyState属性变为“interactive”
    domLoading|当前网页DOM结构开始解析时，也就是Document.readyState属性变为“loading”
    domainLookupEnd|域名查询结束时的时间戳，持久连接或者从本地获取信息的话等同于fetchStart
    domainLookupStart|域名查询开始时的时间戳，持久连接或者从本地获取信息的话等同于fetchStart
    fetchStart|浏览器准备通过HTTP请求去获取页面的时间戳，检查应用缓存之前发生
    loadEventEnd|当前网页load事件的回调函数结束时候的时间戳，如果事件还没触发返回0
    loadEventStart|当前网页load事件的回调函数开始时候的时间戳，如果事件还没触发返回0
    navigationStart|当前浏览器窗口的前一个网页关闭，发生unload事件的时间戳，如果没有前一个网页则等于fetchStart
    redirectEnd|最后一次重定向完成的时间戳，如果没有重定向或者重定向不是同源的，则返回0
    redirectStart|第一次重定向开始时的时间戳，如果没有重定向或者重定向不是同源的，则返回0
    requestStart|浏览器向服务器发出HTTP请求，或者读取本地缓存时的时间戳
    responseEnd|浏览器从服务器收到最后一个字节，或者读取本地缓存时的时间戳
    responseStart|浏览器从服务器收到第一个字节，或者读取本地缓存时的时间戳
    secureConnectionStart|浏览器与服务器开始安全链接的握手时的时间戳，如果当前网页不要求安全连接，返回0
    unloadEventEnd|前一个网页unload事件回调结束时的时间戳，如果没有前一个网页或者不同源，则返回0
    unloadEventStart|前一个网页unload事件回调开始时的时间戳，如果没有前一个网页或者不同源，则返回0
2. navagation，呈现了如何导航到当前页面的信息
    * type，表示如何导航到当前页面的
        * type = 0,点击链接，书签和表单提交，或者脚本操作，或者url中直接输入链接访问的
        * type = 1，点击刷新或者Location.reload()访问的
        * type = 2，通过历史纪录或者后退按钮访问的
        * type = 255，通过其他方式访问的
    * redirectCount，表示到达当前页面前经历过的重定向次数
3. performance.timeOrigin，高精度时间戳（1毫秒的千分之一），通常用于性能测试时间差
4. performance.onresourcetimingbufferfull，当浏览器资源时间性能缓冲区已满时的回调函数
5. performance.memory，非标准属性，chrome提供，提供了基本内存使用情况
6. Performance.mark，在浏览器的performance entry buffer（浏览器资源时间性能缓冲区）中，根据名称生成高精度时间戳。也就是很多人说过的"打点"
7. Performance.measure，measure是指定两个mark点之间的时间戳。如果说mark可以理解为"打点"的话，measure就可以理解为"连线"
