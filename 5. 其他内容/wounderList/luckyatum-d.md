# 日常学习记录

## 2020-01-19

1. 拼接两个数组效率最高的方式（不一定）

    以前写法：arr = [...arr, ...newArr];
    现在写法：arr.push(...newArr);
    （效率高了多少倍不止...）。

## 2020-01-20

1. mac环境下终端输入IDLE打开python终端
2. input函数的小问题记录：
    如果想要输入字符串，在终端不能直接输入两个引号，而是先输入一个引号，然后输入内容，最后输入另一个引号结束，否则会变得莫名其妙（自己体验过就知道了。。。）

## 2020-01-21

1. python定义常量文件并使用。

    ```python
    # 定义一些常量值，写法参考https://blog.csdn.net/python012/article/details/80010490


    class Const:
        def __init__(self):
            pass

        class ConstError(TypeError):
            pass

        class ConstCaseError(ConstError):
            pass

        def __setattr__(self, name, value):
            if name in self.__dict__:  # 判断是否已经被赋值，如果是则报错
                raise self.ConstError("Can't change const.%s" % name)
            if not name.isupper():  # 判断所赋值是否是全部大写，用来做第一次赋值的格式判断，也可以根据需要改成其他判断条件
                raise self.ConstCaseError('const name "%s" is not all supercase' % name)

            self.__dict__[name] = value


    const = Const()
    const.MY_CONSTANT = "CHINA"
    const.MY_SECOND_CONSTANT = "RUSSIA"
    ```
