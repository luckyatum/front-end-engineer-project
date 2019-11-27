# [JavaScript引擎运行原理解析](https://blog.csdn.net/a419419/article/details/82906049)

1. 常见的解析器
    |浏览器|解析器
    :--:|:--:
    Mozilla|SpiderMonkey(c)
    Chrome|V8(c++)
    Safari|JavascriptCore(c/c++,ios7+)
    IE&Edge|Chakra(c++)
    Node.js|V8
2. 解析过程--语法检查
    > 词法分析，把js字符串的字符流按照ecma标准转换为记号流

        如：a = (b - c) 转换为

        NAME 'a'

        EQUALS

        OPEN_PARENTHESIS

        NAME 'b'

        MINUS

        NAME 'C'

        CLOSE_PARENTHESIS

        SEMICOLON
    > 语法分析，获取词法分析的记号流生成语法树
3. 运行阶段
    > 预解析
    1. 创建执行上下文，将语法树复制到执行上下文中
    2. 属性填充，解析器对语法树中的变量声明，函数声明，函数的形参进行填充。
