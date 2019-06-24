# [前端性能——监控起步](https://www.cnblogs.com/chuaWeb/p/PerformanceMonitoring.html)

1. 关键指标
    白屏时间，用户从打开页面到页面开始有东西呈现为止
    首屏时间，用户浏览器首屏所有内容呈现所花时间
    用户可操作时间，用户可正常点击，输入等操作的时间，默认可统计domready时间
    总下载时间，页面所有资源下载完成所花时间，即onload事件
2. 统计时机，高端浏览器使用performance timing接口，普通浏览器通过cookie记录时间戳
3. 指标统计公式
    * **白屏时间**=开始渲染时间+头部资源加载时间，chrome => (chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime)*1000
    * 使用performance接口获取开始渲染时间：performance.timing.domLoading  - performance.timing.navigationStart
    * 获取头部资源加载时间：head标签末尾记录时间 - performance.timing.navigationStart
    * **首屏时间**
        * 以图片为主要影响因素，所以统计所有图片的onload事件，以最晚触发的时间为最终时间
        * 页面存在iframe也需要做判断
        * gif在ie可能重复触发onload，需要排除
        * 异步渲染需要在异步结束后再计算首屏
        * 没有图片则以js执行时间为首屏
    * 首屏统计方法一，设置定时器，定时监听img标签图片是否在首屏并加载完成，获取最迟加载完成的图片时间使用，如果没有图片则使用domready时间，缺点是定时器耗时，统计不了背景图片，定时器精度有限
    * 首屏统计方法二，对于网页高度小于屏幕的网站，只需要在页面底部加上脚本打印当前时间，网页高度大于一屏的话需要在大约一屏元素位置打印时间，这个时间需要加载首屏所有图片加载时间,缺点是每个页面都需要手动加入对应位置，背景图片没有计算在内
    * **用户可操作时间**，默认使用domready时间，performance.timing.domInteractive - performance.timing.navigationStart
    * **总下载时间**，默认统计onload时间，performance.timing.loadEventStart- performance.timing.navigationStart
