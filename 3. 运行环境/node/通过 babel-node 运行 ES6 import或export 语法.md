# [通过 babel-node 运行 ES6 import/export 语法](https://www.jianshu.com/p/aab02d7e91d2)

node环境默认是支持commonJs的模块语法，es6的import语法需要通过@babel/node来支持；

**注：@babel/node不能用于生产环境，这是因为它会加载很多的资源和模块**

## 1.安装@babel/node

babel-node命令并非独立安装，在babel7.x以前，需要通过安装babel-cli来获得。而在babel7.x以后，babel模块被拆分，因此需要安装@babel/node和@babel/core两个包来获取。

**babel7.x以前写法**
```npm i -g babel-cli```

**babel7.x以后写法**
```npm i -g @babel/core @babel/node```

## 2.安装presets并配置.babelrc文件

仅仅安装了babel-node也没用，运行js文件仍然会报错，因为import语法babel-node默认是关闭的（坑。。），因此需要安装指定的preset并配置.babelrc文件来开启语法支持；

截止2019年1月，原有的babel-preset-es2015写法已经被废弃，与之替代的是babel-preset-env或者@babel/preset-env，目前以后者为推荐；

### 第一种babel-preset-env写法

```npm i babel-preset-env --save-dev```

.babelrc文件配置

```json
{
    "preset": [ "env" ]
}
```

### 第二种@babel/preset-env写法

```npm i @babel/preset-env --save-dev```

.babelrc文件配置

```json
{
    "presets": [ "@babel/preset-env" ]
}
```

## 3.执行babel-node

经过上述配置后，再通过babel-node执行就可成功运行import/export的js代码。

```babel-node index.js```

最后切记由于性能问题，babel-node 仅限于在本地调试时使用，上线生产环境的代码还是需要使用 babel 进行转换，再使用 node 运行。
