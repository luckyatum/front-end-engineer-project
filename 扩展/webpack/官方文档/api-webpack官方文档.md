# [webpack官方文档--概念](https://www.webpackjs.com/concepts/)

本质上，webpack是一个js的静态模块打包器，webpack处理应用程序时，会递归地构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle;

webpack的四个核心概念：

* 入口(entry)
* 输出(output)
* loader
* 插件(plugins)

## 入口(entry)

指定依赖的入口，默认值为./src

**单个入口用法**

```js
const config = {
    entry: './path/file.js'
};

module.exports = config;
```

entry单个入口语法，是下面的简写：

```js
const config = {
    entry: {
        main: './path/file.js'
    }
};
```

当entry值为一个数组的时候，将创建多个主入口，并且依赖导向一个'chunk'；

**对象用法**

```js
const config = {
  entry: {
    app: './src/app.js',
    vendors: './src/vendors.js'
  }
};
```

## 出口(output)

webpack创建的bundles放置的位置，以及如何命名这些文件，默认值为'./dist'；

出口配置只能指定一个；

```js
const path = require('path');

module.exports = {
    entry: './path/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
};
```

**多个入口起点**

如果配置了多个单独的'chunk'(使用多个入口七点或者使用像CommonsChunkPlugins这样的插件)，则应该使用占位符来确保每个文件具有唯一的名称;

```js
const config = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}

// 输出：./dist/app.js, ./dist/search.js
```

## loader

处理那些非js文件（webpack自身只理解js）；loader可以将所有类型的文件转换为webpack能够处理的有效模块；

本质上，webpack loader将所有类型文件，转换为应用程序的依赖图（和最终的bundle）可以直接引用的模块；

loader能够import任何类型的模块；

webpack的配置中loader有两个目标：

1. test属性，用于标识出应该被对应的loader进行转换的某个或某些文件；
2. use属性，表示进行转换时，应该使用哪个loader;

