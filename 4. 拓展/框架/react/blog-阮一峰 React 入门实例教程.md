# [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

## 1. HTMl模版

使用React的网页源码大致如下

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="../build/react.js"></script>
    <script src="../build/react-dom.js"></script>
    <script src="../build/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      // ** Our code goes here! **
    </script>
  </body>
</html>
```

最后一个script标签的type属性为text/babel，因为jsx语法和js不兼容，必须声明为text/babel才能使用jsx语法

上述引入了三个库：react.js、react-dom.js、browser.min.js，其中react.js是react的核心库，react-dom.js是提供DOM相关的内容，Browser.js作用是将jsx转化为js语法，耗时较长

## 2. ReactDom.render()

是react的基本方法，用于将模版转为HTML语言，并插入指定的节点

## 3. jsx语法

遇到<开头，就以html规则解析，遇到{开头，就以js规则解析

## 4. 组件

在网页插入一个组件，React.createClass用于生成一个react组件

```js
var HelloMessage = React.createClass({
    render: function() {
        return <h1>Hello {this.props.name}</h1>
    }
});

ReactDom.render(
    <HelloMessage name="John" />,
    document,getElementById('example')
);
```

所有组件都必须有自己的render方法，用于输出组件

组件类的第一个字母必须大写，否则会报错，class属性需要写成className，for属性要写成htmlFor

## 5. this.props.children

该属性表示组件的所有子节点

```js
var nodeList = React.createClass({
    render: function() {
        return (
            <ol>
                {
                    React.children.map(this.props.children, function(child) {
                        return <li>{child}</li>
                    });
                }
            </ol>
        )
    }
});

ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.body
);
```

this.props.children的值有三种可能：如果当前组件没有字节点，则是undefined，如果有一个子节点，则值是一个Object，如果有多个子节点，数据类型是Array

React提供一个方法React.children来处理this.props.children，我们可以使用React.children.map来遍历子节点而不用担心this.props.children的数据类型

## 6. propType

组件属性可以接受任意值，组件类的propType属性可以用来验证组件的prop属性是否符合要求

```js
var myTitle = React.createClass({
    propTypes: {
        title: React.propTypes.string.isRequired
    },
    render: function() {
        return <h1>{this.props.title}</h1>
    }
});
```

