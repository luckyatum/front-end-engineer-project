# [CSS垂直居中的8种方法](https://jingyan.baidu.com/article/3a2f7c2e26041a26aed61150.html)

1. 使用vertical-align:middle实现垂直居中

    ```html
    <style>
        #out {
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #out:before {
            content: '';
            display: inline-block;
            vertical-align: middle;
            height: 100%;
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

2. 使用flex实现垂直居中

    ```html
    <style>
        #out {
            display: flex;
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #in {
            align-self: center;
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

3. 通过display:table-cell实现CSS垂直居中。

    ```html
    <style>
        #out {
            display: table;
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #in {
            display: table-cell;
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

4. 通过隐藏节点实现css垂直居中

    ```html
    <style>
        #out {
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #hide {
            width: 50%;
            height: 25%;
        }
        #in {
            width: 50%;
            height: 50%;
            background-color: yellow;
        }
    </style>

    <body>
        <div id="out">
            <div id="hide"></div>
            <div id="in"></div>
        </div>
    </body>
    ```

5. 已知父元素高度利用transform实现

    ```html
    <style>
        #out {
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #in {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
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

6. 已知父元素高度利用absolute实现

    ```html
    <style>
        #out {
            position: relative;
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #in {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
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

7. line-height实现，设置子元素line-height为父元素高度，必须子元素为单文本

    ```html
    <style>
        #out {
            width: 600px;
            height: 300px;
            background-color: aqua;
        }
        #in {
            width: 50%;
            height: 50%;
            line-height: 300px;
            background-color: yellow;
        }
    </style>

    <body>
        <div id="out">
            <div id="in"></div>
        </div>
    </body>
    ```