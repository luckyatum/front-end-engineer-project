# [dom节点类型](http://www.w3school.com.cn/xmldom/dom_nodetype.asp)

## 节点类型

节点类型|描述
---|:--:
document|整个DOM树的根节点
documentFragment|轻量级的document对象
documentType|向为文档定义的实体提供接口
ProcessingInstruction|处理指令
entityReference|表示实体引用元素
element|表示element元素
attr|属性
text|元素或者属性中的文本内容
CDATASection|文档中的CDATA区段
comment|注释
entity|实体
Notation|在DTD中声明的符号

## 节点类型返回的值

节点类型|nodeName返回值|nodeValue返回值
---|:--:|:--:
document|#document|null
documentFragment|#document fragment|null
documentType|doctype名称|null
entityReference|实体引用名称|null
element|element name|null
attr|属性名称|属性值
processingInstruction|target|节点的内容
comment|#comment|注释文本
text|#text|节点内容
CDATASection|#cdata-section|节点内容
entity|实体名称|null
notation|符号名称|null
