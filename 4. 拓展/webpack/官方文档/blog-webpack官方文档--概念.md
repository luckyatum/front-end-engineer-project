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

**示例**

使用loader加载css和ts文件

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
}
```

**三种使用loader的方式**

1. 配置

```js
var config = module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ]
        }
    ]
}
```

2. import

可以在import语句或者任何等效语句中指定loader，使用!将资源中的loader分开

```js
import Styles from 'style-loader!css-loader?modules!./styles.css'
```

3. CLI

可以通过cli使用loader

```js
webpack --module-bind jade-loader --module-bind 'css-style-loader!css-loader'
```

**loader的特性**

* loader支持链式调用，一组链式的loader将按照相反的顺序执行。loader链中第一个loader返回值给下一个loader，在最后一个loader返回webpack预期的js;
* loader可以是同步的，也可以是异步的；
* loader运行在node.js中，并且能够执行任何可能的操作；
* loader接收查询的参数。用于对loader传递配置；
* loader能够使用options对象传递配置；
* 除了使用package.json的main属性，还可以将普通的npm模块导出为loader，做法是在package.json里定义一个loader字段；
* 插件可以为loader带来更多特性；
* loader能够产生额外的文件；

**loader解析**

loader模块需要导出为一个函数，并且使用Node.js兼容的js编写，通常使用npm管理，但是可以将自定义loader作为程序文件；

## 插件（plugins）

loader被用于转换某些类型的文件。而插件可以执行更广范围的任务。例如打包压缩优化，重新定义环境中的变量等；

想要使用plugins只需要require()它，然后把它添加到plugins数组中，多数插件可以通过选项options自定义。也可以在一个配置文件中因为不同的目的而多次使用的一个插件；

```js
var config = {
    module: {
        rule: []
    },
    plugins: [
        new HtmlWebpackPlugin(template: './index.html')
    ]
};
```

插件目的在于解决一些loader无法解决的事情；

**plugins剖析**

```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log('webpack 构建过程开始！');
        });
    }
}
```

插件拥有一个apply方法，webpack compiler会调用它，并且compiler对象在整个编译生命周期中都可以访问；

compiler的hooks中的tap方法第一个参数应该是一个驼峰式命名的名称，用于标识插件名字；

## 模式（mode）

通过选择devlopment或production中的一个，来设置mode参数。

```js
var config = {
    mode: 'development'
}
```

**在cli参数中传递**

```js
webpack --mode=production
```

选项|描述
:--:|:--:
development|会将process.env.NODE_ENV的值设置为development
production|会将process.env.NODE_ENV的值设置为production

## 模块（modules）

模块化编程中，开发者将程序分解成离散功能块，称之为模块；

模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举；

**什么是webpack模块**

对比node.js模块，webpack模块能够以各种方式表达它们的关系；

* es2015 import语句
* CommonJs require()语句
* AMD define和require语句
* css/sass/less文件中的@import语句
* 样式url(...)或html文件(```<img src=...>```)中的图片链接

**webpack支持的模块类型**

webpack通过Loader可以支持各种语言和预处理器编写模块，loader描述了如何处理非js文件，并且在最终的bundle引入了它；

## 配置

webpack的配置文件，最后导出的是一个js对象；

应该避免在cli中添加过多配置，同时避免在一个文件中编写过多配置，而应该分开在不同的文件；

更多详细内容，请参考[webpack官方文档-配置](https://www.webpackjs.com/configuration/);

## 模块解析

webpack使用resolver库来解析模块的绝对路径；

**解析规则**

1. 绝对路径

```js
import '/home/me/file';
import 'C:\\Users\\me\\file';
```
该情况下的路径不需要再次解析

2. 相对路径

```js
import '../src/file1';
import './file2';
```

该情况下，使用import或者require的资源文件所在的目录被认为是上下文目录，在import/require中指定的相对路径，会添加此上下文路径，以产生模块的绝对路径；

3. 模块路径

```js
import 'module';
import 'module/lib/file';
```

模块将在resolve.modules中指定的目录内搜索，可以替换初始模块路径，通过使用resolve.alias来创建一个别名；

**解析到路径后**

检查路径是否指向一个文件或者目录，如果指向文件：

* 路径具有扩展名，直接打包；
* 路径不具有扩展名，使用resolve.extensions选项作为文件扩展名，该选项告诉解析器能够接受的扩展名；

如果指向一个文件夹：

* 如果文件夹中包含package.json文件，则按照顺序查找resolve.mainFields配置选项中字段；
* 如果文件夹中没有package.json文件或者main字段没有返回有效路径，则查找resolve.mainFields配置选项中指定文件名；
