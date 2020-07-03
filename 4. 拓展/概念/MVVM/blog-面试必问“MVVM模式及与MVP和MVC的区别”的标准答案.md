# [面试必问“MVVM模式及与MVP和MVC的区别”的标准答案](https://zhuanlan.zhihu.com/p/87752772)

## 什么是MVVM

MVVM是Model-View-ViewModel的缩写。

## MVVM和MVC的区别

MVC的视图层会直接和Model层打交道，但是MVVM的话视图层和数据层都是通过ViewModel来打交道的，而且ViewModel会把View的变化更新到Model，也会把Model的变化反映到View。

## MVC的优缺点

优点：

* 把业务逻辑分离到Controller中，模块化程度高。当业务逻辑变更的时候，不需要变更View和Model，只需要替换一个Controller即可。
* 观察者模式可以做到多视图同时更新。

缺点：

* Controller测试困难，必须依赖于View和Model；
* View无法组件化，因为View是强依赖特定的Model，因此不能将其抽出来。

## MVVM的优缺点

优点：

* 提高可维护性，解决了MVP大量的手动View和Model同步的问题，提供双向绑定机制。
* 简化测试，因为同步逻辑是交由Binder做的，View跟着Model同时变更，所以只需要保证Model的正确性，View就正确。

缺点：

* 对于过于简单的图形界面来说，没必要使用；
* 大型图形应用，视图状态较多，ViewModel的构建和维护成本都比较高；
* 数据绑定的声明是指令式的写在View模板，这些内容没办法断点调试；
