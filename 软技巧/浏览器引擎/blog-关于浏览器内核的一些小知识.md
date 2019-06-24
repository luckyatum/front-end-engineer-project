# [关于浏览器内核的一些小知识](https://www.iplaysoft.com/browsers-engine.html)

1. 浏览器内核(排版引擎/渲染引擎)
    * Trident(windows)，IE浏览器所用内核，IE6以前完全不支持w3c标准，后面逐步支持起来；
    * Gecko(跨平台)，主要是firefox浏览器使用，开源浏览器内核，该内核的出现使得IE浏览器内核不得不加速支持w3c的脚步；
    * KHTML(linux)，速度快，容错度低，但是知道的人少；
    * webkit（跨平台），苹果公司开发内核，遵循w3c标准，速度快，性能好，市场份额越来越大；
    * chromium（跨平台），chrome浏览器所用内核，速度快，性能好，支持w3c标准，实质是webkit内核的源码，但是被修改为更易读的版本，因此基于chromium内核的衍生浏览器更多；
    * Presto（跨平台），opera7.0版本后所采用的内核，对w3c标准支持良好，但是渲染时候注重文字，图片等内容渲染优先级低；
2. Javascript引擎
    * Chakra IE9启用的最新js引擎
    * SpiderMonkey（ff 1.0-3.0） / TraceMonkey(ff 3.5-3.6) / JaegerMonkey(ff 4.0-后续版本)
    * V8 chrome，遨游3
    * Nitro Safari4及后续版本
    * Linear A(Opera 4.0-6.1)/Linear B(Opera 7.0～9.2)/Futhark(Opera 9.5-10.2)/Carakan(Opera 10.5-后续版本)
    * KJS KHTML