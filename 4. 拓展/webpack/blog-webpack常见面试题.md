# [webpack面试题汇总](https://www.jianshu.com/p/bb1e76edc71e)

## 什么是webpack

一个打包模块化javaScript的工具，webpack里一切文件皆模块。通过loader转换文件，通过plugin注入钩子，最后输出由多个模块组合成的文件。

webpack可以看成是模块打包机，它做的事情是：分析项目结构，找到js模块以及其他的一些浏览器不能直接运行的拓展语言（sass,typescript等），并将其打包为合适的格式以供浏览器使用。

## 几个常见的loader

* file-loader: 把文件输出到一个文件夹中，代码中通过相对url去引用输出的文件
* url-loader: 类似file-loader，但是能在文件很小的情况下以base64的方式把文件内容注入到代码中
* source-map-loader: 加载额外的source map文件，以方便断点调试
* image-loader: 加载并且压缩图片文件
* babel-loader: 把es6转换成es5
* css-loader: 加载css，支持模块化，压缩，文件导入等特性
* style-loader: 把css代码注入到js中，通过dom操作去加载css
* eslint-loader: 通过eslint检查js代码

## 几个常见的plugin

* define-plugin: 定义环境变量
* terser-webpack-plugin: 通过terserPlugin压缩es6代码
* html-webpack-plugin: 为html文件中引入的外部资源，可以生成创建html入口文件
* mini-css-extract-plugin: 分离css文件
* clean-webpack-plugin: 删除打包文件
* happypack: 实现多线程加速编译

## webpack与grunt、gulp的不同

webpack可以看做模块打包机，通过分析项目结构找到js模块以及一些其他浏览器不能直接运行的拓展语言，并将其转换为合适的格式供浏览器使用

gulp/grunt是一种能够优化前端的开发流程的工具，webpack是一种模块化的解决方案

他们工作方式也有很大差别：

grunt和gulp工作方式是，在一个配置文件中，指名对某些文件进行编译，组合，压缩等任务的具体步骤

webpack工作方式是，把项目当做一个整体，通过给定的入口，webpack将从这个文件开始找到项目的所有依赖文件，使用loaders处理，最后打包成一个或多个浏览器可识别的js文件

一些轻量化任务可以用gulp来处理，例如把一个sass文件编译成css，或者单独打包css文件等

grunt是基于任务和流的，找到一个或者一类文件，对其做一系列的链式操作，更新流上的数据，整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程

webpack是基于入口的，webpack会自动递归解析入口所需要加载的所有资源文件，然后用不同的loader来处理不同文件，用Plugin来扩展webpack功能。

## webpack有哪些优点

* 专注于模块化的项目，能做到开箱即用，一步到位
* 可通过plugin扩展，完整好用又不是灵活
* 使用场景不局限于web开发
* 社区庞大活跃，经常引入紧跟时代发展的新特性
* 良好的开发体验

## wbepack缺点是什么

只能用于模块化的项目

## bundle、chunk、module是什么

bundle: 是由webpack打包出来的文件
chunk: 代码块，一个chunk由多个模块组合而成，用于代码的合并和分割
module: 是开发中的单个模块，

## 什么是loader，什么是plugin

loader：模块转换器，用于将模块转化成想要的内容
plugin: 构建流程中的特定时机注入扩展逻辑，改变构建结果，用来自定义webpack打包过程的方式；

每个插件都含有apply方法，通过该方法参与整个webpack打包的流程

## 什么是模块热更新

是webpack的一个功能，可以使得代码修改后不用刷新浏览器就可以更新，高级版的自动刷新浏览器；

devServer中通过hot属性可以控制热更新；

```js
const config = {
    devServer: {
        hot: true
    } 
};
```

## 什么是tree-shaking

可以用来剔除js中不用的死代码，依赖静态的es6模块化语法；

css中使用需要导入Purify-css

## 通过webpack处理长缓存

浏览器用户访问页面时候，为了访问速度，会对用户访问的静态资源进行缓存，每一次代码更新后，都需要浏览器下载新代码；

最简单方式是引入新的文件和名称，在webpack中可以在output中输出文件指定chunkName

10.webpack有哪些常见的 loader？他们能解决什么问题？

11.webpack 的构建流程是什么?从读取配置到输出文件的整个过程

12.是否写过 loader 和 Plugin ？描述一下编写 loader 或 Plugin 的思路？

13.webpack 的热更新是如何做到的？说明其原理？

14.如何利用 webpack 来优化前端性能？（提高性能和体验）

15.webpack你也会用，你了解其中原理吗？你知道分析打包依赖的过程吗？你知道tree-shakeing是如何干掉无用重复的代码的吗？