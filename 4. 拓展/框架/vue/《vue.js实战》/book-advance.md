# 进阶篇

## 1.Render函数

### Virtual Dom

Virtual Dom不是真正意义上的Dom，而是一个轻量级的JavaScript对象，状态发生变化时，Virtual Dom会进行Diff运算，来更新只需要被替换的DOM，而不是全部重绘

```html
<!-- 正常的DOM节点 -->
<div id="main">
    <p>文本内容</p>
    <p>文本内容</p>
</div>
<!-- Virtual Dom创建的JavaScript对象 -->
<script>
    var vNode = {
        tag: 'div',
        attributes: {
            id: 'main'
        },
        children: [
            // p节点
        ]
    };
</script>
```

### 什么是render函数

render函数可以创建动态的标签

```html
<div id="app">
    <anchor :level="2" title="特性">特性</anchor>
</div>
<script>
    Vue.component('anchor', {
        props: {
            level: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                default: ''
            }
        },
        render: function(createElement) {
            return createElement(
                'h' + this.level,
                [
                    createElement(
                        'a',
                        {
                            domProps: {
                                href: '#' + this.title
                            }
                        },
                        this.$slots.default
                    )
                ]
            )
        }
    });
    var app = new Vue({
        el: '#app'
    });
</script>
```

render通过createElement函数创建Virtual Dom，createElement构成了Vue Virtual Dom的模板，包含3个参数

第一个参数必填：String（标签名称） | Object（组件选项） | Function（函数）

第二个参数可选：Object（数据对象）

第三个参数可选：Array（子节点）

## 使用webpack

前端自动化构建主要解决以下问题:

* JavaScript、css代码的合并和压缩
* CSS预处理：Less、Sass、Styules的编译
* 生成雪碧图
* ES6转ES5
* 模块化
