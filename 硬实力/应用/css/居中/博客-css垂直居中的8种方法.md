# [CSS垂直居中的8种方法](https://jingyan.baidu.com/article/3a2f7c2e26041a26aed61150.html)

1. 使用vertical-align:middle实现垂直居中

    ```html
    <style>
        #out {
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #in {
            display: inline-block;
            vertical-align: middle;
            width: 50%;
            height: 50%;
            background-color: yellow;
        }
    </style>

    <body>
        <div id="out">
            <div id="in"></div>
        </div>
    </body>
    ```

2. 使用flex实现垂直居中，父元素设置display:flex;flex-direction:column;子元素设置align-items: center;
3. 为父元素添加伪元素:before，使得子元素实现垂直居中

    ```css
        #par:before {
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
        }
    ```
