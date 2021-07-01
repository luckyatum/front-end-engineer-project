# [webpack4.0-treeShaking的理解-07](https://blog.csdn.net/memedadexixaofeifei/article/details/103867568)

tree shaking只适用于es module

```js
// webapck.config.js的文件中，在开发环境下配置:
{
    optimization: {
        usedExports: true
    }
}

// 同时在package.json文件中配置:

sideEffects: false
// 或者
sideEffects: ['*.css','@babel/poll-fill'] // 这里是配置不要要进行TreeShaking的模块

// 当打包生产环境时的代码时，是自动开启treeShaking的，这时可以不用配置optimization配置的,但是package.json中的sideEffects最好依然配置
```
