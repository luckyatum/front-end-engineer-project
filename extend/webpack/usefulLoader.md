# [Webpack有哪些常见的Loader？他们是解决什么问题的？](https://www.cnblogs.com/jiahuasir/p/10605201.htmlw)

loader用于对模块的源代码进行转换，可以在加载模块时候预处理文件

## 常用Loader

> * style-loader 将css添加到Dom的内联样式标签style里
> * css-loader 允许css文件通过require方式引入，并返回css代码
> * less-loader 处理less
> * sass-loader 处理sass
> * postcss-loader 用postcss处理css
> * autoprefixer-loader 处理css3属性前缀，已被弃用
> * file-loader 分发文件到output目录并返回相对路径
> * url-loader 和file-loader类似，但是当文件小于设定的limit时可以返回一个Data Url
> * html-minify-loader 压缩HTML
> * babel-loader 用babel来转换ES6文件到ES5
