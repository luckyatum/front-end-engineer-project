# [一看就懂的JS抽象语法树](https://segmentfault.com/a/1190000012943992)

## 什么是抽象语法树

```js
var a = 1;
var b = a + 1;
```

上述代码转成json对象格式是这样的

```json
{
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 1,
                        "raw": "1"
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "b"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "operator": "+",
                        "left": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}
```

## AST三板斧

* 通过esprima生成AST
* 通过estraverse遍历和更新AST
* 通过escodegen将AST重新生成源码

```js
let code = 'const a = 1';
const ast = esprima.parseScript(code); // 通过esprima生成AST
console.log(ast);
```

此时输出ast如下：

```
Script {
    type: 'Program',
    body: [
        VariableDeclaration {
            type: 'VariableDeclaration',
            declarations: [Array],
            kind: 'const'
        }
    ],
    sourceType: 'script'
}
```

接着执行代码

```js
estraverse.traverse(ast, {
    enter: function (node) {
        node.kind = "var";
    }
}); // 通过estraverse遍历和更新AST
console.log(ast);
```

此时输出ast如下：

```
Script {
    type: 'Program',
    body:
        [ 
            VariableDeclaration {
                type: 'VariableDeclaration',
                declarations: [Array],
                kind: 'var'
            }
        ],
    sourceType: 'script' 
}
```

最后执行代码

```js
const transformCode = escodegen.generate(ast); // 通过escodegen将AST重新生成源码
console.log(transformCode);
```

输出ast源码

```js
var a = 1;
```

