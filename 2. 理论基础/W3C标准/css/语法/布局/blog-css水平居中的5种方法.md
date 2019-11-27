# [css水平居中的5种方法](https://jingyan.baidu.com/article/86112f1381081127379787bb.html)

1. margin: 0 auto;text-align:center;
2. display:flex
3. 父元素宽度确定情况下，两种方法
    1. 父元素设置display: table-cell;子元素设置margin-left: 一半父元素宽度
    2. 父元素设置position: absolute;子元素设置margin-left:一半父元素宽度
4. 子元素宽度不确定情况下

    ```css
    #in {
        width: fit-content;
        margin: 0 auto;
        text-align: center;
    }
    ```
5. transform
    
    ```css
    #in {
        width: 50%;
        height: 50%;
        position: absolute;
        left: 50%;
        transform: translateX(-25%);
    }
    ```