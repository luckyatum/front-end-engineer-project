# [webpack面试题汇总](https://www.jianshu.com/p/bb1e76edc71e)

## 什么是webpack

一个打包模块化javaScript的工具，webpack里一切文件皆模块。通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件。

webpack可以看成是模块打包机，它做的事情是：分析项目结构，找到js模块以及其他的一些浏览器不能直接运行的拓展语言（sass,typescript等），并将其打包为合适的格式以供浏览器使用。

## 几个常见的loader

* file-loader: 把文件输出到一个文件夹中，