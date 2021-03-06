# [理解Babel是如何编译JS代码的及理解抽象语法树(AST）](https://www.cnblogs.com/tugenhua0707/p/7863616.html)

## 抽象语法树是如何产生的

1. 分词-将整个代码字符串分割成语法单元数组
    所谓语法单元，指的是具有实际意义的最小单元，也就是词；

    如：2022年亚运会将在杭州举行，可以拆分为：2022年，亚运会，将，在，杭州，举行；

    js语法中的语法单元可分为：

    * 空白，js中连续的空格，换行，缩进等合在一起作为一个语法单元
    * 注释，一个注释当作一个语法单元
    * 字符串，字符串内容当作一个语法单元
    * 数字
    * 标识符，_、$或数字，true、false等内置常量，if、return、function等关键字
    * 运算符，+ - * / > < 等
    * 其他的比如括号，分号，冒号等

    分词过程

    ```js
    if (1 > 0) {
        alert('aaa');
    }
    ```

    期望得到分词如下

    ```js
    'if' '空白符' '(' '1' '空白符' '>' '空白符' '0' ')' '空白符' '{' '\n' '空白符' 'alert' '(' '"aaa"' ')' ';' '\n' '}'
    ```

2. 语义
    语义分析是把词汇进行立体组合，确定词语最终的意思